/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

'use strict';
const log4js = require('log4js');
const logger = log4js.getLogger('SampleWebApp');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const util = require('util');
const app = express();
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');
const cors = require('cors');
const path = require('path');
const hfc = require('fabric-client');
const request = require('request');

const helper = require('./app/helper.js');
const createChannel = require('./app/create-channel.js');
const anchorUpdate = require('./app/anchorPeerUpdate.js');
const configUpdate = require('./app/configUpdate.js');
const join = require('./app/join-channel.js');
const install = require('./app/install-chaincode.js');
const instantiate = require('./app/instantiate-upgrade-chaincode.js');
const query = require('./app/query.js');
const assets = require('./app/assets.js');
const multer = require('multer');
const fetch = require("node-fetch");
//const querySelector = require('./app/query-selector.js');

// indicate to the application where the setup file is located so it able
// to have the hfc load it to initalize the fabric client instance
hfc.setConfigSetting('Org1-connection-profile',path.join(__dirname, 'artifacts', 'network-config-org1.json'));
hfc.setConfigSetting('Org2-connection-profile',path.join(__dirname, 'artifacts', 'network-config-org2.json'));
// some other settings the application might need to know
hfc.addConfigFile(path.join(__dirname, 'config.json'));

const host = process.env.HOST || hfc.getConfigSetting('host');
const port = process.env.PORT || hfc.getConfigSetting('port');
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// SET CONFIGURATONS ////////////////////////////
///////////////////////////////////////////////////////////////////////////////
app.options('*', cors());
app.use(cors());
//support parsing of application/json type post data
app.use(bodyParser.json({limit: '10mb', extended: true}));
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
// set secret variable
app.set('secret', 'thisismysecret');
app.use(expressJWT({
	secret: 'thisismysecret'
}).unless({
	path: ['/user/register', '/network/creds']
}));
app.use(bearerToken());
app.use(function(req, res, next) {
	logger.debug(' ------>>>>>> new request for %s',req.originalUrl);
	if (req.originalUrl.indexOf('/user/register') >= 0 || req.originalUrl.indexOf('/network/creds') >= 0) {
		return next();
	}

	var token = req.token;
	jwt.verify(token, app.get('secret'), function(err, decoded) {
		if (err) {
			res.send({
				success: false,
				message: 'Failed to authenticate token. Make sure to include the ' +
					'token returned from /user call in the authorization header ' +
					' as a Bearer token'
			});
			return;
		} else {
			// add the decoded user name and org name to the request object
			// for the downstream code to use
			req.username = decoded.username;
			req.orgname = decoded.orgName;
			logger.debug(util.format('Decoded from JWT token: username - %s, orgname - %s', decoded.username, decoded.orgName));
			return next();
		}
	});
});

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// START SERVER /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var server = http.createServer(app).listen(port, function() {});
logger.info('****************** SERVER STARTED ************************');
logger.info('***************  http://%s:%s  ******************',host,port);
server.timeout = 240000;

function getErrorMessage(field) {
	var response = {
		success: false,
		message: field + ' field is missing or Invalid in the request'
	};
	return response;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////// REST ENDPOINTS START HERE ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Register and enroll user
app.post('/user/register', async function(req, res) {
	var username = req.body.username;
	var orgName = req.body.orgName;
	logger.debug('End point : /user');
	logger.debug('User name : ' + username);
	logger.debug('Org name  : ' + orgName);
	if (!username) {
		res.json(getErrorMessage('\'username\''));
		return;
	}
	if (!orgName) {
		res.json(getErrorMessage('\'orgName\''));
		return;
	}
	var token = jwt.sign({
		//exp: Math.floor(Date.now() / 1000) + parseInt(hfc.getConfigSetting('jwt_expiretime')),
		username: username,
		orgName: orgName
	}, app.get('secret'));
	let response = await helper.getRegisteredUser(username, orgName, true);
	logger.debug('-- returned from registering the username %s for organization %s',username,orgName);
	if (response && typeof response !== 'string') {
		logger.debug('Successfully registered the username %s for organization %s',username,orgName);
		response.token = token;
		res.json(response);
	} else {
		logger.debug('Failed to register the username %s for organization %s with::%s',username,orgName,response);
		res.json({success: false, message: response});
	}

});

// Revoke User
app.post('/user/revoke', async function(req, res) {
	logger.info('<<<<<<<<<<<<<<<<< R E V O K E   U S E R >>>>>>>>>>>>>>>>>');
	logger.debug('End point : /revokeUser');

	let message = await helper.revokeUser(req.username, req.orgname);
	res.send(message);
});

// update enrollment secret of a User
//TODO: Can be enhanced this to update several other details like max enrollments etc.,
app.post('/user/update', async function(req, res) {
	logger.info('<<<<<<<<<<<<<<<<< U P D A T E   U S E R   P S W D >>>>>>>>>>>>>>>>>');
	logger.debug('End point : /updatePassword');
	var pswd = req.body.password;
	let message = await helper.updatePassword(req.username, pswd, req.orgname, true);
	res.send(message);
});

// get network creds of an org
app.get('/network/creds', async function(req, res) {
	logger.info('<<<<<<<<<<<<<<<<< G E T   C R E D S >>>>>>>>>>>>>>>>>');
	logger.debug('End point : /network/creds');
	var orgname = req.query.orgname;
	logger.debug('orgname : ' + orgname);
	if (!orgname) {
		res.json(getErrorMessage('\'orgname\''));
		return;
	}
	let message = await helper.getCreds(orgname);
	res.send(message);
});
// get network creds of an org
app.put('/network/creds', async function(req, res) {
	logger.info('<<<<<<<<<<<<<<<<< U P D A T E    C R E D S >>>>>>>>>>>>>>>>>');
	logger.debug('End point : /network/creds');
	let orgname = req.query.orgname;
	logger.debug('orgname : ' + orgname);
	let creds = req.body.creds;
	if (!orgname) {
		res.json(getErrorMessage('\'orgname\''));
		return;
	}
	if (!creds) {
		res.json(getErrorMessage('\'creds\''));
		return;
	}
	let message = await helper.updateCreds(orgname, creds);
	res.send(message);
});
//Update connection profile with the channel name
app.put('/channel/:channel', async function(req, res) {
	logger.info('<<<<<<<<<<<<<<<<< U P D A T E   C C P >>>>>>>>>>>>>>>>>');
	logger.debug('End point : /channel/:channel');
	var channel = req.params.channel;
	logger.debug('Channel name : ' + channel);
	if (!channel) {
		res.json(getErrorMessage('\'channel\''));
		return;
	}
	let message = await helper.updateCCP(channel);
	res.send(message);
});

// Create Channel
app.post('/channel', async function(req, res) {
	logger.info('<<<<<<<<<<<<<<<<< C R E A T E  C H A N N E L >>>>>>>>>>>>>>>>>');
	logger.debug('End point : /channel');
	var channel = req.body.channel;
	var mspIds = req.body.mspIds;
	var consortium = req.body.consortium;
	logger.debug('Channel name : ' + channel);
	logger.debug('consortium : ' + consortium);
	logger.debug('orgs : ');
	logger.debug(mspIds);
	if (!channel) {
		res.json(getErrorMessage('\'channel\''));
		return;
	}
	if (!consortium) {
		res.json(getErrorMessage('\'consortium\''));
		return;
	}
	if (!mspIds || mspIds.length == 0 ) {
		res.json(getErrorMessage('\'mspIds\''));
		return;
	}
	let message = await createChannel.createChannel(channel, consortium, mspIds, req.username, req.orgname);
	res.send(message);
});
// Join Channel
app.post('/channel/:channelName/peers', async function(req, res) {
	logger.info('<<<<<<<<<<<<<<<<< J O I N  C H A N N E L >>>>>>>>>>>>>>>>>');
	var channelName = req.params.channelName;
	var peers = req.body.peers;
	logger.debug('channelName : ' + channelName);
	logger.debug('peers : ' + peers);
	logger.debug('username :' + req.username);
	logger.debug('orgname:' + req.orgname);

	if (!channelName) {
		res.json(getErrorMessage('\'channelName\''));
		return;
	}
	if (!peers || peers.length == 0) {
		res.json(getErrorMessage('\'peers\''));
		return;
	}

	let message =  await join.joinChannel(channelName, peers, req.username, req.orgname);
	res.send(message);
});
// Anchor peer update on a Channel
app.put('/channel/:channelName/anchorupdate', async function(req, res) {
	logger.info('<<<<<<<<<<<<<<<<< A N C H O R    P E E R   U P D A T E  >>>>>>>>>>>>>>>>>');
	var channelName = req.params.channelName;
	logger.debug('End point : /channel/'+channelName+'/update');
	var host = req.body.host;
	var port = req.body.port;
	logger.debug('Channel name : ' + channelName);
	logger.debug('Host : ' + host);
	logger.debug('Port : ' + port);
	if (!channelName) {
		res.json(getErrorMessage('\'channelName\''));
		return;
	}
	if (!host) {
		res.json(getErrorMessage('\'host\''));
		return;
	}
	if (!port) {
		res.json(getErrorMessage('\'port\''));
		return;
	}
	let message = await anchorUpdate.anchorPeerUpdate(channelName, req.username, req.orgname, req.body);
	res.send(message);
});

// Update the Channel
app.put('/channel/:channel/update', async function(req, res) {
	logger.info('<<<<<<<<<<<<<<<<< A N C H O R    P E E R   U P D A T E  >>>>>>>>>>>>>>>>>');
	var channel = req.params.channel;
	logger.debug('End point : /channel/'+channel+'/update');
	logger.debug('Channel name : ' + channel);
	var crl = req.body.crl;
	logger.debug('crl : ' + crl);
	if (!channel) {
		res.json(getErrorMessage('\'channel\''));
		return;
	}
	if (!crl) {
		res.json(getErrorMessage('\'crl\''));
		return;
	}
	let message = await configUpdate.configUpdate(channel, req.username, req.orgname, crl);
	res.send(message);
});

// Install chaincode on target peers
app.post('/chaincode', async function(req, res) {
	logger.debug('==================== INSTALL CHAINCODE ==================');
	var peers = req.body.peers;
	var chaincodeName = req.body.chaincodeName;
	var chaincodePath = req.body.chaincodePath;
	var metadataPath = req.body.metadataPath;
	var chaincodeVersion = req.body.chaincodeVersion;
	var chaincodeType = req.body.chaincodeType;
	logger.debug('peers : ' + peers); // target peers list
	logger.debug('chaincodeName : ' + chaincodeName);
	logger.debug('chaincodePath  : ' + chaincodePath);
	logger.debug('metadataPath  : ' + metadataPath);
	logger.debug('chaincodeVersion  : ' + chaincodeVersion);
	logger.debug('chaincodeType  : ' + chaincodeType);
	if (!peers || peers.length == 0) {
		res.json(getErrorMessage('\'peers\''));
		return;
	}
	if (!chaincodeName) {
		res.json(getErrorMessage('\'chaincodeName\''));
		return;
	}
	if (!chaincodePath) {
		res.json(getErrorMessage('\'chaincodePath\''));
		return;
	}
	if (!chaincodeVersion) {
		res.json(getErrorMessage('\'chaincodeVersion\''));
		return;
	}
	if (!chaincodeType) {
		res.json(getErrorMessage('\'chaincodeType\''));
		return;
	}
	let message = await install.installChaincode(peers, chaincodeName, chaincodePath,metadataPath, chaincodeVersion, chaincodeType, req.username, req.orgname)
	res.send(message);});
// Instantiate chaincode on target peers
app.post('/channel/:channelName/chaincode', async function(req, res) {
	logger.debug('==================== INSTANTIATE CHAINCODE ==================');
	var peers = req.body.peers;
	var chaincodeName = req.body.chaincodeName;
	var chaincodeVersion = req.body.chaincodeVersion;
	var channelName = req.params.channelName;
	var chaincodeType = req.body.chaincodeType;
	var isUpgrade = req.body.isUpgrade;
	var fcn = req.body.fcn;
	var args = req.body.args;
	logger.debug('peers  : ' + peers);
	logger.debug('channelName  : ' + channelName);
	logger.debug('chaincodeName : ' + chaincodeName);
	logger.debug('chaincodeVersion  : ' + chaincodeVersion);
	logger.debug('chaincodeType  : ' + chaincodeType);
	logger.debug('fcn  : ' + fcn);
	logger.debug('args  : ' + args);
	logger.debug('isUpgrade  : ' + isUpgrade);
	if (!chaincodeName) {
		res.json(getErrorMessage('\'chaincodeName\''));
		return;
	}
	if (!chaincodeVersion) {
		res.json(getErrorMessage('\'chaincodeVersion\''));
		return;
	}
	if (!channelName) {
		res.json(getErrorMessage('\'channelName\''));
		return;
	}
	if (!chaincodeType) {
		res.json(getErrorMessage('\'chaincodeType\''));
		return;
	}
	if (!args) {
		res.json(getErrorMessage('\'args\''));
		return;
	}
	// if (!isUpgrade){
		// logger.debug('Instantiate the chaincode ' + chaincodeName);
	// }

	//let message = await instantiate.instantiateUpdgradeChaincode(peers, channelName, chaincodeName, chaincodeVersion, chaincodeType, fcn, args, req.username, req.orgname, isUpgrade);

	let message = await instantiate.instantiateUpdgradeChaincode(peers, channelName, chaincodeName, chaincodeVersion, chaincodeType, fcn, args, req.username, req.orgname);
	res.send(message);
});
// Invoke transaction on chaincode on target peers
app.post('/channel/:channelName/chaincode/:chaincodeName', async function(req, res) {

	logger.debug('==================== INVOKE ON CHAINCODE ==================');
	var peers = req.body.peers;
	var chaincodeName = req.params.chaincodeName;
	var channelName = req.params.channelName;
	var fcn = req.body.fcn;
	var args = req.body.args;
	logger.debug('peers  : '+ peers );
	logger.debug('channelName  : ' + channelName);
	logger.debug('chaincodeName : ' + chaincodeName);
	logger.debug('fcn  : ' + fcn);
	logger.debug('args  : ' + args);
	if (!chaincodeName) {
		res.json(getErrorMessage('\'chaincodeName\''));
		return;
	}
	if (!channelName) {
		res.json(getErrorMessage('\'channelName\''));
		return;
	}
	if (!fcn) {
		res.json(getErrorMessage('\'fcn\''));
		return;
	}
	if (!args) {
		res.json(getErrorMessage('\'args\''));
		return;
	}

	if(fcn=="addCdr"){
		let message = await assets.uploadcdr(peers, channelName, chaincodeName, args,fcn, req.username, req.orgname, res);
		//console.log(res);
		res.send(message);
	}
	if(fcn=="saveRecordsInBatch"){
		let message = await assets.bulkUploadcdr(peers, channelName, chaincodeName, args,fcn, req.username, req.orgname, res);
		//console.log(res);
		res.send(message);
	}
	if(fcn=="addContract"){
		let message = await assets.uploadContract(peers, channelName, chaincodeName, args,fcn, req.username, req.orgname, res);
		//console.log(res);
		res.send(message);
	}
	
	if(fcn=="addAgreement"){
		let message = await assets.uploadAgreement(peers, channelName, chaincodeName, args,fcn, req.username, req.orgname, res);
		//console.log(res);
		res.send(message);
	}
	
});

// Query on chaincode on target peers
app.get('/channel/:channelName/chaincode/:chaincodeName', async function(req, res) {
	logger.debug('==================== QUERY BY CHAINCODE ==================');
	var channelName = req.params.channelName;
	var chaincodeName = req.params.chaincodeName;
	let args = req.query.args;
	let fcn = req.query.fcn;
	let peer = req.query.peer;

	logger.debug('channelName : ' + channelName);
	logger.debug('chaincodeName : ' + chaincodeName);
	logger.debug('fcn : ' + fcn);
	logger.debug('args : ' + args);

	if (!chaincodeName) {
		res.json(getErrorMessage('\'chaincodeName\''));
		return;
	}
	if (!channelName) {
		res.json(getErrorMessage('\'channelName\''));
		return;
	}
	if (!fcn) {
		res.json(getErrorMessage('\'fcn\''));
		return;
	}
	if (!args) {
		res.json(getErrorMessage('\'args\''));
		return;
	}
	args = args.replace(/'/g, '"');
	args = JSON.parse(args);
	logger.debug(args);

	try {	
		if(fcn=="queryRecordsWithPagination"){	
				let message = await query.queryChaincode(peer, channelName, chaincodeName, args, fcn, req.username, req.orgname);	
				message = JSON.parse(message);		
				if(message.status && message.status !=200){				
					res.status(message.status).send(message.message);			
				} else {				
					res.send(message);			
				}				
		}				
	}
	catch (error) {					
		console.log("inside-error of querychaincode")
		console.log("errOr : "+error);				
	}					
});


//  Query Get Block by BlockNumber
app.get('/channel/:channelName/blocks/:id', async function(req, res) {
	logger.debug('==================== GET BLOCK BY NUMBER ==================');
	let id = req.params.id;
	let peer = req.query.peer;
	logger.debug('channelName : ' + req.params.channelName);
	logger.debug('ID : ' + id);
	logger.debug('Peer : ' + peer);
	if (!id) {
		res.json(getErrorMessage('\'ID\''));
		return;
	}

	let message = await query.getBlockByNumber(peer, req.params.channelName, id, req.username, req.orgname);
	res.send(message);
});
// Query Get Transaction by Transaction ID
app.get('/channel/:channelName/transaction/:trxnId', async function(req, res) {
	logger.debug('================ GET TRANSACTION BY TRANSACTION_ID ======================');
	logger.debug('channelName : ' + req.params.channelName);
	let trxnId = req.params.trxnId;
	let peer = req.query.peer;
	if (!trxnId) {
		res.json(getErrorMessage('\'trxnId\''));
		return;
	}

	let message = await query.getTransactionByID(peer, req.params.channelName, trxnId, req.username, req.orgname);
	res.send(message);
});
// Query Transaction Summary
app.get('/channel/:channelName/transaction', async function(req, res) {
	logger.debug('================ GET TRANSACTION BY TRANSACTION_ID ======================');
	logger.debug('channelName : ' + req.params.channelName);
	let peer = req.query.peer;
	let message = await query.getTransactionSummary(peer, req.params.channelName, req.username, req.orgname);
	res.send(message);
});
// Query Get Block by Hash
app.get('/channel/:channelName/blocks', async function(req, res) {
	logger.debug('================ GET BLOCK BY HASH ======================');
	logger.debug('channelName : ' + req.params.channelName);
	let hash = req.query.hash;
	let peer = req.query.peer;
	if (!hash) {
		res.json(getErrorMessage('\'hash\''));
		return;
	}

	let message = await query.getBlockByHash(peer, req.params.channelName, hash, req.username, req.orgname);
	res.send(message);
});
//Query for Channel Information
app.get('/channel/:channelName', async function(req, res) {
	logger.debug('================ GET CHANNEL INFORMATION ======================');
	logger.debug('channelName : ' + req.params.channelName);
	let peer = req.query.peer;

	let message = await query.getChainInfo(peer, req.params.channelName, req.username, req.orgname);
	res.send(message);
});
//Query for Channel instantiated chaincodes
app.get('/channel/:channelName/chaincode', async function(req, res) {
	logger.debug('================ GET INSTANTIATED CHAINCODES ======================');
	logger.debug('channelName : ' + req.params.channelName);
	let peer = req.query.peer;

	let message = await query.getInstalledChaincodes(peer, req.params.channelName, 'instantiated', req.username, req.orgname);
	res.send(message);
});
// Query to fetch all Installed/instantiated chaincodes
app.get('/chaincode', async function(req, res) {
	var peer = req.query.peer;
	var installType = req.query.type;
	logger.debug('================ GET INSTALLED CHAINCODES ======================');

	let message = await query.getInstalledChaincodes(peer, null, 'installed', req.username, req.orgname)
	res.send(message);
});
// Query to fetch channels
app.get('/channels', async function(req, res) {
	logger.debug('================ GET CHANNELS ======================');
	logger.debug('peer: ' + req.query.peer);
	var peer = req.query.peer;
	if (!peer) {
		res.json(getErrorMessage('\'peer\''));
		return;
	}

	let message = await query.getChannels(peer, req.username, req.orgname);
	res.send(message);
});

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
	console.log(file);
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      //cb(null, file.fieldname + '-' + Date.now())
      console.log("file name : "+file.originalname);
      cb(null, file.originalname);
    }
  })
console.log("storage : "+storage);
  var upload = multer({ storage: storage })


var toUpload =  function(filename,saveAsJSONPath) {
	try{
		return new Promise((resolve, reject) => {
			node_xj = require("xls-to-json");
				console.log(filename+ " : " +saveAsJSONPath);
			node_xj({
				input: filename,  // input xls
				output: saveAsJSONPath, // output json
				sheet: "Sheet1",  // specific sheetname
				rowsToSkip: 0 // number of rows to skip at the top of the sheet; defaults to 0
				}, function(err, result) {
					if(err) {
					console.error(err);
					resolve({
						"status": err.statusCode,
						"message": err.reason
			 		 })
					} else {
					//console.log(result);
					//var data = JSON.stringify(result);
					resolve(result);
					
					}
			  });
			});
}
catch (error) {

	let response = {
		"status": error.statusCode,
		"message": error.reason
	};
	return response;
}
}

//app.post('/uploadCDR', upload.single('myCDR'), (req, res, next) => {
app.post('/channel/:channelName/chaincode/:chaincodeName/uploadCDR', upload.single('myCDR'),(req, res, next) => {
	const file = req.file
	console.log("file inside ep : "+file.filename);
    if (!file) {
	  const error = new Error('Please upload a file')
	  error.message = "Please upload a file";
      error.httpStatusCode = 400
	  //return next(error)
	  res.send({error: error});
	}
	else{
	  //res.send(file.path)
	  loadedPath = __dirname+"\\"+file.path;
	  console.log(loadedPath);
	  loadedJSONPath = __dirname+"\\"+"uploadJSON"+"\\"+"CDR-"+Date.now()+".json";
	  loadedPath = __dirname+"\\"+"CDR_A.xlsx"
	  toUpload(loadedPath,loadedJSONPath,req,res)
	.then(function(response){
		//console.log(response, 'response')
		res.send({success:true, msg:"Uploaded CDR", result: response}); 
	})
	.catch(function(err) {
        res.send({success:false, msg: "Failed to Upload CDR", error:err});
      });  
	}
});

app.post('/api/login', (req,res) => {

 const user = {
	 username: 'PartnerA',
	 orgName: 'Org1'
 }
 jwt.sign({user: user}, 'secretkey', (err, token) => {
	res.json({
		token
		});
 });
 });

app.get('/', function (req, res) {
  //res.send('CDReconcil8 - Reconcile CDRs the smart way !!');
  res.sendFile(__dirname + '/index.html');
})

app.get('/fetchAgreement', (req, res) => {
    //var operator=req.params.op
    const nano = require('nano')('http://104.154.161.228:5984/');
    const db = nano.db.use('cdrchannel_mycc');
    const q = {
        selector: {
            docType: { "$eq": "AGREEMENT"}
        }       
      };
      console.log(q);
      db.find(q).then((doc) => {
        res.send(doc);
      });
    
});

app.get('/fetchCDR', (req, res) => {
    //var operator=req.params.op
    const nano = require('nano')('http://104.154.161.228:5984/');
    const db = nano.db.use('cdrchannel_mycc');
    const q = {
        selector: {
            docType: { "$eq": "CDR"}
        }       
      };
      console.log(q);
      db.find(q).then((doc) => {
        res.send(doc);
      });
    
})

app.get('/fetchContract', (req, res) => {
    //var operator=req.params.op
    const nano = require('nano')('http://104.154.161.228:5984/');
    const db = nano.db.use('cdrchannel_mycc');
    const q = {
        selector: {
            docType: { "$eq": "CONTRACT"}
        }       
      };
      console.log(q);
      db.find(q).then((doc) => {
        res.send(doc);
      });
    
})

app.get('/fetchUnifiedCDR', (req, res) => {
    //var operator=req.params.op
    const nano = require('nano')('http://104.154.161.228:5984/');
    const db = nano.db.use('cdrchannel_mycc');
    const q = {
        selector: {
            docType: { "$eq": "UNIFCDR"}
        }       
      };
      console.log(q);
      db.find(q).then((doc) => {
        res.send(doc);
      });
    
})

exports.toUpload=toUpload;
