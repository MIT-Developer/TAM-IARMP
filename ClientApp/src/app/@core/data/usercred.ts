import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Rx';
@Injectable()
export class UserCred {
  // baseurlxpay:string='http://202.158.20.141:5001/xpay-service/api/'

  user: {
    division: string;
    department: string;
    role: string;
  } = {
    division: "",
    department: "",
    role: ""
  };

  constructor() {}

  setUser(role) {
    this.user.division = "FAD";
    this.user.department = "ACCT";
    this.user.role = role;
  }

  getUser() {
    return this.user;
  }
}
