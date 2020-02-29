import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  MatDialog,
  PageEvent,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { AddCdrComponent } from "./add-cdr/add-cdr.component";
import { ICDRData } from "src/app/dataModel/ICDRdata";
import { SelectionModel } from "@angular/cdk/collections";
import { CdrDataUploadService } from "src/app/services/cdr-data-upload.service";

const cdrDataModel: ICDRData[] = [
  {
    docType: "CDR",
    cdrId: "1001",
    originIsp: "A",
    destinationIsp: "B",
    sourceNumber: "+91900812345",
    destinationNumber: "+12401123",
    originCode: "IND",
    destinationCode: "USA",
    switchId: "ASW23",
    originationTime: "Tue, 21 Feb 2020 09:48:39 IST",
    terminationTime: "Tue, 21 Feb 2020 09:58:39 IST",
    timezoneUTC: "UTC",
    rating_level: "High",
    callDuration: "120000",
    callStatus: "Termination",
    callId: "A110"
  },
  {
    docType: "CDR",
    cdrId: "1002",
    originIsp: "A",
    destinationIsp: "B",
    sourceNumber: "+91900812345",
    destinationNumber: "+12401123",
    originCode: "IND",
    destinationCode: "USA",
    switchId: "ASW23",
    originationTime: "Tue, 22 Feb 2020 19:48:39 IST",
    terminationTime: "Tue, 22 Feb 2020 19:58:39 IST",
    timezoneUTC: "UTC",
    rating_level: "Low",
    callDuration: "1232",
    callStatus: "Short Termination",
    callId: "A111"
  },
  {
    docType: "CDR",
    cdrId: "1003",
    originIsp: "A",
    destinationIsp: "B",
    sourceNumber: "+91900812345",
    destinationNumber: "+12701298",
    originCode: "IND",
    destinationCode: "USA",
    switchId: "ASW12",
    originationTime: "Tue, 23 Feb 2020 21:48:39 IST",
    terminationTime: "Tue, 23 Feb 2020 23:58:39 IST",
    timezoneUTC: "UTC",
    rating_level: "Medium",
    callDuration: "10000",
    callStatus: "Termination",
    callId: "A112"
  },
  {
    docType: "CDR",
    cdrId: "1004",
    originIsp: "A",
    destinationIsp: "C",
    sourceNumber: "+91946272842",
    destinationNumber: "+618936219",
    originCode: "IND",
    destinationCode: "AUS",
    switchId: "ASW13",
    originationTime: "Tue, 24 Feb 2020 06:48:39 IST",
    terminationTime: "Tue, 24 Feb 2020 06:58:39 IST",
    timezoneUTC: "UTC",
    rating_level: "Medium",
    callDuration: "9200",
    callStatus: "Short Termination",
    callId: "A113"
  },
  {
    docType: "CDR",
    cdrId: "1005",
    originIsp: "A",
    destinationIsp: "C",
    sourceNumber: "+91946272842",
    destinationNumber: "+618936219",
    originCode: "IND",
    destinationCode: "AUS",
    switchId: "ASW14",
    originationTime: "Tue, 25 Feb 2020 09:48:39 IST",
    terminationTime: "Tue, 25 Feb 2020 19:58:39 IST",
    timezoneUTC: "UTC",
    rating_level: "High",
    callDuration: "13000",
    callStatus: "Termination",
    callId: "A114"
  }
];

@Component({
  selector: "app-cdr-list-details",
  templateUrl: "./cdr-list-details.component.html",
  styleUrls: ["./cdr-list-details.component.scss"]
})
export class CdrListDetailsComponent implements OnInit {
  constructor(
    public _dialog: MatDialog,
    private fileUploadService: CdrDataUploadService,
    private _router: Router
  ) {}

  private idColumn = "id";
  length = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [50, 100, 200];
  pageEvent: PageEvent;
  prevRoute: string;
  cdrData: ICDRData[];
  CDRDataSet: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    //this.CDRDataSet = this.fileUploadService.getcdrdetails("CDR");
    // this.fileUploadService.getToken();
    this.dataSource.data = this.cdrData;
    this.length = this.dataSource.data.length;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = [
    " callStatus",
    "callId",
    "cdrId",
    "originIsp",
    "destinationIsp",
    "sourceNumber",
    "destinationNumber",
    "originCode",
    "destinationCode",
    "switchId",
    "originationTime",
    "terminationTime",
    "timezoneUTC",
    "rating_level",
    "callDuration"
  ];
  displayNames: any = {
    cdrId: "CDR ID",
    callId: "Call ID",
    originIsp: "Original ISP",
    destinationIsp: "Destination ISP",
    sourceNumber: "Source Number",
    destinationNumber: "Destination Number",
    originCode: "Origin Code",
    destinationCode: "Destination Code",
    switchId: "Switch ID",
    callStatus: "Call Status",
    originationTime: "Origination Time",
    terminationTime: "Termination Time",
    timezoneUTC: "Timezone",
    rating_level: "Rating Level",
    callDuration: "Call Duration"
  };
  allDisplayedColumns: string[] = [
    // "action",
    " callStatus",
    "cdrId",
    "callId",
    "originIsp",
    "destinationIsp",
    "sourceNumber",
    "destinationNumber",
    "originCode",
    "destinationCode",
    "switchId",
    "originationTime",
    "terminationTime",
    "timezoneUTC",
    "rating_level",
    "callDuration"
  ];
  dataSource = new MatTableDataSource<ICDRData>();
  selection = new SelectionModel<ICDRData>(true, []);

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  addDialog(): void {
    const dialogRef = this._dialog.open(AddCdrComponent, {
      //width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
