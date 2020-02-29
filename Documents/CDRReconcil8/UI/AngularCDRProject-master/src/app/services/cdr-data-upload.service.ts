import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICDRData, ICDRDataResponse } from "../dataModel/ICDRdata";

@Injectable({
  providedIn: "root"
})
export class CdrDataUploadService {
  constructor(private _http: HttpClient) {}

  getToken() {
    let headers = new HttpHeaders();

    headers.append("Content-Type", "application/json");
    return this._http
      .post<any>("http://104.154.161.228:4000/api/login", null, {
        headers: headers
      })
      .pipe(
        map(data => {
          console.log(data);
          return true;
        })
      );
  }

  postFile(myCDR: File): Observable<boolean> {
    const endpoint = "http://104.154.161.228:4000/uploadCDR";
    const formData: FormData = new FormData();
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    formData.append("fileKey", myCDR, myCDR.name);

    return this._http.post(endpoint, formData, { headers: headers }).pipe(
      map(data => {
        console.log(data);
        return true;
      })
    );
  }
  getcdrdetails(operator: string): Observable<ICDRData[]> {
    const endpoint = "http://104.154.161.228:4000/";
    let authString = btoa("Org1" + ":" + "PartnerA");
    let headers = new HttpHeaders();

    headers = headers.append("Authorization", "Basic " + authString);
    //headers.append("Content-Type", "application/json");
    return this._http
      .get(endpoint, { headers: headers })
      .pipe(map((response: ICDRDataResponse) => response.data));
  }
}
