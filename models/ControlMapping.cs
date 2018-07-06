using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class ControlMapping
    {



        public string Division { get; set; }
        public string Department { get; set; }
        public Int32 Preventive { get; set; }
        public Int32 Detective { get; set; }
        public Int32 Corrective { get; set; }

    }
}
