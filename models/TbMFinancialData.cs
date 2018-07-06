using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMFinancialData
    {
        public TbMFinancialData()
        {
            TbMFinancialImpact = new HashSet<TbMFinancialImpact>();
        }

        public short Year { get; set; }
        public double? CashCashEquivalent { get; set; }
        public double? NetWorkingCapital { get; set; }
        public double? FixedAssets { get; set; }
        public double? OtherAssets { get; set; }
        public double? OtherLiabilities { get; set; }
        public double? MinorityInterest { get; set; }
        public double? Equity { get; set; }
        public double? Revenue { get; set; }
        public double? CostOfRevenue { get; set; }
        public double? OperatingExpenses { get; set; }
        public double? NonOperatingIncome { get; set; }
        public double? TaxExpense { get; set; }
        public double? Dividend { get; set; }
        public double? OperatingProfit { get; set; }
        public double? NetIncomeProfit { get; set; }
        public double? OperatingCashFlow { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

        public ICollection<TbMFinancialImpact> TbMFinancialImpact { get; set; }
    }
}
