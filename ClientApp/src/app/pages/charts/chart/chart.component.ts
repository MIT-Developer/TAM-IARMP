import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import "anychart";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit {
  subscription: Subscription;

  data: any = [
    { x: "Rare", y: "Insignificant", heat: 0, fill: "#4bf442", id: 1 },
    { x: "Rare", y: "Minor", heat: 0, fill: "#4bf442", id: 2 },
    { x: "Rare", y: "Moderate", heat: 1, fill: "#90caf9", id: 3 },
    { x: "Rare", y: "Major", heat: 1, fill: "#90caf9", id: 4 },
    { x: "Rare", y: "Catasthropic", heat: 2, fill: "#ffb74d", id: 5 },
    { x: "Unlikely", y: "Insignificant", heat: 0, fill: "#4bf442", id: 6 },
    { x: "Unlikely", y: "Minor", heat: 0, fill: "#4bf442", id: 7 },
    { x: "Unlikely", y: "Moderate", heat: 1, fill: "#90caf9", id: 8 },
    { x: "Unlikely", y: "Major", heat: 2, fill: "#ffb74d", id: 9 },
    { x: "Unlikely", y: "Catasthropic", heat: 2, fill: "#ffb74d", id: 10 },
    { x: "Possible", y: "Insignificant", heat: 0, fill: "#4bf442", id: 11 },
    { x: "Possible", y: "Minor", heat: 1, fill: "#90caf9", id: 12 },
    { x: "Possible", y: "Moderate", heat: 2, fill: "#ffb74d", id: 13 },
    { x: "Possible", y: "Major", heat: 2, fill: "#ffb74d", id: 14 },
    { x: "Possible", y: "Catasthropic", heat: 2, fill: "#ffb74d", id: 15 },
    { x: "Likely", y: "Insignificant", heat: 1, fill: "#90caf9", id: 16 },
    { x: "Likely", y: "Minor", heat: 1, fill: "#90caf9", id: 17 },
    { x: "Likely", y: "Moderate", heat: 2, fill: "#ffb74d", id: 18 },
    { x: "Likely", y: "Major", heat: 3, fill: "#d84315", id: 19 },
    { x: "Likely", y: "Catasthropic", heat: 3, fill: "#d84315", id: 20 },
    {
      x: "Almost Certain",
      y: "Insignificant",
      heat: 2,
      fill: "#90caf9",
      id: 22
    },
    { x: "Almost Certain", y: "Minor", heat: 2, fill: "#ffb74d", id: 23 },
    { x: "Almost Certain", y: "Moderate", heat: 2, fill: "#ffb74d", id: 24 },
    { x: "Almost Certain", y: "Major", heat: 3, fill: "#d84315" },
    {
      x: "Almost Certain",
      y: "Catasthropic",
      heat: 3,
      fill: "#d84315",
      id: 25
    }
  ];
  chart: anychart.charts.HeatMap = anychart.heatMap();
  Subscription: Subscription;
  dataSetChangeSource = new Subject<any>();
  dataSetChanged$ = this.dataSetChangeSource.asObservable();

  constructor() {
    this.subscription = this.dataSetChanged$.subscribe(dataSet => {});
  }

  @ViewChild("chartContainer") container;
  private heatData: any = [];

  @Input()
  set heat(value: any) {
    this.heatData = value;
    //console.log(this.heatData);
    this.heatMapProcess();
    this.setCurrentDataSet(this.data);
  }

  @Output() svg: EventEmitter<string> = new EventEmitter<string>();

  setCurrentDataSet(key) {
    this.dataSetChangeSource.next(key);
  }

  ngOnInit() {
    // Default data set mapping, hardcoded here.

    this.chart.xAxis().orientation("bottom");
    this.chart.yAxis().orientation("left");
    this.chart.xScale().inverted(false);
    this.chart.yScale().inverted(false);
    this.chart.bounds(0, 0, "100%", "100%");
    this.chart.minWidth(1000);
    this.chart.minHeight(600);
    this.chart.autoRedraw(true);
  }

  changeGraph(data) {
    if (this.heatData[0] != null) {
      let namesList = ["Low", "Medium", "High", "Extreme"];
      this.chart
        .labels()
        .useHtml(true)
        .enabled(true)
        .minFontSize(10000)
        .format(function() {
          if (
            this.getData("irdata") != null ||
            this.getData("rddata") != null
          ) {
            let IR =
              this.getData("irdata") != null ? this.getData("irdata") : "";
            let RD =
              this.getData("rddata") != null ? this.getData("rddata") : "";
            return (
              "<span style='color:yellow; font-size:20px;'>" +
              IR +
              "</span>" +
              "<br/>" +
              "<span style='color:blue; font-size:20px;'>" +
              RD +
              "</span>"
            );
          }
        });
      //console.log(this.data);
      this.chart.data(null);
      this.chart.data(data);
      this.svg.emit(this.chart.toSvg(1020, 963));
    } else {
      //console.log(this.data);

      let namesList = ["Low", "Medium", "High", "Extreme"];
      this.chart
        .labels()
        .useHtml(true)
        .enabled(true)
        .minFontSize(10000)
        .format(function() {
          if (
            this.getData("irdata") != null ||
            this.getData("rddata") != null
          ) {
            let IR =
              this.getData("irdata") != null ? this.getData("irdata") : "";
            let RD =
              this.getData("rddata") != null ? this.getData("rddata") : "";
            return (
              "<span style='color:yellow; font-size:20px;'>" +
              IR +
              "</span>" +
              "<br/>" +
              "<span style='color:blue; font-size:20px;'>" +
              RD +
              "</span>"
            );
          }
        });
      this.chart.data(null);
      this.chart.data(data);
      this.svg.emit(this.chart.toSvg(1020, 963));
    }
  }

  // enable HTML for labels
  // chart.labels().useHtml(true);

  // // configure labels
  // chart.labels().format(function (){
  //   var heat = (this.heat);
  //   if (heat < 20)
  //     return "<div class='arrow-up'><div>";
  //   if (heat < 40)
  //     return "Medium<br/>" + heat + "%";
  //   if (heat >= 40)
  //     return "<span style='font-weight:bold'>High</span><br/>" +
  //            heat + "%";
  // });

  ngAfterViewInit() {
    let legend = this.chart.legend();
    legend.enabled(true);
    legend.useHtml(true);
    legend.itemsFormatter(function() {
      return [
        { text: "Low", iconFill: "#4bf442" },
        { text: "Medium", iconFill: "#90caf9" },
        { text: "High", iconFill: "#ffb74d" },
        { text: "Extreme", iconFill: "#d84315" },
        { text: "<span style='color:blue; font-size:13px;'>#</span>Residual Risk",iconFill:"white"},
        { text: "<span style='color:yellow; font-size:13px;'>#</span>Inherent Risk", iconFill: "white" }
      ];
    });
    legend.position("bottom");
    legend.height("10%");

 
    //console.log();

    this.chart.legend(true);
    this.chart.container(this.container.nativeElement);
    this.chart.draw();
    let namesList = ["Low", "Medium", "High", "Extreme"];
  }

  findAndReplaceIr(object, value, replacevalue) {
    for (var x in object) {
      if (typeof object[x] == typeof {}) {
        this.findAndReplaceIr(object[x], value, replacevalue);
      }
      if (object[x] == value) {
        object["irdata"] != null
          ? (object["irdata"] = object["irdata"] + "," + replacevalue)
          : (object["irdata"] = replacevalue);
        // break; // uncomment to stop after first replacement
      }
    }
  }
  findAndReplaceRd(object, value, replacevalue) {
    for (var x in object) {
      if (typeof object[x] == typeof {}) {
        this.findAndReplaceRd(object[x], value, replacevalue);
      }
      if (object[x] == value) {
        object["rddata"] != null
          ? (object["rddata"] = object["rddata"] + "," + replacevalue)
          : (object["rddata"] = replacevalue);
        // break; // uncomment to stop after first replacement
      }
    }
  }

  heatMapProcess() {
    //console.log("2")
    let data: any[] = [
      {
        x: "Rare",
        y: "Insignificant",
        heat: 0,
        fill: "#4bf442",
        id: 1,
        irdata: "",
        rddata: ""
      },
      {
        x: "Rare",
        y: "Minor",
        heat: 0,
        fill: "#4bf442",
        id: 2,
        irdata: "",
        rddata: ""
      },
      {
        x: "Rare",
        y: "Moderate",
        heat: 1,
        fill: "#90caf9",
        id: 3,
        irdata: "",
        rddata: ""
      },
      {
        x: "Rare",
        y: "Major",
        heat: 1,
        fill: "#90caf9",
        id: 4,
        irdata: "",
        rddata: ""
      },
      {
        x: "Rare",
        y: "Catasthropic",
        heat: 2,
        fill: "#ffb74d",
        id: 5,
        irdata: "",
        rddata: ""
      },
      {
        x: "Unlikely",
        y: "Insignificant",
        heat: 0,
        fill: "#4bf442",
        id: 6,
        irdata: "",
        rddata: ""
      },
      {
        x: "Unlikely",
        y: "Minor",
        heat: 0,
        fill: "#4bf442",
        id: 7,
        irdata: "",
        rddata: ""
      },
      {
        x: "Unlikely",
        y: "Moderate",
        heat: 1,
        fill: "#90caf9",
        id: 8,
        irdata: "",
        rddata: ""
      },
      {
        x: "Unlikely",
        y: "Major",
        heat: 2,
        fill: "#ffb74d",
        id: 9,
        irdata: "",
        rddata: ""
      },
      {
        x: "Unlikely",
        y: "Catasthropic",
        heat: 2,
        fill: "#ffb74d",
        id: 10,
        irdata: "",
        rddata: ""
      },
      {
        x: "Possible",
        y: "Insignificant",
        heat: 0,
        fill: "#4bf442",
        id: 11,
        irdata: "",
        rddata: ""
      },
      {
        x: "Possible",
        y: "Minor",
        heat: 1,
        fill: "#90caf9",
        id: 12,
        irdata: "",
        rddata: ""
      },
      {
        x: "Possible",
        y: "Moderate",
        heat: 2,
        fill: "#ffb74d",
        id: 13,
        irdata: "",
        rddata: ""
      },
      {
        x: "Possible",
        y: "Major",
        heat: 2,
        fill: "#ffb74d",
        id: 14,
        irdata: "",
        rddata: ""
      },
      {
        x: "Possible",
        y: "Catasthropic",
        heat: 2,
        fill: "#ffb74d",
        id: 15,
        irdata: "",
        rddata: ""
      },
      {
        x: "Likely",
        y: "Insignificant",
        heat: 1,
        fill: "#90caf9",
        id: 16,
        irdata: "",
        rddata: ""
      },
      {
        x: "Likely",
        y: "Minor",
        heat: 1,
        fill: "#90caf9",
        id: 17,
        irdata: "",
        rddata: ""
      },
      {
        x: "Likely",
        y: "Moderate",
        heat: 2,
        fill: "#ffb74d",
        id: 18,
        irdata: "",
        rddata: ""
      },
      {
        x: "Likely",
        y: "Major",
        heat: 3,
        fill: "#d84315",
        id: 19,
        irdata: "",
        rddata: ""
      },
      {
        x: "Likely",
        y: "Catasthropic",
        heat: 3,
        fill: "#d84315",
        id: 20,
        irdata: "",
        rddata: ""
      },
      {
        x: "Almost Certain",
        y: "Insignificant",
        heat: 2,
        fill: "#90caf9",
        id: 21,
        irdata: "",
        rddata: ""
      },
      {
        x: "Almost Certain",
        y: "Minor",
        heat: 2,
        fill: "#ffb74d",
        id: 22,
        irdata: "",
        rddata: ""
      },
      {
        x: "Almost Certain",
        y: "Moderate",
        heat: 2,
        fill: "#ffb74d",
        id: 23,
        irdata: "",
        rddata: ""
      },
      {
        x: "Almost Certain",
        y: "Major",
        heat: 3,
        fill: "#d84315",
        id: 24,
        irdata: "",
        rddata: ""
      },
      {
        x: "Almost Certain",
        y: "Catasthropic",
        heat: 3,
        fill: "#d84315",
        id: 25
      }
    ];
    this.heatData.forEach((element, ind) => {
      let irId = data.filter(item => {
        return item.x == element.irLikelihood && item.y == element.irImpact;
      });
      if (irId[0] != null) {
        // this.findAndReplaceIr(data, irId[0].id, element.no);
        data.forEach(item => {
          item.x == element.irLikelihood && item.y == element.irImpact
            ? item.irdata == ""
              ? (item.irdata = item.irdata + element.no)
              : (item.irdata = item.irdata + "," + element.no)
            : null;
        });
      }
      let rdId = data.filter(item => {
        return item.x == element.rdLikelihood && item.y == element.rdImpact;
      });
      if (rdId[0] != null) {
        data.forEach(item => {
          item.x == element.rdLikelihood && item.y == element.rdImpact
            ? item.rddata == ""
              ? (item.rddata = item.rddata + element.no)
              : (item.rddata = item.rddata + "," + element.no)
            : null;
        });
        // this.findAndReplaceRd(data, rdId[0].id, element.no);
        //console.log(data);
      }
    });
    this.changeGraph(data);
  }
  changebbl() {
    //console.log(this.data);
    this.chart.data(this.data);
    this.chart
      .labels()
      .useHtml(true)
      .enabled(true)
      .minFontSize(4)
      .format(function() {
        return (
          "IR: " +
          this.getData("irdata") +
          "<br/>" +
          "RD: " +
          this.getData("rddata")
        );
      });
  }
}
