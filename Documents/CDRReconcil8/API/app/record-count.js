var searchDoc = async function searchDoc(peer,docType) {	
    
    if (docType == "CLAIM" || docType == "INVOICE" || docType == "TAX FORM" || docType == "BATCHINFO" || docType == "ACCOUNT" || docType == "TAX_EXEMPT_CERTIFICATE") {	
           
    const couchdbservername = "http://localhost"; 	
    const dbinstance = "mychannel_wholesaleclaims"; 	
	
	var peerCouch = { //peerCouch //docker inspect peer0.csgwc.verizon.com | grep couch
		"peer0.csgwc.verizon.com": "couchdb0",
		"peer1.csgwc.verizon.com": "couchdb1",
	};
	var couchPort = {  //couchPort  //docker inspect couchdb0 | grep HostPort
		"couchdb0": "5984",
		"couchdb1": "6984",
	};
	console.log(peerCouch[peer]);
var port = couchPort[peerCouch[peer]];
var docDesign = "_design/"+docType.toLowerCase().replace(/ /g,'')+"Count";	
var docView = docType.toLowerCase().replace(/ /g,'')+"CountView";	
const nano = require("nano")(couchdbservername+":"+port);	
var http = require("http");	
    
const mydbconnection = nano.db.use(dbinstance)	
    try {	
        let headers = await mydbconnection.get(docDesign);	
        let message =   await getRecordCount(docType,port,couchdbservername,dbinstance,docDesign,docView);	
        return message;	
    }	
    catch (error) {	
    if(error){  	
                try {	
                    let createDocResponse = await createDoc(docDesign,docType,docView,couchdbservername,port,dbinstance);	
                }	
                catch (error2) {	
                    let response = {	
                        "status": error2.statusCode,	
                        "message": error2.reason	
                    };	
                    return response;	
                }	
                try {	
                    let recordCountResponse = await getRecordCount(docType,port,couchdbservername,dbinstance,docDesign,docView);	
                    return recordCountResponse;	
                }	
                catch (error3) {	
                    let response = {	
                        "status": error3.statusCode,	
                        "message": error3.reason	
                    };	
                    return response;	
                }	
   }	
    }	
    }	
    else {	
        return "{ rows: [] }";	
        }	
}	
       
   
var  getRecordCount = async function getRecordCount(docType, port, url1,dbName,ddocName,viewName ) {	
            
        ddocName = docType.toLowerCase().replace(/ /g,'')+"Count";	
        var mydbconnection = require("nano")(url1+":"+port).use(dbName);	
        return new Promise((resolve, reject) => {	
            mydbconnection.view(ddocName, viewName, function (err, body, header) {	
                            if (err) {	
              	
                                      resolve({	
                                                "status": err.statusCode,	
                                                "message": err.reason	
                                      });	
                                     }	
                            else {	
                                    console.log(body);	
                                    if (!body) {	
                                        body = {};	
                                    }	
                                    if (!body.rows) {	
                                        body.rows = [];	
                                    }	
                                    if (body.rows.length == 0) {	
                                        body.rows.push({ "key":null, "value": 0 });	
                                    }	
                                    resolve(body);	
                                }	
                    });	
           });	
        
    }	
        
    var createDoc = async function createDoc(docDesign,docType,docView,couchdbservername,port,dbinstance) {	
    const Nano = require('nano')	
    const nano = Nano(couchdbservername+":"+port)	
    const db = nano.db.use(dbinstance)	
        
    const ddoc = {	
                    "_id": docDesign,	
                    "views": {},	
                    "language": "javascript"	
                 }	
        
    let viewName = docView;	
    ddoc.views[viewName] = {	
                                "reduce": "_sum",	
                                "map": "function(doc) {\n  if (doc.docType=='"+docType+"') {\n emit(doc.docType,1);\n  }\n}"	
                           }; 	
        
    return new Promise((resolve, reject) => {	
        db.insert(ddoc, function(err, body) {	
            if (err){	
                        console.log(err);                   	
                        resolve({	
                        "status": err.statusCode,	
                        "message": err.reason	
                        });	
                    }	
            else {	
                       
                        if (!body) {	
                            body = {};	
                        }	
                        if (!body.rows) {	
                            body.rows = [];	
                        }	
                        if (body.rows.length == 0) {	
                            body.rows.push({ "key":null, "value": 0 });	
                        }	
                        resolve(body);	
                }	
        });	
    });	
    }	
        
	
    exports.searchDoc = searchDoc;	
    exports.createDoc = createDoc;	
    exports.getRecordCount = getRecordCount;	

        
    var searchDoc = async function searchDoc(peer,docType) {	
    
    if (docType == "CLAIM" || docType == "INVOICE" || docType == "TAX FORM" || docType == "BATCHINFO" || docType == "ACCOUNT" || docType == "TAX_EXEMPT_CERTIFICATE") {	
           
    const couchdbservername = "http://localhost"; 	
    const dbinstance = "mychannel_wholesaleclaims"; 	
	
	var peerCouch = { //peerCouch //docker inspect peer0.csgwc.verizon.com | grep couch
		"peer0.csgwc.verizon.com": "couchdb0",
		"peer1.csgwc.verizon.com": "couchdb1",
	};
	var couchPort = {  //couchPort  //docker inspect couchdb0 | grep HostPort
		"couchdb0": "5984",
		"couchdb1": "6984",
	};
	console.log(peerCouch[peer]);
var port = couchPort[peerCouch[peer]];
var docDesign = "_design/"+docType.toLowerCase().replace(/ /g,'')+"Count";	
var docView = docType.toLowerCase().replace(/ /g,'')+"CountView";	
const nano = require("nano")(couchdbservername+":"+port);	
var http = require("http");	
    
const mydbconnection = nano.db.use(dbinstance)	
    try {	
        let headers = await mydbconnection.get(docDesign);	
        let message =   await getRecordCount(docType,port,couchdbservername,dbinstance,docDesign,docView);	
        return message;	
    }	
    catch (error) {	
    if(error){  	
                try {	
                    let createDocResponse = await createDoc(docDesign,docType,docView,couchdbservername,port,dbinstance);	
                }	
                catch (error2) {	
                    let response = {	
                        "status": error2.statusCode,	
                        "message": error2.reason	
                    };	
                    return response;	
                }	
                try {	
                    let recordCountResponse = await getRecordCount(docType,port,couchdbservername,dbinstance,docDesign,docView);	
                    return recordCountResponse;	
                }	
                catch (error3) {	
                    let response = {	
                        "status": error3.statusCode,	
                        "message": error3.reason	
                    };	
                    return response;	
                }	
   }	
    }	
    }	
    else {	
        console.log("{ rows: [] }");	
        }	
}	
       
   
var  getRecordCount = async function getRecordCount(docType, port, url1,dbName,ddocName,viewName ) {	
            
        ddocName = docType.toLowerCase().replace(/ /g,'')+"Count";	
        var mydbconnection = require("nano")(url1+":"+port).use(dbName);	
        return new Promise((resolve, reject) => {	
            mydbconnection.view(ddocName, viewName, function (err, body, header) {	
                            if (err) {	
              	
                                      resolve({	
                                                "status": err.statusCode,	
                                                "message": err.reason	
                                      });	
                                     }	
                            else {	
                                    console.log(body);	
                                    if (!body) {	
                                        body = {};	
                                    }	
                                    if (!body.rows) {	
                                        body.rows = [];	
                                    }	
                                    if (body.rows.length == 0) {	
                                        body.rows.push({ "key":null, "value": 0 });	
                                    }	
                                    resolve(body);	
                                }	
                    });	
           });	
        
    }	
        
    var createDoc = async function createDoc(docDesign,docType,docView,couchdbservername,port,dbinstance) {	
    const Nano = require('nano')	
    const nano = Nano(couchdbservername+":"+port)	
    const db = nano.db.use(dbinstance)	
        
    const ddoc = {	
                    "_id": docDesign,	
                    "views": {},	
                    "language": "javascript"	
                 }	
        
    let viewName = docView;	
    ddoc.views[viewName] = {	
                                "reduce": "_sum",	
                                "map": "function(doc) {\n  if (doc.docType=='"+docType+"') {\n emit(doc.docType,1);\n  }\n}"	
                           }; 	
        
    return new Promise((resolve, reject) => {	
        db.insert(ddoc, function(err, body) {	
            if (err){	
                        console.log(err);                   	
                        resolve({	
                        "status": err.statusCode,	
                        "message": err.reason	
                        });	
                    }	
            else {	
                       
                        if (!body) {	
                            body = {};	
                        }	
                        if (!body.rows) {	
                            body.rows = [];	
                        }	
                        if (body.rows.length == 0) {	
                            body.rows.push({ "key":null, "value": 0 });	
                        }	
                        resolve(body);	
                }	
        });	
    });	
    }	
        
	
    exports.searchDoc = searchDoc;	
    exports.createDoc = createDoc;	
    exports.getRecordCount = getRecordCount;	

        
    