import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompanyInputModalComponent } from "./modal/company.input.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
@Component({
  selector: "ngx-company-input",
  templateUrl: "./company.input.component.html"
})
export class CompanyInputComponent {
  selectedData: any;
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
      description: {
        title: "Description",
        type: "string",
        filter: false,
        editable: true,
        width: "80%",
        editor: {
          type: "textarea"
        }
      },
      flagActive: { title: 'Status', 
      type: 'html', width: "15%", 
      editor:
       { type: 'list', config: 
       { list: [{ value: 'Active', title: 'Active' }, 
       { value: 'Inactive', title: 'Inactive' }] } } }
    }
  };
  year: any[] = [
    {
      data: moment().subtract(9,'years').format("YYYY")
    },
    {
      data: moment().subtract(8,'years').format("YYYY")
    },
    {
      data: moment().subtract(7,'years').format("YYYY")
    },
    {
      data: moment().subtract(6,'years').format("YYYY")
    },
    {
      data: moment().subtract(5,'years').format("YYYY")
    },
    {
      data: moment().subtract(4,'years').format("YYYY")
    },
    {
      data: moment().subtract(3,'years').format("YYYY")
    },
    {
      data: moment().subtract(2,'years').format("YYYY")
    },
    {
      data: moment().subtract(1,'years').format("YYYY")
    },
    {
      data: moment().format("YYYY")
    }
  ];
  condition: any[] = [
    {
      data: "OBJ",
      desc: "Company Objectives"
    },
    {
      data: "KPI",
      desc: "Company KPI"
    },
    {
      data: "BP",
      desc: "Company BP"
    }
  ];
  source: LocalDataSource = new LocalDataSource();

  tabledata: any[] = [];

  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.buttonDisable= false;
    this.loadData();
  }
  loadData() {
    this.service.getreq("TbMComInputs").subscribe(response => {
      if (response != null) {
        const data = response;
       // //console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          this.tabledata = data;
          this.source.load(this.tabledata);
        });
      }
      // error => {
      //   //console.log(error);
      // };
    });
  }
  ngAfterViewInit() {
    this.source
      .load(this.tabledata)
      .then(resp => {
        this.myForm.setValue({
          condition: "OBJ",

          yearPeriode: moment().format("YYYY")
        });
      })
      .then(resp => {
        this.reload();
      });

   // //console.log(this.myForm.value.condition);
  }

  showModal() {
    this.activeModal = this.modalService.open(CompanyInputModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    let lastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].yearActive == this.myForm.value.yearPeriode &&
        this.tabledata[data].condition == this.myForm.value.condition
      ) {
        lastIndex <= this.tabledata[data].counterNo
          ? (lastIndex = this.tabledata[data].counterNo)
          : null;
      }
    }

    const comInpId = this.comGenerate(lastIndex + 1);
    this.activeModal.componentInstance.condition = this.condition;
    this.activeModal.componentInstance.formData = {
      yearActive: this.myForm.value.yearPeriode,
      condition: this.myForm.value.condition,
      counterNo: lastIndex + 1,
      comInpId: comInpId,
      description: "",
      flagActive: "Active",
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
          this.submit();
          this.reload();
        }
      },
      error => {}
    );
  }

  comGenerate(lastIndex) {
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
        description: {
          title: "Description",
          type: "string",
          filter: false,
          editable: true,
          width: "80%",
          editor: {
            type: "textarea"
          }
          
        },
        flagActive: { title: 'Status', 
      type: 'html', width: "15%", 
      editor:
       { type: 'list', config: 
       { list: [{ value: 'Active', title: 'Active' }, 
       { value: 'Inactive', title: 'Inactive' }] } } }
      }
    };
    this.source.setFilter(
      [
        { field: "condition", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode }
      ],
      true
    );
    switch (this.myForm.value.yearPeriode) {
      case moment().format('YYYY'):
        this.buttonDisable =false;
        break;
      default:
      this.buttonDisable =true;
    }
  }

  refreshSelected(event) {
    this.selectedData = event.data;
    //console.log(this.selectedData);
  }

  onSaveConfirm(event) {
    if (event.newData.description!='') {
      event.confirm.resolve(event.newData);
      this.submit(event);
    } else {
      event.confirm.reject();
    }
  }

  submit(event?) {
    event
      ? this.service
          .putreq("TbMComInputs", JSON.stringify(event.newData))
          .subscribe(response => {
            ////console.log(JSON.stringify(event.newData));
            event.confirm.resolve(event.newData);
            error => {
             // //console.log(error);
            };
          })
      : null;
    ////console.log(JSON.stringify(this.tabledata));
    this.tabledata.forEach((element, ind) => {
      let index = ind;
      if (this.tabledata[index].status == "1") {
        //console.log(this.tabledata[index])
        this.service
          .postreq("TbMComInputs", this.tabledata[index])
          .subscribe(response => {
           // //console.log(response);
            this.tabledata[index].status = "0";
            error => {
             // //console.log(error);
            };
          });
      }
      this.reload();
    });

    this.toastr.success("Data Saved!");
  }
}
