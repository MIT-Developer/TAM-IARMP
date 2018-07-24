import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-risk-indicator-modal",
  templateUrl: "./risk.indicator.modal.component.html"
})
export class RiskIndicatorModalComponent {
  condition: any = [];

  formData: {
    counterNo: string;
    yearActive: string;
    description: string;
    condition: string;
    indictatorId: string;
    score: string;
    flagActive: string;
    UserCreated: string;
    DatetimeCreated: string;
    UserUpdate: string;
    DatetimeUpdate: string;
    scoreDisable: boolean;
    status: string;
  };

  scoreDisable: boolean;

  constructor(private activeModal: NgbActiveModal) {
    console.log(this.formData);
    console.log(this.condition);
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
