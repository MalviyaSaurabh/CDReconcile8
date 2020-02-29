import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss"]
})
export class SummaryComponent {
  submitEnabled: boolean = false;
  contracts = [
    {
      agreement_id: "A101",
      isp_name: "AIR",
      isd_code: "+91",
      isp_mapping: "A-B"
    },
    {
      agreement_id: "A201",
      isp_name: "A",
      isd_code: "+91",
      isp_mapping: "A-C"
    }
  ];
  agreements = [
    {
      ratingforLow: "0.25",
      agreement_id: "A101",
      origin_agreed: "Y",
      destination_agreed: "Y",
      ratingforHigh: "1",
      ratingforMedium: "0.5"
    },
    {
      ratingforLow: "0.35",
      agreement_id: "A201",
      origin_agreed: "Y",
      destination_agreed: "Y",
      ratingforHigh: "1.5",
      ratingforMedium: "0.75"
    }
  ];
  constructor() {}
  checkAgreement() {
    this.submitEnabled = !this.submitEnabled;
    console.log(this.submitEnabled);
  }
}
