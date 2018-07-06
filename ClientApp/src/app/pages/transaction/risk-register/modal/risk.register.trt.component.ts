import { LocalDataSource } from "ng2-smart-table";
import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BackendService } from "../../../../@core/data/backend.service";
@Component({
  selector: "ngx-risk-register-trt",
  templateUrl: "./risk.register.trt.component.html"
})
export class RiskRegisterTrtComponent {
  condition: any = [];

  formData: {
    yearActive: string;
    riskNo: string;
    no: number;
    description: string;
    type: string;
    pic:string;
    dueDate:string;
    UserCreated: string;
    DatetimeCreated: string;
    UserUpdate: string;
    DatetimeUpdate: string;
  };

  ctrType = [
    {
      desc: "Preventive"
    },
    {
      desc: "Detective"
    },
    {
      desc: "Corrective"
    }
  ];

  constructor(private activeModal: NgbActiveModal) {
    console.log(this.formData);
  }

  submit() {
    this.activeModal.close(this.formData);
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
