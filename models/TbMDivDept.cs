using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMDivDept
    {
        public string KodeDivisi { get; set; }
        public string KodeDepartment { get; set; }
        public string Kombinasi { get; set; }
        public string Divisi { get; set; }
        public string Department { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdated { get; set; }
        public DateTime? DatetimeUpdated { get; set; }

    }
}
