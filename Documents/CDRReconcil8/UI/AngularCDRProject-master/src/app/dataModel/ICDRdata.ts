import { ICommonHttpSuccessResponse } from "./i-common-http";

export interface ICDRData {
  docType?: string;
  callStatus?: string;
  cdrId?: string;
  originIsp?: string;
  destinationIsp?: string;
  sourceNumber?: string;
  destinationNumber?: string;
  originCode?: string;
  destinationCode?: string;
  switchId?: string;
  originationTime?: string;
  terminationTime?: string;
  timezoneUTC?: string;
  rating_level?: string;
  callDuration?: string;
  callId?: string;
}

export interface ICDRDataResponse
  extends ICommonHttpSuccessResponse<ICDRData[]> {}
