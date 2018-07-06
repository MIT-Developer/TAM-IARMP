using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMAccidentDetail
    {
        public TbMAccidentDetail()
        {
            TbRAccidentDetail = new HashSet<TbRAccidentDetail>();
        }

        public short YearActive { get; set; }
        public string Division { get; set; }
        public string Department { get; set; }
        public short? CounterNo { get; set; }
        public string AccidentId { get; set; }
        public DateTime? DateAccident { get; set; }
        public string Description { get; set; }
        public string RelatedParties { get; set; }
        public string FinancialImpact { get; set; }
        public string OtherImpact { get; set; }
        public string CurrentAction { get; set; }
        public string NextAction { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

        public ICollection<TbRAccidentDetail> TbRAccidentDetail { get; set; }
    }
}
