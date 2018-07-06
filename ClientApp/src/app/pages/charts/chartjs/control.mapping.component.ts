import { Component, OnDestroy, OnInit, ViewChild, Input } from "@angular/core";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
import { BackendService } from "../../../@core/data/backend.service";

@Component({
  selector: "ngx-control-mapping",
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `
})
export class ControlMappingComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  tabledata: any[] = [
    {
      preventive: 0,
      detective: 0,
      corrective: 0
    }
  ];

  chartdata: any = {
    preventive: 0,
    detective: 0,
    corrective: 0
  };

  @ViewChild("chartContainer") container;
  private heatData: any = [];

  @Input()
  set dataset(value: any) {
    ////console.log(value);
    this.loadData(value);
  }
  constructor(private theme: NbThemeService, public service: BackendService) {}

  loadData(data) {
    this.service.getreq("ControlMappings").subscribe(response => {
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.division == data.division && item.department == data.department
          );
        });

        arr[0] != null
          ? (this.chartdata = arr[0])
          : (this.chartdata = {
              preventive: 0,
              detective: 0,
              corrective: 0
            });

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          ////console.log(this.chartdata);

          this.data = {
            labels: ["Preventive","Detective","Corrective"],
            datasets: [
              {
                data: [this.chartdata.preventive,this.chartdata.detective,this.chartdata.corrective],
                backgroundColor: "#90caf9"
              },
             
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
              text: "Control Mapping"
            },
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              display: false,
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
      }
    });
  }

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
        preventive: 0,
        detective: 0,
        corrective: 0
      };
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
