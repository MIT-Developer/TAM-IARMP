using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbRSendmail
    {

        public short YearActive { get; set; }
        public short? Counter {get;set;}
        public string TypeSend { get; set; }
        public string SendBody { get; set; }
        public DateTime? DateSend { get; set; }
        public string UserSend { get; set; }

    }
}

