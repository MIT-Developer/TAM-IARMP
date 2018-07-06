using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMLibrary
    {
        public string Condition { get; set; }
        public string CharId { get; set; }
        public string Description { get; set; }
        public string FlagActive { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdated { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

    }
}
