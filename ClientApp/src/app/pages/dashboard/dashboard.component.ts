import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { BackendService } from "../../@core/data/backend.service";
import { DashboardModalComponent } from "./modal/dashboard.modal.component";
import { Router } from "@angular/router";
import { Angular2Csv } from "angular2-csv/Angular2-csv";
import { Angular5Csv } from "angular5-csv/Angular5-csv";
import * as XLSX from "xlsx";
import { ToastrService } from "ngx-toastr";
import { filter } from "rxjs/operator/filter";
import { UserCred } from "../../@core/data/usercred";
import  Highcharts from 'highcharts';
import 'highcharts-more';

@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {
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
      no: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "10%"
      },
      riskNo: {
        title: "Risk No",
        type: "string",
        filter: false,
        editable: true,
        width: "30%",
        editor: {
          type: "textarea"
        }
      },
      lossEvent: {
        title: "Loss Event",
        type: "string",
        filter: false,
        editable: true,
        width: "40%",
        editor: {
          type: "textarea"
        }
      }
    }
  };

  riskStatus: string = "";
  popoverStatus: string = "";
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
  division: any;
  department: any;

  divisionData: any[] = [];
  departmentData: any[] = [];

  departmentFilter: any[] = [];
  source: LocalDataSource = new LocalDataSource();

  tabledata: any[] = [];
  tableapprove: any[] = [];
  dataapprove: any;
  fullData: any[] = [];

  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    public service: BackendService,
    public router: Router,
    private toastr: ToastrService,
    public usercred: UserCred
  ) {
    //console.log(this.usercred.getUser());
    this.buttonDisable = false;
    this.loadData();
    this.loadApprove();
  }
  loadData() {
    this.service.getreq("TbRRiskAssessments").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(JSON.stringify(response));

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
                this.fullData = data;
                this.reload();
                this.loadStatus();
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

  ngOnInit(){

     Highcharts.chart('negative', {

       chart: {
          polar: true
        },

        title: {
          text: 'Highcharts Polar Chart'
        },

        pane: {
          startAngle: 1,
          endAngle: 360
        },

        xAxis: {
          tickInterval: 45,
          min: 0,
          max: 360,
          labels: {
            formatter: function () {
              return this.value + '°';
            }
          }
        },

        yAxis: {
          min: 0
        },

        plotOptions: {
          series: {
            pointStart: 0,
            pointInterval: 45
          },
          column: {
            pointPadding: 0,
            groupPadding: 0
          }
        },

        series: [{
          type: 'column',
          name: 'Column',
          data: [8, 7, 6, 5, 4, 3, 2, 1],
          pointPlacement: 'between'
        }, {
          type: 'line',
          name: 'Line',
          data: [1, 2, 3, 4, 5, 6, 7, 8]
        }, {
          type: 'area',
          name: 'Area',
          data: [1, 8, 2, 7, 3, 6, 4, 5]
        }]
      });
     Highcharts.chart('area', {

        chart: {
        type: 'area'
          },
          title: {
              text: 'Area chart with negative values'
          },
          xAxis: {
              categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
          },
          credits: {
              enabled: false
          },
          series: [{
              name: 'John',
              data: [5, 3, 4, 7, 2]
          }, {
              name: 'Jane',
              data: [2, -2, -3, 2, 1]
          }, {
              name: 'Joe',
              data: [3, 4, 4, -2, 5]
          }]
      });
     Highcharts.chart('heatmap', {

       chart: {
          type: 'heatmap',
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1
        },


        title: {
          text: 'Sales per employee per weekday'
        },

        xAxis: {
          categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
        },

        yAxis: {
          categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          title: null
        },

        colorAxis: {
          min: 0,
          minColor: '#FFFFFF',
          maxColor: Highcharts.getOptions().colors[0]
        },

        legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 280
        },

        tooltip: {
          formatter: function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
              this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
          }
        },

        series: [{
          name: 'Sales per employee',
          borderWidth: 1,
          data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
          dataLabels: {
            enabled: true,
            color: '#000000'
          }
        }]

      });
  }

  refreshData() {
    this.service.getreq("TbRRiskAssessments").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(JSON.stringify(response));

        this.fullData = data;
        this.reload();
      }
      // error => {
      //   //console.log(error);
      // };
    });
  }

  loadApprove() {
    this.service.getreq("TbRApproves").subscribe(response => {
      if (response != null) {
        const data = response;
        let find = 0;
        //console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          this.tableapprove = data;
          find = find + 1;
          //console.log(this.tableapprove);
          //console.log("liatapprove");
        });
        //this.reloadApprove();

        this.dataapprove = this.tableapprove[find - 1];
        //console.log("dataapprove");
        //console.log(this.dataapprove);
      }
    });
  }

  ngAfterViewInit() {
    this.source.load(this.tabledata);
    // document.getElementsByClassName("column_name")["0"].style.width = "100px";
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
    //console.log(this.department);
    this.loadStatus();
    // switch (this.dataapprove.stat) {
    //   case "submit":
    //     this.riskstat = "Submit";
    //     break;
    //   default:
    //     this.riskstat = "Not Yet Submitted";
    // }
    this.tabledata = this.fullData.filter(item => {
      return (
        item.division == this.division && item.department == this.department
      );
      
    }
  );
  
  console.log(this.fullData)
  console.log(this.tabledata)

    this.tabledata = this.tabledata.sort(function(a, b) {
      return a.no - b.no;
    });
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

  submit(event?) {
    event
      ? this.service
          .putreq("TbMComInputs", JSON.stringify(event.newData))
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
          .postreq("TbMComInputs", this.tabledata[index])
          .subscribe(response => {
            //console.log(response);
            this.tabledata[index].status = "0";
            error => {
              //console.log(error);
            };
          });
      }
    });
  }
  showModal(data) {
    this.activeModal = this.modalService.open(DashboardModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.formData = {
      finImpactCategory: data.finImpactCategory,
      finAmountIr: data.finAmountIr,
      opAmountIr: data.opAmountIr,
      opImpactCategory: data.opImpactCategory,
      finImpactRd: data.finImpactRd,
      finAmountRd: data.finAmountRd,
      opImpactRd: data.opImpactRd,
      opAmountRd: data.opAmountRd,
      qlImpactIr: data.qlImpactIr,
      qlImpactRd: data.qlImpactRd,
      irLikelihood: data.irLikelihood,
      rdLikelihood: data.rdLikelihood
    };
    /*console.log({
      finImpactCategory: data.finImpactCategory,
      finAmountIr: data.finAmountIr,
      opAmountIr: data.opAmountIr,
      opImpactCategory: data.opImpactCategory,
      finImpactRd: data.finImpactRd,
      finAmountRd: data.finAmountRd,
      opImpactRd: data.opImpactRd,
      opAmountRd: data.opAmountRd,
      qlImpactIr: data.qlImpactIr,
      qlImpactRd: data.qlImpactRd,
      irLikelihood: data.irLikelihood,
      rdLikelihood: data.rdLikelihood
    });*/
  }

  saveCSV() {
    //console.log(this.tabledata);
    var options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: false /*,
      headers: ['Year', 'No', 'Risk No',]*/
    };

    new Angular2Csv(this.tabledata, "My Report", options);
  }
  goToPage(riskno) {
    this.service.getreq("Draftrisks").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(data);
        let datafound = false;
        response.forEach(element => {
          if (element.draftKey == riskno) {
            this.router.navigate(["/pages/transaction/risk-register"], {
              queryParams: {
                draftKey: element.draftKey,
                draftJson: element.draftJson
              }
            });
            datafound = true;
          }
        });
      } else {
        this.toastr.error("Draft doesn't exist!");
      }
      // error => {
      //   //console.log(error);
      // };
    });
  }

  public addNewRisk() {
    this.router.navigate(["/pages/transaction/risk-register"]);
  }

  public exportAsExcelFile(excelFileName: string): void {
    let element = <HTMLScriptElement>document.getElementById("print_table");
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    XLSX.writeFile(workbook, `Report-${Date.now()}.xlsx`);
  }

  deleteControl(event) {
    if (window.confirm("Are you sure you want to delete?")) {
      const savedData = {
        yearActive: event.yearActive,

        riskNo: event.riskNo
      };
      ////console.log(event);
      ////console.log(savedData);
      this.service
        .postreq("TbRRiskAssessments/deletecontrol", savedData)
        .subscribe(
          response => {
            ////console.log(response);
            this.refreshData();
            this.toastr.success("Data Deleted!");
          },
          error => {
            ////console.log(error);
            this.toastr.error(
              "Data Delete Failed! Reason: " + error.statusText
            );
          }
        );
    } else {
      event.confirm.reject();
    }
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

  canSubmit() {
    return !(
      this.division == this.usercred.getUser().division &&
      this.department == this.usercred.getUser().department &&
      this.usercred.getUser().role == "DEPT_HEAD"
    );
  }

  submitRisk() {
    this.service.getreq("tbrapproves").subscribe(
      response => {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
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
            yearActive: this.yearPeriode,
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

          this.service.postreq("tbrapproves", saveData).subscribe(
            response => {
              this.toastr.success("Risk Berhasil disubmit");
              this.loadStatus();
            },
            error => {
              this.toastr.error(
                "Data Save Failed! Reason: " + error.statusText
              );
            }
          );
        } else {
          let saveData = {
            yearActive: this.yearPeriode,
            division: this.division,
            department: this.department,
            counterNo: 1,
            stat: "SUBMIT",
            notes: "",
            userCreated: "Admin",
            datetimeCreated: moment().format(),
            userUpdated: "Admin",
            datetimeUpdated: moment().format()
          };

          this.service.postreq("tbrapproves", saveData).subscribe(
            response => {
              this.toastr.success("Data Saved!");
              this.loadStatus();
            },
            error => {
              this.toastr.error(
                "Data Save Failed! Reason: " + error.statusText
              );
            }
          );
        }
      },
      error => {
        this.toastr.error("Data Save Failed! Reason: " + error.statusText);
      }
    );
  }

  loadStatus() {
    this.service.getreq("tbrapproves").subscribe(
      response => {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
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
          let arrFilter = arr.filter(item => {
            return item.counterNo == lastIndex;
          });

          this.riskStatus = arrFilter[0].stat;
          this.popoverStatus = arrFilter[0].notes;
        } else {
          this.riskStatus = "NOT SUBMITTED";
          this.popoverStatus = "";
        }
      },
      error => {}
    );
  }
}
//   private saveAsExcelFile(buffer: any, fileName: string): void {
//     const data: Blob = new Blob([buffer], {
//       type: EXCEL_TYPE
//     });
//     var today = new Date();
//     var date =
//       today.getFullYear() +
//       "" +
//       (today.getMonth() + 1) +
//       "" +
//       today.getDate() +
//       "_";
//     var time =
//       today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
//     var name = fileName + date + time;
//     FileSaver.saveAs(data, name + EXCEL_EXTENSION);
//   }
// }
