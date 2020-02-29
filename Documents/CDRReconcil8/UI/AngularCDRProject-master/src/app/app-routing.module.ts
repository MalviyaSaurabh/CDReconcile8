import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { MainComponent } from "./components/main/main.component";
import { RegisterComponent } from "./components/register/register.component";
import { CdrListDetailsComponent } from "./components/cdr-list-details/cdr-list-details.component";
import { UnifiedCdrDetailsComponent } from "./components/unified-cdr-details/unified-cdr-details.component";
import { InvoiceDetailsComponent } from "./components/invoice-details/invoice-details.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SearchQueryComponent } from "./components/search-query/search-query.component";
import { SummaryComponent } from "./components/summary/summary.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: MainComponent,
    children: [
      {
        path: "summary",
        component: SummaryComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "search",
        component: SearchQueryComponent
      },
      {
        path: "listCDRDetails",
        component: CdrListDetailsComponent
      },
      {
        path: "unifiedCDRDetails",
        component: UnifiedCdrDetailsComponent
      },
      {
        path: "invoiceDetails",
        component: InvoiceDetailsComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: "home/summary"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
