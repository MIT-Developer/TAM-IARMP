using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbRRiskAssessment
    {
        public TbRRiskAssessment()
        {
            TbRAccidentDetail = new HashSet<TbRAccidentDetail>();
            TbRControlDetail = new HashSet<TbRControlDetail>();
        }

        public short YearActive { get; set; }
        public string RiskNo { get; set; }
        public string Division { get; set; }
        public string CompanyKpi { get; set; }
        public string Department { get; set; }
        public int? CounterNo { get; set; }
        public string DepartmentKpi { get; set; }
        public string BusinessProcess { get; set; }
        public string LossEvent { get; set; }
        public string Caused { get; set; }
        public string RiskImpact { get; set; }
        public string RiskLevel { get; set; }
        public short? AccidentList { get; set; }
        public string NotesIr { get; set; }
        public string FinImpactIr { get; set; }
        public double? FinAmountIr { get; set; }
        public string OpImpactIr { get; set; }
        public double? OpAmountIr { get; set; }
        public string QlImpactIr { get; set; }
        public string IrImpact { get; set; }
        public string LikelihoodIr { get; set; }
        public string OverallRiskIr { get; set; }
        public short? ControlList { get; set; }
        public string OperationCt { get; set; }
        public string AppropriatenessCt { get; set; }
        public string NotesRd { get; set; }
        public double? FinAmountRd { get; set; }
        public double? OpAmountRd { get; set; }
        public string QlImpactRd { get; set; }
        public string RdImpact { get; set; }
        public string LikelihoodRd { get; set; }
        public string OverallRd { get; set; }
        public string OverallEf { get; set; }
        public bool? TreatmentPlan { get; set; }
        public string TreatmentDescription { get; set; }
        public string ImpactEx { get; set; }
        public string LikelihoodEx { get; set; }
        public string OverallEx { get; set; }
        public string Pic { get; set; }
        public short? Schedule { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

        public TbMComInput TbMComInput { get; set; }
        public TbMDeptInput TbMDeptInput { get; set; }
        public TbMFinancialImpact TbMFinancialImpact { get; set; }
        public TbMOperationalImpact TbMOperationalImpact { get; set; }
        public TbMRiskIndicator TbMRiskIndicator { get; set; }
        public TbMRiskIndicator TbMRiskIndicator1 { get; set; }
        public TbMRiskIndicator TbMRiskIndicator2 { get; set; }
        public TbMRiskIndicator TbMRiskIndicator3 { get; set; }
        public TbMRiskIndicator TbMRiskIndicator4 { get; set; }
        public TbMRiskIndicator TbMRiskIndicator5 { get; set; }
        public TbMRiskIndicator TbMRiskIndicatorNavigation { get; set; }
        public TbMRiskMapping TbMRiskMapping { get; set; }
        public TbMRiskMapping TbMRiskMapping1 { get; set; }
        public TbMRiskMapping TbMRiskMapping2 { get; set; }
        public TbMRiskMapping TbMRiskMappingNavigation { get; set; }
        public ICollection<TbRAccidentDetail> TbRAccidentDetail { get; set; }
        public ICollection<TbRControlDetail> TbRControlDetail { get; set; }
    }
}
