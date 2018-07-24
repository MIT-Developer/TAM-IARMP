import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OperationalIndicatorRiskModalComponent } from "./modal/operational.indicator.risk.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
import { isNullOrUndefined } from "util";
@Component({
  selector: "ngx-operational-indicator-risk",
  templateUrl: "./operational.indicator.risk.component.html"
})
export class OperationalIndicatorRiskComponent {
  percentageCheck: boolean;
  tabledata: any[] = [];
  yearPeriode: any = moment().format("YYYY");
  subscription: any;
  activeModal: any;
  riskIndicatorData: any = [];
  @ViewChild("myForm") private myForm: NgForm;
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
      width: "10%"
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
        width: "40%"
      },
      numberValue: {
        title: "Number",
        type: "string",
        filter: false,
        editable: true,
        width: "45%",
        valuePrepareFunction: value => {
          if (isNaN(value)) {
            return 0;
          } else {
            return Number(value)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          }
        }
      },
      uom: {
        title: "UOM",
        type: "string",
        filter: false,
        editable: false,
        width: "25%",
        valuePrepareFunction: value => {
          switch (this.myForm.value.condition) {
            case "SAL":
              return "Unit";
            case "DOD":
              return "Days";
            default:
              return "%";
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
  condition: any[] = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
    this.percentageCheck = false;
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
        this.service.getreq("TbMOperationalImpacts").subscribe(response => {
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
                  return item.condition == "OP";
                });
                //console.log(arr);
                this.condition = arr;
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
          condition: this.condition[0].charId,
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
      case "SAL":
        this.percentageCheck = false;
        break;
      case "DOD":
        this.percentageCheck = false;
        break;
      default:
        this.percentageCheck = true;
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
        width: "10%"
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
          width: "40%"
        },
        numberValue: {
          title: "Number",
          type: "string",
          filter: false,
          editable: true,
          width: "45%",
          valuePrepareFunction: value => {
            if (isNaN(value)) {
              return 0;
            } else {
              return Number(value)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            }
          }
        },
        uom: {
          title: "UOM",
          type: "string",
          filter: false,
          editable: false,
          width: "25%",
          valuePrepareFunction: value => {
            switch (this.myForm.value.condition) {
              case "SAL":
                return "Unit";
              case "DOD":
                return "Days";
              default:
                return "%";
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
    console.log(event);
    let maxNumber = 0;
    switch(event.newData.category){
      case 'MAS' :
        maxNumber = 100;
      break;
      case 'SAL' :
        maxNumber = 99999999999999999;
      break;
      case 'CAS' :
        maxNumber = 100;
      break;
      case 'CSA' :
        maxNumber = 100;
      break;
      case 'DOD' :
        maxNumber = 365;
      break;
    }
    if (event.newData.description!='' && event.newData.numberValue <= maxNumber) {
      if(event.newData.numberValue < 0 ){
        event.confirm.reject();
          window.alert("Number must be positive value");
      }else{
        if(event.newData.counterNo == 5 ){
          const upperLevel = event.source.data.find(function(object, index){
            if (object.counterNo == event.newData.counterNo-1 && object.category == event.newData.category && object.yearActive == event.newData.yearActive){
              return object;
            }
          });
          if(parseInt(event.newData.numberValue) < parseInt(upperLevel.numberValue)){
            event.confirm.resolve(event.newData);
            this.submit(event);
          }else{
            event.confirm.reject();
            window.alert("Percentage '"+ event.newData.descriptionrisk+"' must be smaller than '"+ upperLevel.descriptionrisk +"'");
          }
        }else if(event.newData.counterNo >1 && event.newData.counterNo <5){
          const upperLevel = event.source.data.find(function(object, index){
            if (object.counterNo == event.newData.counterNo-1 && object.category == event.newData.category && object.yearActive == event.newData.yearActive){
              return object;
            }
          });
          const underLevel = event.source.data.find(function(object, index){
            if (object.counterNo == event.newData.counterNo+1 && object.category == event.newData.category && object.yearActive == event.newData.yearActive){
              return object;
            }
          });
          if((parseInt(event.newData.numberValue) < parseInt(upperLevel.numberValue)) && (parseInt(event.newData.numberValue) > parseInt(underLevel.numberValue))){
            event.confirm.resolve(event.newData);
            this.submit(event);
          }else{
            event.confirm.reject();
            window.alert("Percentage '"+ event.newData.descriptionrisk+"' must be smaller than '"+ upperLevel.descriptionrisk +"' and must be bigger than '"+ underLevel.descriptionrisk +"'");
          }
        }else{
          const underLevel = event.source.data.find(function(object, index){
            if (object.counterNo == event.newData.counterNo+1 && object.category == event.newData.category && object.yearActive == event.newData.yearActive){
              return object;
            }
          });
          if(parseInt(event.newData.numberValue) > parseInt(underLevel.numberValue)){
            event.confirm.resolve(event.newData);
            this.submit(event);
          }else{
            event.confirm.reject();
            window.alert("Percentage '"+ event.newData.descriptionrisk+"' must be bigger than '"+ underLevel.descriptionrisk +"'");
          }
        }
      }
    } else {
      window.alert("Maximum number exceeded");
      event.confirm.reject();
    }
  }

  submit(event?) {
    //console.log(event);
    event
      ? this.service
          .putreq("TbMOperationalImpacts", JSON.stringify(event.newData))
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
