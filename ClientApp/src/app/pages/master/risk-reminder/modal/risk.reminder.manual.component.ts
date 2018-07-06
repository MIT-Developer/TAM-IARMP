import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-risk-reminder-manual",
  templateUrl: "./risk.reminder.manual.component.html"
})
export class RiskReminderManualComponent {
  formData: {
    counterNo: string;
    yearActive: string;
    typeSend: string;
    bodySend: string;
    dateSend: string;
    userSend: string;
    status: string;
  };

  constructor(private activeModal: NgbActiveModal) {
    console.log(this.formData);
  }

  sendmail() {
    this.activeModal.close(this.formData);
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
