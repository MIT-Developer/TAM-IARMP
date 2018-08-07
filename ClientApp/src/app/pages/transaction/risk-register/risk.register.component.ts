import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import * as $ from "jquery";
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
  
  canDeactivate() {
    if(!this.state.filled){
      return false;
    }else{
      return true;
    }
    
  }

  selectors : any = {
    divisions: [],
    department: [],
    companyKpi: [],
    riskImpact: [],
    riskLevel: [],
    financialImpact: [
      {
        charId: "NEP",
        description: "Net Profit"
      },
      {
        charId: "REV",
        description: "Revenue"
      },
      {
        charId: "COF",
        description: "Cost of revenue"
      },
      {
        charId: "OEX",
        description: "Operating expenses"
      },
      {
        charId: "CHG",
        description: "Non operating income/charges"
      }
    ],
    operationalImpact:[
      {
         charId: "1",
         description: "Days of operation disruption"
       },{
         charId: "2",
         description: "CSI(After Sales)"
       },{
         charId: "3",
         description: "CS Sales"
       },{
         charId: "4",
         description: "Sales"
       },{
         charId: "5",
         description: "M/S"
       }
    ],
    qualitativeImpact: [],
    operation : [],
    impact: [],
    likelihood: [],
    appropriate: []
  }

  state : any = {
    filled: false,
    document:{
      risk_period : moment().format('YYYY'),
      register_no : ''
    },
    division:{
      division: '',
      department: '',
      companyKpi:[],
      departmentObjectiveKpi: '',
      activityBusinessProcess: ''
    },
    riskDescription:{
      lossEvent:'',
      cause: '',
      riskImpact: [],
      riskLevel : '',
    },
    inherentRisk :{
      notes: '',
      financialImpact: '',
      amount: '',
      operationalImpact: '',
      loss: '',
      qualitativeImpact: '',
      impact: '',
      likelihood: '',
      overall: ''
    },
    currentAction:{
      currentAction: '',
      listAction: '',
      operation: '',
      appropriate: '',
      overall: '',
      preventive: '',
      detective : '',
      corrective: ''
    },
    residualRisk :{
      notes: '',
      financialImpact: '',
      operationalImpact: '',
      strategic: '',
      impact: '',
      likelihood: '',
      overall: ''
    },
    expectedRisk:{
      treatmentPlan: '',
      impact: '',
      likelihood: '',
      overall: '',
      pic: '',
      scheduled: ''
    }
    
  }

  data: any = {
    division: [],
    department: [],
    riskIndicators: [],
    financialImpact: [],
    libraries: []
  }

  riskAssessmentData: any =[]
   
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
  }

  ngOnInit() {
    $('.select-multiple').select2();
    //getRouteParams
    this.route.queryParams.subscribe(params => {
      console.log("draft Edit");
    });
    //get Risk Indicator
    this.service.getreq("TbMRiskIndicators").subscribe(response => {
      console.log("TbMRiskIndicators", response);
      this.data.riskIndicators = response;
      this.selectors.riskImpact = this.data.riskIndicators.filter(object => {return (object.flagActive == 'Active' &&  object.condition == 'RTP')});
      this.selectors.riskLevel = this.data.riskIndicators.filter(object => {return (object.flagActive == 'Active' &&  object.condition == 'LVL')});
      this.selectors.operation = this.data.riskIndicators.filter(object => {return (object.flagActive == 'Active' &&  object.condition == 'OPR')});
      this.selectors.impact = this.data.riskIndicators.filter(object => {return (object.flagActive == 'Active' &&  object.condition == 'IMP')});
      this.selectors.likelihood = this.data.riskIndicators.filter(object => {return (object.flagActive == 'Active' &&  object.condition == 'LKL')});
      this.selectors.appropriate = this.data.riskIndicators.filter(object => {return (object.flagActive == 'Active' &&  object.condition == 'APR')});
    });
    //get Department
    this.service.getreq("tbmlibraries").subscribe(response => {
      this.data.divisions = response.filter(object => {return (object.condition == 'DIV')});
      this.selectors.divisions = this.data.divisions;
    });
    //getDivision
    this.service.getreq("tbmdivdepts").subscribe(response => {
      this.data.department = response.filter(object=> {return (object.kodeDivisi == object.kodeDepartment)});
    });
    //get Company KPI
    this.service.getreq("TbMComInputs").subscribe(response => {
      this.selectors.companyKpi = response.filter(object => {return (object.flagActive == 'Active' && object.condition == 'KPI')});
    });
    //get financial
    this.service.getreq("TbMFinancialImpacts").subscribe(response => {
      // console.log(response);
      // this.data.financialImpact = response.filter(object=> return (object.kodeDivisi == object.kodeDepartment));
    });
    //getQualitative Impact
    this.service.getreq("TbMQualitativeImpacts").subscribe(response => {
      console.log(response);
    });
    //getLibrary
    this.service.getreq("TbMLibraries").subscribe(response => {
      console.log(response);
      this.data.libraries = response;
      
    });
    this.service.getreq("TbRRiskAssessments").subscribe(response => {
      if (response != null) {
        this.riskAssessmentData = response;
      }
      console.log(this.riskAssessmentData);
    });
  }

  getBiggestRiskImpact(list){
    console.log(list);
    let biggest = '';
    list.forEach((indicator, index)=>{
     if(index == 0){
       biggest = indicator;
     }
     if(index >= 1){
       const b = parseInt(list[index-1].substring(3,6));
       const c = parseInt(indicator.substring(3,6));
       console.log(b+" vs "+c);
       if(b > c){
         biggest = indicator;
       }  
     }
    });
    return biggest;
  }

  changeFinancialImpact(){
    console.log("Financial Impact Change to", this.state.inherentRisk.financialImpact);
  }  

  changeInherentQualitativeImpact(){
    let biggest = this.getBiggestRiskImpact([this.state.inherentRisk.qualitativeImpact]);
    const impact = this.data.riskIndicators.find(object => {return (object.flagActive == 'Active' &&  object.condition == 'IMP' && object.indicatorId == biggest)});
    this.state.inherentRisk.impact = impact;
  }

  changeInherentLikelihood(){

      let biggest = this.getBiggestRiskImpact([ this.state.inherentRisk.impact.indicatorId, this.state.inherentRisk.likelihood]);
      console.log(biggest, this.state.inherentRisk.likelihood);
      const overall = this.data.riskIndicators.find(object => {return (object.flagActive == 'Active' &&  object.condition == 'OVR' && object.indicatorId.substring(3,6) == biggest.substring(3,6))});
      this.state.inherentRisk.overall = overall;
  }

  changeExpectedImpact(){
    let biggest = this.getBiggestRiskImpact([ this.state.expectedRisk.impact, this.state.expectedRisk.likelihood]);
    const overall = this.data.riskIndicators.find(object => {return (object.flagActive == 'Active' &&  object.condition == 'OVR' && object.indicatorId.substring(3,6) == biggest.substring(3,6))});
    this.state.expectedRisk.overall = overall;
  }

  changeExpectedLikelihood(){

      let biggest = this.getBiggestRiskImpact([ this.state.expectedRisk.impact, this.state.expectedRisk.likelihood]);
      const overall = this.data.riskIndicators.find(object => {return (object.flagActive == 'Active' &&  object.condition == 'OVR' && object.indicatorId.substring(3,6) == biggest.substring(3,6))});
      this.state.residualRisk.overall = overall;
  }

  changeResidualImpact(){
    let biggest = this.getBiggestRiskImpact([this.state.residualRisk.strategic]);
    const impact = this.data.riskIndicators.find(object => {return (object.flagActive == 'Active' &&  object.condition == 'IMP' && object.indicatorId == biggest)});
    this.state.residualRisk.impact = impact;
  }

  changeResidualLikelihood(){
     console.log(" selected: ",this.state.residualRisk.likelihood);
      let biggest = this.getBiggestRiskImpact([ this.state.residualRisk.impact.indicatorId, this.state.residualRisk.likelihood]);
      const overall = this.data.riskIndicators.find(object => {return (object.flagActive == 'Active' &&  object.condition == 'OVR' && object.indicatorId.substring(3,6) == biggest.substring(3,6))});
      this.state.residualRisk.overall = overall;
  }

  changeDivision(){
    this.selectors.department = this.data.department.filter(object=> {return (object.kodeDivisi == this.state.division.division)});
    this.state.division.department = '';
     const lastIndex = this.generateCounter()+1;
    this.state.document.register_no = this.riskNoGenerate(lastIndex);
  }

  changeDepartment(){
    const lastIndex = this.generateCounter();
    this.state.document.register_no = this.riskNoGenerate(lastIndex);
  }

  changeCompanyKpi(){
    console.log("CompanyKPI Change to", this.state.companyKpi);
  }

  changeRiskImpact(){
    console.log("RiskImpact Change to", this.state.riskImpact);
  }

  changeRiskLevel(){
    console.log("RiskLevel Change to", this.state.riskLevel);
  }

  saveRiskRegister(){
    console.log(this.state);
  }

  generateCounter() {
    let lastIndex = 0;
    console.log(this.state.division.division,this.state.division.department,this.state.document.risk_period);
    for (let data in this.riskAssessmentData) {
      if (
        this.riskAssessmentData[data].yearActive == this.state.document.risk_period &&
        this.riskAssessmentData[data].division ==
          this.state.division.division &&
        this.riskAssessmentData[data].department ==
          this.state.division.department
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
          this.state.division.division +
          "/" +
          this.state.division.department +
          "-" +
          lastIndex.toString()
        );

      case 1:
        return (
          this.state.division.division +
          "/" +
          this.state.division.department +
          "-" +
          "0" +
          lastIndex.toString()
        );
    }
  }

  save(){
    console.log("data saved..!");
    this.toastr.success("Data Saved!");
  }

}
  