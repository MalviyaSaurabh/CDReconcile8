package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

var logger = shim.NewLogger("cdr_upload")

type CdrDetails_A struct {
	CallID            string `json:"callId"`
	CallStatus        string `json:"callStatus"`
	CdrID             string `json:"cdrId"`
	OriginISP         string `json:"originIsp"`
	DestinationIsp    string `json:"destinationIsp"`
	SourceNumber      string `json:"sourceNumber"`
	DestinationNumber string `json:"destinationNumber"`
	OriginCode        string `json:"originCode"`
	DestinationCode   string `json:"destinationCode"`
	SwitchId          string `json:"switchId"`
	OriginationTime   string `json:"originationTime"`
	TerminationTime   string `json:"terminationTime"`
	TimezoneUTC       string `json:"timezoneUTC"`
	CallDuration      string `json:"callDuration"`
	DocType           string `json:"docType"`
}
type CdrDetails_B struct {
	CallID            string `json:"callId"`
	CallStatus        string `json:"callStatus"`
	CdrID             string `json:"cdrId"`
	OriginISP         string `json:"originIsp"`
	DestinationIsp    string `json:"destinationIsp"`
	SourceNumber      string `json:"sourceNumber"`
	DestinationNumber string `json:"destinationNumber"`
	OriginCode        string `json:"originCode"`
	DestinationCode   string `json:"destinationCode"`
	SwitchId          string `json:"switchId"`
	OriginationTime   string `json:"originationTime"`
	TerminationTime   string `json:"terminationTime"`
	TimezoneUTC       string `json:"timezoneUTC"`
	CallDuration      string `json:"callDuration"`
	DocType           string `json:"docType"`
}
type Contracts struct {
	ContractId  string `json:"contractId"`
	IspName     string `json:"ispName"`
	IsdCode     string `json:"isdCode"`
	IspMapping  string `json:"ispMapping"`
	AgreementId string `json:"agreementId"`
	DocType     string `json:"docType"`
}

type Agreement struct {
	AgreementId       string `json:"agreementId"`
	OriginAgreed      string `json:"originAgreed"`
	DestinationAgreed string `json:"destinationAgreed"`
	RatingCurrency    string `json:"ratingCurrency"`
	RatingforHigh     string `json:"ratingforHigh"`
	RatingforMedium   string `json:"ratingforMedium"`
	RatingforLow      string `json:"ratingforLow"`
	DocType           string `json:"docType"`
}

type UnifiedCDR struct {
	UnifiedcdrId                 string `json:"unifiedcdrId"`
	CallIdOrigin                 string `json:"callIdOrigin"`
	CallIdDestination            string `json:"callIdDestination"`
	CdrIdOrigin                  string `json:"cdrIdOrigin"`
	CdrIdDestination             string `json:"cdrIdDestination"`
	OriginIspOrigin              string `json:"originIspOrigin"`
	OriginIspDestination         string `json:"originIspDestination"`
	DestinationIspOrigin         string `json:"destinationIspOrigin"`
	DestinationIspDestination    string `json:"destinationIspDestination"`
	SourceNumberOrigin           string `json:"sourceNumberOrigin"`
	SourceNumberDestination      string `json:"sourceNumberDestination"`
	DestinationNumberOrigin      string `json:"destinationNumberOrigin"`
	DestinationNumberDestination string `json:"destinationNumberDestination"`
	SwitchIdOrigin               string `json:"switchIdOrigin"`
	SwitchIdDestination          string `json:"switchIdDestination"`
	OriginationTimeOrigin        string `json:"originationTimeOrigin"`
	OriginationTimeDestination   string `json:"originationTimeDestination"`
	TerminationTimeOrigin        string `json:"terminationTimeOrigin"`
	TerminationTimeDestination   string `json:"terminationTimeDestination"`
	CallDurationOrigin           string `json:"callDurationOrigin"`
	CallDurationDestination      string `json:"callDurationDestination"`
	Price                        string `json:"price"`
	ProsposedSolution            string `json:"prosposedSolution"`
	ReconciledFlag               string `json:"reconciledFlag"`
	DocType                      string `json:"docType"`
}

type generateUCDR struct {
	CallID string `json:"callId"`
}

// addCdr - creates a record of the Asset, store into chaincode state
// =====================================================================

func (s *SmartContract) addCdr_A(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	//logger.Info(" Arguments for saveCdr : %s", args)
	logger.Info("Lenghth of Arguments for saveCdr : %s", len(args))

	if len(args) < 13 {
		return getErrorResponse("Incorrect number of arguments specified. Expecting 14")
	}

	var cdrDetails_A = &CdrDetails_A{args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], "CDR_A"}

	// originationTime := time.Now()
	// originationTime, err := time.Parse("01/02/2006", args[10])
	// if err != nil {
	// 	fmt.Println("Error parsing date %s", err)
	// } else {
	// 	cdrDetails.OriginationTime = originationTime.Format("2006-01-02T15:04:05.000Z")
	// }

	// terminationTime := time.Now()
	// terminationTime, err = time.Parse("01/02/2006", args[11])
	// if err != nil {
	// 	fmt.Println("Error parsing date %s", err)
	// } else {
	// 	cdrDetails.TerminationTime = terminationTime.Format("2006-01-02T15:04:05.000Z")
	// }

	// queryString := fmt.Sprintf("{\"selector\":{\"docType\":\"%s\",\"taxState\":\"%s\",\"effectDate\":\"%s\",\"expDate\":\"%s\",\"certExempType\":\"%s\",\"doc.docData\":\"%s\"}}", "TAX FORM", taxExemptionDoc.TaxState, taxExemptionDoc.EffectDate, taxExemptionDoc.ExpDate, taxExemptionDoc.CertificateExempType, taxExemptionDoc.Document.DocData)

	// queryResults, err := getQueryResultForQueryString(APIstub, queryString)

	// if err != nil {
	// 	return getErrorResponse("Failed to query Document " + err.Error())
	// }
	// var jsonqryres []TaxExemptionDoc
	// err = jsonToObject([]byte(queryResults), &jsonqryres)
	// if err != nil {
	// 	return getErrorResponse("Failed to convert arguments to a TaxExemption object")
	// }

	// if len(jsonqryres) != 0 {
	// 	for i := range jsonqryres {
	// 		return getErrorResponse(fmt.Sprintf("Tax Document  ID %s  already exists for   State %s , Effective Date %s , Expiry Date %s and CertificateExempType %s", jsonqryres[i].TaxDocId, taxExemptionDoc.TaxState, taxExemptionDoc.EffectDate, taxExemptionDoc.ExpDate, taxExemptionDoc.CertificateExempType))
	// 	}
	// }

	//taxExemptionDoc.DocStatus = "INITIAL"

	CdrDetails_ABytes, err := objectToJSON(cdrDetails_A)

	err = APIstub.PutState(cdrDetails_A.CallID, CdrDetails_ABytes)
	if err != nil {
		return getErrorResponse("Unable to create CDR Item")
	}

	return getSuccessResponse("CDRuploaded successfully For Partner A")

}

func (s *SmartContract) saveCdr_A(APIstub shim.ChaincodeStubInterface, cdra CdrDetails_A) (sc.Response, error) {
	fmt.Println("API::addCDR::start")
	//err := captureFilterFieldsForAccount(APIstub, account)
	cdra.DocType = "CDR_A"
	CdrDetails_ABytes, err := objectToJSON(cdra)

	err = APIstub.PutState(cdra.CallID, CdrDetails_ABytes)
	if err != nil {
		return getErrorResponse(fmt.Sprintf("Unable to update CDR ID %s", cdra.CallID)), nil
	}
	return getSuccessResponse(fmt.Sprintf("CDR  ID %s uploaded successfully for Partner A ", cdra.CallID)), nil
}

func (s *SmartContract) saveCdr_B(APIstub shim.ChaincodeStubInterface, cdrb CdrDetails_B) (sc.Response, error) {
	fmt.Println("API::addCDR::start")
	//err := captureFilterFieldsForAccount(APIstub, account)
	cdrb.DocType = "CDR_B"
	CdrDetails_BBytes, err := objectToJSON(cdrb)

	err = APIstub.PutState(cdrb.CallID, CdrDetails_BBytes)
	if err != nil {
		return getErrorResponse(fmt.Sprintf("Unable to update CDR ID %s", cdrb.CallID)), nil
	}
	return getSuccessResponse(fmt.Sprintf("CDR  ID %s uploaded successfully for Partner B ", cdrb.CallID)), nil
}

// addContract - creates a record of Contract Asset, store into chaincode state
// =====================================================================

func (s *SmartContract) addContract(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	//logger.Info(" Arguments for addContract : %s", args)
	logger.Info("Lenghth of Arguments for addContract : %s", len(args))

	if len(args) < 4 {
		return getErrorResponse("Incorrect number of arguments specified. Expecting 5")
	}

	var contracts = &Contracts{args[0], args[1], args[2], args[3], args[4], "CONTRACT"}

	ContractsBytes, err := objectToJSON(contracts)

	err = APIstub.PutState(contracts.ContractId, ContractsBytes)
	if err != nil {
		return getErrorResponse("Unable to create Contact Item")
	}

	return getSuccessResponse("Contract  uploaded successfully")

}

// addContract  - creates a record of Contract Asset, store into chaincode state

func (s *SmartContract) addAgreement(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	//logger.Info(" Arguments for saveCdr : %s", args)
	logger.Info("Lenghth of Arguments for saveCdr : %s", len(args))

	if len(args) < 6 {
		return getErrorResponse("Incorrect number of arguments specified. Expecting 7")
	}

	var agreement = &Agreement{args[0], args[1], args[2], args[3], args[4], args[5], args[6], "AGREEMENT"}

	AgreementBytes, err := objectToJSON(agreement)

	err = APIstub.PutState(agreement.AgreementId, AgreementBytes)
	if err != nil {
		return getErrorResponse("Unable to create Agreement Item")
	}

	return getSuccessResponse("Agreement  uploaded successfully")

}

// Get Documents based on  ad-hoc Rich query
// ===========================================================================================

func (s *SmartContract) queryCdrs(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	//   0
	// "queryString"
	logger.Info("Arguments for queryCdrs: %s", args[0])
	logger.Info("length of saveImage Arguments : %s", len(args))

	if len(args) != 1 {
		return getErrorResponse("Incorrect number of arguments specified. Expecting 1")
	}

	queryString := args[0]

	queryResults, err := getQueryResultForQueryString(APIstub, queryString)
	if err != nil {
		return getErrorResponse("Failed to query if Document Item exists")
	}

	return shim.Success(queryResults)
}

//***************************************
func (s *SmartContract) createUnifiedCDR(APIstub shim.ChaincodeStubInterface, CallID string) (sc.Response, error) {

	var ucdr UnifiedCDR
	queryString := fmt.Sprintf("{\"selector\":{\"docType\":\"%s\",\"callId\":\"%s\"}}", "CDR_A", CallID)
	queryResults, err := getQueryResultForQueryString(APIstub, queryString)
	var jsonqryres []CdrDetails_A
	if err := json.Unmarshal([]byte(queryResults), &jsonqryres); err != nil {
		fmt.Println("error unmarshal in CDR data", err)
		return getErrorResponse("Unable to create CDR Item"), nil
	}
	cdra := jsonqryres[0]
	ucdr.CallIdOrigin = cdra.CallID
	ucdr.CdrIdOrigin = cdra.CdrID
	ucdr.OriginIspOrigin = cdra.OriginISP
	ucdr.DestinationIspOrigin = cdra.DestinationIsp
	ucdr.SourceNumberOrigin = cdra.SourceNumber
	ucdr.DestinationNumberOrigin = cdra.DestinationCode
	ucdr.SwitchIdOrigin = cdra.SwitchId
	ucdr.OriginationTimeOrigin = cdra.OriginationTime
	ucdr.TerminationTimeOrigin = cdra.TerminationTime
	ucdr.CallDurationOrigin = cdra.CallDuration

	//err := captureFilterFieldsForClaim(APIstub, claim)

	queryString = fmt.Sprintf("{\"selector\":{\"docType\":\"%s\",\"callId\":\"%s\"}}", "CDR_B", CallID)
	queryResults, err = getQueryResultForQueryString(APIstub, queryString)
	var jsonqryres1 []CdrDetails_B
	if err := json.Unmarshal([]byte(queryResults), &jsonqryres); err != nil {
		fmt.Println("error unmarshal in CDR data", err)
		return getErrorResponse("Unable to create CDR Item"), nil
	}
	cdrb := jsonqryres1[0]
	ucdr.CallIdDestination = cdrb.CallID
	ucdr.CdrIdDestination = cdrb.CdrID
	ucdr.OriginIspDestination = cdrb.OriginISP
	ucdr.DestinationIspDestination = cdrb.DestinationIsp
	ucdr.SourceNumberDestination = cdrb.SourceNumber
	ucdr.DestinationNumberDestination = cdrb.DestinationCode
	ucdr.SwitchIdDestination = cdrb.SwitchId
	ucdr.OriginationTimeDestination = cdrb.OriginationTime
	ucdr.TerminationTimeDestination = cdrb.TerminationTime
	ucdr.CallDurationDestination = cdrb.CallDuration

	ucdr.DocType = "UNICDR"
	// var ucdr = &UnifiedCDR{cdra.CallID,cdrb.CallID,cdra.CdrID,cdrb.CdrID,cdra.OriginISP,cdrb.OriginISP,cdra.DestinationIsp,cdrb.DestinationIsp,cdra.SourceNumber,
	// 	cdrb.SourceNumber,cdra.DestinationCode,cdra.SwitchId,cdrb.SwitchId}
	ucdrJSONasBytes, err := json.Marshal(ucdr)
	if err != nil {
		fmt.Println("Error marshalling UCDR %s", err)
		return getErrorResponse("Unable to marshal UCDR Item"), nil
	}
	fmt.Println("Adding marshalled UCDR Json into Ledger..")
	// === Save UCDR to state ===
	err = APIstub.PutState(ucdr.UnifiedcdrId, ucdrJSONasBytes)
	if err != nil {
		fmt.Println("Error adding UCDR %s", err)
		return getErrorResponse("Unable to create UCDR Item"), nil
	}
	fmt.Println("updated  UCDR..", ucdr.UnifiedcdrId)

	return getSuccessResponse("UCDR   Created  successfully"), nil

}

///******************************************************************
func (s *SmartContract) batchUnifiedCDR(APIstub shim.ChaincodeStubInterface, gucdr generateUCDR) (sc.Response, error) {
	if _, err := s.createUnifiedCDR(APIstub, gucdr.CallID); err != nil {
		return getErrorResponse("Unable to Generatecreate UCDR Item"), nil
	}
	return getSuccessResponse("UCDR   generated   successfully"), nil
}

// Response -  Object to store Response Status and Message
// =======================================================
type Response struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

// getSuccessResponse - Create Success Response and return back to the calling application
// =======================================================================================
func getSuccessResponse(message string) sc.Response {
	objResponse := Response{Status: "200", Message: message}
	logger.Info("getSuccessResponse: Called For: ", objResponse)
	response, err := json.Marshal(objResponse)
	if err != nil {
		logger.Errorf(fmt.Sprintf("Invalid function %s", err))
	}
	return shim.Success(response)
}

// getErrorResponse - Create Error Response and return back to the calling application
// ===================================================================================
func getErrorResponse(message string) sc.Response {
	objResponse := Response{Status: "500", Message: message}
	logger.Info("getErrorResponse: Called For: ", objResponse)
	response, err := json.Marshal(objResponse)
	if err != nil {
		logger.Errorf(fmt.Sprintf("Invalid function %s", err))
	}
	return shim.Success(response)
}

///////// Utility Methods /////////

// jsonToObject (Serialize) : Unmarshalls a JSON into an object
// ============================================================
func jsonToObject(data []byte, object interface{}) error {
	if err := json.Unmarshal([]byte(data), object); err != nil {
		logger.Errorf("Unmarshal failed : %s ", err.Error()) //SCOMCONV004E
		return err
	}
	return nil
}

// objectToJSON (Deserialize) :  Marshalls an object into a JSON
// =============================================================
func objectToJSON(object interface{}) ([]byte, error) {
	var byteArray []byte
	var err error

	if byteArray, err = json.Marshal(object); err != nil {
		logger.Errorf("Marshal failed : %s ", err.Error())
		return nil, err
	}

	if len(byteArray) == 0 {
		return nil, fmt.Errorf(("failed to convert object"))
	}
	return byteArray, nil
}
