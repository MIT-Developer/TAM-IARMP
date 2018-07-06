import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FinancialIndicatorRiskModalComponent } from "./modal/financial.indicator.risk.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
@Component({
  selector: "ngx-financial-indicator-risk",
  templateUrl: "./financial.indicator.risk.component.html"
})
export class FinancialIndicatorRiskComponent {
  @ViewChild("myForm") private myForm: NgForm;
  buttonDisable: boolean;
  numberTitle: string;
  yearPeriode: any = moment().format("YYYY");
  settings: any = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    mode: "inline",
    sort: true,
    hideSubHeader: true,
    actions: {
      add: false,
      edit: this.yearPeriode == moment().format("YYYY"),
      delete: false,
      position: "right",
      columnTitle: "Edit",
      width: "5%"
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      counterNo: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      impact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: false,
        width: "30%"
      },
      percentageValue: {
        title: "Percentage",
        type: "decimal(5,2)",
        filter: false,
        editable: true,
        width: "30%"
      },
      numberValue: {
        title: "Number",
        type: "numeric",
        filter: false,
        editable: false,
        width: "35%",
        valuePrepareFunction: value => {
          if (isNaN(value)) {
            return 0;
          } else {
            return value
              .toString()
              .replace(/(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g, function(
                m,
                s1,
                s2
              ) {
                return s2 || s1 + ",";
              });
          }
        }
      }
    }
  };

  year: any[] = [
    {
      data: moment()
        .subtract(9, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(8, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(7, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(6, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(5, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(4, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(3, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(2, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(1, "years")
        .format("YYYY")
    },
    {
      data: moment().format("YYYY")
    }
  ];
  condition: any[] = [
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

  source: LocalDataSource = new LocalDataSource();
  riskIndicatorData: any;
  tabledata: any[] = [];

  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.buttonDisable = false;
    this.loadData();
  }

  loadData() {
    this.service.getreq("TbMRiskIndicators").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(response);
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();

          data[ind].score == null
            ? (data[ind].score = 0)
            : data[ind].score.toString();
          this.riskIndicatorData = data;
        });
        this.service.getreq("TbMFinancialImpacts").subscribe(response => {
          if (response != null) {
            const data = response;
            //console.log(response);
            data.forEach((element, ind) => {
              let impact = this.riskIndicatorData.filter(function(item) {
                return (
                  item.yearActive == data[ind].yearActive.toString() &&
                  item.indicatorId == data[ind].riskIndicatorId
                );
              });
              data[ind].yearActive = data[ind].yearActive.toString();
              data[ind].status = "0";
              data[ind].impact = impact[0].description;
              this.tabledata = data;
              this.source.load(this.tabledata);
            });
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    this.source
      .load(this.tabledata)
      .then(resp => {
        this.myForm.setValue({
          condition: "NEP",
          yearPeriode: moment().format("YYYY")
        });
      })
      .then(resp => {
        this.reload();
      });

    //console.log(this.myForm.value.condition);
  }

  reload() {
    this.yearPeriode = this.myForm.value.yearPeriode;
    switch (this.myForm.value.condition) {
      case "COF":
        this.numberTitle = "Increase amount IDR in million";
        break;

      case "OEX":
        this.numberTitle = "Increase amount IDR in million";
        break;

      default:
        this.numberTitle = "Loss amount IDR in million";
    }
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>'
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true
      },
      mode: "inline",
      sort: true,
      hideSubHeader: true,
      actions: {
        add: false,
        edit: this.yearPeriode == moment().format("YYYY"),
        delete: false,
        position: "right",
        columnTitle: "Edit",
        width: "5%"
      },
      pager: {
        display: true,
        perPage: 5
      },
      columns: {
        counterNo: {
          title: "No",
          type: "number",
          filter: false,
          editable: false,
          width: "5%"
        },
        impact: {
          title: "Impact",
          type: "string",
          filter: false,
          editable: false,
          width: "30%"
        },
        percentageValue: {
          title: "Percentage",
          type: "decimal(5,2)",
          filter: false,
          editable: true,
          width: "30%"
        },
        numberValue: {
          title: this.numberTitle,
          type: "numeric",
          filter: false,
          editable: false,
          width: "35%",
          valuePrepareFunction: value => {
            if (isNaN(value)) {
              return 0;
            } else {
              return value
                .toString()
                .replace(/(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g, function(
                  m,
                  s1,
                  s2
                ) {
                  return s2 || s1 + ",";
                });
            }
          }
        }
      }
    };
    this.source.setFilter(
      [
        { field: "category", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode },
        { field: "flagActive", search: 'Y' }
      ],
      true
    );
  }

  onSaveConfirm(event) {
    if (event.newData.percentageValue < 9999) {
      event.confirm.resolve(event.newData);
      this.submit(event);
    } else {
      event.confirm.reject();
    }
  }

  submit(event?) {
    event
      ? this.service
          .putreq("TbMFinancialImpacts", JSON.stringify(event.newData))
          .subscribe(response => {
            //console.log(JSON.stringify(event.newData));
            event.confirm.resolve(event.newData);
            this.loadData();
            error => {
              //console.log(error);
            };
          })
      : null;
    //console.log(JSON.stringify(this.tabledata));

    this.toastr.success("Data Saved!");
  }
}
