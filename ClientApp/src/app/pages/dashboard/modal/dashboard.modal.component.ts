import { LocalDataSource } from "ng2-smart-table";
import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BackendService } from "../../../@core/data/backend.service";

@Component({
  selector: "ngx-dahboard-modal",
  templateUrl: "./dashboard.modal.component.html"
})
export class DashboardModalComponent {
  conditionFin: any[] = [
    {
      data: "NEP",
      desc: "Net Profit"
    },
    {
      data: "REV",
      desc: "Revenue"
    },
    {
      data: "COF",
      desc: "Cost of revenue"
    },
    {
      data: "OEX",
      desc: "Operating expenses"
    },
    {
      data: "CHG",
      desc: "Non operating income/charges"
    }
  ];

  conditionOp: any[] = [
    {
      data: "MAS",
      desc: "M/S"
    },
    {
      data: "SAL",
      desc: "Service Share"
    },
    {
      data: "CSA",
      desc: "CS Score"
    },
    {
      data: "CAS",
      desc: "Employee Satisfaction"
    },
    {
      data: "DOD",
      desc: "Days of operation disruption"
    }
  ];
  formData: {
    finImpactCategory: string;
    finAmountIr: number;
    opAmountIr: number;
    opImpactCategory: string;
    finImpactRd: string;
    finAmountRd: number;
    opImpactRd: string;
    opAmountRd: number;
    qlImpactIr: string;
    qlImpactRd: string;
    irLikelihood: string;
    rdLikelihood: string;
  };
  constructor(
    private activeModal: NgbActiveModal,
    public service: BackendService
  ) {}

  filterFin() {
    let arr = this.conditionFin.filter(item => {
      return item.data == this.formData.finImpactCategory;
    });
    if (arr[0] != null) {
      return arr[0].desc;
    } else {
      return null;
    }
  }

  filterOp() {
    let arr = this.conditionOp.filter(item => {
      return item.data == this.formData.opImpactCategory;
    });
    if (arr[0] != null) {
      return arr[0].desc;
    } else {
      return null;
    }
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
