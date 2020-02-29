import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./sharedModule/shared.module";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { MainComponent } from "./components/main/main.component";
import { RegisterComponent } from "./components/register/register.component";
import { CdrListDetailsComponent } from "./components/cdr-list-details/cdr-list-details.component";
import { UnifiedCdrDetailsComponent } from "./components/unified-cdr-details/unified-cdr-details.component";
import { InvoiceDetailsComponent } from "./components/invoice-details/invoice-details.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SearchQueryComponent } from "./components/search-query/search-query.component";
import { SummaryComponent } from "./components/summary/summary.component";
import { AddCdrComponent } from "./components/cdr-list-details/add-cdr/add-cdr.component";
import { MatRippleModule } from "@angular/material";
import { SummarizedDataComponent } from "./components/summarized-data/summarized-data.component";
import { ViewSummarizedDataComponent } from "./components/summarized-data/view-summarized-data/view-summarized-data.component";
import { ViewUnifiedDataComponent } from "./components/unified-cdr-details/view-unified-data/view-unified-data.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainComponent,
    RegisterComponent,
    CdrListDetailsComponent,
    UnifiedCdrDetailsComponent,
    InvoiceDetailsComponent,
    DashboardComponent,
    SearchQueryComponent,
    SummaryComponent,
    AddCdrComponent,
    SummarizedDataComponent,
    ViewSummarizedDataComponent,
    ViewUnifiedDataComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatRippleModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCdrComponent,
    ViewSummarizedDataComponent,
    ViewUnifiedDataComponent
  ]
})
export class AppModule {}
