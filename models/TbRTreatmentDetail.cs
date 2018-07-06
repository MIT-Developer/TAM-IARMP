using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbRTreatmentDetail
    {
        public short YearActive { get; set; }
        public string RiskNo { get; set; }
        public short No { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Pic { get; set; }
         public string DueDate { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

    }
}
