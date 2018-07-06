using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbRAccidentDetail
    {
        public short YearActive { get; set; }
        public string RiskNo { get; set; }
        public short? Number { get; set; }
        public string AccidentId { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

        public TbMAccidentDetail TbMAccidentDetail { get; set; }
        public TbRRiskAssessment TbRRiskAssessment { get; set; }
    }
}
