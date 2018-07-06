import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-company-input-modal",
  templateUrl: "./company.input.modal.component.html"
})
export class CompanyInputModalComponent {
  condition: any = [];
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
    name: string;
  };

  constructor(private activeModal: NgbActiveModal) {
    console.log(this.formData);
  }
  getTitle(cond) {
    let arr = this.condition.filter(function(item) {
      return item.data == cond;
    });
    if (arr[0] != null) {
      return this.condition.filter(function(item) {
        return item.data == cond;
      })[0].desc;
    }
  }
  submit() {
    this.activeModal.close(this.formData);
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
