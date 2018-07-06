import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MasterComponent } from "./master.component";
import { CompanyInputComponent } from "./company-input/company.input.component";
import { CompanyInputModalComponent } from "./company-input/modal/company.input.modal.component";
import { RiskIndicatorComponent } from "./risk-indicator/risk.indicator.component";
import { RiskIndicatorModalComponent } from "./risk-indicator/modal/risk.indicator.modal.component";
import { RiskReminderComponent } from "./risk-reminder/risk.reminder.component";
import { RiskReminderModalComponent } from "./risk-reminder/modal/risk.reminder.modal.component";
import { RiskReminderManualComponent } from "./risk-reminder/modal/risk.reminder.manual.component";
import { RiskMatriksIndicatorComponent } from "./risk-matriks-indicator/risk.matriks.indicator.component";
import { RiskMatriksIndicatorModalComponent } from "./risk-matriks-indicator/modal/risk.matriks.indicator.modal.component";
import { FinancialIndicatorRiskComponent } from "./financial-indicator-risk/financial.indicator.risk.component";
import { FinancialIndicatorRiskModalComponent } from "./financial-indicator-risk/modal/financial.indicator.risk.modal.component";
import { OperationalIndicatorRiskComponent } from "./operational-indicator-risk/Operational.indicator.risk.component";
import { OperationalIndicatorRiskModalComponent } from "./operational-indicator-risk/modal/operational.indicator.risk.modal.component";
import { QualitativeIndicatorComponent } from "./qualitative-indicator/qualitative.indicator.component";
import { QualitativeIndicatorModalComponent } from "./qualitative-indicator/modal/qualitative.indicator.modal.component";
import { FinancialDataComponent } from "./financial-data/financial.data.component";
import { FinancialDataModalComponent } from "./financial-data/modal/financial.data.modal.component";
const routes: Routes = [
  {
    path: "",
    component: MasterComponent,
    children: [
      {
        path: "company-input",
        component: CompanyInputComponent
      },
      {
        path: "risk-indicator",
        component: RiskIndicatorComponent
      },
      {
        path: "risk-matriks-indicator",
        component: RiskMatriksIndicatorComponent
      },
      {
        path: "financial-indicator-risk",
        component: FinancialIndicatorRiskComponent
      },
      {
        path: "operational-indicator-risk",
        component: OperationalIndicatorRiskComponent
      },
      {
        path: "qualitative-indicator",
        component: QualitativeIndicatorComponent
      },
      {
        path: "risk-reminder",
        component: RiskReminderComponent
      },
      {
        path: "financial-data",
        component: FinancialDataComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRouterModule {}

export const routedComponents = [
  MasterComponent,
  CompanyInputComponent,
  CompanyInputModalComponent,
  RiskIndicatorComponent,
  RiskIndicatorModalComponent,
  RiskReminderComponent,
  RiskReminderModalComponent,
  RiskReminderManualComponent,
  RiskMatriksIndicatorComponent,
  RiskMatriksIndicatorModalComponent,
  FinancialIndicatorRiskComponent,
  FinancialIndicatorRiskModalComponent,
  OperationalIndicatorRiskComponent,
  OperationalIndicatorRiskModalComponent,
  QualitativeIndicatorComponent,
  QualitativeIndicatorModalComponent,

  FinancialDataComponent,
  FinancialDataModalComponent
];
