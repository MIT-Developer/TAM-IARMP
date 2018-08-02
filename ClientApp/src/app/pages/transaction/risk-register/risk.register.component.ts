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
    financialImpact: [{
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
    }],
    qualitativeImpact: [],
    operation : []
  }

  state : any = {
    filled: false,
    document:{
      risk_period : moment().format('YYYY'),
      register_no : 'ASM/ASBD-01'
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
    financialImpact: [{
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
    }]
  }
   
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
      // console.log(response);
    });
  }

  changeDivision(){
    this.selectors.department = this.data.department.filter(object=> {return (object.kodeDivisi == this.state.division.division)});
  }
  changeDepartment(){
    console.log("department Change to", this.state.department);
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
  changeFinancialImpact(){
    console.log("FinancialImpact Change to", this.state.financialImpact);
  }
}
  