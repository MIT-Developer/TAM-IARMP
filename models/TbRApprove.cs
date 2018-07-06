using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbRApprove
    {
        public short YearActive { get; set; }
        public string Division { get; set; }
        public string Department { get; set; }
        public short? CounterNo { get; set; }
        public string Stat { get; set; }
        public string Notes { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdated { get; set; }
        public DateTime? DatetimeUpdated { get; set; }

    }
}
