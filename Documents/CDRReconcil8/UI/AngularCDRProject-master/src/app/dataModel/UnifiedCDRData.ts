export interface UnifiedCDRData {
  unified_cdr_id?: string;
  cdr_origin_id?: string;
  cdr_destination_id?: string;
  originIsp?: string;
  destinationIsp?: string;
  origin_number_origin?: string;
  destinationNumber_origin?: string;
  origin_number_destination?: string;
  destinationNumber_destination?: string;
  originationTime_origin?: string;
  terminationTime_origin?: string;
  callDuration_origin?: string;
  originationTime_destination?: string;
  terminationTime_destination?: string;
  callDuration_destination?: string;
  reconciled_callStatus?: string;
  price?: string;
  proposed_resolution?: string;
}
