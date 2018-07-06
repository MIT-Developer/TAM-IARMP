using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class Qllov
    {


        public short YearActive { get; set; }
        public string IndicatorId { get; set; }
        public string Impact { get; set; }
        public string EntityWide { get; set; }
        public string Output { get; set; }
        public string HumanResources { get; set; }
        public string LegalAndRegulatory { get; set; }
        public string Financial { get; set; }
        public Int16 Score { get; set; }
    }
}