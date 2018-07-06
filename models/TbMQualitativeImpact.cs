using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMQualitativeImpact
    {
        public short YearActive { get; set; }
        public string Category { get; set; }
        public string RiskIndicatorId { get; set; }
        public short? CounterNo { get; set; }
        public string QualitativeId { get; set; }
        public string Description { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

        public TbMRiskIndicator TbMRiskIndicator { get; set; }
    }
}
