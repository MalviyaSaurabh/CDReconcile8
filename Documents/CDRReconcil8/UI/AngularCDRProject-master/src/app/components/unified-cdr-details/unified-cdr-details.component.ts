import { Component, OnInit, ViewChild } from "@angular/core";
import { UnifiedCDRData } from "src/app/dataModel/UnifiedCDRData";
import {
  MatTableDataSource,
  MatDialog,
  PageEvent,
  MatPaginator,
  MatSort
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { ViewUnifiedDataComponent } from "./view-unified-data/view-unified-data.component";
import { Router } from "@angular/router";

const unifiedCDR = [
  {
    unified_cdr_id: "4",
    cdr_origin_id: "1005",
    originIsp: "A",
    destinationIsp: "C",
    origin_number_origin: " +91946272842",
    destinationNumber_origin: " +618936219",
    origin_number_destination: " +91946272842",
    destinationNumber_destination: " +618936219",
    originationTime_origin: "Tue, 25 Feb 2020 09:48:39 IST",
    terminationTime_origin: "Tue, 25 Feb 2020 19:58:39 IST",
    callDuration_origin: "21121",
    originationTime_destination: "Tue, 25 Feb 2020 09:48:39 IST",
    terminationTime_destination: "Tue, 25 Feb 2020 19:58:39 IST",
    callDuration_destination: "21121",
    reconciled_callStatus: "Termination",
    price: " 13000",
    proposed_resolution: "Write off from A"
  }
];

@Component({
  selector: "app-unified-cdr-details",
  templateUrl: "./unified-cdr-details.component.html",
  styleUrls: ["./unified-cdr-details.component.scss"]
})
export class UnifiedCdrDetailsComponent implements OnInit {
  constructor(public _dialog: MatDialog, private _router: Router) {}

  private idColumn = "id";
  length = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [50, 100, 200];
  pageEvent: PageEvent;
  prevRoute: string;
  unifiedCDR: UnifiedCDRData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.data = unifiedCDR;
    this.length = this.dataSource.data.length;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = [
    "unified_cdr_id",
    "cdr_origin_id",
    "cdr_destination_id",
    "originIsp",
    "destinationIsp",
    "origin_number_origin",
    "destinationNumber_origin",
    "origin_number_destination",
    "destinationNumber_destination",
    "originationTime_origin",
    "terminationTime_origin",
    "callDuration_origin",
    "originationTime_destination",
    "terminationTime_destination",
    "callDuration_destination",
    "reconciled_callStatus",
    "price",
    "proposed_resolution"
  ];
  displayNames: any = {
    unified_cdr_id: "Unified Cdr Id",
    cdr_origin_id: "CDR Origin ID",
    cdr_destination_id: "CDR Destination ID",
    originIsp: "Origin ISP",
    destinationIsp: "Destination ISP",
    origin_number_origin: "Origin Number Origin",
    destinationNumber_origin: "Destination Number Origin",
    origin_number_destination: "Origin Number Destination",
    destinationNumber_destination: "Destination Number Destination",
    originationTime_origin: "Origination Time Origin",
    terminationTime_origin: "Termination Time Origin",
    callDuration_origin: "Call Duration Origin",
    originationTime_destination: "Origination Time Destination",
    terminationTime_destination: "Termination Time Destination",
    callDuration_destination: "Call Duration Destination",
    reconciled_callStatus: "Reconciled Call Status",
    price: "Price",
    proposed_resolution: "Proposed Resolution"
  };
  allDisplayedColumns: string[] = [
    "action",
    "unified_cdr_id",
    "cdr_origin_id",
    "cdr_destination_id",
    "originIsp",
    "destinationIsp",
    "origin_number_origin",
    "destinationNumber_origin",
    "origin_number_destination",
    "destinationNumber_destination",
    "originationTime_origin",
    "terminationTime_origin",
    "callDuration_origin",
    "originationTime_destination",
    "terminationTime_destination",
    "callDuration_destination",
    "reconciled_callStatus",
    "price",
    "proposed_resolution"
  ];
  dataSource = new MatTableDataSource<UnifiedCDRData>();
  selection = new SelectionModel<UnifiedCDRData>(true, []);

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  viewData(element): void {
    const dialogRef = this._dialog.open(ViewUnifiedDataComponent, {
      width: "500px",
      data: {
        cdrData: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
