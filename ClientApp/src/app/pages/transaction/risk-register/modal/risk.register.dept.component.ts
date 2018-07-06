import { LocalDataSource } from "ng2-smart-table";
import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BackendService } from "../../../../@core/data/backend.service";
@Component({
  selector: "ngx-risk-register-dept",
  templateUrl: "./risk.register.dept.component.html"
})
export class RiskRegisterDeptComponent {
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
      vCounterNo: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        editable: true,
        width: "80%"
      }
    }
  };
  filterData: {
    year: string;
    condition: string;
    division: string;
    department: string;
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private activeModal: NgbActiveModal,
    public service: BackendService
  ) {
    this.loadData();
  }
  loadData() {
    console.log(this.filterData);
    this.service.getreq("TbMDeptInputs").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(response);
        console.log(
          data.filter(function(item) {
            console.log(this);
            return (
              item.yearActive == this.year &&
              item.condition == this.condition &&
              item.division == this.division &&
              item.departement == this.department
            );
          }, this.filterData)
        );
        let arr = data.filter(function(item) {
          return (
            item.yearActive == this.year &&
            item.condition == this.condition &&
            item.division == this.division &&
            item.departement == this.department
          );
        }, this.filterData);
        let vCounterNo = 0;
        arr.forEach(element => {
          element.vCounterNo = vCounterNo + 1;
          vCounterNo++;
        });
        

        this.source.load(arr);
      }
      // error => {
      //   console.log(error);
      // };
    });
  }

  refreshSelected(event) {
    this.selectedData = event.data;
  }

  submit() {
    this.activeModal.close(this.selectedData);
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
