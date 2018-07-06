using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class ControlEffectiveness
    {



        public string Division { get; set; }
        public string Department { get; set; }
        public Int32 CtrEff { get; set; }
        public Int32 CtrMod { get; set; }
        public Int32 CtrIff { get; set; }
        public Int32 CtrWeak { get; set; }
    }
}

