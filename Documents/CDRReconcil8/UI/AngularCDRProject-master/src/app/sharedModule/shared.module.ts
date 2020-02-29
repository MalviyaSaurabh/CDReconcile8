import { NgModule, Type } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Http, HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

import {
  CovalentDataTableModule,
  CovalentMediaModule,
  CovalentLoadingModule,
  CovalentNotificationsModule,
  CovalentLayoutModule,
  CovalentMenuModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
  CovalentCommonModule,
  CovalentDialogsModule,
  CovalentJsonFormatterModule,
  CovalentMessageModule,
  CovalentExpansionPanelModule,
  CovalentFileModule
} from "@covalent/core";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import {
  MatTableModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatDialogModule,
  MatSortModule
} from "@angular/material";

import { ChartsModule } from "ng2-charts/ng2-charts";
import { MatChipsModule } from "@angular/material/chips";
import {
  MatMomentDateModule,
  MomentDateModule
} from "@angular/material-moment-adapter";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MatProgressSpinnerModule } from "@angular/material";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatBadgeModule } from "@angular/material/badge";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";

const FLEX_LAYOUT_MODULES: any[] = [FlexLayoutModule];

const ANGULAR_MODULES: any[] = [
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  HttpClientModule,
  ChartsModule,
  CurrencyMaskModule,
  ScrollDispatchModule,
  Ng4LoadingSpinnerModule,
  NgxPaginationModule,
  NgxExtendedPdfViewerModule
];

const MATERIAL_MODULES: any[] = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatMenuModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatInputModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatTabsModule,
  MatSelectModule,
  MatRadioModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatDialogModule,
  MatChipsModule,
  MatMomentDateModule,
  MomentDateModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatBadgeModule
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule,
  CovalentMediaModule,
  CovalentLoadingModule,
  CovalentNotificationsModule,
  CovalentLayoutModule,
  CovalentMenuModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
  CovalentCommonModule,
  CovalentDialogsModule,
  CovalentJsonFormatterModule,
  CovalentMessageModule,
  CovalentExpansionPanelModule,
  CovalentFileModule
];

@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    FLEX_LAYOUT_MODULES
  ],
  declarations: [],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    FLEX_LAYOUT_MODULES
  ]
})
export class SharedModule {}
