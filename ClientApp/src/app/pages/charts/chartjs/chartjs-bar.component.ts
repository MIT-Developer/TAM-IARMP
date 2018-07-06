import { Component, OnDestroy, OnInit, ViewChild, Input } from "@angular/core";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
import { BackendService } from "../../../@core/data/backend.service";
import "chartjs-plugin-datalabels";
@Component({
  selector: "ngx-chartjs-bar",
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `
})
export class ChartjsBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  tabledata: any[] = [
    {
      irRiskExtreme: 0,
      irRiskHigh: 0,
      irRiskMedium: 0,
      irRiskLow: 0,
      rdRiskExtreme: 0,
      rdRiskHigh: 0,
      rdRiskMedium: 0,
      rdRiskLow: 0,
      exRiskExtreme: 0,
      exRiskHigh: 0,
      exRiskMedium: 0,
      exRiskLow: 0
    }
  ];

  chartdata: any = [
    {
      irRiskExtreme: 0,
      irRiskHigh: 0,
      irRiskMedium: 0,
      irRiskLow: 0,
      rdRiskExtreme: 0,
      rdRiskHigh: 0,
      rdRiskMedium: 0,
      rdRiskLow: 0,
      exRiskExtreme: 0,
      exRiskHigh: 0,
      exRiskMedium: 0,
      exRiskLow: 0
    }
  ];
  @ViewChild("chartContainer") container;
  private heatData: any = [];

  @Input()
  set dataset(value: any) {
    ////console.log(value);
    this.processData(value);
  }

  constructor(private theme: NbThemeService, public service: BackendService) {}

  loadData() {}

  reload() {
    let arr = this.tabledata.filter(item => {
      return item.division == "ISTD";
    });
    //////console.log(arr[0] != null);
    if (arr[0] != null) {
      //////console.log("masuksini");
      this.chartdata = arr[0];
      // ////console.log(this.chartdata);
    } else {
      this.chartdata = {
        irRiskExtreme: 0,
        irRiskHigh: 0,
        irRiskMedium: 0,
        irRiskLow: 0,
        rdRiskExtreme: 0,
        rdRiskHigh: 0,
        rdRiskMedium: 0,
        rdRiskLow: 0,
        exRiskExtreme: 0,
        exRiskHigh: 0,
        exRiskMedium: 0,
        exRiskLow: 0
      };
    }
  }

  processData(data) {
    this.service.getreq("riskmovements").subscribe(response => {
      let arr = response.filter(item => {
        return (
          item.division == data.division && item.department == data.department
        );
      });

      arr[0] != null
        ? (this.chartdata = arr[0])
        : (this.chartdata = {
            irRiskExtreme: 0,
            irRiskHigh: 0,
            irRiskMedium: 0,
            irRiskLow: 0,
            rdRiskExtreme: 0,
            rdRiskHigh: 0,
            rdRiskMedium: 0,
            rdRiskLow: 0,
            exRiskExtreme: 0,
            exRiskHigh: 0,
            exRiskMedium: 0,
            exRiskLow: 0
          });

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: ["Inherent", "Residual", "Expected"],
          datasets: [
            {
              data: [
                this.chartdata.irRiskExtreme,
                this.chartdata.rdRiskExtreme,
                this.chartdata.exRiskExtreme
              ],
              label: "Extreme",
              backgroundColor: "#d84315"
            },
            {
              data: [
                this.chartdata.irRiskHigh,
                this.chartdata.rdRiskHigh,
                this.chartdata.exRiskHigh
              ],
              label: "High",
              backgroundColor: "#ffb74d"
            },
            {
              data: [
                this.chartdata.irRiskMedium,
                this.chartdata.rdRiskMedium,
                this.chartdata.exRiskMedium
              ],
              label: "Medium",
              backgroundColor: "#90caf9"
            },
            {
              data: [
                this.chartdata.irRiskLow,
                this.chartdata.rdRiskLow,
                this.chartdata.exRiskLow
              ],
              label: "Low",
              backgroundColor: "#4bf442"
            }
          ]
        };

        this.options = {
          plugins: {
            datalabels: {
              anchor: "end",
              align: "bottom",
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
          tooltips: {
            enabled: true
          },
          title: {
            fontSize:20,
            display: true,
            text: "Risk Movement"
          },
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: "bottom",
            labels: {
              fontColor: chartjs.textColor
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor
                },
                ticks: {
                  fontColor: chartjs.textColor
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor
                },
                ticks: {
                  fontColor: chartjs.textColor,
                  min: 0,
                  max: 10,
                  stepSize: 2
                }
              }
            ]
          }
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
