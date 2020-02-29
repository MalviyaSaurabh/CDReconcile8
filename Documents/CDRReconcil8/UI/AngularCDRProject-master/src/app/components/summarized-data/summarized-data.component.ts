import { Component, OnInit, ViewChild } from "@angular/core";
import { ICDRData } from "src/app/dataModel/ICDRdata";
import {
  MatTableDataSource,
  MatDialog,
  PageEvent,
  MatPaginator,
  MatSort
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { ViewSummarizedDataComponent } from "./view-summarized-data/view-summarized-data.component";

const cdrData: ICDRData[] = [
  {
    callStatus: "Termination",
    cdrId: "201",
    originIsp: "A",
    destinationIsp: "C",
    sourceNumber: "+91946272842",
    destinationNumber: "+618936219",
    originCode: "IND",
    destinationCode: "AUS",
    switchId: "C231",
    originationTime: "Tue, 25 Feb 2020 16:18:41 KST",
    terminationTime: "Tue, 25 Feb 2020 16:28:31 KST",
    timezoneUTC: "12",
    rating_level: "High",
    callDuration: "13000"
  },
  {
    callStatus: "Termination",
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
    timezoneUTC: "5.5",
    rating_level: "High",
    callDuration: "120000"
  },
  {
    callStatus: "Short Termination",
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
    timezoneUTC: "5.5",
    rating_level: "Low",
    callDuration: "1232"
  },
  {
    callStatus: "Termination",
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
    timezoneUTC: "5.5",
    rating_level: "Medium",
    callDuration: "10000"
  },
  {
    callStatus: "Short Termination",
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
    timezoneUTC: "5.5",
    rating_level: "Medium",
    callDuration: "9200"
  },
  {
    callStatus: "Termination",
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
    timezoneUTC: "5.5",
    rating_level: "High",
    callDuration: "13000"
  },

  {
    callStatus: "Termination",
    cdrId: "351",
    originIsp: "A",
    destinationIsp: "B",
    sourceNumber: "+91900812345",
    destinationNumber: "+12401123",
    originCode: "IND",
    destinationCode: "USA",
    switchId: "B123",
    originationTime: "Tue, 20 Feb 2020 22:18:41 EST",
    terminationTime: "Tue, 20 Feb 2020 22:28:35 EST",
    timezoneUTC: "-6",
    rating_level: "Medium",
    callDuration: "110000"
  },
  {
    callStatus: "Termination",
    cdrId: "352",
    originIsp: "A",
    destinationIsp: "B",
    sourceNumber: "+91900812345",
    destinationNumber: "+12701298",
    originCode: "IND",
    destinationCode: "USA",
    switchId: "B453",
    originationTime: "Tue, 23 Feb 2020 10:18:40 EST",
    terminationTime: "Tue, 23 Feb 2020 10:28:37 EST",
    timezoneUTC: "-6",
    rating_level: "Low",
    callDuration: "9000"
  }
];

@Component({
  selector: "app-summarized-data",
  templateUrl: "./summarized-data.component.html",
  styleUrls: ["./summarized-data.component.scss"]
})
export class SummarizedDataComponent implements OnInit {
  constructor(
    public _dialog: MatDialog,

    private _router: Router
  ) {}

  private idColumn = "id";
  length = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;
  prevRoute: string;
  cdrData: ICDRData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.data = cdrData;
    this.length = this.dataSource.data.length;
    console.log(this.length);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = [
    "cdrId",
    "sourceNumber",
    "destinationNumber",
    "callDuration"
  ];
  displayNames: any = {
    cdrId: "CDR ID",
    sourceNumber: "Source Number",
    destinationNumber: "Destination Number",
    callDuration: "Call Duration"
  };
  allDisplayedColumns: string[] = [
    "action",

    "cdrId",
    "sourceNumber",
    "destinationNumber",
    "callDuration"
  ];
  dataSource = new MatTableDataSource<ICDRData>();
  selection = new SelectionModel<ICDRData>(true, []);

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  viewData(cdrData: ICDRData): void {
    const dialogRef2 = this._dialog.open(ViewSummarizedDataComponent, {
      width: "900px",
      height: "300px",
      data: {
        cdrData: cdrData
      }
    });
    dialogRef2.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
