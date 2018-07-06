import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-financial-data-modal",
  templateUrl: "./financial.data.modal.component.html"
})
export class FinancialDataModalComponent {
  formData: {
    yearActive: string;
    condition: string;
    counterNo: string;
    comInpId: string;
    description: string;
    flagActive: string;
    userCreated: string;
    datetimeCreated: string;
    userUpdate: string;
    datetimeUpdate: string;
    status: string;
  };

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
