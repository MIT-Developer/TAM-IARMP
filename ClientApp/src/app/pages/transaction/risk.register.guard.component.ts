import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { RiskRegisterComponent } from "./risk-register/risk.register.component";
@Injectable()
export class RiskRegisterGuardComponent
  implements CanDeactivate<RiskRegisterComponent> {
  canDeactivate(component: RiskRegisterComponent) {
    let can = component.canDeactivate();
    //console.log("DeactivateGuard#canDeactivate called, can: ", can);
    if (!can) {
      return window.confirm("Do you really want to cancel?");
    }

    return true;
  }
}
