using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMComInput
    {
        public TbMComInput()
        {
            TbRRiskAssessment = new HashSet<TbRRiskAssessment>();
        }

        public short YearActive { get; set; }
        public string Condition { get; set; }
        public short? CounterNo { get; set; }
        public string ComInpId { get; set; }
        public string Description { get; set; }
        public string FlagActive { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

        public ICollection<TbRRiskAssessment> TbRRiskAssessment { get; set; }
    }
}
