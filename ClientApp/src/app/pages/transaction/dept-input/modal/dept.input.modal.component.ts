import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-dept-input-modal",
  templateUrl: "./dept.input.modal.component.html"
})
export class DeptInputModalComponent {
  condition: any = [];
  formData: {
    yearActive: string;
    condition: string;
    counterNo: string;
    division: string;
    departement: string;
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
