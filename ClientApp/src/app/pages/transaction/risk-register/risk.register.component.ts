import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RiskRegisterModalComponent } from "./modal/risk.register.modal.component";
import { RiskRegisterDeptComponent } from "./modal/risk.register.dept.component";
import { RiskRegisterAcdComponent } from "./modal/risk.register.acd.component";
import { RiskRegisterCtrComponent } from "./modal/risk.register.ctr.component";
import { RiskRegisterQlComponent } from "./modal/risk.register.ql.component";
import { RiskRegisterTrtComponent } from "./modal/risk.register.trt.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IMultiSelectOption } from "angular-2-dropdown-multiselect";
import { Location } from "@angular/common";

@Component({
  selector: "ngx-risk-register",
  templateUrl: "./risk.register.component.html",
  styleUrls: ["./risk.register.component.scss"]
})

export class RiskRegisterComponent {

  @ViewChild("myForm") private myForm: NgForm;
   
  ctrType = [
    { value: "Preventive", title: "Preventive" },
    {
      value: "Detective",
      title: "Detective"
    },
    {
      value: "Corrective",
      title: "Corrective"
    }
  ];
  optionsModel: number[];
  myOptions: IMultiSelectOption[];
  expectedColor: string;
  multiSelect: any[];
  accidentset: any = {
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
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      number: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      accidentId: {
        title: "Loss Event Id",
        type: "string",
        filter: false,
        editable: true,
        width: "20%"
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        editable: true,
        width: "80%"
      }
    }
  };

  accidentSrc: LocalDataSource = new LocalDataSource();
  controlSrc: LocalDataSource = new LocalDataSource();
  treatmentSrc: LocalDataSource = new LocalDataSource();

  tabledata: any[] = [];
  riskno: string;

  controlset: any = {
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
      delete: true,
      position: "right",
      columnTitle: "Edit",
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      no: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      description: {
        title: "Description",
        type: "number",
        filter: false,
        editable: true,
        width: "60%"
      },
      type: {
        title: "Type",
        type: "string",
        filter: false,
        editable: true,
        width: "20%",
        editor: {
          type: "list",
          config: {
            list: this.ctrType
          }
        }
      }
    }
  };

  dataInput = {
    counterNo: 0,
    edit: false,
    activateValidation: false,
    draftDisabled: false,
    riskNo: "",
    divisionDepartment: {
      division: {
        charId: ""
      },
      department: {
        kodeDepartment: ""
      },
      companyKpi: {
        comInpId: "",
        description: ""
      },
      departmentKpi: {
        deptInpId: "IMP001",
        description: ""
      },
      businessProcess: ""
    },
    riskDescription: {
      lossEvent: "",
      caused: "",
      accidentObj: [],
      riskImpact: [],
      riskLevel: "",
      optionsModel: []
    },
    inherentRisk: {
      overallRisk: {
        indicatorId: "",
        description: "",
        score: 0
      },
      likelihood: "",
      overallImpact: {
        indicatorId: "",
        description: "",
        score: 0
      },
      operationalImpact: {
        category: "",
        loss: 0,
        operationalObj: {
          yearActive: "",
          category: "",
          riskIndicatorId: "",
          counterNo: 0,
          operationalId: "",
          numberValue: 0,
          userCreated: "",
          datetimeCreated: "",
          userUpdate: "",
          datetimeUpdate: ""
        },
        score: 0
      },
      financialImpact: {
        category: "",
        amount: 0,
        financialObj: {
          yearActive: "",
          category: "",
          riskIndicatorId: "",
          counterNo: 0,
          financialId: "",
          percentageValue: 0,
          numberValue: 0,
          flagActive: null,
          userCreated: "",
          datetimeCreated: "",
          userUpdate: "",
          datetimeUpdate: ""
        },
        score: 0
      },
      notes: "",
      qualitativeIR: {
        id: "",
        desc: "",
        score: 0
      }
    },
    residualRisk: {
      notes: "",
      overallRisk: {
        indicatorId: "",
        description: "",
        score: 0
      },
      likelihood: "",
      overallImpact: {
        indicatorId: "",
        description: "",
        score: 0
      },
      operationalImpact: {
        category: "",
        loss: 0,
        operationalObj: {
          yearActive: "",
          category: "",
          riskIndicatorId: "",
          counterNo: 0,
          operationalId: "",
          numberValue: 0,
          userCreated: "",
          datetimeCreated: "",
          userUpdate: "",
          datetimeUpdate: ""
        },
        score: 0
      },
      financialImpact: {
        category: "",
        amount: 0,
        financialObj: {
          yearActive: "",
          category: "",
          riskIndicatorId: "",
          counterNo: 0,
          financialId: "",
          percentageValue: 0,
          numberValue: 0,
          flagActive: null,
          userCreated: "",
          datetimeCreated: "",
          userUpdate: "",
          datetimeUpdate: ""
        },
        score: 0
      },
      qualitativeRD: {
        id: "",
        desc: "",
        score: 0
      }
    },
    currentAction: {
      Preventive: 0,
      Detective: 0,
      Corrective: 0,
      operation: "",
      controls: [],
      overallControl: {
        indicatorId: "",
        description: ""
      },
      appropriateness: {
        indicatorId: "",
        description: ""
      }
    },
    expectedRisk: {
      disabled: true,
      treatmentPlanSwitch: false,
      treatmentPlan: "",
      impact: "",
      likelihood: "",
      risk: {
        indicatorId: "",
        description: "",
        score: 0
      },
      PIC: "",
      schedule: "",
      treatmentPlanArr: []
    }
  };
  treatmentset: any = {
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
      edit: !this.dataInput.expectedRisk.treatmentPlanSwitch,
      delete: !this.dataInput.expectedRisk.treatmentPlanSwitch,
      position: "right",
      columnTitle: "Edit",
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      no: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      description: {
        title: "Treatment Plan",
        type: "string",
        filter: false,
        editable: true,
        width: "20%"
      },
      type: {
        title: "Type",
        type: "string",
        filter: false,
        editable: true,
        width: "20%",
        editor: {
          type: "list",
          config: {
            list: this.ctrType
          }
        }
      },
      pic: {
        title: "PIC",
        type: "string",
        filter: false,
        editable: true,
        width: "20%"
      },
      dueDate: {
        title: "Due Date",
        type: "string",
        filter: false,
        editable: true,
        width: "20%"
      }
    }
  };

  financialImpact = [
    {
      data: "",
      desc: ""
    },
    {
      data: "NEP",
      desc: "Net Profit"
    },
    {
      data: "REV",
      desc: "Revenue"
    },
    {
      data: "COF",
      desc: "Cost of revenue"
    },
    {
      data: "OEX",
      desc: "Operating expenses"
    },
    {
      data: "CHG",
      desc: "Non operating income/charges"
    }
  ];

  operationalImpact: any[] = [];
  divisionData: any[] = [];
  departmentData: any[] = [];
  departmentFilter: any[] = [];
  draftData: any;
  subscription: any;
  activeModal: any;
  riskIndicatorData: any = [];
  riskAssessmentData: any = [];
  yearPeriode: any = moment().format("YYYY");
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.url.subscribe(url => {
      //console.log("activatedroute");
      //console.log(url);
    });
    this.loadData();
    this.accidentSrc.load(this.dataInput.riskDescription.accidentObj);
    this.controlSrc.load(this.dataInput.currentAction.controls);
    this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);

  }

  getListRiskIndicator(value) {
    let yearPeriode = this.yearPeriode;
    let arr = this.riskIndicatorData.filter(function(item) {
      return (
        item.condition == value &&
        item.yearActive == yearPeriode &&
        item.flagActive == "Active"
      );
    });
    if (arr[0] != null) {
      return this.riskIndicatorData.filter(function(item) {
        return (
          item.condition == value &&
          item.yearActive == yearPeriode &&
          item.flagActive == "Active"
        );
      });
    }
  }

  getLikelihood() {
    let arr = this.riskIndicatorData.filter(item => {
      return (
        item.condition == "LKL" &&
        item.yearActive == this.yearPeriode &&
        item.flagActive == "Active"
      );
    });

    if (arr[0] != null) {
      arr.forEach(element => {
        element.scoreLikelihood = element.indicatorId + "_" + element.score;
      });

      return arr;
    }
  }

  getImpact() {
    let arr = this.riskIndicatorData.filter(item => {
      return (
        item.condition == "IMP" &&
        item.yearActive == this.yearPeriode &&
        item.flagActive == "Active"
      );
    });

    if (arr[0] != null) {
      arr.forEach(element => {
        element.scoreImpact = element.indicatorId + "_" + element.score;
      });

      return arr;
    }
  }

  loadData() {
    this.service.getreq("TbMRiskIndicators").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].score == null
            ? (data[ind].score = 0)
            : data[ind].score.toString();
        });
        this.riskIndicatorData = data;
        let arr = this.riskIndicatorData.filter(item => {
          return (
            item.condition == "RTP" &&
            item.yearActive == this.yearPeriode &&
            item.flagActive == "Active"
          );
        });
        //console.log("myoptionsss");
        //console.log(arr);

        if (arr[0] != null) {
          this.multiSelect = arr;
          this.myOptions = [
            {
              id: this.multiSelect[0].description,
              name: this.multiSelect[0].description
            },
            {
              id: this.multiSelect[1].description,
              name: this.multiSelect[1].description
            },
            {
              id: this.multiSelect[2].description,
              name: this.multiSelect[2].description
            },
            {
              id: this.multiSelect[3].description,
              name: this.multiSelect[3].description
            }
          ];
        }

        let yearPeriode = this.yearPeriode;

        this.service.getreq("tbmlibraries").subscribe(response => {
          if (response != null) {
            let arr = response.filter(item => {
              return item.condition == "DIV";
            });
            //console.log(arr);

            let arrOp = response.filter(item => {
              return item.condition == "OP";
            });

            if (arrOp[0] != null) {
              arrOp.push({
                charId: "",
                description: ""
              });
              this.operationalImpact = arrOp;
            }

            this.divisionData = arr;

            this.service.getreq("tbmdivdepts").subscribe(response => {
              if (response != null) {
                this.departmentData = response;
                let arr = this.departmentData.filter(item => {
                  return (
                    item.kodeDivisi ==
                    this.dataInput.divisionDepartment.division.charId
                  );
                });
                arr[0] != null ? (this.departmentFilter = arr) : null;
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
        this.service.getreq("TbRRiskAssessments").subscribe(response => {
          if (response != null) {
            this.riskAssessmentData = response;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.draftJson != null) {
        this.dataInput = JSON.parse(params.draftJson);
        this.draftData = params;
        this.accidentSrc.load(this.dataInput.riskDescription.accidentObj);
        this.controlSrc.load(this.dataInput.currentAction.controls);
        this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
      }
    });
  }

  ngAfterViewInit() {}

  showModal() {
    this.activeModal = this.modalService.open(RiskRegisterModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.filterData.year = this.yearPeriode;
    this.activeModal.componentInstance.filterData.condition = "KPI";
    this.activeModal.result.then(
      async response => {
        //console.log(response);
        if (response != false) {
          this.dataInput.divisionDepartment.companyKpi.comInpId =
            response.comInpId;
          this.dataInput.divisionDepartment.companyKpi.description =
            response.description;
        }
      },
      error => {}
    );
  }
  showDept() {
    //console.log(this.dataInput.divisionDepartment.division.charId);

    this.activeModal = this.modalService.open(RiskRegisterDeptComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.filterData = {
      year: this.yearPeriode,
      condition: "DEP",
      division: this.dataInput.divisionDepartment.division.charId,
      department: this.dataInput.divisionDepartment.department.kodeDepartment
    };
    // this.activeModal.componentInstance.filterData.year =
    // this.activeModal.componentInstance.filterData.condition = "DEP";
    // this.activeModal.componenInstance.filterData.division = this.dataInput.divisionDepartment.division.charId;
    // this.activeModal.componentInstance.filterData.department = this.dataInput.divisionDepartment.department.kodeDepartment;
    this.activeModal.result.then(
      async response => {
        //console.log(response);
        if (response != false) {
          this.dataInput.divisionDepartment.departmentKpi.deptInpId =
            response.deptInpId;
          this.dataInput.divisionDepartment.departmentKpi.description =
            response.description;
        }
      },
      error => {}
    );
  }

  deleteAccident(event) {
    event.confirm.resolve();
    this.dataInput.riskDescription.accidentObj = this.dataInput.riskDescription.accidentObj.filter(
      function(item) {
        return item.number != this.number;
      },
      event.data
    );
    this.dataInput.riskDescription.accidentObj.forEach((element, ind) => {
      element.number = ind + 1;
    });
    this.accidentSrc.load(this.dataInput.riskDescription.accidentObj);
  }

  showAccident() {
    this.activeModal = this.modalService.open(RiskRegisterAcdComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.filterData = {
      year: this.yearPeriode,
      division: this.dataInput.divisionDepartment.division.charId,
      department: this.dataInput.divisionDepartment.department.kodeDepartment
    };
    this.activeModal.result.then(
      async response => {
        //console.log(response);
        if (response != false) {
          // this.dataInput.divisionDepartment.companyKpi.comInpId =
          //   response.comInpId;
          // this.dataInput.divisionDepartment.companyKpi.description =
          //   response.description;
          let lastIndex = 0;
          for (let data in this.dataInput.riskDescription.accidentObj) {
            lastIndex <= this.dataInput.riskDescription.accidentObj[data].number
              ? (lastIndex = this.dataInput.riskDescription.accidentObj[data]
                  .number)
              : null;
          }
          let arr = this.dataInput.riskDescription.accidentObj.filter(function(
            item
          ) {
            return item.accidentId == this.accidentId;
          },
          response);
          if (arr[0] == null) {
            this.dataInput.riskDescription.accidentObj.push({
              yearActive: this.yearPeriode,
              riskNo: "",
              number: lastIndex + 1,
              accidentId: response.accidentId,
              description: response.description,
              userCreated: "Admin",
              datetimeCreated: moment(),
              userUpdate: "Admin",
              datetimeUpdate: moment()
            });
            this.accidentSrc.load(this.dataInput.riskDescription.accidentObj);
          }
        }
      },
      error => {}
    );
  }
  clearIR() {
    this.dataInput.inherentRisk.qualitativeIR.desc = "";
    this.dataInput.inherentRisk.qualitativeIR.id = "";
    this.dataInput.inherentRisk.qualitativeIR.score = 0;
    this.findOverallImp();
  }

  clearRD() {
    this.dataInput.residualRisk.qualitativeRD.desc = "";
    this.dataInput.residualRisk.qualitativeRD.id = "";
    this.dataInput.residualRisk.qualitativeRD.score = 0;
    this.findOverallImpRd();
  }

  showQLIR() {
    this.activeModal = this.modalService.open(RiskRegisterQlComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.filterData.year = this.yearPeriode;
    this.activeModal.result.then(
      async response => {
        //console.log(response);
        if (response != false) {
          this.dataInput.inherentRisk.qualitativeIR.id = response.indicatorId;
          this.dataInput.inherentRisk.qualitativeIR.desc = response.impact;
          this.dataInput.inherentRisk.qualitativeIR.score = response.score;
          this.findOverallImp();
        } else {
          this.dataInput.inherentRisk.qualitativeIR.id = "";
          this.dataInput.inherentRisk.qualitativeIR.desc = "";
          this.dataInput.inherentRisk.qualitativeIR.score = 0;
        }
      },
      error => {}
    );
  }

  showQLRD() {
    this.activeModal = this.modalService.open(RiskRegisterQlComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.filterData.year = this.yearPeriode;
    this.activeModal.result.then(
      async response => {
        //console.log(response);
        if (response != false) {
          this.dataInput.residualRisk.qualitativeRD.id = response.indicatorId;
          this.dataInput.residualRisk.qualitativeRD.desc = response.impact;
          this.dataInput.residualRisk.qualitativeRD.score = response.score;
          this.findOverallImpRd();
        } else {
          this.dataInput.residualRisk.qualitativeRD.id = "";
          this.dataInput.residualRisk.qualitativeRD.desc = "";
          this.dataInput.residualRisk.qualitativeRD.score = 0;
        }
      },
      error => {}
    );
  }

  deleteControl(event) {
    event.confirm.resolve();
    this.dataInput.currentAction.controls = this.dataInput.currentAction.controls.filter(
      function(item) {
        return item.no != this.no;
      },
      event.data
    );
    this.dataInput.currentAction.controls.forEach((element, ind) => {
      element.no = ind + 1;
    });
    this.controlSrc.load(this.dataInput.currentAction.controls);
    this.countPDC();
  }
  saveControl(event) {
    if (event.newData.description != "") {
      event.confirm.resolve(event.newData);
      this.dataInput.currentAction.controls.forEach((element, ind) => {
        element.no == event.newData.no
          ? (element.type = event.newData.type)
          : null;
      });
      this.countPDC();
    } else {
      event.confirm.reject();
    }
  }
  showCtr() {
    this.activeModal = this.modalService.open(RiskRegisterCtrComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    // let lastIndex = 1;
    // for (let data in this.tabledata) {
    //   if (this.tabledata[data].riskNo == this.myForm.value.riskno) {
    //     lastIndex < this.tabledata[data].no
    //       ? (lastIndex = this.tabledata[data].no)
    //       : null;
    //   }
    // }

    // this.activeModal.componentInstance.riskno = this.riskno;
    let lastIndex = 0;
    for (let data in this.dataInput.currentAction.controls) {
      lastIndex <= this.dataInput.currentAction.controls[data].no
        ? (lastIndex = this.dataInput.currentAction.controls[data].no)
        : null;
    }
    this.activeModal.componentInstance.formData = {
      yearActive: this.yearPeriode,
      riskNo: "",
      no: lastIndex + 1,
      description: "",
      type: "",
      UserCreated: "Admin",
      DatetimeCreated: moment(),
      UserUpdate: "Admin",
      DatetimeUpdate: moment()
    };

    this.activeModal.result.then(
      async response => {
        if (response != false) {
          // this.tabledata.push(response);
          // //console.log(this.tabledata);
          // this.reload();

          this.dataInput.currentAction.controls.push(response);
          this.controlSrc.load(this.dataInput.currentAction.controls);
          this.countPDC();
          //console.log(this.dataInput.currentAction.controls);
        }
      },
      error => {}
    );
  }

  countPDC() {
    this.dataInput.currentAction.Preventive = 0;
    this.dataInput.currentAction.Detective = 0;
    this.dataInput.currentAction.Corrective = 0;
    this.dataInput.currentAction.controls.forEach((element, index) => {
      element.type == "Preventive"
        ? this.dataInput.currentAction.Preventive++
        : null;
      element.type == "Detective"
        ? this.dataInput.currentAction.Detective++
        : null;
      element.type == "Corrective"
        ? this.dataInput.currentAction.Corrective++
        : null;
    });
  }

  hasmin(arr, attrib) {
    return arr.reduce(function(prev, curr) {
      return prev[attrib] < curr[attrib] ? prev : curr;
    });
  }

  hasmax(arr, attrib) {
    return arr.reduce(function(prev, curr) {
      return prev[attrib] > curr[attrib] ? prev : curr;
    });
  }

  findOperationalImpactRisk() {
    if (this.dataInput.inherentRisk.operationalImpact.category == "") {
      this.dataInput.inherentRisk.operationalImpact.loss = 0;
      this.dataInput.inherentRisk.operationalImpact.score = 0;
    }
    let yearPeriode = this.yearPeriode;
    let operationalImpact;
    this.service.getreq("TbMOperationalImpacts").subscribe(response => {
      if (response != null) {
        //console.log(response);
        operationalImpact = response;
        let arrImp = operationalImpact.filter(function(item) {
          return (
            item.yearActive == yearPeriode &&
            item.category == this.inherentRisk.operationalImpact.category &&
            item.numberValue >= this.inherentRisk.operationalImpact.loss
          );
        }, this.dataInput);
        //console.log(arrImp);
        if (arrImp[0] != null) {
          this.dataInput.inherentRisk.operationalImpact.operationalObj = this.hasmin(
            arrImp,
            "numberValue"
          );
          let arrScore = this.riskIndicatorData.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.indicatorId ==
                this.inherentRisk.operationalImpact.operationalObj
                  .riskIndicatorId
            );
          }, this.dataInput);
          if (arrScore[0] != null) {
            this.dataInput.inherentRisk.operationalImpact.score = this.riskIndicatorData.filter(
              function(item) {
                return (
                  item.yearActive == yearPeriode &&
                  item.indicatorId ==
                    this.inherentRisk.operationalImpact.operationalObj
                      .riskIndicatorId
                );
              },
              this.dataInput
            )[0].score;
            this.findOverallImp();
            //console.log(this.dataInput);
          } else {
            this.findOverallImp();
          }
        } else {
          //console.log("masuksini");
          let arrImp = operationalImpact.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.category == this.inherentRisk.operationalImpact.category
            );
          }, this.dataInput);
          if (arrImp[0] != null) {
            this.dataInput.inherentRisk.operationalImpact.operationalObj = this.hasmax(
              arrImp,
              "numberValue"
            );
            let arrScore = this.riskIndicatorData.filter(function(item) {
              return (
                item.yearActive == yearPeriode &&
                item.indicatorId ==
                  this.inherentRisk.operationalImpact.operationalObj
                    .riskIndicatorId
              );
            }, this.dataInput);
            if (arrScore[0] != null) {
              this.dataInput.inherentRisk.operationalImpact.score = this.riskIndicatorData.filter(
                function(item) {
                  return (
                    item.yearActive == yearPeriode &&
                    item.indicatorId ==
                      this.inherentRisk.operationalImpact.operationalObj
                        .riskIndicatorId
                  );
                },
                this.dataInput
              )[0].score;
              this.findOverallImp();
              //console.log(JSON.stringify(this.dataInput));
            } else {
              this.findOverallImp();
            }
          } else {
            this.findOverallImp();
          }
        }
      }
    });
  }

  findFinancialImpactRisk() {
    if (this.dataInput.inherentRisk.financialImpact.category == "") {
      this.dataInput.inherentRisk.financialImpact.amount = 0;
      this.dataInput.inherentRisk.financialImpact.score = 0;
    }
    let yearPeriode = this.yearPeriode;
    let financialImpact;
    this.service.getreq("TbMFinancialImpacts").subscribe(response => {
      if (response != null) {
        //console.log(response);
        financialImpact = response;
        let arrImp = financialImpact.filter(function(item) {
          return (
            item.yearActive == yearPeriode &&
            item.category == this.inherentRisk.financialImpact.category &&
            item.numberValue >= this.inherentRisk.financialImpact.amount
          );
        }, this.dataInput);
        if (arrImp[0] != null) {
          this.dataInput.inherentRisk.financialImpact.financialObj = this.hasmin(
            arrImp,
            "numberValue"
          );
          let arrScore = this.riskIndicatorData.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.indicatorId ==
                this.inherentRisk.financialImpact.financialObj.riskIndicatorId
            );
          }, this.dataInput);
          if (arrScore[0] != null) {
            this.dataInput.inherentRisk.financialImpact.score = this.riskIndicatorData.filter(
              function(item) {
                return (
                  item.yearActive == yearPeriode &&
                  item.indicatorId ==
                    this.inherentRisk.financialImpact.financialObj
                      .riskIndicatorId
                );
              },
              this.dataInput
            )[0].score;
            this.findOverallImp();
            //console.log(this.dataInput);
          } else {
            this.findOverallImp();
          }
        } else {
          //console.log("masuksini");
          let arrImp = financialImpact.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.category == this.inherentRisk.financialImpact.category
            );
          }, this.dataInput);
          //console.log(arrImp);
          if (arrImp[0] != null) {
            this.dataInput.inherentRisk.financialImpact.financialObj = this.hasmax(
              arrImp,
              "numberValue"
            );
            let arrScore = this.riskIndicatorData.filter(function(item) {
              return (
                item.yearActive == yearPeriode &&
                item.indicatorId ==
                  this.inherentRisk.financialImpact.financialObj.riskIndicatorId
              );
            }, this.dataInput);
            //console.log(arrScore);
            if (arrScore[0] != null) {
              this.dataInput.inherentRisk.financialImpact.score = this.riskIndicatorData.filter(
                function(item) {
                  return (
                    item.yearActive == yearPeriode &&
                    item.indicatorId ==
                      this.inherentRisk.financialImpact.financialObj
                        .riskIndicatorId
                  );
                },
                this.dataInput
              )[0].score;
              this.findOverallImp();
              //console.log(this.dataInput);
            } else {
              this.findOverallImp();
            }
          } else {
            this.findOverallImp();
          }
        }
      }
    });
  }

  findOverallImp() {
    //console.log(this.dataInput.inherentRisk.financialImpact);
    let arr = this.riskIndicatorData.filter(item => {
      return (
        item.yearActive == this.yearPeriode &&
        item.condition == "IMP" &&
        item.score ==
          this.hasmax(
            [
              {
                score:
                  this.dataInput.inherentRisk.financialImpact.amount == 0 ||
                  this.dataInput.inherentRisk.financialImpact.amount == null
                    ? 0
                    : this.dataInput.inherentRisk.financialImpact.score
              },
              {
                score:
                  this.dataInput.inherentRisk.operationalImpact.loss == 0 ||
                  this.dataInput.inherentRisk.operationalImpact.loss == null
                    ? 0
                    : this.dataInput.inherentRisk.operationalImpact.score
              },
              { score: this.dataInput.inherentRisk.qualitativeIR.score }
            ],
            "score"
          ).score
      );
    });
    if (arr[0] != null) {
      //console.log("disinihehe");
      console.log(arr);
      this.dataInput.inherentRisk.overallImpact.description =
        arr[0].description;
      this.dataInput.inherentRisk.overallImpact.indicatorId =
        arr[0].indicatorId;
      this.dataInput.inherentRisk.overallImpact.score = arr[0].score;
      this.findOverallRisk();
    } else {
      this.dataInput.inherentRisk.overallImpact.description = "";
      this.dataInput.inherentRisk.overallImpact.indicatorId = "";
      this.dataInput.inherentRisk.overallImpact.score = 0;
      this.findOverallRisk();
    }
  }

  findOverallRisk() {
    //console.log("masuk");
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      //console.log(response);
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
            item.indicatorIdA ==
              this.dataInput.inherentRisk.overallImpact.indicatorId &&
            item.indicatorIdB ==
              this.dataInput.inherentRisk.likelihood.substring(0, 6)
          );
        });
        //console.log(arr);
        if (arr[0] != null) {
          let arrIndicator = this.riskIndicatorData.filter(item => {
            return (
              item.yearActive == this.yearPeriode &&
              item.indicatorId == arr[0].resultIdC
            );
          });
          //console.log(arrIndicator);
          if (arrIndicator[0] != null) {
            this.dataInput.inherentRisk.overallRisk.indicatorId =
              arrIndicator[0].indicatorId;
            this.dataInput.inherentRisk.overallRisk.description =
              arrIndicator[0].description;
            this.dataInput.inherentRisk.overallRisk.score =
              arrIndicator[0].score;
            this.findOverallControl();
          }
        }
      }
    });
  }

  // residualrisk -----------------------

  findOperationalImpactRiskRd() {
    if (this.dataInput.inherentRisk.operationalImpact.category == "") {
      this.dataInput.residualRisk.operationalImpact.loss = 0;
      this.dataInput.residualRisk.operationalImpact.score = 0;
    }
    let yearPeriode = this.yearPeriode;
    let operationalImpact;
    this.service.getreq("TbMOperationalImpacts").subscribe(response => {
      if (response != null) {
        //console.log(response);
        operationalImpact = response;
        let arrImp = operationalImpact.filter(function(item) {
          return (
            item.yearActive == yearPeriode &&
            item.category == this.inherentRisk.operationalImpact.category &&
            item.numberValue >= this.residualRisk.operationalImpact.loss
          );
        }, this.dataInput);
        //console.log(arrImp);
        if (arrImp[0] != null) {
          this.dataInput.residualRisk.operationalImpact.operationalObj = this.hasmin(
            arrImp,
            "numberValue"
          );
          let arrScore = this.riskIndicatorData.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.indicatorId ==
                this.residualRisk.operationalImpact.operationalObj
                  .riskIndicatorId
            );
          }, this.dataInput);
          if (arrScore[0] != null) {
            this.dataInput.residualRisk.operationalImpact.score = this.riskIndicatorData.filter(
              function(item) {
                return (
                  item.yearActive == yearPeriode &&
                  item.indicatorId ==
                    this.residualRisk.operationalImpact.operationalObj
                      .riskIndicatorId
                );
              },
              this.dataInput
            )[0].score;
            this.findOverallImpRd();
            //console.log(this.dataInput);
          } else {
            this.findOverallImpRd();
          }
        } else {
          //console.log("masuksini");
          let arrImp = operationalImpact.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.category == this.inherentRisk.operationalImpact.category
            );
          }, this.dataInput);
          if (arrImp[0] != null) {
            this.dataInput.residualRisk.operationalImpact.operationalObj = this.hasmax(
              arrImp,
              "numberValue"
            );
            let arrScore = this.riskIndicatorData.filter(function(item) {
              return (
                item.yearActive == yearPeriode &&
                item.indicatorId ==
                  this.residualRisk.operationalImpact.operationalObj
                    .riskIndicatorId
              );
            }, this.dataInput);
            if (arrScore[0] != null) {
              this.dataInput.residualRisk.operationalImpact.score = this.riskIndicatorData.filter(
                function(item) {
                  return (
                    item.yearActive == yearPeriode &&
                    item.indicatorId ==
                      this.residualRisk.operationalImpact.operationalObj
                        .riskIndicatorId
                  );
                },
                this.dataInput
              )[0].score;
              this.findOverallImpRd();
              //console.log(this.dataInput);
            } else {
              this.findOverallImpRd();
            }
          } else {
            this.findOverallImpRd();
          }
        }
      }
    });
  }

  findFinancialImpactRiskRd() {
    if (this.dataInput.inherentRisk.financialImpact.category == "") {
      this.dataInput.residualRisk.financialImpact.amount = 0;
      this.dataInput.residualRisk.financialImpact.score = 0;
    }
    let yearPeriode = this.yearPeriode;
    let financialImpact;
    this.service.getreq("TbMFinancialImpacts").subscribe(response => {
      if (response != null) {
        //console.log(response);
        financialImpact = response;
        let arrImp = financialImpact.filter(function(item) {
          return (
            item.yearActive == yearPeriode &&
            item.category == this.inherentRisk.financialImpact.category &&
            item.numberValue >= this.residualRisk.financialImpact.amount
          );
        }, this.dataInput);
        if (arrImp[0] != null) {
          this.dataInput.residualRisk.financialImpact.financialObj = this.hasmin(
            arrImp,
            "numberValue"
          );
          let arrScore = this.riskIndicatorData.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.indicatorId ==
                this.residualRisk.financialImpact.financialObj.riskIndicatorId
            );
          }, this.dataInput);
          if (arrScore[0] != null) {
            this.dataInput.residualRisk.financialImpact.score = this.riskIndicatorData.filter(
              function(item) {
                return (
                  item.yearActive == yearPeriode &&
                  item.indicatorId ==
                    this.residualRisk.financialImpact.financialObj
                      .riskIndicatorId
                );
              },
              this.dataInput
            )[0].score;
            this.findOverallImpRd();
            //console.log(this.dataInput);
          } else {
            this.findOverallImpRd();
          }
        } else {
          //console.log("masuksini");
          let arrImp = financialImpact.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.category == this.inherentRisk.financialImpact.category
            );
          }, this.dataInput);
          if (arrImp[0] != null) {
            this.dataInput.residualRisk.financialImpact.financialObj = this.hasmax(
              arrImp,
              "numberValue"
            );
            let arrScore = this.riskIndicatorData.filter(function(item) {
              return (
                item.yearActive == yearPeriode &&
                item.indicatorId ==
                  this.residualRisk.financialImpact.financialObj.riskIndicatorId
              );
            }, this.dataInput);
            if (arrScore[0] != null) {
              this.dataInput.residualRisk.financialImpact.score = this.riskIndicatorData.filter(
                function(item) {
                  return (
                    item.yearActive == yearPeriode &&
                    item.indicatorId ==
                      this.residualRisk.financialImpact.financialObj
                        .riskIndicatorId
                  );
                },
                this.dataInput
              )[0].score;
              this.findOverallImpRd();
              //console.log(this.dataInput);
            } else {
              this.findOverallImpRd();
            }
          } else {
            this.findOverallImpRd();
          }
        }
      }
    });
  }

  findOverallImpRd() {
    let arr = this.riskIndicatorData.filter(item => {
      return (
        item.yearActive == this.yearPeriode &&
        item.condition == "IMP" &&
        item.score ==
          this.hasmax(
            [
              {
                score:
                  this.dataInput.residualRisk.financialImpact.amount == 0 ||
                  this.dataInput.residualRisk.financialImpact.amount == null
                    ? 0
                    : this.dataInput.residualRisk.financialImpact.score
              },
              {
                score:
                  this.dataInput.residualRisk.operationalImpact.loss == 0 ||
                  this.dataInput.residualRisk.operationalImpact.loss == null
                    ? 0
                    : this.dataInput.residualRisk.operationalImpact.score
              },
              { score: this.dataInput.residualRisk.qualitativeRD.score }
            ],
            "score"
          ).score
      );
    });

    if (arr[0] != null) {
      //console.log(arr);
      this.dataInput.residualRisk.overallImpact.description =
        arr[0].description;
      this.dataInput.residualRisk.overallImpact.indicatorId =
        arr[0].indicatorId;
      this.dataInput.residualRisk.overallImpact.score = arr[0].score;
      this.findOverallRiskRd();
    } else {
      this.dataInput.residualRisk.overallImpact.description = "";
      this.dataInput.residualRisk.overallImpact.indicatorId = "";
      this.dataInput.residualRisk.overallImpact.score = 0;
      this.dataInput.residualRisk.overallImpact.indicatorId == "" &&
      this.dataInput.residualRisk.likelihood.substring(0, 6) == "" &&
      this.dataInput.residualRisk.overallImpact.score == 0
        ? (this.dataInput.expectedRisk.disabled = true)
        : (this.dataInput.expectedRisk.disabled = false);
      this.findOverallRiskRd();
    }
  }

  findOverallRiskRd() {
    //console.log("masuk");
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
            item.indicatorIdA ==
              this.dataInput.residualRisk.overallImpact.indicatorId &&
            item.indicatorIdB ==
              this.dataInput.residualRisk.likelihood.substring(0, 6)
          );
        });
        if (arr[0] != null) {
          let arrIndicator = this.riskIndicatorData.filter(item => {
            return (
              item.yearActive == this.yearPeriode &&
              item.indicatorId == arr[0].resultIdC
            );
          });
          //console.log(arrIndicator);
          if (arrIndicator[0] != null) {
            this.dataInput.residualRisk.overallRisk.indicatorId =
              arrIndicator[0].indicatorId;
            this.dataInput.residualRisk.overallRisk.description =
              arrIndicator[0].description;
            this.dataInput.residualRisk.overallRisk.score =
              arrIndicator[0].score;
            this.dataInput.residualRisk.overallImpact.indicatorId == "" &&
            this.dataInput.residualRisk.likelihood.substring(0, 6) == ""
              ? (this.dataInput.expectedRisk.disabled = true)
              : (this.dataInput.expectedRisk.disabled = false);
            this.findOverallControl();
          }
        }
      }
    });
    if (this.dataInput.expectedRisk.treatmentPlanSwitch == true) {
      this.dataInput.expectedRisk.impact =
        this.dataInput.residualRisk.overallImpact.indicatorId +
        "_" +
        this.dataInput.residualRisk.overallImpact.score;

      this.dataInput.expectedRisk.likelihood = this.dataInput.residualRisk.likelihood.substring(
        0,
        6
      );

      this.findExpectedRisk();
    }
  }

  // ----------------------
  findOverallControl() {
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
            item.indicatorIdA ==
              this.dataInput.inherentRisk.overallRisk.indicatorId &&
            item.indicatorIdB ==
              this.dataInput.residualRisk.overallRisk.indicatorId
          );
        });
        //console.log("ketemu");
        //console.log(arr);
        if (arr[0] != null) {
          let arrIndicator = this.riskIndicatorData.filter(item => {
            return (
              item.yearActive == this.yearPeriode &&
              item.indicatorId == arr[0].resultIdC
            );
          });
          //console.log(arrIndicator);
          if (arrIndicator[0] != null) {
            this.dataInput.currentAction.overallControl.indicatorId =
              arrIndicator[0].indicatorId;
            this.dataInput.currentAction.overallControl.description =
              arrIndicator[0].description;
            this.findAppropriateness();
          }
        } else {
          this.dataInput.currentAction.overallControl.indicatorId = "";
          this.dataInput.currentAction.overallControl.description = "";
          this.dataInput.currentAction.appropriateness.indicatorId = "";
          this.dataInput.currentAction.appropriateness.description = "";
        }
      }
    });
  }

  findAppropriateness() {
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
            item.indicatorIdA ==
              this.dataInput.currentAction.overallControl.indicatorId &&
            item.indicatorIdB == this.dataInput.currentAction.operation
          );
        });
        //console.log("ketemu");
        //console.log(arr);
        if (arr[0] != null) {
          let arrIndicator = this.riskIndicatorData.filter(item => {
            return (
              item.yearActive == this.yearPeriode &&
              item.indicatorId == arr[0].resultIdC
            );
          });
          //console.log(arrIndicator);
          if (arrIndicator[0] != null) {
            this.dataInput.currentAction.appropriateness.indicatorId =
              arrIndicator[0].indicatorId;
            this.dataInput.currentAction.appropriateness.description =
              arrIndicator[0].description;
          }
        } else {
          this.dataInput.currentAction.appropriateness.indicatorId = "";
          this.dataInput.currentAction.appropriateness.description = "";
        }
      }
    });
  }

  findExpectedRisk() {
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
            item.indicatorIdA ==
              this.dataInput.expectedRisk.impact.substring(0, 6) &&
            item.indicatorIdB ==
              this.dataInput.expectedRisk.likelihood.substring(0, 6)
          );
        });
        //console.log("ketemu");
        //console.log(arr);
        if (arr[0] != null) {
          let arrIndicator = this.riskIndicatorData.filter(item => {
            return (
              item.yearActive == this.yearPeriode &&
              item.indicatorId == arr[0].resultIdC
            );
          });
          //console.log(arrIndicator);
          if (arrIndicator[0] != null) {
            this.dataInput.expectedRisk.risk.indicatorId =
              arrIndicator[0].indicatorId;
            this.dataInput.expectedRisk.risk.description =
              arrIndicator[0].description;
            this.dataInput.expectedRisk.risk.score = arrIndicator[0].score;
          }
        }
      }
    });
  }

  reload() {}

  save() {
    if (!this.dataInput.edit) {
      if (this.dataInput.riskNo.substring(0, 3) == "DRF") {
        const savedData = {
          draftKey: this.dataInput.riskNo,
          draftJson: JSON.stringify(this.dataInput),
          division: this.dataInput.divisionDepartment.division.charId,
          department: this.dataInput.divisionDepartment.department
            .kodeDepartment,
          type: "RISK",
          year: moment().format("YYYY"),
          userUpdated: "Admin",
          dateUpdated: moment().format(),
          userCreated: "Admin",
          dateCreated: moment().format()
        };
        this.service.putreq("draftrisks", savedData).subscribe(
          response => {
            //console.log(response);
            this.toastr.success("Draft Deleted!");
          },
          error => {
            //console.log(error);
            this.toastr.error(
              "Draft Delete Failed! Reason: " + error.statusText
            );
          }
        );
      }
      //console.log("masuksini");

      const lastIndex = this.generateCounter();
      this.dataInput.counterNo = lastIndex + 1;
      let riskNo = this.riskNoGenerate(lastIndex + 1);
      this.dataInput.riskNo = riskNo;
      this.dataInput.draftDisabled = true;

      const savedData = {
        yearActive: this.yearPeriode,
        riskNo: this.dataInput.riskNo,
        division: this.dataInput.divisionDepartment.division.charId,
        companyKpi: this.dataInput.divisionDepartment.companyKpi.comInpId,
        department: this.dataInput.divisionDepartment.department.kodeDepartment,
        counterNo: lastIndex + 1,
        departmentKpi: this.dataInput.divisionDepartment.departmentKpi
          .deptInpId,
        businessProcess: this.dataInput.divisionDepartment.businessProcess,
        lossEvent: this.dataInput.riskDescription.lossEvent,
        caused: this.dataInput.riskDescription.caused,
        riskImpact: this.loopRiskImpact(),
        riskLevel: this.dataInput.riskDescription.riskLevel,
        accidentList: 0,
        notesIr: this.dataInput.inherentRisk.notes,
        finImpactIr: this.dataInput.inherentRisk.financialImpact.financialObj
          .financialId,
        finAmountIr: this.dataInput.inherentRisk.financialImpact.amount,
        opImpactIr: this.dataInput.inherentRisk.operationalImpact.operationalObj
          .operationalId,
        opAmountIr: this.dataInput.inherentRisk.operationalImpact.loss,
        qlImpactIr: this.dataInput.inherentRisk.qualitativeIR.id,
        irImpact: this.dataInput.inherentRisk.overallImpact.indicatorId,
        likelihoodIr: this.dataInput.inherentRisk.likelihood.substring(0, 6),
        overallRiskIr: this.dataInput.inherentRisk.overallRisk.indicatorId,
        controlList: 0,
        operationCt: this.dataInput.currentAction.operation,
        appropriatenessCt: this.dataInput.currentAction.appropriateness
          .indicatorId,
        notesRd: this.dataInput.residualRisk.notes,
        finAmountRd: this.dataInput.residualRisk.financialImpact.amount,
        opAmountRd: this.dataInput.residualRisk.operationalImpact.loss,
        qlImpactRd: this.dataInput.residualRisk.qualitativeRD.id,
        rdImpact: this.dataInput.residualRisk.overallImpact.indicatorId,
        likelihoodRd: this.dataInput.residualRisk.likelihood.substring(0, 6),
        overallRd: this.dataInput.residualRisk.overallRisk.indicatorId,
        overallEf: this.dataInput.currentAction.overallControl.indicatorId,
        treatmentPlan: false,
        treatmentDescription: this.dataInput.expectedRisk.treatmentPlan,
        impactEx: this.dataInput.expectedRisk.impact.substring(0, 6),
        likelihoodEx: this.dataInput.expectedRisk.likelihood.substring(0, 6),
        overallEx: this.dataInput.expectedRisk.risk.indicatorId,
        pic: this.dataInput.expectedRisk.PIC,
        schedule: this.dataInput.expectedRisk.schedule,
        userCreated: "Admin",
        datetimeCreated: moment().format(),
        userUpdate: "Admin",
        datetimeUpdate: moment().format()
      };
      //console.log(JSON.stringify(savedData));
      //console.log(savedData);
      this.service.postreq("TbRRiskAssessments", savedData).subscribe(
        response => {
          //console.log(response);
          this.saveControlAccident(savedData.riskNo);
          this.saveTreatmentNo(savedData.riskNo);
          this.dataInput.edit = true;
          const savedDataRisk = {
            draftKey: this.dataInput.riskNo,
            draftJson: JSON.stringify(this.dataInput),
            division: this.dataInput.divisionDepartment.division.charId,
            department: this.dataInput.divisionDepartment.department
              .kodeDepartment,
            type: "RISK",
            year: moment().format("YYYY"),
            userUpdated: "Admin",
            dateUpdated: moment().format(),
            userCreated: "Admin",
            dateCreated: moment().format()
          };
          this.service.postreq("draftrisks", savedDataRisk).subscribe(
            response => {
              this.reloadPage();
              //console.log(response);
            },
            error => {
              //console.log(error);
            }
          );
          this.toastr.success("Data Saved!");
        },
        error => {
          //console.log(error);
          this.toastr.error("Data Save Failed! Reason: " + error.statusText);
        }
      );
    } else {
      const savedData = {
        yearActive: this.yearPeriode,
        riskNo: this.dataInput.riskNo,
        division: this.dataInput.divisionDepartment.division.charId,
        companyKpi: this.dataInput.divisionDepartment.companyKpi.comInpId,
        department: this.dataInput.divisionDepartment.department.kodeDepartment,
        counterNo: this.dataInput.counterNo,
        departmentKpi: this.dataInput.divisionDepartment.departmentKpi
          .deptInpId,
        businessProcess: this.dataInput.divisionDepartment.businessProcess,
        lossEvent: this.dataInput.riskDescription.lossEvent,
        caused: this.dataInput.riskDescription.caused,
        riskImpact: this.loopRiskImpact(),
        riskLevel: this.dataInput.riskDescription.riskLevel,
        accidentList: 0,
        notesIr: this.dataInput.inherentRisk.notes,
        finImpactIr: this.dataInput.inherentRisk.financialImpact.financialObj
          .financialId,
        finAmountIr: this.dataInput.inherentRisk.financialImpact.amount,
        opImpactIr: this.dataInput.inherentRisk.operationalImpact.operationalObj
          .operationalId,
        opAmountIr: this.dataInput.inherentRisk.operationalImpact.loss,
        qlImpactIr: this.dataInput.inherentRisk.qualitativeIR.id,
        irImpact: this.dataInput.inherentRisk.overallImpact.indicatorId,
        likelihoodIr: this.dataInput.inherentRisk.likelihood.substring(0, 6),
        overallRiskIr: this.dataInput.inherentRisk.overallRisk.indicatorId,
        controlList: 0,
        operationCt: this.dataInput.currentAction.operation,
        appropriatenessCt: this.dataInput.currentAction.appropriateness
          .indicatorId,
        notesRd: this.dataInput.residualRisk.notes,
        finAmountRd: this.dataInput.residualRisk.financialImpact.amount,
        opAmountRd: this.dataInput.residualRisk.operationalImpact.loss,
        qlImpactRd: this.dataInput.residualRisk.qualitativeRD.id,
        rdImpact: this.dataInput.residualRisk.overallImpact.indicatorId,
        likelihoodRd: this.dataInput.residualRisk.likelihood.substring(0, 6),
        overallRd: this.dataInput.residualRisk.overallRisk.indicatorId,
        overallEf: this.dataInput.currentAction.overallControl.indicatorId,
        treatmentPlan: false,
        treatmentDescription: this.dataInput.expectedRisk.treatmentPlan,
        impactEx: this.dataInput.expectedRisk.impact.substring(0, 6),
        likelihoodEx: this.dataInput.expectedRisk.likelihood.substring(0, 6),
        overallEx: this.dataInput.expectedRisk.risk.indicatorId,
        pic: this.dataInput.expectedRisk.PIC,
        schedule: this.dataInput.expectedRisk.schedule,
        userCreated: "Admin",
        datetimeCreated: moment().format(),
        userUpdate: "Admin",
        datetimeUpdate: moment().format()
      };
      //console.log(JSON.stringify(savedData));
      //console.log(savedData);
      this.service.putreq("TbRRiskAssessments", savedData).subscribe(
        response => {
          //console.log(response);
          this.editTransaction(savedData.riskNo);

          this.dataInput.edit = true;
          const savedDataRisk = {
            draftKey: this.dataInput.riskNo,
            draftJson: JSON.stringify(this.dataInput),
            division: this.dataInput.divisionDepartment.division.charId,
            department: this.dataInput.divisionDepartment.department
              .kodeDepartment,
            type: "RISK",
            year: moment().format("YYYY"),
            userUpdated: "Admin",
            dateUpdated: moment().format(),
            userCreated: "Admin",
            dateCreated: moment().format()
          };
          this.service.putreq("draftrisks", savedDataRisk).subscribe(
            response => {
              this.reloadPage();
              //console.log(response);
            },
            error => {
              //console.log(error);
            }
          );
          this.toastr.success("Data Saved!");
        },
        error => {
          //console.log(error);
          this.toastr.error("Data Save Failed! Reason: " + error.statusText);
        }
      );
    }
  }

  public loopRiskImpact() {
    let data = "";

    for (let i = 0; i < this.dataInput.riskDescription.riskImpact.length; i++) {
      data == ""
        ? (data = this.dataInput.riskDescription.riskImpact[i])
        : (data = data + "," + this.dataInput.riskDescription.riskImpact[i]);
      if (this.dataInput.riskDescription.riskImpact.length - i == 1) {
        return data;
      }
    }
  }

  generateCounter() {
    let lastIndex = 0;
    for (let data in this.riskAssessmentData) {
      if (
        this.riskAssessmentData[data].yearActive == this.yearPeriode &&
        this.riskAssessmentData[data].division ==
          this.dataInput.divisionDepartment.division.charId &&
        this.riskAssessmentData[data].department ==
          this.dataInput.divisionDepartment.department.kodeDepartment
      ) {
        lastIndex <= this.riskAssessmentData[data].counterNo
          ? (lastIndex = this.riskAssessmentData[data].counterNo)
          : null;
      }
    }
    return lastIndex;
  }

  riskNoGenerate(lastIndex) {
    switch (lastIndex.toString().length) {
      case 2:
        return (
          this.dataInput.divisionDepartment.division.charId +
          "/" +
          this.dataInput.divisionDepartment.department.kodeDepartment +
          "-" +
          lastIndex.toString()
        );

      case 1:
        return (
          this.dataInput.divisionDepartment.division.charId +
          "/" +
          this.dataInput.divisionDepartment.department.kodeDepartment +
          "-" +
          "0" +
          lastIndex.toString()
        );
    }
  }

  saveControlAccident(riskNo) {
    this.dataInput.currentAction.controls.forEach((element, ind) => {
      this.dataInput.currentAction.controls[ind].riskNo = riskNo;
      this.service
        .postreq(
          "TbRControlDetails",
          this.dataInput.currentAction.controls[ind]
        )
        .subscribe(
          response => {
            //console.log(response);
          },
          error => {
            //console.log(error);
          }
        );
    });

    this.dataInput.riskDescription.accidentObj.forEach((element, ind) => {
      this.dataInput.riskDescription.accidentObj[ind].riskNo = riskNo;
      this.service
        .postreq(
          "TbRAccidentDetails",
          this.dataInput.riskDescription.accidentObj[ind]
        )
        .subscribe(
          response => {
            //console.log(response);
          },
          error => {
            //console.log(error);
          }
        );
    });
  }

  editTransaction(riskno) {
    this.service.getreq("TbRControlDetails").subscribe(
      response => {
        //console.log(response);
        response.forEach(element => {
          element.yearActive == this.yearPeriode && element.riskNo == riskno
            ? this.service
                .postreq("TbRControlDetails/deletecontrol", element)
                .subscribe(
                  response => {
                    //console.log(response);
                  },
                  error => {
                    //console.log(error);
                  }
                )
            : null;
        });
        this.service.getreq("TbRTreatmentDetails").subscribe(
          response => {
            //console.log(response);
            response.forEach(element => {
              element.yearActive == this.yearPeriode && element.riskNo == riskno
                ? this.service
                    .postreq("TbRTreatmentDetails/deletecontrol", element)
                    .subscribe(
                      response => {
                        //console.log(response);
                      },
                      error => {
                        //console.log(error);
                      }
                    )
                : null;
            });
            this.service.getreq("TbRAccidentDetails").subscribe(
              response => {
                //console.log(response);
                response.forEach(element => {
                  element.yearActive == this.yearPeriode &&
                  element.riskNo == riskno
                    ? this.service
                        .postreq("TbRAccidentDetails/deletecontrol", element)
                        .subscribe(
                          response => {
                            //console.log(response);
                          },
                          error => {
                            //console.log(error);
                          }
                        )
                    : null;
                });
                this.saveControlAccident(riskno);
                this.saveTreatmentNo(riskno);
              },
              error => {
                //console.log(error);
              }
            );
          },
          error => {
            //console.log(error);
          }
        );
      },
      error => {
        //console.log(error);
      }
    );
  }

  saveTreatmentNo(riskNo) {
    this.dataInput.expectedRisk.treatmentPlanArr.forEach((element, ind) => {
      this.dataInput.expectedRisk.treatmentPlanArr[ind].riskNo = riskNo;
      this.service
        .postreq(
          "TbRTreatmentDetails",
          this.dataInput.expectedRisk.treatmentPlanArr[ind]
        )
        .subscribe(
          response => {
            //console.log(response);
          },
          error => {
            //console.log(error);
          }
        );
    });
  }
  //   treatmentPlanSwitch: false,
  //   treatmentPlan: "",
  //   impact: "",
  //   likelihood: "",
  //   risk: {
  //     indicatorId: "",
  //     description: ""
  //   },
  //   PIC: "",
  //   schedule: ""
  // }
  treatmentPlanSwitch() {
    //console.log(this.dataInput.expectedRisk);
    if (this.dataInput.expectedRisk.treatmentPlanSwitch == true) {
      this.dataInput.expectedRisk.impact =
        this.dataInput.residualRisk.overallImpact.indicatorId +
        "_" +
        this.dataInput.residualRisk.overallImpact.score;

      this.dataInput.expectedRisk.likelihood = this.dataInput.residualRisk.likelihood;

      this.dataInput.expectedRisk.PIC = "";
      this.dataInput.expectedRisk.schedule = "";
      this.dataInput.expectedRisk.treatmentPlan = "Accept";
      this.dataInput.expectedRisk.treatmentPlanArr = [
        {
          yearActive: this.yearPeriode,
          riskNo: "",
          no: 1,
          description: "Accept",
          type: "",
          pic: "",
          dueDate: "",
          UserCreated: "Admin",
          DatetimeCreated: moment(),
          UserUpdate: "Admin",
          DatetimeUpdate: moment()
        }
      ];
      this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
    } else {
      this.dataInput.expectedRisk.impact = "";
      this.dataInput.expectedRisk.likelihood = "";
      this.dataInput.expectedRisk.PIC = "";
      this.dataInput.expectedRisk.schedule = "";
      this.dataInput.expectedRisk.treatmentPlan = "";
      this.dataInput.expectedRisk.risk.description = "";
      this.dataInput.expectedRisk.risk.indicatorId = "";
      this.dataInput.expectedRisk.treatmentPlanArr = [];
      this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
    }
    this.findExpectedRisk();
  }

  saveAsDraft() {
    if (
      this.dataInput.divisionDepartment.division.charId == "" ||
      this.dataInput.divisionDepartment.department.kodeDepartment == ""
    ) {
      this.toastr.error("Please Input Division and Department");
    } else {
      if (this.dataInput.riskNo.substring(0, 3) == "DRF") {
        const savedData = {
          draftKey: this.dataInput.riskNo,
          draftJson: JSON.stringify(this.dataInput),
          division: this.dataInput.divisionDepartment.division.charId,
          department: this.dataInput.divisionDepartment.department
            .kodeDepartment,
          type: "DRAFT",
          year: moment().format("YYYY"),
          userUpdated: "Admin",
          dateUpdated: moment().format(),
          userCreated: "Admin",
          dateCreated: moment().format()
        };
        this.service.putreq("draftrisks", savedData).subscribe(
          response => {
            //console.log(response);
            this.toastr.success("Draft Saved!");
          },
          error => {
            //console.log(error);
            this.toastr.error("Draft Save Failed! Reason: " + error.statusText);
          }
        );
      } else {
        let draftKey = "DRF/" + moment().format("YYYYMMDDHHMMSS");
        this.dataInput.riskNo = draftKey;
        const savedData = {
          draftKey: draftKey,
          draftJson: JSON.stringify(this.dataInput),
          division: this.dataInput.divisionDepartment.division.charId,
          department: this.dataInput.divisionDepartment.department
            .kodeDepartment,
          type: "DRAFT",
          year: moment().format("YYYY"),
          userUpdated: "Admin",
          dateUpdated: moment().format(),
          userCreated: "Admin",
          dateCreated: moment().format()
        };
        this.service.postreq("draftrisks", savedData).subscribe(
          response => {
            //console.log(response);
            this.toastr.success("Draft Saved!");
          },
          error => {
            //console.log(error);
            this.toastr.error("Draft Save Failed! Reason: " + error.statusText);
          }
        );
      }
    }
  }

  submit() {
    this.toastr.success("Data Saved!");
  }

  saveValidation = () => {
    if (
      this.dataInput.divisionDepartment.companyKpi.description == "" ||
      this.dataInput.divisionDepartment.departmentKpi.description == "" ||
      this.dataInput.divisionDepartment.businessProcess == "" ||
      this.dataInput.riskDescription.lossEvent == "" ||
      this.dataInput.riskDescription.caused == "" ||
      this.dataInput.riskDescription.riskLevel == "" ||
      this.loopRiskImpact() == null ||
      this.dataInput.inherentRisk.overallImpact.description == "" ||
      this.dataInput.inherentRisk.likelihood.substring(0, 6) == "" ||
      this.dataInput.inherentRisk.overallRisk.description == "" ||
      this.dataInput.currentAction.operation == "" ||
      this.dataInput.currentAction.appropriateness.description == "" ||
      this.dataInput.currentAction.overallControl.description == "" ||
      this.dataInput.currentAction.Preventive +
        this.dataInput.currentAction.Detective +
        this.dataInput.currentAction.Corrective ==
        0 ||
      this.dataInput.residualRisk.financialImpact.amount >
        this.dataInput.inherentRisk.financialImpact.amount ||
      this.dataInput.residualRisk.operationalImpact.loss >
        this.dataInput.inherentRisk.operationalImpact.loss ||
      this.dataInput.residualRisk.overallImpact.description == "" ||
      this.dataInput.residualRisk.likelihood.substring(0, 6) == "" ||
      this.dataInput.residualRisk.overallRisk.score >
        this.dataInput.inherentRisk.overallRisk.score ||
      this.dataInput.expectedRisk.risk.score >
        this.dataInput.residualRisk.overallRisk.score ||
      this.dataInput.residualRisk.overallRisk.description == "" ||
      this.dataInput.expectedRisk.treatmentPlanArr.length == 0 ||
      this.dataInput.expectedRisk.impact.substring(0, 6) == "" ||
      this.dataInput.expectedRisk.likelihood.substring(0, 6) == "" ||
      this.dataInput.residualRisk.qualitativeRD.score >
        this.dataInput.inherentRisk.qualitativeIR.score ||
      this.dataInput.residualRisk.overallImpact.score >
        this.dataInput.inherentRisk.overallImpact.score ||
      this.compareScore(
        this.dataInput.residualRisk.likelihood,
        this.dataInput.inherentRisk.likelihood
      ) ||
      this.compareScoreImpact(this.dataInput.expectedRisk.impact) ||
      this.compareScore(
        this.dataInput.expectedRisk.likelihood,
        this.dataInput.residualRisk.likelihood
      )
    ) {
      this.toastr.error("Please Complete The Form!");
      this.dataInput.activateValidation = true;
    } else {
      this.save();
    }
  };

  canDeactivate() {
    if (
      this.dataInput.divisionDepartment.companyKpi.description == "" ||
      this.dataInput.divisionDepartment.departmentKpi.description == "" ||
      this.dataInput.divisionDepartment.businessProcess == "" ||
      this.dataInput.riskDescription.lossEvent == "" ||
      this.dataInput.riskDescription.caused == "" ||
      this.dataInput.riskDescription.riskLevel == "" ||
      this.dataInput.inherentRisk.overallImpact.description == "" ||
      this.dataInput.inherentRisk.likelihood.substring(0, 6) == "" ||
      this.dataInput.inherentRisk.overallRisk.description == "" ||
      this.dataInput.currentAction.operation == "" ||
      this.dataInput.currentAction.appropriateness.description == "" ||
      this.dataInput.currentAction.overallControl.description == "" ||
      this.dataInput.currentAction.Preventive +
        this.dataInput.currentAction.Detective +
        this.dataInput.currentAction.Corrective ==
        0 ||
      this.dataInput.residualRisk.financialImpact.amount >
        this.dataInput.inherentRisk.financialImpact.amount ||
      this.dataInput.residualRisk.operationalImpact.loss >
        this.dataInput.inherentRisk.operationalImpact.loss ||
      this.dataInput.residualRisk.overallImpact.description == "" ||
      this.dataInput.residualRisk.likelihood.substring(0, 6) == "" ||
      this.dataInput.residualRisk.overallRisk.description == "" ||
      this.dataInput.expectedRisk.treatmentPlanArr.length == 0 ||
      this.dataInput.expectedRisk.impact.substring(0, 6) == "" ||
      this.dataInput.expectedRisk.likelihood.substring(0, 6) == "" ||
      this.dataInput.residualRisk.qualitativeRD.score >
        this.dataInput.inherentRisk.qualitativeIR.score ||
      this.dataInput.residualRisk.overallImpact.score >
        this.dataInput.inherentRisk.overallImpact.score ||
      this.compareScore(
        this.dataInput.residualRisk.likelihood,
        this.dataInput.inherentRisk.likelihood
      ) ||
      this.compareScoreImpact(this.dataInput.expectedRisk.impact) ||
      this.compareScore(
        this.dataInput.expectedRisk.likelihood,
        this.dataInput.residualRisk.likelihood
      )
    ) {
      return false;
    } else {
      return true;
    }
  }

  deleteTreatment(event) {
    if (!this.dataInput.expectedRisk.treatmentPlanSwitch) {
      event.confirm.resolve();
      this.dataInput.expectedRisk.treatmentPlanArr = this.dataInput.expectedRisk.treatmentPlanArr.filter(
        function(item) {
          return item.no != this.no;
        },
        event.data
      );
      this.dataInput.expectedRisk.treatmentPlanArr.forEach((element, ind) => {
        element.no = ind + 1;
      });
      this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
      //console.log(this.dataInput.expectedRisk.treatmentPlanArr);
    } else {
      event.confirm.reject();
      this.toastr.error("Data cannot be deleted!");
    }
  }
  saveTreatment(event) {
    if (!this.dataInput.expectedRisk.treatmentPlanSwitch) {
      if (
        event.newData.description != "" &&
        event.newData.pic != "" &&
        event.newData.dueDate != ""
      ) {
        event.confirm.resolve(event.newData);
        this.dataInput.expectedRisk.treatmentPlanArr.forEach((element, ind) => {
          element.no == event.newData.no
            ? (element.type = event.newData.type)
            : null;
        });
      } else {
        event.confirm.reject();
      }
    } else {
      event.confirm.reject();
      this.toastr.error("Data cannot be saved!");
    }
  }

  showTrt() {
    this.activeModal = this.modalService.open(RiskRegisterTrtComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    // let lastIndex = 1;
    // for (let data in this.tabledata) {
    //   if (this.tabledata[data].riskNo == this.myForm.value.riskno) {
    //     lastIndex < this.tabledata[data].no
    //       ? (lastIndex = this.tabledata[data].no)
    //       : null;
    //   }
    // }

    // this.activeModal.componentInstance.riskno = this.riskno;
    let lastIndex = 0;
    for (let data in this.dataInput.expectedRisk.treatmentPlanArr) {
      lastIndex <= this.dataInput.expectedRisk.treatmentPlanArr[data].no
        ? (lastIndex = this.dataInput.expectedRisk.treatmentPlanArr[data].no)
        : null;
    }
    this.activeModal.componentInstance.formData = {
      yearActive: this.yearPeriode,
      riskNo: "",
      no: lastIndex + 1,
      description: "",
      type: "",
      pic: "",
      dueDate: "",
      UserCreated: "Admin",
      DatetimeCreated: moment(),
      UserUpdate: "Admin",
      DatetimeUpdate: moment()
    };

    this.activeModal.result.then(
      async response => {
        if (response != false) {
          // this.tabledata.push(response);
          // //console.log(this.tabledata);
          // this.reload();

          this.dataInput.expectedRisk.treatmentPlanArr.push(response);
          this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
        }
      },
      error => {}
    );
  }

  onChange() {
    //console.log(this.dataInput.riskDescription.riskImpact);
  }

  selectRiskImpact(event){
    console.log(event);
  }

  public filterDepartment() {
    let arr = this.departmentData.filter(item => {
      return (
        item.kodeDivisi == this.dataInput.divisionDepartment.division.charId
      );
    });
    //console.log(arr);
    if (arr[0] != null) {
      this.departmentFilter = arr;
      this.dataInput.divisionDepartment.department.kodeDepartment =
        arr[0].kodeDepartment;
    } else {
      //console.log(arr);
      this.departmentFilter = [];
    }
    this.changeDept();
  }
  changeDept() {
    this.dataInput.divisionDepartment.departmentKpi.deptInpId = "";
    this.dataInput.divisionDepartment.departmentKpi.description = "";
  }

  compareScore(a, b) {
    return Number(a.split("_").pop()) > Number(b.split("_").pop())
      ? true
      : false;
  }

  compareScoreImpact(a) {
    return Number(a.split("_").pop()) >
      this.dataInput.residualRisk.overallImpact.score
      ? true
      : false;
  }
  reloadPage() {
    this.router.navigateByUrl("/pages/dashboard");
    // window.location.reload();
  }
  deloopRiskImpact(riskimpact) {
    if (riskimpact != null) {
      let arrResult = [];
      let lastindex = -1;
      for (let i = 0; i < riskimpact.length; i++) {
        if (riskimpact[i] == ",") {
          arrResult.push(riskimpact.slice(lastindex + 1, i));
          lastindex = i;
        }
      }
      return arrResult;
    } else {
      return [];
    }
  }

  createDraft() {
    //loadmaster
    let tbMComInputs = [];
    let TbMDeptInputs = [];
    let TbMRiskIndicators = [];
    let TbMOperationalImpacts = [];
    let TbMFinancialImpacts = [];
    let TbMQualitativeImpacts = [];
    let TbRControlDetails = [];
    let TbRtreatmentDetails = [];
    this.service.getreq("TbMComInputs").subscribe(response => {
      tbMComInputs = response;
      this.service.getreq("TbMDeptInputs").subscribe(response => {
        TbMDeptInputs = response;
        this.service.getreq("TbMRiskIndicators").subscribe(response => {
          TbMRiskIndicators = response;
          this.service.getreq("TbMOperationalImpacts").subscribe(response => {
            TbMOperationalImpacts = response;
            this.service.getreq("TbMFinancialImpacts").subscribe(response => {
              TbMFinancialImpacts = response;
              this.service
                .getreq("TbMQualitativeImpacts")
                .subscribe(response => {
                  TbMQualitativeImpacts = response;
                  this.service
                    .getreq("TbRControlDetails")
                    .subscribe(response => {
                      TbRControlDetails = response;
                      this.service
                        .getreq("TbRtreatmentdetails")
                        .subscribe(response => {
                          TbRtreatmentDetails = response;

                          this.service
                            .getreq("TbRRiskAssessments")
                            .subscribe(response => {
                              response.forEach(element => {
                                TbMOperationalImpacts.filter(item => {
                                  return (
                                    item.yearActive == element.yearActive &&
                                    item.operationalId == element.opImpactIr
                                  );
                                })[0] != null
                                  ? console.log("woi")
                                  : console.log("wei");
                                let dataInput = {
                                  counterNo: element.counterNo,
                                  edit: true,
                                  activateValidation: false,
                                  draftDisabled: false,
                                  riskNo: element.riskNo,
                                  divisionDepartment: {
                                    division: {
                                      charId: element.division
                                    },
                                    department: {
                                      kodeDepartment: element.department
                                    },
                                    companyKpi: {
                                      comInpId: element.companyKpi,
                                      description:
                                        tbMComInputs.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.comInpId == element.companyKpi
                                          );
                                        })[0] != null
                                          ? tbMComInputs.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.comInpId ==
                                                  element.companyKpi
                                              );
                                            })[0].description
                                          : ""
                                    },
                                    departmentKpi: {
                                      deptInpId: element.departmentKpi,
                                      description:
                                        TbMDeptInputs.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.deptInpId ==
                                              element.departmentKpi
                                          );
                                        })[0] != null
                                          ? TbMDeptInputs.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.deptInpId ==
                                                  element.departmentKpi
                                              );
                                            })[0].description
                                          : ""
                                    },
                                    businessProcess: element.businessProcess
                                  },
                                  riskDescription: {
                                    lossEvent: element.lossEvent,
                                    caused: element.caused,
                                    accidentObj: [],
                                    riskImpact: this.deloopRiskImpact(
                                      element.riskImpact
                                    ),
                                    riskLevel: element.riskLevel,
                                    optionsModel: []
                                  },
                                  inherentRisk: {
                                    overallRisk: {
                                      indicatorId: element.overallRiskIr,
                                      description:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId ==
                                              element.overallRiskIr
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.overallRiskIr
                                              );
                                            })[0].description
                                          : "",
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId ==
                                              element.overallRiskIr
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.overallRiskIr
                                              );
                                            })[0].score
                                          : 0
                                    },
                                    likelihood:
                                      TbMRiskIndicators.filter(item => {
                                        return (
                                          item.yearActive ==
                                            element.yearActive &&
                                          item.indicatorId ==
                                            element.likelihoodIr
                                        );
                                      })[0] != null
                                        ? TbMRiskIndicators.filter(item => {
                                            return (
                                              item.yearActive ==
                                                element.yearActive &&
                                              item.indicatorId ==
                                                element.likelihoodIr
                                            );
                                          })[0].indicatorId +
                                          "_" +
                                          TbMRiskIndicators.filter(item => {
                                            return (
                                              item.yearActive ==
                                                element.yearActive &&
                                              item.indicatorId ==
                                                element.likelihoodIr
                                            );
                                          })[0].score
                                        : "",
                                    overallImpact: {
                                      indicatorId: element.irImpact,
                                      description:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId == element.irImpact
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.irImpact
                                              );
                                            })[0].description
                                          : "",
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId == element.irImpact
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.irImpact
                                              );
                                            })[0].score
                                          : 0
                                    },
                                    operationalImpact: {
                                      category:
                                        element.opImpactIr != null
                                          ? element.opImpactIr.slice(0, 3)
                                          : "",
                                      loss: element.opAmountIr,
                                      operationalObj:
                                        TbMOperationalImpacts.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.operationalId ==
                                              element.opImpactIr
                                          );
                                        })[0] != null
                                          ? TbMOperationalImpacts.filter(
                                              item => {
                                                return (
                                                  item.yearActive ==
                                                    element.yearActive &&
                                                  item.operationalId ==
                                                    element.opImpactIr
                                                );
                                              }
                                            )[0]
                                          : {},
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          const a =
                                            TbMOperationalImpacts.filter(
                                              item => {
                                                return (
                                                  item.yearActive ==
                                                    element.yearActive &&
                                                  item.operationalId ==
                                                    element.opImpactIr
                                                );
                                              }
                                            )[0] != null
                                              ? TbMOperationalImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.operationalId ==
                                                        element.opImpactIr
                                                    );
                                                  }
                                                )[0].riskIndicatorId
                                              : "";
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId == a
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              const a =
                                                TbMOperationalImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.operationalId ==
                                                        element.opImpactIr
                                                    );
                                                  }
                                                )[0] != null
                                                  ? TbMOperationalImpacts.filter(
                                                      item => {
                                                        return (
                                                          item.yearActive ==
                                                            element.yearActive &&
                                                          item.operationalId ==
                                                            element.opImpactIr
                                                        );
                                                      }
                                                    )[0].riskIndicatorId
                                                  : "";
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId == a
                                              );
                                            })[0].score
                                          : 0
                                    },
                                    financialImpact: {
                                      category:
                                        element.finImpactIr != null
                                          ? element.finImpactIr.slice(0, 3)
                                          : "",
                                      amount: element.finAmountIr,
                                      financialObj:
                                        TbMFinancialImpacts.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.financialId ==
                                              element.finImpactIr
                                          );
                                        })[0] != null
                                          ? TbMFinancialImpacts.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.financialId ==
                                                  element.finImpactIr
                                              );
                                            })[0]
                                          : {},
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          const a =
                                            TbMFinancialImpacts.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.operationalId ==
                                                  element.opImpactIr
                                              );
                                            })[0] != null
                                              ? TbMFinancialImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.operationalId ==
                                                        element.opImpactIr
                                                    );
                                                  }
                                                )[0].riskIndicatorId
                                              : "";
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId == a
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              const a =
                                                TbMFinancialImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.operationalId ==
                                                        element.opImpactIr
                                                    );
                                                  }
                                                )[0] != null
                                                  ? TbMFinancialImpacts.filter(
                                                      item => {
                                                        return (
                                                          item.yearActive ==
                                                            element.yearActive &&
                                                          item.operationalId ==
                                                            element.opImpactIr
                                                        );
                                                      }
                                                    )[0].riskIndicatorId
                                                  : "";
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId == a
                                              );
                                            })[0].score
                                          : 0
                                    },
                                    notes: element.notesIr,
                                    qualitativeIR: {
                                      id: element.qlImpactIr,
                                      desc:
                                        TbMQualitativeImpacts.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.qualitativeId ==
                                              element.qlImpactIr
                                          );
                                        })[0] != null
                                          ? TbMQualitativeImpacts.filter(
                                              item => {
                                                return (
                                                  item.yearActive ==
                                                    element.yearActive &&
                                                  item.qualitativeId ==
                                                    element.qlImpactIr
                                                );
                                              }
                                            )[0].description
                                          : "",
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          const a =
                                            TbMQualitativeImpacts.filter(
                                              item => {
                                                return (
                                                  item.yearActive ==
                                                    element.yearActive &&
                                                  item.qualitativeId ==
                                                    element.qlImpactIr
                                                );
                                              }
                                            )[0] != null
                                              ? TbMQualitativeImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.qualitativeId ==
                                                        element.qlImpactIr
                                                    );
                                                  }
                                                )[0].riskIndicatorId
                                              : "";
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId == a
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              const a =
                                                TbMQualitativeImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.qualitativeId ==
                                                        element.qlImpactIr
                                                    );
                                                  }
                                                )[0] != null
                                                  ? TbMQualitativeImpacts.filter(
                                                      item => {
                                                        return (
                                                          item.yearActive ==
                                                            element.yearActive &&
                                                          item.qualitativeId ==
                                                            element.qlImpactIr
                                                        );
                                                      }
                                                    )[0].riskIndicatorId
                                                  : "";
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId == a
                                              );
                                            })[0].score
                                          : 0
                                    }
                                  },
                                  residualRisk: {
                                    notes: element.notesRd,
                                    overallRisk: {
                                      indicatorId: element.overallRd,
                                      description:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId ==
                                              element.overallRd
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.overallRd
                                              );
                                            })[0].description
                                          : "",
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId ==
                                              element.overallRd
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.overallRd
                                              );
                                            })[0].score
                                          : 0
                                    },
                                    likelihood:
                                      TbMRiskIndicators.filter(item => {
                                        return (
                                          item.yearActive ==
                                            element.yearActive &&
                                          item.indicatorId ==
                                            element.likelihoodRd
                                        );
                                      })[0] != null
                                        ? TbMRiskIndicators.filter(item => {
                                            return (
                                              item.yearActive ==
                                                element.yearActive &&
                                              item.indicatorId ==
                                                element.likelihoodRd
                                            );
                                          })[0].indicatorId +
                                          "_" +
                                          TbMRiskIndicators.filter(item => {
                                            return (
                                              item.yearActive ==
                                                element.yearActive &&
                                              item.indicatorId ==
                                                element.likelihoodRd
                                            );
                                          })[0].score
                                        : "",
                                    overallImpact: {
                                      indicatorId: element.rdImpact,
                                      description:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId == element.rdImpact
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.rdImpact
                                              );
                                            })[0].description
                                          : "",
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId == element.rdImpact
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.rdImpact
                                              );
                                            })[0].score
                                          : 0
                                    },
                                    operationalImpact: {
                                      category:
                                        element.opImpactIr != null
                                          ? element.opImpactIr.slice(0, 3)
                                          : "",
                                      loss: element.opAmountRd,
                                      operationalObj:
                                        TbMOperationalImpacts.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.operationalId ==
                                              element.opImpactIr
                                          );
                                        })[0] != null
                                          ? TbMOperationalImpacts.filter(
                                              item => {
                                                return (
                                                  item.yearActive ==
                                                    element.yearActive &&
                                                  item.operationalId ==
                                                    element.opImpactIr
                                                );
                                              }
                                            )[0]
                                          : {},
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          const a =
                                            TbMOperationalImpacts.filter(
                                              item => {
                                                return (
                                                  item.yearActive ==
                                                    element.yearActive &&
                                                  item.operationalId ==
                                                    element.opImpactIr
                                                );
                                              }
                                            )[0] != null
                                              ? TbMOperationalImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.operationalId ==
                                                        element.opImpactIr
                                                    );
                                                  }
                                                )[0].riskIndicatorId
                                              : "";
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId == a
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              const a =
                                                TbMOperationalImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.operationalId ==
                                                        element.opImpactIr
                                                    );
                                                  }
                                                )[0] != null
                                                  ? TbMOperationalImpacts.filter(
                                                      item => {
                                                        return (
                                                          item.yearActive ==
                                                            element.yearActive &&
                                                          item.operationalId ==
                                                            element.opImpactIr
                                                        );
                                                      }
                                                    )[0].riskIndicatorId
                                                  : "";
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId == a
                                              );
                                            })[0].score
                                          : 0
                                    },
                                    financialImpact: {
                                      category:
                                        element.finImpactIr != null
                                          ? element.finImpactIr.slice(0, 3)
                                          : "",
                                      amount: element.finAmountRd,
                                      financialObj:
                                        TbMFinancialImpacts.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.financialId ==
                                              element.finImpactIr
                                          );
                                        })[0] != null
                                          ? TbMFinancialImpacts.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.financialId ==
                                                  element.finImpactIr
                                              );
                                            })[0]
                                          : {},
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          const a =
                                            TbMFinancialImpacts.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.operationalId ==
                                                  element.opImpactIr
                                              );
                                            })[0] != null
                                              ? TbMFinancialImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.operationalId ==
                                                        element.opImpactIr
                                                    );
                                                  }
                                                )[0].riskIndicatorId
                                              : "";
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId == a
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              const a =
                                                TbMFinancialImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.operationalId ==
                                                        element.opImpactIr
                                                    );
                                                  }
                                                )[0] != null
                                                  ? TbMFinancialImpacts.filter(
                                                      item => {
                                                        return (
                                                          item.yearActive ==
                                                            element.yearActive &&
                                                          item.operationalId ==
                                                            element.opImpactIr
                                                        );
                                                      }
                                                    )[0].riskIndicatorId
                                                  : "";
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId == a
                                              );
                                            })[0].score
                                          : 0
                                    },
                                    qualitativeRD: {
                                      id: element.qlImpactRd,
                                      desc:
                                        TbMQualitativeImpacts.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.qualitativeId ==
                                              element.qlImpactRd
                                          );
                                        })[0] != null
                                          ? TbMQualitativeImpacts.filter(
                                              item => {
                                                return (
                                                  item.yearActive ==
                                                    element.yearActive &&
                                                  item.qualitativeId ==
                                                    element.qlImpactRd
                                                );
                                              }
                                            )[0].description
                                          : "",
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          const a =
                                            TbMQualitativeImpacts.filter(
                                              item => {
                                                return (
                                                  item.yearActive ==
                                                    element.yearActive &&
                                                  item.qualitativeId ==
                                                    element.qlImpactRd
                                                );
                                              }
                                            )[0] != null
                                              ? TbMQualitativeImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.qualitativeId ==
                                                        element.qlImpactRd
                                                    );
                                                  }
                                                )[0].riskIndicatorId
                                              : "";
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId == a
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              const a =
                                                TbMQualitativeImpacts.filter(
                                                  item => {
                                                    return (
                                                      item.yearActive ==
                                                        element.yearActive &&
                                                      item.qualitativeId ==
                                                        element.qlImpactRd
                                                    );
                                                  }
                                                )[0] != null
                                                  ? TbMQualitativeImpacts.filter(
                                                      item => {
                                                        return (
                                                          item.yearActive ==
                                                            element.yearActive &&
                                                          item.qualitativeId ==
                                                            element.qlImpactRd
                                                        );
                                                      }
                                                    )[0].riskIndicatorId
                                                  : "";
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId == a
                                              );
                                            })[0].score
                                          : 0
                                    }
                                  },
                                  currentAction: {
                                    Preventive: 1,
                                    Detective: 0,
                                    Corrective: 0,
                                    operation: element.operationCt,
                                    controls:
                                      TbRControlDetails.filter(item => {
                                        return (
                                          item.yearActive ==
                                            element.yearActive &&
                                          item.riskNo == element.riskNo
                                        );
                                      })[0] != null
                                        ? TbRControlDetails.filter(item => {
                                            return (
                                              item.yearActive ==
                                                element.yearActive &&
                                              item.riskNo == element.riskNo
                                            );
                                          })
                                        : [],
                                    overallControl: {
                                      indicatorId: element.overallEf,
                                      description:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId ==
                                              element.overallEf
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.overallEf
                                              );
                                            })[0].description
                                          : ""
                                    },
                                    appropriateness: {
                                      indicatorId: element.appropriatenessCt,
                                      description:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId ==
                                              element.appropriatenessCt
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.appropriatenessCt
                                              );
                                            })[0].description
                                          : ""
                                    }
                                  },
                                  expectedRisk: {
                                    disabled: true,
                                    treatmentPlanSwitch: false,
                                    treatmentPlan: "",
                                    impact:
                                      TbMRiskIndicators.filter(item => {
                                        return (
                                          item.yearActive ==
                                            element.yearActive &&
                                          item.indicatorId == element.impactEx
                                        );
                                      })[0] != null
                                        ? TbMRiskIndicators.filter(item => {
                                            return (
                                              item.yearActive ==
                                                element.yearActive &&
                                              item.indicatorId ==
                                                element.impactEx
                                            );
                                          })[0].indicatorId +
                                          "_" +
                                          TbMRiskIndicators.filter(item => {
                                            return (
                                              item.yearActive ==
                                                element.yearActive &&
                                              item.indicatorId ==
                                                element.impactEx
                                            );
                                          })[0].score
                                        : "",
                                    likelihood:
                                      TbMRiskIndicators.filter(item => {
                                        return (
                                          item.yearActive ==
                                            element.yearActive &&
                                          item.indicatorId ==
                                            element.likelihoodEx
                                        );
                                      })[0] != null
                                        ? TbMRiskIndicators.filter(item => {
                                            return (
                                              item.yearActive ==
                                                element.yearActive &&
                                              item.indicatorId ==
                                                element.likelihoodEx
                                            );
                                          })[0].indicatorId +
                                          "_" +
                                          TbMRiskIndicators.filter(item => {
                                            return (
                                              item.yearActive ==
                                                element.yearActive &&
                                              item.indicatorId ==
                                                element.likelihoodEx
                                            );
                                          })[0].score
                                        : "",
                                    risk: {
                                      indicatorId: element.overallEx,
                                      description:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId ==
                                              element.overallEx
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.overallEx
                                              );
                                            })[0].description
                                          : "",
                                      score:
                                        TbMRiskIndicators.filter(item => {
                                          return (
                                            item.yearActive ==
                                              element.yearActive &&
                                            item.indicatorId ==
                                              element.overallEx
                                          );
                                        })[0] != null
                                          ? TbMRiskIndicators.filter(item => {
                                              return (
                                                item.yearActive ==
                                                  element.yearActive &&
                                                item.indicatorId ==
                                                  element.overallEx
                                              );
                                            })[0].score
                                          : 0
                                    },
                                    PIC: "",
                                    schedule: "",
                                    treatmentPlanArr:
                                      TbRtreatmentDetails.filter(item => {
                                        return (
                                          item.yearActive ==
                                            element.yearActive &&
                                          item.riskNo == element.riskNo
                                        );
                                      })[0] != null
                                        ? TbRtreatmentDetails.filter(item => {
                                            return (
                                              item.yearActive ==
                                                element.yearActive &&
                                              item.riskNo == element.riskNo
                                            );
                                          })
                                        : []
                                  }
                                };
                                console.log(dataInput);
                                let savedData = {
                                  draftKey: element.riskNo,
                                  draftJson: JSON.stringify(dataInput),
                                  division: element.division,
                                  department: element.department,
                                  type: "RISK",
                                  year: moment().format("YYYY"),
                                  userUpdated: "Admin",
                                  dateUpdated: moment().format(),
                                  userCreated: "Admin",
                                  dateCreated: moment().format()
                                };
                                this.service
                                  .postreq("draftrisks", savedData)
                                  .subscribe(
                                    response => {
                                      //console.log(response);
                                      this.toastr.success("Draft Saved!");
                                    },
                                    error => {
                                      //console.log(error);
                                      this.toastr.error(
                                        "Draft Save Failed! Reason: " +
                                          error.statusText
                                      );
                                    }
                                  );
                              });
                            });
                        });
                    });
                });
            });
          });
        });
      });
    });
  }
}
/*
Note : Change by me
1. this.loopRiskImpact() -> this.dataInput.riskDescription.riskImpact
*/