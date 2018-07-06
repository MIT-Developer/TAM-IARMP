using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMOperationalImpact
    {
        public TbMOperationalImpact()
        {
            TbRRiskAssessment = new HashSet<TbRRiskAssessment>();
        }

        public short YearActive { get; set; }
        public string Category { get; set; }
        public string RiskIndicatorId { get; set; }
        public short? CounterNo { get; set; }
        public string OperationalId { get; set; }
        public double? NumberValue { get; set; }
        public string FlagActive{ get; set; }

        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

        public TbMRiskIndicator TbMRiskIndicator { get; set; }
        public ICollection<TbRRiskAssessment> TbRRiskAssessment { get; set; }
    }
}
