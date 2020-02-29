
'use strict';
var path = require('path');
var helper = require('./helper.js');
var logger = helper.getLogger('CDR Reconcilation');
var invoke = require('./invoke-transaction.js');

//const mime = require('mime-types');
//const crypto = require('crypto');

var fs = require("fs");
const uuidv4 = require('uuid/v4');
//const base64 = require('base-64')


var uploadcdr = async function (peerNames, channelName, chaincodeName, args,fcn, username, org_name, res) {
   // logger.debug(">>> taxForm() ...");
    res.set('Content-Type', 'application/json');
	// res.set('Accept', 'application/json');
	

	
	//*********************************
	let jsonArr = [];
	 
	 jsonArr.push(args.callId);
	 jsonArr.push(args.callStatus);
	 jsonArr.push(args.cdrId);
	 jsonArr.push(args.originIsp);
	 jsonArr.push(args.destinationIsp);
	 jsonArr.push(args.sourceNumber);
	 jsonArr.push(args.destinationNumber);
	 jsonArr.push(args.originCode);
	 jsonArr.push(args.destinationCode);
	 jsonArr.push(args.switchId);
	 jsonArr.push(args.originationTime);
	 jsonArr.push(args.terminationTime);
	 jsonArr.push(args.timezoneUTC);
	 jsonArr.push(args.callDuration);
	// jsonArr.push(args.call_duration);
	 //jsonArr.push(args.call_status);
	
	 
	 console.log(jsonArr);
	
	//***************************************
	
   
   
   
 // ***************** To encrypt base-64 string ***************************  
 
	//let base64Image = item.docImage
   // item.docOwner = username;
   // item.aesKey = crypto.randomBytes(32).toString('base64');
    //item.docImage = helper.encrypt(base64Image, item.aesKey);
 //**************************************************************************

 
   
    //logger.debug(">>> taxForm() : args: %s", jsonArr);
	let data ; 
	try {
	 data = await invoke.invokeChaincode(peerNames, channelName, chaincodeName, jsonArr, fcn, username, org_name);
	}	
	catch(err){
		console.log(err);
		//let errString = JSON.stringify(err);
		data = {
			"status":"500",
			"message":err
		};
		data = JSON.stringify(data);
	}
    if (data) {	
	let result;
	//	let result = data
	try {
		result = JSON.parse(data);
	}
	catch(error) {
		result = {
                        "status":"200",
                        "message":data
                };
	}	
		
       // result.docImage = helper.decrypt(result.docImage, result.aesKey);
        return result;
			
    } else {
        return 'Failed to invoke the transaction ! check the logs for the details';
    }
	
	 // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    
}

//Bulk Upload CDRs ..................................
var bulkUploadcdr = async function (peerNames, channelName, chaincodeName, args,fcn, username, org_name, res) {
	
	let jsonArr = [];
	 
	 jsonArr.push(args.assetType);
	 jsonArr.push(JSON.stringify(args.cdrDtls));
	// jsonArr.push(args.updatedBy);
	 //jsonArr.push(args.claimStatus);
	 //jsonArr.push(args.totalApprovedAmount);
	 //jsonArr.push(args.totalDeniedAmount);
	 //jsonArr.push(args.updateReason);
	 
	 
	 console.log("Update Claims Resolution argument ********"+jsonArr);
	
	//***************************************
   
    //logger.debug(">>> taxForm() : args: %s", jsonArr);
	let data ; 
	try {
	 data = await invoke.invokeChaincode(peerNames, channelName, chaincodeName, jsonArr, fcn, username, org_name);
	}	
	catch(err){
		console.log(err);
		//let errString = JSON.stringify(err);
		data = {
			"status":"500",
			"message":err
		};
		data = JSON.stringify(data);
	}
    if (data) {	
	let result;
	//	let result = data
	try {
		result = JSON.parse(data);
	}
	catch(error) {
		result = {
                        "status":"200",
                        "message":data
                };
	}	
		
       // result.docImage = helper.decrypt(result.docImage, result.aesKey);
        return result;
			
    } else {
        return 'Failed to invoke the transaction ! check the logs for the details';
    }
	
	
}



var uploadContract = async function (peerNames, channelName, chaincodeName, args,fcn, username, org_name, res) {
	
	res.set('Content-Type', 'application/json');
	
	//args.acctId = uuidv4().toString();
	
	let jsonArr = [];
     
     jsonArr.push(args.contractId);
	 jsonArr.push(args.ispName);
	 jsonArr.push(args.isdCode);
	 jsonArr.push(args.ispMapping);
	 jsonArr.push(args.agreementId);

	 
	 let data = await invoke.invokeChaincode(peerNames, channelName, chaincodeName, jsonArr, fcn, username, org_name);
	 
	 
	 if (data) {	
	
		//let result = data
       // let result = JSON.parse(data);
		
       // result.docImage = helper.decrypt(result.docImage, result.aesKey);
        return data;
			
    } else {
        return 'Failed to invoke the transaction ! check the logs for the details';
    }
}

var uploadAgreement = async function (peerNames, channelName, chaincodeName, args,fcn, username, org_name, res) {
	
	res.set('Content-Type', 'application/json');
	let jsonArr = [];
	 
	 jsonArr.push(args.agreementId);
	 jsonArr.push(args.originAgreed);
     jsonArr.push(args.destinationAgreed);
     jsonArr.push(args.ratingCurrency);
	 jsonArr.push(args.ratingforHigh);
	 jsonArr.push(args.ratingforMedium);
	 jsonArr.push(args.ratingforLow);
	 
	 let data = await invoke.invokeChaincode(peerNames, channelName, chaincodeName, jsonArr, fcn, username, org_name);
	 
	 
	 if (data) {	
	
		//let result = data
        //let result = JSON.parse(data);
		
       // result.docImage = helper.decrypt(result.docImage, result.aesKey);
        return data;
			
    } else {
        return 'Failed to invoke the transaction ! check the logs for the details';
    }
	 
}


var unifiedcdr = async function (peerNames, channelName, chaincodeName, args,fcn, username, org_name, res) {
	
	res.set('Content-Type', 'application/json');
	
	//args.batchID = uuidv4().toString();
	let jsonArr = [];
	 
 
	 jsonArr.push(args.assetType);
	 jsonArr.push(JSON.stringify(args.callDtls));
	 
	 console.log(jsonArr);
	
	let data; 
	try {
	 	data = await invoke.invokeChaincode(peerNames, channelName, chaincodeName, jsonArr, fcn, username, org_name);
	 }
	catch(err) {
		data = {
			"status": "500",
			"message": err
		}
	}
	 
	 if (data) {	
		
        	return data;	
       // result.docImage = helper.decrypt(result.docImage, result.aesKey);
       // return data;
			
    } else {
        return 'Failed to invoke the transaction ! check the logs for the details';
    }
	 
} 



///-----------------------



exports.uploadcdr = uploadcdr;
exports.uploadContract=uploadContract;
exports.uploadAgreement=uploadAgreement;
exports.unifiedcdr=unifiedcdr;
exports.bulkUploadcdr=bulkUploadcdr