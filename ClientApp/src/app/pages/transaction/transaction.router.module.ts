import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RiskRegisterComponent } from "./risk-register/risk.register.component";
import { UpdateRiskComponent } from "./update-risk/update.risk.component";
import { DeptInputComponent } from "./dept-input/dept.input.component";
import { AccidentInputComponent } from "./accident-input/accident.input.component";
import { RiskOverviewComponent } from "./risk-overview/risk.overview.component";
import { TransactionComponent } from "./transaction.component";
import { DeptInputModalComponent } from "./dept-input/modal/dept.input.modal.component";
import { AccidentInputModalComponent } from "./accident-input/modal/accident.input.modal.component";
import { ViewDraftComponent } from "./view-draft/view.draft.component";
import {RiskRegisterGuardComponent} from './risk.register.guard.component'


const routes: Routes = [
  {
    path: "",
    component: TransactionComponent,
    children: [
      {
        path: "risk-register",
        component: RiskRegisterComponent,
        canDeactivate: [RiskRegisterGuardComponent]
      },
      {
        path: "dept-input",
        component: DeptInputComponent
      },
      {
        path: "view-draft",
        component: ViewDraftComponent
      },
      {
        path: "update-risk",
        component: UpdateRiskComponent
      },
      {
        path: "accident-input",
        component: AccidentInputComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRouterModule {}

export const routedComponents = [
  RiskRegisterComponent,
  UpdateRiskComponent,
  RiskOverviewComponent,
  DeptInputComponent,
  DeptInputModalComponent,
  AccidentInputComponent,
  AccidentInputModalComponent,
  TransactionComponent,
  ViewDraftComponent
];


