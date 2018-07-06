using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class DraftRisk
    {



        public string DraftKey { get; set; }
        public string DraftJson { get; set; }
        public string Division { get; set; }
        public string Department { get; set; }
        public string Type { get; set; }
        public short Year { get; set; }
        public string UserUpdated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DateCreated { get; set; }
    }
}

