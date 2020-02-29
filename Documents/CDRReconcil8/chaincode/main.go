package main

/* Imports

 */

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

/*
 * The Init method is called when the Smart Contract "cdrReconcilation" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "cdrReconcilation"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {
	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	//fmt.Printf("args : %s", args)
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "addCdr_A" {
		return s.addCdr_A(APIstub, args)
	} else if function == "addContract" {
		return s.addContract(APIstub, args)
	} else if function == "addAgreement" {
		return s.addAgreement(APIstub, args)
	} else if function == "queryCdrs" {
		return s.queryCdrs(APIstub, args)
	} else if function == "saveRecordsInBatch" {
		return s.saveRecordsInBatch(APIstub, args)
	} else if function == "queryRecordsWithPagination" {
		return s.queryRecordsWithPagination(APIstub, args)
	} else if function == "getRecordsByRangeWithPagination" {
		return s.getRecordsByRangeWithPagination(APIstub, args)
	}

	fmt.Printf("function name : %s", function)
	return shim.Error("Invalid Smart Contract function name...")
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {

	return shim.Success(nil)
}

//====================================================================================================== Query Methods ====================================================================
// =========================================================================================
// getQueryResultForQueryString executes the passed in query string.
// Result set is built and returned as a byte array containing the JSON results.
// =========================================================================================
func getQueryResultForQueryString(stub shim.ChaincodeStubInterface, queryString string) ([]byte, error) {
	fmt.Printf("- getQueryResultForQueryString queryString:\n%s\n", queryString)
	resultsIterator, err := stub.GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()
	// buffer is a JSON array containing QueryRecords
	var buffer bytes.Buffer
	buffer.WriteString("[")
	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")
	//fmt.Printf("- getQueryResultForQueryString queryResult:\n%s\n", buffer.String())
	return buffer.Bytes(), nil
}

//==================Pagination with Ad hoc Rich Query ========================================================
//
//============================================================================================

func (s *SmartContract) queryRecordsWithPagination(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	//   0
	// "queryString"
	if len(args) < 3 {
		return shim.Error("Incorrect number of arguments. Expecting 3")
	}

	queryString := args[0]
	//return type of ParseInt is int64
	pageSize, err := strconv.ParseInt(args[1], 10, 32)
	if err != nil {
		return shim.Error(err.Error())
	}
	bookmark := args[2]

	queryResults, err := getQueryResultForQueryStringWithPagination(APIstub, queryString, int32(pageSize), bookmark)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(queryResults)
}

// =========================================================================================
// getQueryResultForQueryStringWithPagination executes the passed in query string with
// pagination info. Result set is built and returned as a byte array containing the JSON results.
// =========================================================================================

func getQueryResultForQueryStringWithPagination(APIstub shim.ChaincodeStubInterface, queryString string, pageSize int32, bookmark string) ([]byte, error) {

	fmt.Printf("- getQueryResultForQueryString queryString:\n%s\n", queryString)

	resultsIterator, responseMetadata, err := APIstub.GetQueryResultWithPagination(queryString, pageSize, bookmark)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	buffer, err := constructQueryResponseFromIterator(resultsIterator)
	if err != nil {
		return nil, err
	}

	bufferWithPaginationInfo := addPaginationMetadataToQueryResults(buffer, responseMetadata)

	fmt.Printf("- getQueryResultForQueryString queryResult:\n%s\n", bufferWithPaginationInfo.String())

	return buffer.Bytes(), nil
}

// ======  Pagination with Range Query ===============================================
// getRecordsByRangeWithPagination performs a range query based on the start & end key,
// page size and a bookmark.
//============================================================================

func (s *SmartContract) getRecordsByRangeWithPagination(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) < 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	startKey := args[0]
	endKey := args[1]
	//return type of ParseInt is int64
	pageSize, err := strconv.ParseInt(args[2], 10, 32)
	if err != nil {
		return shim.Error(err.Error())
	}
	bookmark := args[3]

	resultsIterator, responseMetadata, err := APIstub.GetStateByRangeWithPagination(startKey, endKey, int32(pageSize), bookmark)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	buffer, err := constructQueryResponseFromIterator(resultsIterator)
	if err != nil {
		return shim.Error(err.Error())
	}

	bufferWithPaginationInfo := addPaginationMetadataToQueryResults(buffer, responseMetadata)

	fmt.Printf("- getMarblesByRange queryResult:\n%s\n", bufferWithPaginationInfo.String())

	return shim.Success(buffer.Bytes())
}

// ===========================================================================================
// addPaginationMetadataToQueryResults adds QueryResponseMetadata, which contains pagination
// info, to the constructed query results
// ===========================================================================================
func addPaginationMetadataToQueryResults(buffer *bytes.Buffer, responseMetadata *sc.QueryResponseMetadata) *bytes.Buffer {

	buffer.WriteString("\"ResponseMetadata\":{\"RecordsCount\":")
	buffer.WriteString("\"")
	buffer.WriteString(fmt.Sprintf("%v", responseMetadata.FetchedRecordsCount))
	buffer.WriteString("\"")
	buffer.WriteString(", \"Bookmark\":")
	buffer.WriteString("\"")
	buffer.WriteString(responseMetadata.Bookmark)
	buffer.WriteString("\"}}")

	return buffer
}

// ===========================================================================================
// constructQueryResponseFromIterator constructs a JSON array containing query results from
// a given result iterator
// ===========================================================================================
func constructQueryResponseFromIterator(resultsIterator shim.StateQueryIteratorInterface) (*bytes.Buffer, error) {
	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("{\"Response\":")
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		//buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("],")

	return &buffer, nil
}

//============================================================================Bulk Upload =======================================================================================================
type BulkUploadResponse struct {
	AssetID string `json:"assetID"`
	Status  string `json:"status"`
	Message string `json:"message"`
}

func (s *SmartContract) saveRecordsInBatch(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	fmt.Println("API::saveRecordsInBatch::start")
	var respList []BulkUploadResponse
	if args[0] == "CDR_A" {
		var cdraList []CdrDetails_A
		if err := json.Unmarshal([]byte(args[1]), &cdraList); err != nil {
			fmt.Println("Error Marshall Accounts Asset List %s", err)
			return getErrorResponse("Unable to Marshall Accounts Asset List")
		}
		if len(cdraList) > 0 {
			for index := 0; index < len(cdraList); index++ {
				if _, err := s.saveCdr_A(APIstub, cdraList[index]); err != nil {
					fmt.Println("Unable to save CDR for Call ID", cdraList[index].CallID)
					var Resp BulkUploadResponse
					Resp.AssetID = cdraList[index].CallID
					Resp.Status = "500"
					Resp.Message = fmt.Sprintf("Failed : %s", err.Error())
					respList = append(respList, Resp)
				} else {
					var Resp BulkUploadResponse
					Resp.AssetID = cdraList[index].CallID
					Resp.Status = "200"
					Resp.Message = "SUCCESS"
					respList = append(respList, Resp)
				}
			}
		} else {
			return getErrorResponse("Empty ")
		}
	}
	if args[0] == "CDR_B" {
		var cdrbList []CdrDetails_B
		if err := json.Unmarshal([]byte(args[1]), &cdrbList); err != nil {
			fmt.Println("Error Marshall Accounts Asset List %s", err)
			return getErrorResponse("Unable to Marshall Accounts Asset List")
		}
		if len(cdrbList) > 0 {
			for index := 0; index < len(cdrbList); index++ {
				if _, err := s.saveCdr_B(APIstub, cdrbList[index]); err != nil {
					fmt.Println("Unable to save CDR for Call ID", cdrbList[index].CallID)
					var Resp BulkUploadResponse
					Resp.AssetID = cdrbList[index].CallID
					Resp.Status = "500"
					Resp.Message = fmt.Sprintf("Failed : %s", err.Error())
					respList = append(respList, Resp)
				} else {
					var Resp BulkUploadResponse
					Resp.AssetID = cdrbList[index].CallID
					Resp.Status = "200"
					Resp.Message = "SUCCESS"
					respList = append(respList, Resp)
				}
			}
		} else {
			return getErrorResponse("Empty ")
		}
	}
	if args[0] == "UCDR" {
		var generateUCDRList []generateUCDR
		if err := json.Unmarshal([]byte(args[1]), &generateUCDRList); err != nil {
			fmt.Println("Error Marshall Accounts Asset List %s", err)
			return getErrorResponse("Unable to Marshall Accounts Asset List")
		}
		if len(generateUCDRList) > 0 {
			for index := 0; index < len(generateUCDRList); index++ {
				if _, err := s.batchUnifiedCDR(APIstub, generateUCDRList[index]); err != nil {
					fmt.Println("Unable to save CDR for Call ID", generateUCDRList[index].CallID)
					var Resp BulkUploadResponse
					Resp.AssetID = generateUCDRList[index].CallID
					Resp.Status = "500"
					Resp.Message = fmt.Sprintf("Failed : %s", err.Error())
					respList = append(respList, Resp)
				} else {
					var Resp BulkUploadResponse
					Resp.AssetID = generateUCDRList[index].CallID
					Resp.Status = "200"
					Resp.Message = "SUCCESS"
					respList = append(respList, Resp)
				}
			}
		} else {
			return getErrorResponse("Empty ")
		}
	}
	fmt.Println("Converting the response object")
	finalResp, err := json.Marshal(respList)
	if err != nil {
		fmt.Println(fmt.Sprintf("cannot convert response object", err))
	}
	fmt.Println("Convertion done")
	fmt.Printf("final response %v", respList)
	fmt.Println("API::saveRecordsInBatch::End")
	return shim.Success(finalResp)
}

func main() {
	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
