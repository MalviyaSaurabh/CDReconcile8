import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-summarized-data",
  templateUrl: "./view-summarized-data.component.html",
  styleUrls: ["./view-summarized-data.component.scss"]
})
export class ViewSummarizedDataComponent implements OnInit {
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

  constructor(
    public dialogRef: MatDialogRef<ViewSummarizedDataComponent>,

    private _router: Router,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initComponent();
  }

  initComponent() {
    console.log(this.data.cdrData);
    this.callStatus = this.data.cdrData.callStatus;
    this.cdrId = this.data.cdrData.cdrId;
    this.originCode = this.data.cdrData.originCode;
    this.originIsp = this.data.cdrData.originIsp;
    this.destinationIsp = this.data.cdrData.destinationIsp;
    this.destinationCode = this.data.cdrData.destinationCode;
    this.switchId = this.data.cdrData.switchId;
    this.originationTime = this.data.cdrData.originationTime;
    this.terminationTime = this.data.cdrData.terminationTime;
    this.timezoneUTC = this.data.cdrData.timezoneUTC;
    this.rating_level = this.data.cdrData.rating_level;
    this.callDuration = this.data.cdrData.callDuration;
    this.sourceNumber = this.data.cdrData.sourceNumber;
    this.destinationNumber = this.data.cdrData.destinationNumber;
  }
  cancel() {
    this.dialogRef.close();
  }
}
