import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-unified-data",
  templateUrl: "./view-unified-data.component.html",
  styleUrls: ["./view-unified-data.component.scss"]
})
export class ViewUnifiedDataComponent implements OnInit {
  unified_cdr_id?: string;
  cdr_origin_id?: string;
  originIsp?: string;
  destinationIsp?: string;
  originationTime_destination?: string;
  terminationTime_destination?: string;
  cdr_destination_id?: string;
  origin_number_origin?: string;
  destinationNumber_origin?: string;
  origin_number_destination?: string;
  destinationNumber_destination?: string;
  originationTime_origin?: string;
  terminationTime_origin?: string;
  callDuration_origin?: string;
  callDuration_destination?: string;
  reconciled_callStatus?: string;
  price?: string;
  proposed_resolution?: string;

  constructor(
    public dialogRef: MatDialogRef<ViewUnifiedDataComponent>,

    private _router: Router,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initComponent();
  }

  initComponent() {
    //console.log(this.data.cdrData);
    this.unified_cdr_id = this.data.cdrData.unified_cdr_id;
    this.cdr_origin_id = this.data.cdrData.cdr_origin_id;
    this.cdr_destination_id = this.data.cdrData.cdr_destination_id;
    this.originIsp = this.data.cdrData.originIsp;
    this.destinationIsp = this.data.cdrData.destinationIsp;
    this.origin_number_origin = this.data.cdrData.origin_number_origin;
    this.destinationNumber_origin = this.data.cdrData.destinationNumber_origin;
    this.origin_number_destination = this.data.cdrData.origin_number_destination;
    this.destinationNumber_destination = this.data.cdrData.destinationNumber_destination;
    this.originationTime_origin = this.data.cdrData.originationTime_origin;
    this.terminationTime_origin = this.data.cdrData.terminationTime_origin;
    this.callDuration_origin = this.data.cdrData.callDuration_origin;
    this.originationTime_destination = this.data.cdrData.originationTime_destination;
    this.terminationTime_destination = this.data.cdrData.terminationTime_destination;
    this.callDuration_destination = this.data.cdrData.callDuration_destination;
    this.reconciled_callStatus = this.data.cdrData.reconciled_callStatus;
    this.price = this.data.cdrData.price;
    this.proposed_resolution = this.data.cdrData.proposed_resolution;
  }
  cancel() {
    this.dialogRef.close();
  }
}
