import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FinancialDataModalComponent } from "./modal/financial.data.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
import { isNullOrUndefined } from "util";
@Component({
  selector: "ngx-financial-data",
  templateUrl: "./financial.data.component.html"
})
export class FinancialDataComponent {
  @ViewChild("myForm") private myForm: NgForm;
  buttonDisable:boolean;

  year: any[] = [
    {
      data: moment().subtract(9,'years').format("YYYY")
    },
    {
      data: moment().subtract(8,'years').format("YYYY")
    },
    {
      data: moment().subtract(7,'years').format("YYYY")
    },
    {
      data: moment().subtract(6,'years').format("YYYY")
    },
    {
      data: moment().subtract(5,'years').format("YYYY")
    },
    {
      data: moment().subtract(4,'years').format("YYYY")
    },
    {
      data: moment().subtract(3,'years').format("YYYY")
    },
    {
      data: moment().subtract(2,'years').format("YYYY")
    },
    {
      data: moment().subtract(1,'years').format("YYYY")
    },
    {
      data: moment().format("YYYY")
    }
  ];
  condition: any[] = [
    {
      data: "OBJ",
      desc: "Company Objectives"
    },
    {
      data: "KPI",
      desc: "Company KPI"
    },
    {
      data: "BP",
      desc: "Company BP"
    }
  ];
  source: LocalDataSource = new LocalDataSource();
  data: any = {
    year: 0,
    cashCashEquivalent: 0,
    netWorkingCapital: 0,
    fixedAssets: 0,
    otherAssets: 0,
    otherLiabilities: 0,
    minorityInterest: 0,
    equity: 0,
    revenue: 0,
    costOfRevenue: 0,
    operatingExpenses: 0,
    nonOperatingIncome: 0,
    taxExpense: 0,
    dividend: 0,
    operatingProfit: 0,
    netIncomeProfit: 0,
    operatingCashFlow: 0,
    userCreated: "Admin",
    datetimeCreated: moment().format(),
    userUpdate: "Admin",
    datetimeUpdate: moment().format(),
    status: "1"
  };
  tabledata: any[] = [
    {
      year: 0,
      cashCashEquivalent: 0,
      netWorkingCapital: 0,
      fixedAssets: 0,
      otherAssets: 0,
      otherLiabilities: 0,
      minorityInterest: 0,
      equity: 0,
      revenue: 0,
      costOfRevenue: 0,
      operatingExpenses: 0,
      nonOperatingIncome: 0,
      taxExpense: 0,
      dividend: 0,
      operatingProfit: 0,
      netIncomeProfit: 0,
      operatingCashFlow: 0,
      userCreated: "Admin",
      datetimeCreated: moment().format(),
      userUpdate: "Admin",
      datetimeUpdate: moment().format(),
      status: "1"
    }
  ];
  yearPeriode: string = moment().format("YYYY");
  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
    this.buttonDisable=false;
  }
  loadData() {
    this.service.getreq("TbMFinancialDatas").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].year = data[ind].year.toString();
          data[ind].status = "0";
          this.tabledata = data;
        });
        this.reload();
      }
    });
  }

  reload() {
    let year = this.yearPeriode;
    let arr = this.tabledata.filter(item => {
      return item.year === year;
    });
    //console.log(arr[0] != null);
    if (arr[0] != null) {
      //console.log("masuksini");
      this.data = arr[0];
      // this.data = {
      //   year: data.year,
      //   cashCashEquivalent: data.cashCashEquivalent,
      //   netWorkingCapital: data.netWorkingCapital,
      //   fixedAssets: data.fixedAssets,
      //   otherAssets: data.otherAssets,
      //   otherLiabilities: data.otherLiabilities,
      //   minorityInterest: data.minorityInterest,
      //   equity: data.equity,
      //   revenue: data.revenue,
      //   costOfRevenue: data.costOfRevenue,
      //   operatingExpenses: data.operatingExpenses,
      //   nonOperatingIncome: data.nonOperatingIncome,
      //   taxExpense: data.taxExpense,
      //   dividend: data.dividend,
      //   operatingProfit: data.operatingProfit,
      //   netIncomeProfit: data.netIncomeProfit,
      //   operatingCashFlow: data.operatingCashFlow,
      //   userCreated: "Admin",
      //   datetimeCreated: data.datetimeCreated,
      //   userUpdate: "Admin",
      //   datetimeUpdate: moment().format(),
      //   status: "0"
      // };
      //console.log(this.data);
    } else {
      this.data = {
        year: this.yearPeriode,
        cashCashEquivalent: 0,
        netWorkingCapital: 0,
        fixedAssets: 0,
        otherAssets: 0,
        otherLiabilities: 0,
        minorityInterest: 0,
        equity: 0,
        revenue: 0,
        costOfRevenue: 0,
        operatingExpenses: 0,
        nonOperatingIncome: 0,
        taxExpense: 0,
        dividend: 0,
        operatingProfit: 0,
        netIncomeProfit: 0,
        operatingCashFlow: 0,
        userCreated: "Admin",
        datetimeCreated: moment().format(),
        userUpdate: "Admin",
        datetimeUpdate: moment().format(),
        status: "1"
      };
    }
    switch (this.myForm.value.yearPeriode) {
      case moment().format('YYYY'):
        this.buttonDisable =false;
        break;
      default:
      this.buttonDisable =true;
    }
    
  }

  submit() {
    //console.log(JSON.stringify(this.tabledata));
    console.log(this.data);

    if (this.data.cashCashEquivalent== 0 ||
     this.data.netWorkingCapital== 0 ||
     this.data.fixedAssets== 0 ||
     this.data.otherAssets== 0 ||
     this.data.otherLiabilities== 0 ||
     this.data.minorityInterest== 0 ||
     this.data.equity== 0 ||
     this.data.revenue== 0 ||
     this.data.costOfRevenue== 0 ||
     this.data.operatingExpenses== 0 ||
     this.data.nonOperatingIncome== 0 ||
     this.data.taxExpense== 0 ||
     this.data.dividend== 0 ||
     this.data.operatingProfit== 0 ||
     this.data.netIncomeProfit== 0 ||
     this.data.operatingCashFlow== 0 ||
     this.data.cashCashEquivalent== '' ||
     this.data.netWorkingCapital== '' ||
     this.data.fixedAssets== '' ||
     this.data.otherAssets== '' ||
     this.data.otherLiabilities== '' ||
     this.data.minorityInterest== '' ||
     this.data.equity== '' ||
     this.data.revenue== '' ||
     this.data.costOfRevenue== '' ||
     this.data.operatingExpenses== '' ||
     this.data.nonOperatingIncome== '' ||
     this.data.taxExpense== '' ||
     this.data.dividend== '' ||
     this.data.operatingProfit== '' ||
     this.data.netIncomeProfit== '' ||
     this.data.operatingCashFlow== '' ||
     this.data.cashCashEquivalent== null ||
     this.data.netWorkingCapital== null ||
     this.data.fixedAssets== null ||
     this.data.otherAssets== null ||
     this.data.otherLiabilities== null ||
     this.data.minorityInterest== null ||
     this.data.equity== null ||
     this.data.revenue== null ||
     this.data.costOfRevenue== null ||
     this.data.operatingExpenses== null ||
     this.data.nonOperatingIncome== null ||
     this.data.taxExpense== null ||
     this.data.dividend== null ||
     this.data.operatingProfit== null ||
     this.data.netIncomeProfit== null ||
     this.data.operatingCashFlow== null) {
      this.toastr.error ("Data Not Complete!");
    } else {
      if (this.data.status == "1") {
        this.service
          .postreq("TbMFinancialDatas", this.data)
          .subscribe(response => {
            this.loadData();
            //console.log(response);
            error => {
              //console.log(error);
            };
          });
      } else {
        this.service
          .putreq("TbMFinancialDatas", this.data)
          .subscribe(response => {
            this.loadData();
            error => {
              //console.log(error);
            };
          });
      }
  
      this.toastr.success("Data Saved!");
    }
  }
}
