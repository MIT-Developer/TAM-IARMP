using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMRiskMapping
    {
        public TbMRiskMapping()
        {
            TbRRiskAssessmentTbMRiskMapping = new HashSet<TbRRiskAssessment>();
            TbRRiskAssessmentTbMRiskMapping1 = new HashSet<TbRRiskAssessment>();
            TbRRiskAssessmentTbMRiskMapping2 = new HashSet<TbRRiskAssessment>();
            TbRRiskAssessmentTbMRiskMappingNavigation = new HashSet<TbRRiskAssessment>();
        }

        public short YearActive { get; set; }
        public string Condition { get; set; }
        public short? CounterNo { get; set; }
        public string MappingId { get; set; }
        public string IndicatorIdA { get; set; }
        public string IndicatorIdB { get; set; }
        public string ResultIdC { get; set; }
        public string FlagActive { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

        public TbMRiskIndicator TbMRiskIndicator { get; set; }
        public TbMRiskIndicator TbMRiskIndicatorNavigation { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskMapping { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskMapping1 { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskMapping2 { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessmentTbMRiskMappingNavigation { get; set; }
    }
}
