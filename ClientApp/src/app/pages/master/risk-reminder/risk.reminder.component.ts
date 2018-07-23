import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RiskReminderModalComponent } from "./modal/risk.reminder.modal.component";
import { RiskReminderManualComponent } from "./modal/risk.reminder.manual.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
@Component({
  selector: "ngx-risk-reminder",
  templateUrl: "./risk.reminder.component.html"
})
export class RiskReminderComponent {
  @ViewChild("myForm") private myForm: NgForm;
  buttonDisable: boolean;
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
      edit: true,
      delete: true,
      position: "right",
      columnTitle: "Edit",
      width: "5%"
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      vCounter: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      startDate: {
        title: "Start Date",
        type: "date",
        filter: false,
        editable: true,
        width: "40%"
      },
      endDate: {
        title: "End Date",
        type: "date",
        filter: false,
        editable: true,
        width: "40%"
      },
      period: {
        title: "Periode",
        type: "number",
        filter: false,
        editable: true,
        width: "10%"
      }
    }
  };
  source: LocalDataSource = new LocalDataSource();
  condition: any[] = [
    {
      data: "APR",
      desc: "Approval"
    },
    {
      data: "SUB",
      desc: "Submit"
    }
  ];
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
  tabledata: any[] = [];

  senddata: any[] = [];

  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
  }

  ngOnInit() {}

  loadData() {
    this.service.getreq("TbMRiskReminders").subscribe(response => {
      if (response != null) {
        const data = response;
        // console.log(JSON.stringify(response));
        let counter = 1;
        let countAPR = 0;
        let countSum = 0;
        data.forEach((element, ind) => {
          if(element.typeReminder == 'APR'){
            countAPR = countAPR +1;
            element.vCounter = countAPR;//counter;
          }else if(element.typeReminder == 'SUB'){
            countSum = countSum + 1;
            element.vCounter = countSum;//counter;
          }
          element.yearActive = element.yearActive.toString();
          element.status = "0";
          //counter = counter + 1;
          element.startDate = moment(element.startDate).format("DD/MM/YYYY");
          element.endDate = moment(element.endDate).format("DD/MM/YYYY");
        });
        this.tabledata = data;
        this.source.load(this.tabledata);
      }
      // error => {
      //   console.log(error);
      // };
    });
  }

  loadManual() {
    this.service.getreq("TbRSendmails").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          this.senddata = data;
        });
      }
      // error => {
      //   console.log(error);
      // };
    });
  }

  ngAfterViewInit() {
    this.source
      .load(this.tabledata)
      .then(resp => {
        this.myForm.setValue({
          condition: "SUB",
          yearPeriode: moment().format("YYYY")
        });
      })
      .then(resp => {
        this.reload();
      });

    //console.log(this.myForm.value.condition);
  }

  showModal() {
    this.activeModal = this.modalService.open(RiskReminderModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    let lastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].yearActive == this.myForm.value.yearPeriode &&
        this.tabledata[data].typeReminder == this.myForm.value.condition
      ) {
        lastIndex < this.tabledata[data].counterNo
          ? (lastIndex = this.tabledata[data].counterNo)
          : null;
      }
    }

    let vLastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].yearActive == this.myForm.value.yearPeriode &&
        this.tabledata[data].typeReminder == this.myForm.value.condition
      ) {
        vLastIndex < this.tabledata[data].vCounter
          ? (vLastIndex = this.tabledata[data].vCounter)
          : null;
      }
    }

    const indicator = this.indicatorGenerate(lastIndex + 1);

    this.activeModal.componentInstance.formData = {
      counterNo: lastIndex + 1,
      vCounter: vLastIndex + 1,
      yearActive: this.myForm.value.yearPeriode,
      typeReminder: this.myForm.value.condition,
      startDate: "",
      endDate: "",
      //indicatorId: indicator,
      period: "",
      UserCreated: "admin",
      DatetimeCreated: moment().format(),
      UserUpdate: "admin",
      DatetimeUpdate: moment().format(),
      status: "1"
    };

    this.activeModal.result.then(async response => {
      if (response != false) {
        let data = response;
        data.startDate = moment(data.startDate).format("DD/MM/YYYY");
        data.endDate = moment(data.endData).format("DD/MM/YYYY");
        this.tabledata.push(response);
        console.log(this.tabledata);
        this.submit();
        this.reload();
      }
    });
  }

  showManual() {
    this.activeModal = this.modalService.open(RiskReminderManualComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    let lastIndex = 0;
    for (let data in this.senddata) {
      if (this.tabledata[data].yearActive == this.myForm.value.yearPeriode) {
        lastIndex < this.tabledata[data].counterNo
          ? (lastIndex = this.tabledata[data].counterNo)
          : null;
      }
    }

    const indicator = this.indicatorGenerate(lastIndex + 1);

    this.activeModal.componentInstance.formData = {
      counter: lastIndex + 1,
      yearActive: this.myForm.value.yearPeriode,
      typeSend: "Manual",
      //indicatorId: indicator,
      body: "",
      usersend: "admin",
      dateSend: moment().format(),
      status: "1"
    };

    this.activeModal.result.then(async response => {
      if (response != false) {
        this.senddata.push(response);
        console.log(this.senddata);
        this.submit();
        this.reload();
      }
    });
  }

  indicatorGenerate(lastIndex) {
    switch (lastIndex.toString().length) {
      case 3:
        return this.myForm.value.condition + lastIndex.toString();

      case 2:
        return this.myForm.value.condition + "0" + lastIndex.toString();

      case 1:
        return this.myForm.value.condition + "00" + lastIndex.toString();
    }
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
        delete: true,
        position: "right",
        columnTitle: "Edit",
        width: "5%"
      },
      pager: {
        display: true,
        perPage: 5
      },
      columns: {
        vCounter: {
          title: "No",
          type: "number",
          filter: false,
          editable: false,
          width: "5%"
        },
        startDate: {
          title: "Start Date",
          type: "date",
          filter: false,
          editable: true,
          width: "40%"
        },
        endDate: {
          title: "End Date",
          type: "date",
          filter: false,
          editable: true,
          width: "40%"
        },
        period: {
          title: "Periode",
          type: "number",
          filter: false,
          editable: true,
          width: "10%"
        }
      }
    };
    this.source.setFilter(
      [
        { field: "typeReminder", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode }
      ],
      true
    );
    switch (this.myForm.value.yearPeriode) {
      case moment().format("YYYY"):
        this.buttonDisable = false;
        break;
      default:
        this.buttonDisable = true;
    }
  }
  submit(event?) {
    if (event) {
      let dataToBeUpdated = event.newData;

      dataToBeUpdated.startDate = moment(
        dataToBeUpdated.startDate,
        "DD/MM/YYYY"
      ).format();
      dataToBeUpdated.endDate = moment(
        dataToBeUpdated.endDate,
        "DD/MM/YYYY"
      ).format();
      console.log(JSON.stringify(dataToBeUpdated));
      if(dataToBeUpdated.endData > dataToBeUpdated.startDate){
        this.service.putreq("TbMRiskReminders", dataToBeUpdated).subscribe(
          response => {
            console.log(JSON.stringify(dataToBeUpdated));
            event.confirm.resolve();
            this.toastr.success("Data Saved!");
          },
          error => {
            event.confirm.reject(event.newData);
            this.toastr.error("Data Delete Failed! Reason: " + error.statusText);
          }
        );  
      }else{
        event.confirm.reject(event.newData);
        this.toastr.error("Date invalid! : End Date must be more than Start Date");
      }
      
    }
    console.log(JSON.stringify(this.tabledata));
    this.tabledata.forEach((element, ind) => {
      let index = ind;
      if (this.tabledata[index].status == "1") {
        let dataToBeSaved = this.tabledata[index];
        dataToBeSaved.startDate = moment(
          dataToBeSaved.startDate,
          "DD/MM/YYYY"
        ).format();
        dataToBeSaved.endDate = moment(
          dataToBeSaved.endDate,
          "DD/MM/YYYY"
        ).format();
        this.service.postreq("TbMRiskReminders", dataToBeSaved).subscribe(
          response => {
            console.log(response);
            this.tabledata[index].status = "0";
            this.toastr.success("Data Saved!");
            this.loadData();
          },
          error => {
            this.toastr.error("Data Save Failed! Reason: " + error.statusText);
          }
        );
      }
    });
  }

  deleteControl(event) {
    if (window.confirm("Are you sure you want to delete?")) {
    const savedData = {
      yearActive: event.data.yearActive,
      typeReminder: event.data.typeReminder,
      counterNo: event.data.counterNo,
      startDate: moment(event.data.startDate, "DD/MM/YYYY").format(),
      endDate: moment(event.data.endDate, "DD/MM/YYYY").format(),
      period: event.data.period,
      userCreated: event.data.userCreated,
      datetimeCreate: event.data.datetimeCreate,
      userUpdated: event.data.userUpdated,
      datetimeUpdated: event.data.datetimeUpdated
    };
    this.service.postreq("TbMRiskReminders/deletecontrol", savedData).subscribe(
      response => {
        console.log(response);
        this.loadData();
        this.toastr.success("Data Deleted!");
        event.confirm.resolve();
      },
      error => {
        console.log(error);
        this.toastr.error("Data Delete Failed! Reason: " + error.statusText);
        event.confirm.resolve();
      }
    );
  } else {
    event.confirm.reject();
  }
  }
  
}
