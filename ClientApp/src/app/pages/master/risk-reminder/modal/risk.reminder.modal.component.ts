import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-risk-reminder-modal",
  templateUrl: "./risk.reminder.modal.component.html"
})
export class RiskReminderModalComponent {
  formData: {
    counterNo: string;
    yearActive: string;
    condition:string;
    startDate: string;
    endDate: string;
    indictatorId: string;
    period: string;
    UserCreated: string;
    DatetimeCreated: string;
    UserUpdate: string;
    DatetimeUpdate: string;
    status: string;
  };

  formIsValid: boolean;
  formIsValidDate: boolean;

  constructor(private activeModal: NgbActiveModal) {
    console.log(this.formData);
    this.formIsValid = false;
    this.formIsValidDate = true;
  }

  submit() {
    this.activeModal.close(this.formData);
  }

  onChange(){
    if(this.formData.endDate && this.formData.startDate){
      if(this.formData.endDate < this.formData.startDate){
        this.formIsValidDate = false;
      }else{
        this.formIsValidDate = true;
      }
    }
    if(this.formIsValidDate && this.formData.period != ''){
      this.formIsValid = true;
    }
    
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
