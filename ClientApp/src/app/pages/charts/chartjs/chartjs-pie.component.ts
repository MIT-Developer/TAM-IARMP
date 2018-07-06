import { Component, OnDestroy, OnInit, ViewChild, Input } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
@Component({
  selector: "ngx-chartjs-pie",
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `
})
export class ChartjsPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  @ViewChild("chartContainer") container;
  private heatData: any = [];

  @Input()
  set dataset(value: any) {
    ////console.log(value);
    this.loadData(value);
  }
  tabledata: any[] = [
    {
      ctrEff: 0,
      ctrMod: 0,
      ctrIff: 0,
      ctrWeak: 0
    }
  ];

  chartdata: any;
  constructor(private theme: NbThemeService, public service: BackendService) {}

  loadData(data) {
    this.service.getreq("ControlEffectivenesses").subscribe(response => {
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.division == data.division && item.department == data.department
          );
        });

        arr[0] != null
          ? (this.chartdata = arr[0])
          : (this.chartdata = {
              ctrEff: 0,
              ctrMod: 0,
              ctrIff: 0,
              ctrWeak: 0
            });

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          //////console.log("tes");

          this.data = {
            datasets: [
              {
                data: [
                  this.chartdata.ctrEff,
                  this.chartdata.ctrMod,
                  this.chartdata.ctrIff,
                  this.chartdata.ctrWeak
                ],

                backgroundColor: ["#a9d9bc", "#ECFF00", "#F02602", "#ec7ea3"]
              }
            ],
            labels: ["Effective        ", "Moderate        ", "Ineffective        ", "Weak        "]
          };

          this.options = {
            plugins: {
              datalabels: {
                anchor: "center",
                align: "center",
                formatter: Math.round,
                font: {
                  weight: "bold"
                },
                color: function(context) {
                  var index = context.dataIndex;
                  var value = context.dataset.data[index];
                  return value < 1 ? "transparent" : chartjs.textColor;
                }
              }
            },
            legend: {
              position: "bottom",
              display: true,
              labels: {
                fontColor: chartjs.textColor
              }
            },
            tooltips: {
              enabled: true
            },
            title: {
              fontSize:20,
              display: true,
              text: "Control Effectiveness"
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              xAxes: [
                {
                  display: false
                }
              ],
              yAxes: [
                {
                  display: false
                }
              ]
            }
          };
        });
      }
    });
  }

  reload() {
    let arr = this.tabledata.filter(item => {
      return item.division == "ISTD";
    });
    ////console.log(arr[0] != null);
    if (arr[0] != null) {
      ////console.log("masuksini");
      this.chartdata = arr[0];
      ////console.log(this.chartdata);
    } else {
      this.chartdata = {
        ctrEff: 0,
        ctrMod: 0,
        ctrIff: 0,
        ctrWeak: 0
      };
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
