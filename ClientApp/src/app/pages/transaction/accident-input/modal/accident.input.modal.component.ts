import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-accident-input-modal",
  templateUrl: "./accident.input.modal.component.html"
})
export class AccidentInputModalComponent {
  condition: any = [];
  formData: {
    yearActive: string;
    counterNo: string;
    division: string;
    departement: string;
    accidentId: string;
    dateAccident:string;
    description: string;
    relatedParties: string,
    financialImpact: string,
    otherImpact: string,
    currentAction: string,
    nextAction: string,
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
