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
  templateUrl: "./update.risk.component.html"
})
export class UpdateRiskComponent {
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
      delete: false
    },
    pager: {
      display: true,
      perPage: 30
    },
    columns: {
      draftKey: {
        title: "No",
        type: "text",
        filter: false,
        editable: false,
        width: "30%"
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
    public router: Router
  ) {
    this.buttonDisable = false;
    this.loadData();
  }
  loadData() {
    this.service.getreq("Draftrisks").subscribe(response => {
      if (response != null) {
        const data = response;
        this.tabledata = data;
        this.source.load(this.tabledata);
      }
      // error => {
      //   //console.log(error);
      // };
    });
    this.source = this.source.setFilter(
      [
        { field: "type", search: 'RISK' },
        { field: "year", search: moment().format('YYYY') }
      ],
      true
    );
  }
  ngAfterViewInit() {
    this.source.load(this.tabledata);
  }

  reload() {}
  submit(event?) {
    this.goToPage();
  }

  refreshSelected(event) {
    this.selectedData = event.data;
  }
  goToPage() {
    //console.log(this.selectedData);
    let selectedData=this.selectedData;
    this.router.navigate(["/pages/transaction/risk-register"], {
      queryParams: {
        draftKey: selectedData.draftKey,
        draftJson: selectedData.draftJson
      }
    });
  }
}
