import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BackendService } from "../../../@core/data/backend.service";

@Component({
  selector: 'ngx-d3-bar',
  template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `,
})
export class D3BarComponent implements OnDestroy {

  tabledata: any[] = [
    {
      preventive:0,
      detective:0,
      corrective:0
    }
  ];

  chartdata: any=[
    {
      preventive:0,
      detective:0,
      corrective:0
    }
  ]

  results = [
    { name: 'Preventive', value: 4 },
    { name: 'Detective', value: 2},
    { name: 'Corrective', value: 2 },
  ];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Control';
  yAxisLabel = 'Type';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,
    public service: BackendService) {

      
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.service.getreq("ControlMappings").subscribe(response => {
        if (response != null) {
          const data = response;
          ////console.log(JSON.stringify(response));
          data.forEach((element, ind) => {
            data[ind].status = "0";
            this.tabledata = data;
          });
          this.reload();
          const colors: any = config.variables;
          this.colorScheme = {
            domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
          };
        }
      });

    });
  }

  loadData() {
 

   
  }

  reload() {
    let arr = this.tabledata.filter(item => {
      return item.division == "ISTD";
    });
    ////console.log(arr[0] != null);
    if (arr[0] != null) {
      ////console.log("masuksini");
      this.chartdata = arr[0];
     // //console.log(this.chartdata);
    } else {
      this.chartdata = {
        preventive:0,
        detective:0,
        corrective:0
      };
    }
    
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
