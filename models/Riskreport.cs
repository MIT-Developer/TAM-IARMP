using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class Riskreport
    {

        /****** Script for SelectTopNRows command from SSMS  ******/


        public Int16 YearActive { get; set; }
        public Int64 No { get; set; }
        public string RiskNo { get; set; }
        public string Department { get; set; }
        public string Division { get; set; }
        public string CompanyKpi { get; set; }
        public string DepartmentKpi { get; set; }
        public string BusinessProcess { get; set; }
        public string LossEvent { get; set; }
        public string Caused { get; set; }
        public string RiskLevel { get; set; }
        public string NotesIr { get; set; }
        public string NotesRd { get; set; }
        public string OperationCt { get; set; }
        public string AppropriatenessCt { get; set; }
        public string Control { get; set; }
        public string TreatmentPlan { get; set; }
        public string ExPic { get; set; }
        public string ExDueDate { get; set; }
        public string Accident { get; set; }
        public string RiskImpact { get; set; }
        public string FinImpactCategory { get; set; }
        public string FinImpactIr { get; set; }
        public double? FinAmountIr { get; set; }
        public string OpImpactIr { get; set; }
        public string OpImpactCategory { get; set; }
        public double? OpAmountIr { get; set; }
        public string FinImpactRd { get; set; }
        public double? FinAmountRd { get; set; }
        public string OpImpactRd { get; set; }
        public double? OpAmountRd { get; set; }
        public string QlImpactIr { get; set; }
        public string QlImpactRd { get; set; }
        public string IrImpact { get; set; }
        public string RdImpact { get; set; }
        public string ExImpact { get; set; }
        public string IrLikelihood { get; set; }
        public string RdLikelihood { get; set; }
        public string ExLikelihood { get; set; }
        public string IrOverall { get; set; }
        public Nullable<Int16> IrOverallScore { get; set; }
        public string RdOverall { get; set; }
        public string ExOverall { get; set; }
        public string EfOverall { get; set; }
        public string DescDepartment { get; set; }
        public string DescDivision { get; set; }
        public Nullable<Int16> RdOverallScore { get; set; }
        public Nullable<Int16> ExOverallScore { get; set; }
    }
}

