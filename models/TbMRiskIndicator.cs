using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMRiskIndicator
    {
        public TbMRiskIndicator()
        {
            TbMFinancialImpact = new HashSet<TbMFinancialImpact>();
            TbMOperationalImpact = new HashSet<TbMOperationalImpact>();
            TbMQualitativeImpact = new HashSet<TbMQualitativeImpact>();
            TbMRiskMappingTbMRiskIndicator = new HashSet<TbMRiskMapping>();
            TbMRiskMappingTbMRiskIndicatorNavigation = new HashSet<TbMRiskMapping>();
            TbRRiskAssessmentTbMRiskIndicator = new HashSet<TbRRiskAssessment>();
            TbRRiskAssessmentTbMRiskIndicator1 = new HashSet<TbRRiskAssessment>();
            TbRRiskAssessmentTbMRiskIndicator2 = new HashSet<TbRRiskAssessment>();
            TbRRiskAssessmentTbMRiskIndicator3 = new HashSet<TbRRiskAssessment>();
            TbRRiskAssessmentTbMRiskIndicator4 = new HashSet<TbRRiskAssessment>();
            TbRRiskAssessmentTbMRiskIndicator5 = new HashSet<TbRRiskAssessment>();
            TbRRiskAssessmentTbMRiskIndicatorNavigation = new HashSet<TbRRiskAssessment>();
        }

        public short YearActive { get; set; }
        public string Condition { get; set; }
        public short? CounterNo { get; set; }
        public string IndicatorId { get; set; }
        public string Description { get; set; }
        public short? Score { get; set; }
        public string FlagActive { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

        public ICollection<TbMFinancialImpact> TbMFinancialImpact { get; set; }
        public ICollection<TbMOperationalImpact> TbMOperationalImpact { get; set; }
        public ICollection<TbMQualitativeImpact> TbMQualitativeImpact { get; set; }
        public ICollection<TbMRiskMapping> TbMRiskMappingTbMRiskIndicator { get; set; }
        public ICollection<TbMRiskMapping> TbMRiskMappingTbMRiskIndicatorNavigation { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskIndicator { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskIndicator1 { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskIndicator2 { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskIndicator3 { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskIndicator4 { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskIndicator5 { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskIndicatorNavigation { get; set; }
    }
}
