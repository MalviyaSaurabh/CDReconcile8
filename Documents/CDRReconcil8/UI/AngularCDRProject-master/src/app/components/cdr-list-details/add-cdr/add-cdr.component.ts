import { Component, OnInit } from "@angular/core";
import { CdrDataUploadService } from "src/app/services/cdr-data-upload.service";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-add-cdr",
  templateUrl: "./add-cdr.component.html",
  styleUrls: ["./add-cdr.component.scss"]
})
export class AddCdrComponent implements OnInit {
  fileToUpload: File = null;
  file: File;
  disabled: boolean;

  constructor(
    private dialogRef: MatDialogRef<AddCdrComponent>,
    private fileUploadService: CdrDataUploadService
  ) {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.fileUploadService.postFile(this.file).subscribe(
      data => {
        // do something, if upload success
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
