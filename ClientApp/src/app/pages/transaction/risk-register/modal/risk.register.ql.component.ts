import { LocalDataSource } from "ng2-smart-table";
import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BackendService } from "../../../../@core/data/backend.service";
@Component({
  selector: "ngx-risk-register-ql",
  templateUrl: "./risk.register.ql.component.html"
})
export class RiskRegisterQlComponent {
  riskIndicatorData: any = [];
  filterData = {
    year: ""
  };
  selectedData: any;
  settings: any = {
    mode: "inline",
    sort: true,
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: "right",
      columnTitle: "Modify",
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      impact: {
        title: "Qualitative Impact",
        type: "text",
        filter: false,
        editable: false,
        width: "5%"
      },
      entityWide: {
        title: "Entitiy Wide",
        type: "text",
        filter: false,
        editable: true,
        width: "20%"
      },
      output: {
        title: "Output",
        type: "text",
        filter: false,
        editable: true,
        width: "20%"
      },
      humanResources: {
        title: "Human Resources",
        type: "text",
        filter: false,
        editable: true,
        width: "20%"
      },
      legalAndRegulatory: {
        title: "Legal And Regulatory",
        type: "text",
        filter: false,
        editable: true,
        width: "20%"
      },
      financial: {
        title: "Financial",
        type: "text",
        filter: false,
        editable: true,
        width: "20%"
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private activeModal: NgbActiveModal,
    public service: BackendService
  ) {
    this.loadData();
  }

  loadData() {
    this.service.getreq("qllovs").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(data);
        this.source.load(
          data.filter(function(item) {
            return item.yearActive == this.year;
          }, this.filterData)
        );
      }
    });
  }
  refreshSelected(event) {
    this.selectedData = event.data;
  }

  submit() {
    console.log(this.selectedData);
    this.activeModal.close(this.selectedData);
  }

  closeModal() {
    this.activeModal.close();
  }
}
