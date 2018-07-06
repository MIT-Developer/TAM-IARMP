using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class RiskMovement
    {

        /****** Script for SelectTopNRows command from SSMS  ******/


        public string Division { get; set; }
        public string Department { get; set; }
        public Int32 IrRiskExtreme { get; set; }
        public Int32 IrRiskHigh { get; set; }
        public Int32 IrRiskMedium { get; set; }
        public Int32 IrRiskLow { get; set; }
        public Int32 RdRiskExtreme { get; set; }
        public Int32 RdRiskHigh { get; set; }
        public Int32 RdRiskMedium { get; set; }
        public Int32 RdRiskLow { get; set; }
        public Int32 ExRiskExtreme { get; set; }
        public Int32 ExRiskHigh { get; set; }
        public Int32 ExRiskMedium { get; set; }
        public Int32 ExRiskLow { get; set; }

    }
}
