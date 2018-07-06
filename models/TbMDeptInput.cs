using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMDeptInput
    {
        public TbMDeptInput()
        {
            TbRRiskAssessment = new HashSet<TbRRiskAssessment>();
        }

        public short YearActive { get; set; }
        public string Division { get; set; }
        public string Departement { get; set; }
        public string Condition { get; set; }
        public short? CounterNo { get; set; }
        public string DeptInpId { get; set; }
        public string Description { get; set; }
        public string FlagActive { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

        public ICollection<TbRRiskAssessment> TbRRiskAssessment { get; set; }
    }
}
