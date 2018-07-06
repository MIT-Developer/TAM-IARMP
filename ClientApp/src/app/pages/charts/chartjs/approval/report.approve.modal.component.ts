import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-report-approve-modal",
  templateUrl: "./report.approve.modal.component.html"
})
export class ReportApproveModalComponent {
  condition: any = [];
  formData: {
    yearActive: string;
    division: string;
    department: string;
    counterNo: string;
    stat:  any[] ;
    notes: string;
    userCreated: string;
    datetimeCreated: string;
    userUpdate: string;
    datetimeUpdate: string;
    status: string;
  };

  selectstat: any[] = [
    {
      data: "APPROVE",
      desc: "APPROVE"
    },
    {
      data: "REJECT",
      desc: "REJECT"
    }
  ];


  constructor(private activeModal: NgbActiveModal) {
    //console.log(this.formData);
  }
  
  submit() {
    this.activeModal.close(this.formData);
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
