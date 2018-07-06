import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeptInputModalComponent } from "./modal/dept.input.modal.component"; // modal belum diedit
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
import { IMultiSelectOption } from "angular-2-dropdown-multiselect";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Angular2Csv } from "angular2-csv/Angular2-csv";
@Component({
  selector: "ngx-dept-input",
  templateUrl: "./dept.input.component.html"
})
export class DeptInputComponent {
  @ViewChild("myForm") private myForm: NgForm;
  buttonDisable: boolean;
  yearPeriode: any = moment().format("YYYY");

  optionsModel: number[];
  myOptions: IMultiSelectOption[];

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
        width: "80%",
        editor: {
          type: "textarea"
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
      data: "DEP",
      desc: "Department KPI"
    }
  ];

  division: any;
  department: any;

  source: LocalDataSource = new LocalDataSource();
  divisionData: any[] = [];
  departmentData: any[] = [];
  departmentFilter: any[] = [];
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
    this.service.getreq("TbMDeptInputs").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(JSON.stringify(response));
        let vCounter = 0;
        data.forEach((element, ind) => {
          let vLastIndex = 0;
          for (let vdata in data) {
            if (
              data[vdata].yearActive == element.yearActive &&
              data[vdata].division == element.division &&
              data[vdata].departement == element.departement
            ) {
              vLastIndex <= data[vdata].vCounterNo
                ? (vLastIndex = data[vdata].vCounterNo)
                : null;
            }
          }
          data[ind].vCounterNo = vLastIndex + 1;
        });
        this.tabledata = data;
        this.source.load(this.tabledata);

        this.service.getreq("tbmlibraries").subscribe(response => {
          if (response != null) {
            let arr = response.filter(item => {
              return item.condition == "DIV";
            });
            //console.log(arr);
            this.divisionData = arr;

            this.service.getreq("tbmdivdepts").subscribe(response => {
              if (response != null) {
                this.departmentData = response;
                this.division != null ? null : (this.division = arr[0].charId);
                //console.log(this.divisionData);

                this.filterDepartment();
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
      // error => {
      //   //console.log(error);
      // };
    });
  }
  ngAfterViewInit() { }

  showModal() {
    this.activeModal = this.modalService.open(DeptInputModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    let lastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].yearActive == this.yearPeriode &&
        this.tabledata[data].division == this.division &&
        this.tabledata[data].departement == this.department
      ) {
        lastIndex <= this.tabledata[data].counterNo
          ? (lastIndex = this.tabledata[data].counterNo)
          : null;
      }
    }

    let vLastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].yearActive == this.yearPeriode &&
        this.tabledata[data].division == this.division &&
        this.tabledata[data].departement == this.department
      ) {
        vLastIndex <= this.tabledata[data].vCounterNo
          ? (vLastIndex = this.tabledata[data].vCounterNo)
          : null;
      }
    }

    const deptInpId = this.comGenerate(lastIndex + 1);
    this.activeModal.componentInstance.formData = {
      yearActive: this.yearPeriode,
      condition: "DEP",
      counterNo: lastIndex + 1,
      vCounterNo: vLastIndex + 1,
      division: this.division,
      departement: this.department,
      deptInpId: deptInpId,
      description: "",
      flagActive: "Y",
      userCreated: "Admin",
      datetimeCreated: moment().format(),
      userUpdate: "Admin",
      datetimeUpdate: moment().format(),
      status: "1"
    };

    this.activeModal.result.then(
      async response => {
        if (response != false) {
          this.tabledata.push(response);
          this.refreshReload();
          this.submit();
        }
      },
      error => { }
    );
  }

  comGenerate(lastIndex) {
    switch (lastIndex.toString().length) {
      case 3:
        return this.division + "-" + this.department + lastIndex.toString();

      case 2:
        return this.division + "-" + this.department + lastIndex.toString();

      case 1:
        return this.division + "-" + this.department + lastIndex.toString();
    }
  }

  reload() {
    //console.log(this.division);
    this.source.setFilter(
      [
        { field: "yearActive", search: this.yearPeriode },
        { field: "division", search: this.division },
        { field: "departement", search: this.department }
      ],
      true
    );
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
          width: "90%",
          editor: {
            type: "textarea"
          }
        }
      }
    };
    switch (this.yearPeriode) {
      case moment().format("YYYY"):
        this.buttonDisable = false;
        break;
      default:
        this.buttonDisable = true;
    }
  }

  refreshReload() {
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
          width: "90%",
          editor: {
            type: "textarea"
          }
        }
      }
    };
    switch (this.yearPeriode) {
      case moment().format("YYYY"):
        this.buttonDisable = false;
        break;
      default:
        this.buttonDisable = true;
    }
  }

  filterDepartment() {
    //console.log(JSON.stringify(this.division));
    let arr = this.departmentData.filter(item => {
      return item.kodeDivisi == this.division;
    });
    //console.log(arr);
    if (arr[0] != null) {
      this.departmentFilter = arr;
      this.department = arr[0].kodeDepartment;
      this.reload();
    } else {
      //console.log(arr);
      this.departmentFilter = [];
    }
  }

  submit(event?) {
    event
      ? this.service
        .putreq("TbMDeptInputs", JSON.stringify(event.newData))
        .subscribe(response => {
          //console.log(JSON.stringify(event.newData));
          event.confirm.resolve(event.newData);
          error => {
            //console.log(error);
          };
        })
      : null;
    //console.log(JSON.stringify(this.tabledata));
    this.tabledata.forEach((element, ind) => {
      let index = ind;
      if (this.tabledata[index].status == "1") {
        this.service
          .postreq("TbMDeptInputs", this.tabledata[index])
          .subscribe(response => {
            //console.log(response);
            this.tabledata[index].status = "0";
            error => {
              //console.log(error);
            };
          });
      }
    });

    this.toastr.success("Data Saved!");
  }

  onSaveConfirm(event) {
    if (event.newData.description != "") {
      event.confirm.resolve(event.newData);
      this.submit(event);
    } else {
      event.confirm.reject();
    }
  }

  deleteControl(event) {
    if (window.confirm("Are you sure you want to delete?")) {


      const savedData = {
        yearActive: event.data.yearActive,

        deptInpId: event.data.deptInpId
      };

      this.service.postreq("TbMdeptinputs/deletecontrol", savedData).subscribe(
        response => {
          //console.log(response);
          this.loadData();
          this.toastr.success("Data Deleted!");
          event.confirm.resolve();
        },
        error => {
          //console.log(error);
          this.toastr.error("Draft Delete Failed! Reason: " + error.statusText);
          event.confirm.reject();
        }
      );
    } else {
      event.confirm.reject();
    }
  }
}
