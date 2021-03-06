var querySelector = async function(peer,request,tag) {
    const PropertiesReader = require('properties-reader');
    const properties = PropertiesReader('./app/app.properties');
    const couchdbservername = properties.get('couchdb.host');
    const dbinstance = properties.get('couchdb.database');
    const port = properties.get('couchdb.port');
    const nano = require("nano")(couchdbservername+":"+port);
    var http = require("http");
    const mydbconnection = nano.db.use(dbinstance)  
      
        try{
                  return new Promise((resolve, reject) => {     
                                                
                           mydbconnection.find(request, function (err, body, header) {    
                            var result = {};
                                        if (err) {           
                                                  resolve({   
                                                            "status": err.statusCode,         
                                                            "message": err.reason             
                                                  })
                                                  //console.log(err)
                                                 }     
                                        else {      
                                                
                                                if (!body) {   
                                                    body = {}; 
                                                }      
                                                if (!body.rows) {       
                                                    body.rows = [];     
                                                }      
                                                if(body){
                                                   result[tag]=body.docs.length;
                                                }
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
        
    };

    exports.querySelector = querySelector;