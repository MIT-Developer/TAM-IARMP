import { Component, ViewChild, ElementRef } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { BackendService } from "../../../@core/data/backend.service";
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";
import * as rasterizeHTML from "rasterizehtml";
import { ReportApproveModalComponent } from "./approval/report.approve.modal.component";
import { UserCred } from "../../../@core/data/usercred";
import { OrderPipe } from "ngx-order-pipe";
@Component({
  selector: "ngx-chartjs",
  styleUrls: ["./chartjs.component.scss"],
  templateUrl: "./chartjs.component.html"
})
export class ChartjsComponent {
  @ViewChild("printEl") printEl: ElementRef;
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
      edit: true,
      delete: false,
      position: "right",
      columnTitle: "Modify",
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 30
    },
    columns: {
      riskNo: {
        title: "Risk No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      departmentKpi: {
        title: "Department KPI",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      lossEvent: {
        title: "Loss Event",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      caused: {
        title: "Cause",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      riskImpact: {
        title: "Risk Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      irImpact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      irLikelihood: {
        title: "Likelihood",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      irOverall: {
        title: "Overall",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      control: {
        title: "Cause",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      rdImpact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      rdLikelihood: {
        title: "Likelihood",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      rdOverall: {
        title: "Overall",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      treatmentPlan: {
        title: "Treatment Plan",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      exImpact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      exLikelihood: {
        title: "Likelihood",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      exOverall: {
        title: "Overall",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      exSchedule: {
        title: "Schedule",
        type: "date",
        filter: false,
        editable: true,
        width: "5%"
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
  dataInput = {
    division: {
      data: "",
      desc: ""
    },
    department: {
      data: "",
      desc: ""
    }
  };
  division: any;
  department: any;
  chartDivDept: any = {
    division: "",
    department: ""
  };
  divisionData: any[] = [];
  departmentData: any[] = [];
  departmentFilter: any[] = [];
  tabledata: any[] = [];
  fullData: any[] = [];
  fullDataList: any[] = [];
  riskArr: Array<any> = [
    {
      no: 1,
      riskNo: "",
      lossEvent: ""
    },
    {
      no: 2,
      riskNo: "",
      lossEvent: ""
    },
    {
      no: 3,
      riskNo: "",
      lossEvent: ""
    },
    {
      no: 4,
      riskNo: "",
      lossEvent: ""
    },
    {
      no: 5,
      riskNo: "",
      lossEvent: ""
    },
    {
      no: 6,
      riskNo: "",
      lossEvent: ""
    },
    {
      no: 7,
      riskNo: "",
      lossEvent: ""
    },
    {
      no: 8,
      riskNo: "",
      lossEvent: ""
    },
    {
      no: 9,
      riskNo: "",
      lossEvent: ""
    },
    {
      no: 10,
      riskNo: "",
      lossEvent: ""
    }
  ];
  effectivedata: any[] = [];
  moderatedata: any[] = [];
  ineffectivedata: any[] = [];
  weakdata: any[] = [];
  approvedata: any;
  tableapprove: any[] = [];

  svg: string;
  subscription: any;
  activeModal: any;

  tabActive: string;
  constructor(
    private orderPipe: OrderPipe,
    public usercred: UserCred,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
  }

  loadApprove() {
    this.service.getreq("TbRApproves").subscribe(response => {
      if (response != null) {
        const data = response;
        ////console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          this.tableapprove = data;
          ////console.log(this.tableapprove);
        });
        this.reloadApprove();
      }
    });
  }

  reloadApprove() {
    let year = moment().format("YYYY");
    let arr = this.tableapprove.filter(item => {
      return item.division == "ISTD";
    });
    // ////console.log(arr[0] != null);
    if (arr[0] != null) {
      ////console.log("masukapprove");
      this.approvedata = arr[0];
      ////console.log(this.approvedata);
    }
  }

  reload() {
    this.riskArr= [
      {
        no: 1,
        riskNo: "",
        lossEvent: ""
      },
      {
        no: 2,
        riskNo: "",
        lossEvent: ""
      },
      {
        no: 3,
        riskNo: "",
        lossEvent: ""
      },
      {
        no: 4,
        riskNo: "",
        lossEvent: ""
      },
      {
        no: 5,
        riskNo: "",
        lossEvent: ""
      },
      {
        no: 6,
        riskNo: "",
        lossEvent: ""
      },
      {
        no: 7,
        riskNo: "",
        lossEvent: ""
      },
      {
        no: 8,
        riskNo: "",
        lossEvent: ""
      },
      {
        no: 9,
        riskNo: "",
        lossEvent: ""
      },
      {
        no: 10,
        riskNo: "",
        lossEvent: ""
      }
    ];

    this.chartDivDept = {
      division: this.division,
      department: this.department
    };
    ////console.log(this.tabledata);
    this.tabledata = this.fullData.filter(item => {
      return (
        item.division == this.division &&
        item.department == this.department &&
        item.no &&
        (item.no >= 1 && item.no <= 10)
      );
    });
    this.tabledata = this.orderPipe.transform(this.tabledata, [
      "rdOverallScore",
      "irOverallScore",
      "exOverallScore"
    ]);
    this.fullDataList = this.fullData.filter(item => {
      return (
        item.division == this.division && item.department == this.department
      );
    });
    this.fullDataList = this.fullDataList.sort(function(a, b) {
      return a.no - b.no;
    });
    ////console.log(this.fullData);
    if (this.tabledata[0] != null) {
      this.processData(this.tabledata);
    } else {
      this.effectivedata = [];
      this.moderatedata = [];
      this.ineffectivedata = [];
      this.weakdata = [];
      this.riskArr.forEach(item => {
        item.riskNo = "";
        item.lossEvent = "";
      });
    }
  }

  onChangeTab(tab){
    this.tabActive = tab.tabTitle;
    console.log(this.tabActive);
  }

  showModal() {
    this.service.getreq("tbrapproves").subscribe(
      response => {
        let arr = response.filter(item => {
          return (
            item.yearActive == moment().format("YYYY") &&
            item.division == this.division &&
            item.department == this.department
          );
        });
        if (arr[0] != null) {
          let lastIndex = 0;
          for (let data in arr) {
            lastIndex <= arr[data].counterNo
              ? (lastIndex = arr[data].counterNo)
              : null;
          }
          let saveData = {
            yearActive: moment().format("YYYY"),
            division: this.division,
            department: this.department,
            counterNo: lastIndex + 1,
            stat: "SUBMIT",
            notes: "",
            userCreated: "Admin",
            datetimeCreated: moment().format(),
            userUpdated: "Admin",
            datetimeUpdated: moment().format()
          };

          this.activeModal = this.modalService.open(
            ReportApproveModalComponent,
            {
              windowClass: "xlModal",
              container: "nb-layout",
              backdrop: "static"
            }
          );

          this.activeModal.componentInstance.formData = {
            yearActive: moment().format("YYYY"),
            division: this.division,
            department: this.department,
            counterNo: lastIndex + 1,
            stat: "APPROVE",
            notes: "",
            userCreated: "Admin",
            datetimeCreated: moment().format(),
            userUpdate: "Admin",
            datetimeUpdate: moment().format(),
            status: "1"
          };

          this.activeModal.result.then(
            async response => {
              if (response != null) {
                // console.log(response);
                this.service.postreq("tbrapproves", response).subscribe(
                  response => {
                    this.toastr.success("Data Saved!");
                  },
                  error => {
                    this.toastr.error(
                      "Data Save Failed! Reason: " + error.statusText
                    );
                  }
                );
              }
            },
            error => {}
          );
        } else {
          this.toastr.error("Data Not Submitted Yet");
        }
      },
      error => {
        // this.toastr.error("Data Save Failed! Reason: " + error.statusText);
      }
    );
  }

  submit(event?) {
    event
      ? this.service
          .putreq("TbRApproves", JSON.stringify(event.newData))
          .subscribe(response => {
            //////console.log(JSON.stringify(event.newData));
            event.confirm.resolve(event.newData);
            error => {
              // ////console.log(error);
            };
          })
      : null;
    //////console.log(JSON.stringify(this.tabledata));
    this.tableapprove.forEach((element, ind) => {
      let index = ind;
      if (this.tableapprove[index].status == "1") {
        this.service
          .postreq("TbRApproves", this.tableapprove[index])
          .subscribe(response => {
            // ////console.log(response);
            this.tabledata[index].status = "0";
            error => {
              // ////console.log(error);
            };
          });
      }
      this.reloadApprove();
    });

    this.toastr.success("Data Saved!");
  }

  loadData() {
    this.service.getreq("Riskreports").subscribe(response => {
      if (response != null) {
        const data = response;
        this.fullData = data;
        this.service.getreq("tbmlibraries").subscribe(response => {
          if (response != null) {
            let arr = response.filter(item => {
              return item.condition == "DIV";
            });
            ////console.log(arr);
            this.divisionData = arr;
            this.division = this.divisionData[0];

            this.service.getreq("tbmdivdepts").subscribe(response => {
              if (response != null) {
                this.departmentData = response;
                this.reload();
              }
              // error => {
              //   ////console.log(error);
              // };
            });
          }
          // error => {
          //   ////console.log(error);
          // };
        });
      }
      // error => {
      //   ////console.log(error);
      // };
    });
  }

  processData(data) {
    for (let i = 0; i < 10; i++) {
      if (data[i] != null) {
        this.riskArr[i].riskNo = data[i].riskNo;
        this.riskArr[i].lossEvent = data[i].lossEvent;
      }
    }
    ////console.log(this.riskArr);
    data.forEach((element, ind) => {
      data[ind].yearActive = data[ind].yearActive.toString();
      data[ind].status = "0";
      this.tabledata = data;
      ////console.log(this.tabledata);
      let arr1 = this.tabledata.filter(item => {
        return item.efOverall === "Effective";
      });
      this.effectivedata = arr1;
      let arr2 = this.tabledata.filter(item => {
        return item.efOverall === "Moderate";
      });
      this.moderatedata = arr2;
      let arr3 = this.tabledata.filter(item => {
        return item.efOverall === "Ineffective";
      });
      this.ineffectivedata = arr3;
      let arr4 = this.tabledata.filter(item => {
        return item.efOverall === "Weak";
      });
      this.weakdata = arr4;
    });
  }

  filterDepartment() {
    ////console.log(JSON.stringify(this.division));
    let arr = this.departmentData.filter(item => {
      return item.kodeDivisi == this.division;
    });
    ////console.log(arr);
    if (arr[0] != null) {
      this.departmentFilter = arr;
      this.department = arr[0].kodeDepartment;
      this.reload();
    } else {
      ////console.log(arr);
      this.departmentFilter = [];
    }
  }
  // print(): void {
  //   let printContents, popupWin;
  //   printContents = document.getElementById("print-section");
  //   popupWin = window.frames["print-section"];
  //   popupWin.document.write('<body onload="window.print()">dddd</body>');
  //   popupWin.document.close();
  // }
  // printbro(printEl: HTMLElement) {
  //   let printContainer: HTMLElement = document.querySelector('#print-container');

  //   if (!printContainer) {
  //     printContainer = document.createElement('div');
  //     printContainer.id = 'print-container';
  //   }

  //   printContainer.innerHTML = '';

  //   let elementCopy = printEl.cloneNode(true);
  //   printContainer.appendChild(elementCopy);
  //   document.body.appendChild(printContainer);

  //   (window as any).print();
  // }
  print(id) {
    ////console.log(this.dataInput);
    let element = <HTMLScriptElement>document.getElementById(id);

    var divHeight = element.offsetHeight;
    var divWidth = element.offsetWidth;
    var ratio = divHeight / divWidth;
    // Create your table here (The dynamic table needs to be converted to canvas).

    html2canvas(element, {
      useCORS: true
    }).then((canvas: any) => {
      var width = canvas.width;
      var height = canvas.height;
      var imgData = canvas.toDataURL("image/png");
      let orientation = element.id == "print_tab1" ? "portrait" : "landscape";
      var doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [
          Math.floor(width * 0.264583) + 5,
          Math.floor(height * 0.264583) + 5
        ]
      });
      doc.addImage(canvas.toDataURL("image/PNG"), "PNG", 2, 2);
      doc.save(`Report-${Date.now()}.pdf`);
    });
  }

  printtext() {
    let doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(12, 10, "Report");

    // Create your table here (The dynamic table needs to be converted to canvas).
    let element = <HTMLScriptElement>(
      document.getElementsByClassName("print_report")[0]
    );
    html2canvas(element).then((canvas: any) => {
      doc.addImage(
        canvas.toDataURL("image/jpeg"),
        "JPEG",
        0,
        50,
        doc.internal.pageSize.width,
        element.offsetHeight / 5
      );
      doc.save(`Report-${Date.now()}.pdf`);
    });
  }

  heatmapRaster() {
    let doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(12, 10, "Report");
    var input = <HTMLScriptElement>document.getElementById("svgholder"),
      canvas = <HTMLCanvasElement>document.getElementById("liveDemoCanvas");
    var parser = new DOMParser();
    var docs = parser.parseFromString(this.svg, "image/svg+xml");
    let svg = docs.getElementsByTagName("svg")[0];
    svg.setAttribute("viewBox", "0,0,1000,1000");
    rasterizeHTML.drawDocument(docs, canvas).then(
      function(result) {},
      function(e) {
        ////console.log("demo II error", e);
      }
    );
  }
  savesvg(event) {
    ////console.log(event);
    this.svg = event;
    this.heatmapRaster();
  }

  insertSpace(data: string) {
    let arrString = [];

    if (data != null) {
      let lastPosition = 0;
      for (let i = 0; i <= data.length; i++) {
        if (data.slice(i - 1, i) == ",") {
          arrString.push(data.slice(lastPosition, i));
          lastPosition = i;
        }
        if (i == data.length) {
          arrString.push(data.slice(lastPosition, i));
        }
      }
    }
    return arrString;
  }

  insertSpace2(data: string) {
    let arrString = [];

    if (data != null) {
      let lastPosition = 0;
      for (let i = 0; i <= data.length; i++) {
        if (data.slice(i - 1, i) == "\n") {
          arrString.push(data.slice(lastPosition, i));
          lastPosition = i;
        }
        if (i == data.length) {
          arrString.push(data.slice(lastPosition, i));
        }
      }
    }
    return arrString;
  }

  canApprove() {
    return !(
      this.division == this.usercred.getUser().division &&
      this.department == this.usercred.getUser().department &&
      this.usercred.getUser().role == "DIV_HEAD"
    );
  }
}
