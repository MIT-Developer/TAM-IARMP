import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserService } from "./users.service";
import { StateService } from "./state.service";
import { BackendService } from "./backend.service";
import { UserCred } from "./usercred";
const SERVICES = [UserService, StateService, BackendService, UserCred];

@NgModule({
  imports: [CommonModule],
  providers: [...SERVICES]
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [...SERVICES]
    };
  }
}
