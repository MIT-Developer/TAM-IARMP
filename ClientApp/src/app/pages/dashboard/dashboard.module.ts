import { NgModule } from "@angular/core";
import { BackendService } from "../../@core/data/backend.service";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { DashboardComponent } from "./dashboard.component";

import { ChartComponent } from "./chart/chart.component";
import { DashboardModalComponent } from "./modal/dashboard.modal.component";
import { CurrencyMaskModule } from "ng2-currency-mask";
@NgModule({
  imports: [ThemeModule, Ng2SmartTableModule,CurrencyMaskModule],
  declarations: [DashboardComponent, ChartComponent,DashboardModalComponent],
  providers: [BackendService],
  entryComponents: [DashboardModalComponent]
})
export class DashboardModule {}
