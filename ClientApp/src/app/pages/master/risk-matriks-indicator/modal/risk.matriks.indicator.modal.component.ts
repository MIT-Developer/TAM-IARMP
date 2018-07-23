import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BackendService } from "../../../../@core/data/backend.service";

@Component({
  selector: "ngx-risk-matriks-indicator-modal",
  templateUrl: "./risk.matriks.indicator.modal.component.html"
})
export class RiskMatriksIndicatorModalComponent {
  condition: any = [];
  conditionA: any;
  conditionB: any;
  conditionC: any;
  yearActive: any;
  riskIndicatorData: any;
  data: any = {
    A: [],
    B: [],
    C: []
  };
  formData: {
    counterNo: string;
    yearActive: string;
    mappingId: string;
    condition: string;
    indicatorIdA: string;
    indicatorIdB: string;
    resultIdC: string;
    userCreated: string;
    datetimeCreated: string;
    userUpdate: string;
    datetimeUpdate: string;
    status: string;
  };

  constructor(private activeModal: NgbActiveModal, public service: BackendService) {}

  ngAfterViewInit() {
    console.log(this.formData);
    console.log(this.riskIndicatorData);
    // this.updateData();
    let year = this.yearActive;
    let conditionA = this.conditionA.data;
    let conditionB = this.conditionB.data;
    let conditionC = this.conditionC;

    this.riskIndicatorData
      .filter(function search(item) {
        return item.yearActive === year && item.condition === conditionA && item.flagActive === 'Active';
      }) 
      .forEach(element => {
        this.data.A.push(element);
      });
    this.riskIndicatorData
      .filter(function search(item) {
        return item.yearActive === year && item.condition === conditionB && item.flagActive === 'Active';
      })
      .forEach(element => {
        this.data.B.push(element);
      });
    this.riskIndicatorData
      .filter(function search(item) {
        return item.yearActive === year && item.condition === conditionC;
      })
      .forEach(element => {
        this.data.C.push(element);
      });
    console.log(this.data);
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
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      if (response != null) {
        const sameObject = response.find((element, ind) => {
          if(element.condition == this.formData.condition && element.indicatorIdA == this.formData.indicatorIdA && element.indicatorIdB == this.formData.indicatorIdB && element.resultIdC == this.formData.resultIdC){
            return element;
          }
        });
        if(!sameObject){
          this.activeModal.close(this.formData);
        }else{
          window.alert("Risk Matriks Indicator sudah ada.");
        }
      }
    });
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
