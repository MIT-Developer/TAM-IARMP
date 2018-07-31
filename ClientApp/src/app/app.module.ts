/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { CoreModule } from "./@core/core.module";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ThemeModule } from "./@theme/theme.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthComponent } from "./auth/auth.component";
import {Select2Component} from 'angular-select2-component';
import { Select2Module } from "ng2-select2";
import * as $ from 'jquery';

@NgModule({
  declarations: [AppComponent, AuthComponent, Select2Component],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    Select2Module,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }]
})
export class AppModule {}
