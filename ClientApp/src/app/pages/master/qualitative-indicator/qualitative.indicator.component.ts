import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { QualitativeIndicatorModalComponent } from "./modal/qualitative.indicator.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
import { isNullOrUndefined } from "util";
@Component({
  selector: "ngx-qualitativ-indicator",
  templateUrl: "./qualitative.indicator.component.html"
})
export class QualitativeIndicatorComponent {
  @ViewChild("myForm") private myForm: NgForm;
  yearPeriode: any = moment().format("YYYY");
  tabledata: any[] = [];
  riskIndicatorData: any = [];
  subscription: any;
  activeModal: any;

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
      descriptionrisk: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: false,
        width: "25%"
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        editable: true,
        width: "65%"
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
  condition: any[] = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
  }

  loadData() {
    this.service.getreq("TbMRiskIndicators").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].score == null
            ? (data[ind].score = 0)
            : data[ind].score.toString();
          data[ind].status = "0";

          this.riskIndicatorData = data;
        });
        this.service.getreq("TbMQualitativeImpacts").subscribe(response => {
          if (response != null) {
            const data = response;
            //console.log(JSON.stringify(response));
            data.forEach((element, ind) => {
              data[ind].yearActive = data[ind].yearActive.toString();
              data[ind].status = "0";
              let arr = this.riskIndicatorData.filter(function(item) {
                return item.indicatorId == data[ind].riskIndicatorId;
              });
              if (arr[0] != null) {
                data[ind].descriptionrisk = arr[0].description;
              }
              this.tabledata = data;
              this.source.load(this.tabledata);
            });
            this.service.getreq("TbMLibraries").subscribe(response => {
              if (response != null) {
                let arr = response.filter(item => {
                  return item.condition == "QL";
                });
                //console.log(arr);
                this.condition = arr;
                //console.log(this.condition)
                this.myForm.setValue({
                  yearPeriode: moment().format("YYYY"),
                  condition: this.condition[0].charId
                });
                this.reload();
              }

              // error => {
              //   //console.log(error);
              // };
            });
          }
          // error => {
          //   //console.log(error);
          // };
        });
      }
    });
  }
  ngAfterViewInit() {
    this.source
      .load(this.tabledata)
      .then(resp => {
        this.myForm.setValue({
          condition:this.condition[0].charId,
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
        descriptionrisk: {
          title: "Impact",
          type: "string",
          filter: false,
          editable: false,
          width: "25%"
        },
        description: {
          title: "Description",
          type: "string",
          filter: false,
          editable: true,
          width: "65%",
          editor: {
            type: "textarea"
          }
        }
      }
    };
    this.source.setFilter(
      [
        { field: "category", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode }
      ],
      true
    );
  }

  onSaveConfirm(event) {
    if (event.newData.description != "") {
      event.confirm.resolve(event.newData);
      this.submit(event);
    } else {
      event.confirm.reject();
    }
  }

  submit(event?) {
    //console.log(event);
    event
      ? this.service
          .putreq("TbMQualitativeImpacts", JSON.stringify(event.newData))
          .subscribe(response => {
            //console.log(JSON.stringify(event.newData));
            event.confirm.resolve(event.newData);
            error => {
              //console.log(error);
            };
          })
      : null;
    //console.log(JSON.stringify(this.tabledata));

    this.toastr.success("Data Saved!");
  }
}
