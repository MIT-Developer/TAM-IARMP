import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Rx';
@Injectable()
export class BackendService {
  // baseurlxpay:string='http://202.158.20.141:5001/xpay-service/api/'

  baseurl: string = "http://localhost:5000/api/";

  constructor(public http: Http) {}

  getreq(url: string) {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const options = new RequestOptions({
      headers: headers
    });
    return this.http.get(this.baseurl + url, options).map(res => res.json());
  }

  postreq(url: string, body) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options = new RequestOptions({
      headers: headers
    });
    return this.http
      .post(this.baseurl + url, body, options)
      .map(res => res.json());
  }

  deletereq(url: string, body) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options = new RequestOptions({
      headers: headers
    });
    return this.http
      .post(this.baseurl + url, body, options)
      .map(res => res.json());
  }

  putreq(url: string, body) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options = new RequestOptions({
      headers: headers
    });
    return this.http
      .put(this.baseurl + url, body, options)
      .map(res => res.json());
  }
}
