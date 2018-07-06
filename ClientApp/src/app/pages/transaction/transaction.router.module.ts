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
import { RiskRegisterModalComponent } from "./risk-register/modal/risk.register.modal.component";
import { RiskOverviewModalComponent } from "./risk-overview/modal/risk.overview.modal.component";
import { RiskRegisterDeptComponent } from "./risk-register/modal/risk.register.dept.component";
import { RiskRegisterAcdComponent } from "./risk-register/modal/risk.register.acd.component";
import { RiskRegisterQlComponent } from "./risk-register/modal/risk.register.ql.component";
import { RiskRegisterCtrComponent } from "./risk-register/modal/risk.register.ctr.component";
import { ViewDraftComponent } from "./view-draft/view.draft.component";
import { RiskRegisterTrtComponent } from "./risk-register/modal/risk.register.trt.component";
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
        path: "risk-overview",
        component: RiskOverviewComponent
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
  RiskRegisterModalComponent,
  RiskOverviewModalComponent,
  RiskRegisterDeptComponent,
  RiskRegisterAcdComponent,
  RiskRegisterQlComponent,
  RiskRegisterCtrComponent,
  RiskRegisterTrtComponent,
  TransactionComponent,
  ViewDraftComponent
];


