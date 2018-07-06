import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
import { Router } from "@angular/router";
@Component({
  selector: "ngx-view-draft",
  templateUrl: "./view.draft.component.html"
})
export class ViewDraftComponent {
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
      edit: false,
      delete: true,
      position: "right",
      columnTitle: "Delete",
      width: "5%"
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      draftKey: {
        title: "No",
        type: "text",
        filter: false,
        editable: false,
        width: "35%"
      },
      dateCreated: {
        title: "Date Created",
        type: "text",
        filter: false,
        editable: false,
        width: "30%"
      },
      dateUpdated: {
        title: "Date Updated",
        type: "string",
        filter: false,
        editable: false,
        width: "30%"
      }
    }
  };
  divisionData: any[] = [];
  departmentData: any[] = [];
  departmentFilter: any[] = [];
  selectedData: any;
  division: any[] = [
    {
      data: "ISTD",
      desc: "Information system and technical division"
    }
  ];
  department: any[] = [
    {
      data: "IS",
      desc: "Information system"
    }
  ];

  source: LocalDataSource = new LocalDataSource();

  tabledata: any[] = [];

  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    public service: BackendService,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.buttonDisable = false;
    this.loadData();
  }
  loadData() {
    this.service.getreq("Draftrisks").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(data);
        data.forEach(item => {
          item.dateCreated = moment(item.dateCreated).format("DD/MM/YYYY");
          item.dateUpdated = moment(item.dateUpdated).format("DD/MM/YYYY");
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
            this.division = this.divisionData[0];

            this.service.getreq("tbmdivdepts").subscribe(response => {
              if (response != null) {
                this.departmentData = response;
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
    this.source = this.source.setFilter(
      [
        { field: "type", search: "DRAFT" },
        { field: "year", search: moment().format("YYYY") },
        { field: "division", search: this.division },
        { field: "department", search: this.department }
      ],
      true
    );
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
      this.reload();
    }
  }
  ngAfterViewInit() {
    this.source.load(this.tabledata);
  }

  reload() {
    this.source = this.source.setFilter(
      [
        { field: "type", search: "DRAFT" },
        { field: "year", search: moment().format("YYYY") },
        { field: "division", search: this.division },
        { field: "department", search: this.department }
      ],
      true
    );
  }
  submit(event?) {
    this.goToPage();
  }

  refreshSelected(event) {
    this.selectedData = event.data;
  }
  goToPage() {
    //console.log(this.selectedData);
    let selectedData = this.selectedData;
    this.router.navigate(["/pages/transaction/risk-register"], {
      queryParams: {
        draftKey: selectedData.draftKey,
        draftJson: selectedData.draftJson
      }
    });
  }

  deleteControl(event) {
    if (window.confirm("Are you sure you want to delete?")) {
      this.tabledata.forEach((element, ind) => {
        element.draftKey == event.data.draftKey ? (element.type = "RISK") : null;
      });
      const savedData = {
        draftKey: event.data.draftKey,
        draftJson: event.data.draftJson,
        division: event.data.division,
        department: event.data.department,
        type: "RISK",
        year: moment().format("YYYY"),
        userUpdated: "Admin",
        dateUpdated: moment().format(),
        userCreated: event.data.userCreated,
        dateCreated: moment().format()
      };
      //console.log(savedData);
      this.service.putreq("draftrisks", savedData).subscribe(
        response => {
          //console.log(response);
          this.toastr.success("Draft Deleted!");
          event.confirm.resolve();
        },
        error => {
          //console.log(error);
          this.toastr.error("Draft Delete Failed! Reason: " + error.statusText);
        }
      );
    } else {
      event.confirm.reject();
    }
  }
}
