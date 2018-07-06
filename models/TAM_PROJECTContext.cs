using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace tam_risk_project.Models
{
    public partial class TAM_PROJECTContext : DbContext
    {
        public virtual DbSet<TbMAccidentDetail> TbMAccidentDetail { get; set; }
        public virtual DbSet<TbMComInput> TbMComInput { get; set; }
        public virtual DbSet<TbMDeptInput> TbMDeptInput { get; set; }
        public virtual DbSet<TbMFinancialData> TbMFinancialData { get; set; }
        public virtual DbSet<TbMFinancialImpact> TbMFinancialImpact { get; set; }
        public virtual DbSet<TbMOperationalImpact> TbMOperationalImpact { get; set; }
        public virtual DbSet<TbMQualitativeImpact> TbMQualitativeImpact { get; set; }
        public virtual DbSet<TbMRiskIndicator> TbMRiskIndicator { get; set; }
        public virtual DbSet<TbMRiskMapping> TbMRiskMapping { get; set; }
        public virtual DbSet<TbRAccidentDetail> TbRAccidentDetail { get; set; }
        public virtual DbSet<TbRControlDetail> TbRControlDetail { get; set; }
        public virtual DbSet<TbRRiskAssessment> TbRRiskAssessment { get; set; }
        public virtual DbSet<ControlMapping> ControlMapping { get; set; }
        public virtual DbSet<ControlEffectiveness> ControlEffectiveness { get; set; }
        public virtual DbSet<TbMRiskReminder> TbMRiskReminder { get; set; }

        public virtual DbSet<RiskMovement> RiskMovement { get; set; }
        public virtual DbSet<TbRSendmail> TbRSendmail { get; set; }
        public virtual DbSet<Riskreport> Riskreport { get; set; }
        public virtual DbSet<Qllov> Qllov { get; set; }
        public virtual DbSet<DraftRisk> DraftRisk { get; set; }
        public virtual DbSet<TbRApprove> TbRApprove { get; set; }

        public virtual DbSet<TbMDivDept> TbMDivDept { get; set; }
        public virtual DbSet<TbMLibrary> TbMLibrary { get; set; }

        public virtual DbSet<TbRTreatmentDetail> TbRTreatmentDetail { get; set; }
        public TAM_PROJECTContext(DbContextOptions<TAM_PROJECTContext> options)
              : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<TbMLibrary>(entity =>
                                              {
                                                  entity.HasKey(e => new { e.Condition, e.CharId });

                                                  entity.ToTable("TB_M_LIBRARY");

                                                  entity.Property(e => e.Condition).HasColumnName("CONDITION");

                                                  entity.Property(e => e.CharId)
                                                                      .HasColumnName("CHAR_ID");

                                                  entity.Property(e => e.Description).HasColumnName("DESCRIPTION");

                                                  entity.Property(e => e.FlagActive).HasColumnName("FLAG_ACTIVE");



                                                  entity.Property(e => e.DatetimeCreated)
                                                                      .HasColumnName("DATETIME_CREATED")
                                                                      .HasColumnType("datetime");

                                                  entity.Property(e => e.DatetimeUpdate)
                                                                      .HasColumnName("DATETIME_UPDATE")
                                                                      .HasColumnType("datetime");



                                                  entity.Property(e => e.UserCreated)
                                                                      .HasColumnName("USER_CREATED")
                                                                      .HasMaxLength(45)
                                                                      .IsUnicode(false);

                                                  entity.Property(e => e.UserUpdated)
                                                                      .HasColumnName("USER_UPDATED")
                                                                      .HasMaxLength(45)
                                                                      .IsUnicode(false);


                                              });






            modelBuilder.Entity<TbMDivDept>(entity =>
                                  {
                                      entity.HasKey(e => new { e.KodeDivisi, e.KodeDepartment });

                                      entity.ToTable("TB_M_DIV_DEPT");

                                      entity.Property(e => e.KodeDivisi).HasColumnName("KODE_DIVISI");

                                      entity.Property(e => e.KodeDepartment)
                                                          .HasColumnName("KODE_DEPARTMENT");

                                      entity.Property(e => e.Kombinasi).HasColumnName("KOMBINASI");

                                      entity.Property(e => e.Divisi).HasColumnName("DIVISI");

                                      entity.Property(e => e.Department)
                                                          .HasColumnName("DEPARTMENT");


                                      entity.Property(e => e.DatetimeCreated)
                                                          .HasColumnName("DATETIME_CREATED")
                                                          .HasColumnType("datetime");

                                      entity.Property(e => e.DatetimeUpdated)
                                                          .HasColumnName("DATETIME_UPDATED")
                                                          .HasColumnType("datetime");



                                      entity.Property(e => e.UserCreated)
                                                          .HasColumnName("USER_CREATED")
                                                          .HasMaxLength(45)
                                                          .IsUnicode(false);

                                      entity.Property(e => e.UserUpdated)
                                                          .HasColumnName("USER_UPDATED")
                                                          .HasMaxLength(45)
                                                          .IsUnicode(false);


                                  });


            modelBuilder.Entity<TbRTreatmentDetail>(entity =>
                       {
                           entity.HasKey(e => new { e.YearActive, e.RiskNo, e.No });

                           entity.ToTable("TB_R_TREATMENT_DETAIL");

                           entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                           entity.Property(e => e.RiskNo)
                                               .HasColumnName("RISK_NO")
                                               .HasMaxLength(16)
                                               .IsUnicode(false);

                           entity.Property(e => e.No).HasColumnName("NO");

                           entity.Property(e => e.DatetimeCreated)
                                               .HasColumnName("DATETIME_CREATED")
                                               .HasColumnType("datetime");

                           entity.Property(e => e.DatetimeUpdate)
                                               .HasColumnName("DATETIME_UPDATE")
                                               .HasColumnType("datetime");

                           entity.Property(e => e.Description)
                                               .HasColumnName("DESCRIPTION")
                                               .HasMaxLength(100)
                                               .IsUnicode(false);

                           entity.Property(e => e.Type)
                                               .HasColumnName("TYPE")
                                               .HasMaxLength(10)
                                               .IsUnicode(false);

                           entity.Property(e => e.Pic)
             .HasColumnName("PIC")
             .HasMaxLength(100)
             .IsUnicode(false);

                           entity.Property(e => e.DueDate)
                                       .HasColumnName("DUE_DATE")
                                       .HasMaxLength(100)
                                       .IsUnicode(false);

                           entity.Property(e => e.UserCreated)
                                               .HasColumnName("USER_CREATED")
                                               .HasMaxLength(45)
                                               .IsUnicode(false);

                           entity.Property(e => e.UserUpdate)
                                               .HasColumnName("USER_UPDATE")
                                               .HasMaxLength(45)
                                               .IsUnicode(false);


                       });

            modelBuilder.Entity<TbRApprove>(entity =>
                    {

                        entity.ToTable("TB_R_APPROVE");
                        entity.HasKey(e => new
                        {
                            e.YearActive,
                            e.Division,
                            e.Department,
                            e.CounterNo
                        });
                        entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");
                        entity.Property(e => e.Division).HasColumnName("DIVISION");
                        entity.Property(e => e.Department).HasColumnName("DEPARTMENT");
                        entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");
                        entity.Property(e => e.Stat).HasColumnName("STATUS");
                        entity.Property(e => e.Notes).HasColumnName("NOTES");
                        entity.Property(e => e.UserUpdated).HasColumnName("USER_UPDATED");
                        entity.Property(e => e.DatetimeUpdated).HasColumnName("DATE_TIME_UPDATED");
                        entity.Property(e => e.UserCreated).HasColumnName("USER_CREATED");
                        entity.Property(e => e.DatetimeCreated).HasColumnName("DATE_TIME_CREATED");
                    });

            modelBuilder.Entity<DraftRisk>(entity =>
         {

             entity.ToTable("DRAFT_RISK");
             entity.HasKey(e => new
             {
                 e.DraftKey
             });
             entity.Property(e => e.DraftKey).HasColumnName("DRAFT_KEY");
             entity.Property(e => e.DraftJson).HasColumnName("DRAFT_JSON").HasMaxLength(2000000000);
             entity.Property(e => e.Division).HasColumnName("DIVISION");
             entity.Property(e => e.Department).HasColumnName("DEPARTMENT");
             entity.Property(e => e.Type).HasColumnName("TYPE");
             entity.Property(e => e.Year).HasColumnName("YEAR");
             entity.Property(e => e.UserUpdated).HasColumnName("USER_UPDATED");
             entity.Property(e => e.DateUpdated).HasColumnName("DATE_UPDATED");
             entity.Property(e => e.UserCreated).HasColumnName("USER_CREATED");
             entity.Property(e => e.DateCreated).HasColumnName("DATE_CREATED");
         });
            modelBuilder.Entity<Qllov>(entity =>
      {

          entity.ToTable("QLLOV");
          entity.HasKey(e => new { e.YearActive, e.IndicatorId });
          entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");
          entity.Property(e => e.IndicatorId).HasColumnName("INDICATOR_ID");
          entity.Property(e => e.Impact).HasColumnName("IMPACT");
          entity.Property(e => e.EntityWide).HasColumnName("ENTITIY_WIDE");
          entity.Property(e => e.Output).HasColumnName("OUTPUT");
          entity.Property(e => e.HumanResources).HasColumnName("HUMAN_RESOURCES");
          entity.Property(e => e.LegalAndRegulatory).HasColumnName("LEGAL_AND_REGULATORY");
          entity.Property(e => e.Financial).HasColumnName("FINANCIAL");
          entity.Property(e => e.Score).HasColumnName("SCORE");
      });


            modelBuilder.Entity<Riskreport>(entity =>
            {

                entity.ToTable("RISKREPORT");
                entity.HasKey(e => new { e.RiskNo, e.YearActive,e.Division,e.Department});
                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");
                entity.Property(e => e.No).HasColumnName("NO");
                entity.Property(e => e.RiskNo).HasColumnName("RISK_NO");
                entity.Property(e => e.DescDepartment).HasColumnName("desc_department");
                entity.Property(e => e.DescDivision).HasColumnName("desc_division");
                entity.Property(e => e.Department).HasColumnName("DEPARTMENT");
                entity.Property(e => e.Division).HasColumnName("DIVISION");
                entity.Property(e => e.CompanyKpi).HasColumnName("COMPANY_KPI");
                entity.Property(e => e.DepartmentKpi).HasColumnName("DEPARTMENT_KPI");
                entity.Property(e => e.BusinessProcess).HasColumnName("BUSINESS_PROCESS");
                entity.Property(e => e.LossEvent).HasColumnName("LOSS_EVENT");
                entity.Property(e => e.Caused).HasColumnName("CAUSED");
                entity.Property(e => e.RiskLevel).HasColumnName("RISK_LEVEL");
                entity.Property(e => e.NotesIr).HasColumnName("NOTES_IR");
                entity.Property(e => e.NotesRd).HasColumnName("NOTES_RD");
                entity.Property(e => e.OperationCt).HasColumnName("OPERATION_CT");
                entity.Property(e => e.AppropriatenessCt).HasColumnName("APPROPRIATENESS_CT");
                entity.Property(e => e.Control).HasColumnName("CONTROL");
                entity.Property(e => e.TreatmentPlan).HasColumnName("TREATMENT_PLAN");
                entity.Property(e => e.ExPic).HasColumnName("EX_PIC");
                entity.Property(e => e.ExDueDate).HasColumnName("EX_DUE_DATE");
                entity.Property(e => e.Accident).HasColumnName("ACCIDENT");
                entity.Property(e => e.RiskImpact).HasColumnName("RISK_IMPACT");
                entity.Property(e => e.FinImpactCategory).HasColumnName("FIN_IMPACT_CATEGORY");
                entity.Property(e => e.FinImpactIr).HasColumnName("FIN_IMPACT_IR");
                entity.Property(e => e.FinAmountIr).HasColumnName("FIN_AMOUNT_IR");
                entity.Property(e => e.OpImpactIr).HasColumnName("OP_IMPACT_IR");
                entity.Property(e => e.OpImpactCategory).HasColumnName("OP_IMPACT_CATEGORY");
                entity.Property(e => e.OpAmountIr).HasColumnName("OP_AMOUNT_IR");
                entity.Property(e => e.FinImpactRd).HasColumnName("FIN_IMPACT_RD");
                entity.Property(e => e.FinAmountRd).HasColumnName("FIN_AMOUNT_RD");
                entity.Property(e => e.OpImpactRd).HasColumnName("OP_IMPACT_RD");
                entity.Property(e => e.OpAmountRd).HasColumnName("OP_AMOUNT_RD");
                entity.Property(e => e.QlImpactIr).HasColumnName("QL_IMPACT_IR");
                entity.Property(e => e.QlImpactRd).HasColumnName("QL_IMPACT_RD");
                entity.Property(e => e.IrImpact).HasColumnName("IR_IMPACT");
                entity.Property(e => e.RdImpact).HasColumnName("RD_IMPACT");
                entity.Property(e => e.ExImpact).HasColumnName("EX_IMPACT");
                entity.Property(e => e.IrLikelihood).HasColumnName("IR_LIKELIHOOD");
                entity.Property(e => e.RdLikelihood).HasColumnName("RD_LIKELIHOOD");
                entity.Property(e => e.ExLikelihood).HasColumnName("EX_LIKELIHOOD");
                entity.Property(e => e.IrOverall).HasColumnName("IR_OVERALL");
                entity.Property(e => e.IrOverallScore).HasColumnName("IR_OVERALL_SCORE");
                entity.Property(e => e.RdOverall).HasColumnName("RD_OVERALL");
                entity.Property(e => e.ExOverall).HasColumnName("EX_OVERALL");
                entity.Property(e => e.EfOverall).HasColumnName("EF_OVERALL");
                 entity.Property(e => e.RdOverallScore).HasColumnName("RD_OVERALL_SCORE");
                  entity.Property(e => e.ExOverallScore).HasColumnName("EX_OVERALL_SCORE");
            });


            modelBuilder.Entity<TbRSendmail>(entity =>
            {

                entity.ToTable("TB_R_SENDMAIL");
                entity.HasKey(e => new { e.YearActive, e.Counter });
                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");
                entity.Property(e => e.Counter).HasColumnName("COUNTER");
                entity.Property(e => e.TypeSend).HasColumnName("TYPE_SEND");
                entity.Property(e => e.SendBody).HasColumnName("SEND_BODY");
                entity.Property(e => e.DateSend).HasColumnName("DATE_SEND");
                entity.Property(e => e.UserSend).HasColumnName("USER_SEND");
            });

            modelBuilder.Entity<TbMRiskReminder>(entity =>
{

    entity.ToTable("TB_M_RISK_REMINDER");
    entity.HasKey(e => new { e.YearActive, e.TypeReminder, e.CounterNo });
    entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");
    entity.Property(e => e.TypeReminder).HasColumnName("TYPE_REMINDER");
    entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");
    entity.Property(e => e.StartDate).HasColumnName("START_DATE");
    entity.Property(e => e.EndDate).HasColumnName("END_DATE");
    entity.Property(e => e.Period).HasColumnName("PERIOD");
    entity.Property(e => e.DatetimeCreate).HasColumnName("DATETIME_CREATE").HasColumnType("datetime"); ;
    entity.Property(e => e.DatetimeUpdated).HasColumnName("DATETIME_UPDATED").HasColumnType("datetime"); ;
    entity.Property(e => e.UserCreated).HasColumnName("USER_CREATED").HasMaxLength(45)
                    .IsUnicode(false); ;
    entity.Property(e => e.UserUpdated).HasColumnName("USER_UPDATED").HasMaxLength(45)
                    .IsUnicode(false); ;
});


            modelBuilder.Entity<RiskMovement>(entity =>
           {

               entity.ToTable("RISK_MOVEMENT");
               entity.HasKey(e => new { e.Division, e.Department });
               entity.Property(e => e.Division).HasColumnName("DIVISION");
               entity.Property(e => e.Department).HasColumnName("DEPARTMENT");
               entity.Property(e => e.IrRiskExtreme).HasColumnName("IR_RISK_EXTREME");
               entity.Property(e => e.IrRiskHigh).HasColumnName("IR_RISK_HIGH");
               entity.Property(e => e.IrRiskMedium).HasColumnName("IR_RISK_MEDIUM");
               entity.Property(e => e.IrRiskLow).HasColumnName("IR_RISK_LOW");
               entity.Property(e => e.RdRiskExtreme).HasColumnName("RD_RISK_EXTREME");
               entity.Property(e => e.RdRiskHigh).HasColumnName("RD_RISK_HIGH");
               entity.Property(e => e.RdRiskMedium).HasColumnName("RD_RISK_MEDIUM");
               entity.Property(e => e.RdRiskLow).HasColumnName("RD_RISK_LOW");
               entity.Property(e => e.ExRiskExtreme).HasColumnName("EX_RISK_EXTREME");
               entity.Property(e => e.ExRiskHigh).HasColumnName("EX_RISK_HIGH");
               entity.Property(e => e.ExRiskMedium).HasColumnName("EX_RISK_MEDIUM");
               entity.Property(e => e.ExRiskLow).HasColumnName("EX_RISK_LOW");
           });

            modelBuilder.Entity<ControlEffectiveness>(entity =>
            {

                entity.ToTable("CONTROL_EFFECTIVENESS");
                entity.HasKey(e => new { e.Division, e.Department });
                entity.Property(e => e.Division).HasColumnName("DIVISION");
                entity.Property(e => e.Department).HasColumnName("DEPARTMENT");
                entity.Property(e => e.CtrEff).HasColumnName("CTR_EFF");
                entity.Property(e => e.CtrIff).HasColumnName("CTR_IFF");
                entity.Property(e => e.CtrMod).HasColumnName("CTR_MOD");
                entity.Property(e => e.CtrWeak).HasColumnName("CTR_WEAK");
            });

            modelBuilder.Entity<ControlMapping>(entity =>
            {

                entity.ToTable("CONTROL_MAPPING");
                entity.HasKey(e => new { e.Division, e.Department });
                entity.Property(e => e.Division).HasColumnName("DIVISION");
                entity.Property(e => e.Department).HasColumnName("DEPARTMENT");
                entity.Property(e => e.Preventive).HasColumnName("PREVENTIVE");
                entity.Property(e => e.Detective).HasColumnName("DETECTIVE");
                entity.Property(e => e.Corrective).HasColumnName("Corrective");
            });
            modelBuilder.Entity<TbMAccidentDetail>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.AccidentId });

                entity.ToTable("TB_M_ACCIDENT_DETAIL");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.AccidentId)
                                    .HasColumnName("ACCIDENT_ID")
                                    .HasMaxLength(16)
                                    .IsUnicode(false);

                entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");

                entity.Property(e => e.CurrentAction)
                                    .HasColumnName("CURRENT_ACTION")
                                    .HasMaxLength(500)
                                    .IsUnicode(false);

                entity.Property(e => e.DateAccident)
                                    .HasColumnName("DATE_ACCIDENT")
                                    .HasColumnType("date");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.Department)
                                    .HasColumnName("DEPARTMENT")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Description)
                                    .HasColumnName("DESCRIPTION")
                                    .HasMaxLength(500)
                                    .IsUnicode(false);

                entity.Property(e => e.Division)
                                    .HasColumnName("DIVISION")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.FinancialImpact)
                                    .HasColumnName("FINANCIAL_IMPACT")
                                    .HasMaxLength(500)
                                    .IsUnicode(false);

                entity.Property(e => e.NextAction)
                                    .HasColumnName("NEXT_ACTION")
                                    .HasMaxLength(500)
                                    .IsUnicode(false);

                entity.Property(e => e.OtherImpact)
                                    .HasColumnName("OTHER_IMPACT")
                                    .HasMaxLength(500)
                                    .IsUnicode(false);

                entity.Property(e => e.RelatedParties)
                                    .HasColumnName("RELATED_PARTIES")
                                    .HasMaxLength(100)
                                    .IsUnicode(false);

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMComInput>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.ComInpId });

                entity.ToTable("TB_M_COM_INPUT");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.ComInpId)
                                    .HasColumnName("COM_INP_ID")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Condition)
                                    .HasColumnName("CONDITION")
                                    .HasMaxLength(30)
                                    .IsUnicode(false);

                entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.Description)
                                    .HasColumnName("DESCRIPTION")
                                    .HasMaxLength(200)
                                    .IsUnicode(false);

                entity.Property(e => e.FlagActive)
                                    .HasColumnName("FLAG_ACTIVE")
                                    .HasMaxLength(1)
                                    .IsUnicode(false);

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMDeptInput>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.DeptInpId });

                entity.ToTable("TB_M_DEPT_INPUT");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.DeptInpId)
                                    .HasColumnName("DEPT_INP_ID")
                                    .HasMaxLength(20)
                                    .IsUnicode(false);

                entity.Property(e => e.Condition)
                                    .HasColumnName("CONDITION")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.Departement)
                                    .HasColumnName("DEPARTEMENT")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Description)
                                    .HasColumnName("DESCRIPTION")
                                    .HasMaxLength(200)
                                    .IsUnicode(false);

                entity.Property(e => e.Division)
                                    .HasColumnName("DIVISION")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.FlagActive)
                                    .HasColumnName("FLAG_ACTIVE")
                                    .HasMaxLength(1)
                                    .IsUnicode(false);

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMFinancialData>(entity =>
            {
                entity.HasKey(e => e.Year);

                entity.ToTable("TB_M_FINANCIAL_DATA");

                entity.Property(e => e.Year)
                    .HasColumnName("YEAR")
                    .ValueGeneratedNever();

                entity.Property(e => e.CashCashEquivalent).HasColumnName("CASH_CASH_EQUIVALENT");

                entity.Property(e => e.CostOfRevenue).HasColumnName("COST_OF_REVENUE");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.Dividend).HasColumnName("DIVIDEND");

                entity.Property(e => e.Equity).HasColumnName("EQUITY");

                entity.Property(e => e.FixedAssets).HasColumnName("FIXED_ASSETS");

                entity.Property(e => e.MinorityInterest).HasColumnName("MINORITY_INTEREST");

                entity.Property(e => e.NetIncomeProfit).HasColumnName("NET_INCOME_PROFIT");

                entity.Property(e => e.NetWorkingCapital).HasColumnName("NET_WORKING_CAPITAL");

                entity.Property(e => e.NonOperatingIncome).HasColumnName("NON_OPERATING_INCOME");

                entity.Property(e => e.OperatingCashFlow).HasColumnName("OPERATING_CASH_FLOW");

                entity.Property(e => e.OperatingExpenses).HasColumnName("OPERATING_EXPENSES");

                entity.Property(e => e.OperatingProfit).HasColumnName("OPERATING_PROFIT");

                entity.Property(e => e.OtherAssets).HasColumnName("OTHER_ASSETS");

                entity.Property(e => e.OtherLiabilities).HasColumnName("OTHER_LIABILITIES");

                entity.Property(e => e.Revenue).HasColumnName("REVENUE");

                entity.Property(e => e.TaxExpense).HasColumnName("TAX_EXPENSE");

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMFinancialImpact>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.FinancialId });

                entity.ToTable("TB_M_FINANCIAL_IMPACT");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.FinancialId)
                                    .HasColumnName("FINANCIAL_ID")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Category)
                                    .HasColumnName("CATEGORY")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.FlagActive)
                                    .HasColumnName("FLAG_ACTIVE")
                                    .HasMaxLength(1)
                                    .IsUnicode(false);

                entity.Property(e => e.NumberValue).HasColumnName("NUMBER_VALUE");

                entity.Property(e => e.PercentageValue).HasColumnName("PERCENTAGE_VALUE");

                entity.Property(e => e.RiskIndicatorId)
                                    .HasColumnName("RISK_INDICATOR_ID")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.HasOne(d => d.YearActiveNavigation)
                                    .WithMany(p => p.TbMFinancialImpact)
                                    .HasForeignKey(d => d.YearActive)
                                    .OnDelete(DeleteBehavior.ClientSetNull)
                                    .HasConstraintName("RISK_FIN_DATA_FK");

                entity.HasOne(d => d.TbMRiskIndicator)
                                    .WithMany(p => p.TbMFinancialImpact)
                                    .HasForeignKey(d => new { d.YearActive, d.RiskIndicatorId })
                                    .HasConstraintName("RISK_FINANCIAL_FK");
            });

            modelBuilder.Entity<TbMOperationalImpact>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.OperationalId });

                entity.ToTable("TB_M_OPERATIONAL_IMPACT");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.OperationalId)
                                    .HasColumnName("OPERATIONAL_ID")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Category)
                                    .HasColumnName("CATEGORY")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.NumberValue).HasColumnName("NUMBER_VALUE");

                entity.Property(e => e.FlagActive)
                                    .HasColumnName("FLAG_ACTIVE")
                                    .HasMaxLength(1)
                                    .IsUnicode(false);

                entity.Property(e => e.RiskIndicatorId)
                                    .HasColumnName("RISK_INDICATOR_ID")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.HasOne(d => d.TbMRiskIndicator)
                                    .WithMany(p => p.TbMOperationalImpact)
                                    .HasForeignKey(d => new { d.YearActive, d.RiskIndicatorId })
                                    .HasConstraintName("RISK_OPERATIONAL_FK");
            });

            modelBuilder.Entity<TbMQualitativeImpact>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.QualitativeId });

                entity.ToTable("TB_M_QUALITATIVE_IMPACT");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.QualitativeId)
                                    .HasColumnName("QUALITATIVE_ID")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Category)
                                    .HasColumnName("CATEGORY")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.Description)
                                    .HasColumnName("DESCRIPTION")
                                    .HasMaxLength(200)
                                    .IsUnicode(false);

                entity.Property(e => e.RiskIndicatorId)
                                    .HasColumnName("RISK_INDICATOR_ID")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.HasOne(d => d.TbMRiskIndicator)
                                    .WithMany(p => p.TbMQualitativeImpact)
                                    .HasForeignKey(d => new { d.YearActive, d.RiskIndicatorId })
                                    .HasConstraintName("RISK_QUALITATIVE_FK");
            });

            modelBuilder.Entity<TbMRiskIndicator>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.IndicatorId });

                entity.ToTable("TB_M_RISK_INDICATOR");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.IndicatorId)
                                    .HasColumnName("INDICATOR_ID")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Condition)
                                    .HasColumnName("CONDITION")
                                    .HasMaxLength(30)
                                    .IsUnicode(false);

                entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.Description)
                                    .HasColumnName("DESCRIPTION")
                                    .HasMaxLength(50)
                                    .IsUnicode(false);

                entity.Property(e => e.FlagActive)
                                    .HasColumnName("FLAG_ACTIVE")
                                    .HasMaxLength(15)
                                    .IsUnicode(false);

                entity.Property(e => e.Score).HasColumnName("SCORE");

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMRiskMapping>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.MappingId });

                entity.ToTable("TB_M_RISK_MAPPING");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.MappingId)
                                    .HasColumnName("MAPPING_ID")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Condition)
                                    .HasColumnName("CONDITION")
                                    .HasMaxLength(30)
                                    .IsUnicode(false);

                entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.FlagActive)
                                    .HasColumnName("FLAG_ACTIVE")
                                    .HasMaxLength(1)
                                    .IsUnicode(false);

                entity.Property(e => e.IndicatorIdA)
                                    .HasColumnName("INDICATOR_ID_A")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.IndicatorIdB)
                                    .HasColumnName("INDICATOR_ID_B")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.ResultIdC)
                                    .HasColumnName("RESULT_ID_C")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.HasOne(d => d.TbMRiskIndicator)
                                    .WithMany(p => p.TbMRiskMappingTbMRiskIndicator)
                                    .HasForeignKey(d => new { d.YearActive, d.IndicatorIdA })
                                    .HasConstraintName("RISK_MAPPING_FKA");

                entity.HasOne(d => d.TbMRiskIndicatorNavigation)
                                    .WithMany(p => p.TbMRiskMappingTbMRiskIndicatorNavigation)
                                    .HasForeignKey(d => new { d.YearActive, d.IndicatorIdB })
                                    .HasConstraintName("RISK_MAPPING_FKB");
            });

            modelBuilder.Entity<TbRAccidentDetail>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.RiskNo, e.AccidentId });

                entity.ToTable("TB_R_ACCIDENT_DETAIL");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.RiskNo)
                                    .HasColumnName("RISK_NO")
                                    .HasMaxLength(16)
                                    .IsUnicode(false);

                entity.Property(e => e.AccidentId)
                                    .HasColumnName("ACCIDENT_ID")
                                    .HasMaxLength(16)
                                    .IsUnicode(false);

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.Number).HasColumnName("NUMBER");

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.HasOne(d => d.TbMAccidentDetail)
                                    .WithMany(p => p.TbRAccidentDetail)
                                    .HasForeignKey(d => new { d.YearActive, d.AccidentId })
                                    .OnDelete(DeleteBehavior.ClientSetNull)
                                    .HasConstraintName("ACCIDENT_MASTER_FK");

                entity.HasOne(d => d.TbRRiskAssessment)
                                    .WithMany(p => p.TbRAccidentDetail)
                                    .HasForeignKey(d => new { d.YearActive, d.RiskNo })
                                    .OnDelete(DeleteBehavior.ClientSetNull)
                                    .HasConstraintName("ACCIDENT_RISK_FK");
            });

            modelBuilder.Entity<TbRControlDetail>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.RiskNo, e.No });

                entity.ToTable("TB_R_CONTROL_DETAIL");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.RiskNo)
                                    .HasColumnName("RISK_NO")
                                    .HasMaxLength(16)
                                    .IsUnicode(false);

                entity.Property(e => e.No).HasColumnName("NO");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.Description)
                                    .HasColumnName("DESCRIPTION")
                                    .HasMaxLength(100)
                                    .IsUnicode(false);

                entity.Property(e => e.Type)
                                    .HasColumnName("TYPE")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.HasOne(d => d.TbRRiskAssessment)
                                    .WithMany(p => p.TbRControlDetail)
                                    .HasForeignKey(d => new { d.YearActive, d.RiskNo })
                                    .OnDelete(DeleteBehavior.ClientSetNull)
                                    .HasConstraintName("CONTROL_DETAIL_FK");
            });

            modelBuilder.Entity<TbRRiskAssessment>(entity =>
            {
                entity.HasKey(e => new { e.YearActive, e.RiskNo });

                entity.ToTable("TB_R_RISK_ASSESSMENT");

                entity.Property(e => e.YearActive).HasColumnName("YEAR_ACTIVE");

                entity.Property(e => e.RiskNo)
                                    .HasColumnName("RISK_NO")
                                    .HasMaxLength(16)
                                    .IsUnicode(false);

                entity.Property(e => e.AccidentList).HasColumnName("ACCIDENT_LIST");

                entity.Property(e => e.AppropriatenessCt)
                                    .HasColumnName("APPROPRIATENESS_CT")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.BusinessProcess)
                                    .HasColumnName("BUSINESS_PROCESS")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Caused)
                                    .HasColumnName("CAUSED")
                                    .HasMaxLength(200)
                                    .IsUnicode(false);

                entity.Property(e => e.CompanyKpi)
                                    .HasColumnName("COMPANY_KPI")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.ControlList).HasColumnName("CONTROL_LIST");

                entity.Property(e => e.CounterNo).HasColumnName("COUNTER_NO");

                entity.Property(e => e.DatetimeCreated)
                                    .HasColumnName("DATETIME_CREATED")
                                    .HasColumnType("datetime");

                entity.Property(e => e.DatetimeUpdate)
                                    .HasColumnName("DATETIME_UPDATE")
                                    .HasColumnType("datetime");

                entity.Property(e => e.Department)
                                    .HasColumnName("DEPARTMENT")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.DepartmentKpi)
                                    .HasColumnName("DEPARTMENT_KPI")
                                    .HasMaxLength(20)
                                    .IsUnicode(false);

                entity.Property(e => e.Division)
                                    .HasColumnName("DIVISION")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.FinAmountIr).HasColumnName("FIN_AMOUNT_IR");

                entity.Property(e => e.FinAmountRd).HasColumnName("FIN_AMOUNT_RD");

                entity.Property(e => e.FinImpactIr)
                                    .HasColumnName("FIN_IMPACT_IR")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.ImpactEx)
                                    .HasColumnName("IMPACT_EX")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.IrImpact)
                                    .HasColumnName("IR_IMPACT")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.LikelihoodEx)
                                    .HasColumnName("LIKELIHOOD_EX")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.LikelihoodIr)
                                    .HasColumnName("LIKELIHOOD_IR")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.LikelihoodRd)
                                    .HasColumnName("LIKELIHOOD_RD")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.LossEvent)
                                    .HasColumnName("LOSS_EVENT")
                                    .HasMaxLength(200)
                                    .IsUnicode(false);

                entity.Property(e => e.NotesIr)
                                    .HasColumnName("NOTES_IR")
                                    .HasMaxLength(500)
                                    .IsUnicode(false);

                entity.Property(e => e.NotesRd)
                                    .HasColumnName("NOTES_RD")
                                    .HasMaxLength(500)
                                    .IsUnicode(false);

                entity.Property(e => e.OpAmountIr).HasColumnName("OP_AMOUNT_IR");

                entity.Property(e => e.OpAmountRd).HasColumnName("OP_AMOUNT_RD");

                entity.Property(e => e.OpImpactIr)
                                    .HasColumnName("OP_IMPACT_IR")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.OperationCt)
                                    .HasColumnName("OPERATION_CT")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.OverallEf)
                                    .HasColumnName("OVERALL_EF")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.OverallEx)
                                    .HasColumnName("OVERALL_EX")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.OverallRd)
                                    .HasColumnName("OVERALL_RD")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.OverallRiskIr)
                                    .HasColumnName("OVERALL_RISK_IR")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Pic)
                                    .HasColumnName("PIC")
                                    .HasMaxLength(30)
                                    .IsUnicode(false);

                entity.Property(e => e.QlImpactIr)
                                    .HasColumnName("QL_IMPACT_IR")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.QlImpactRd)
                                    .HasColumnName("QL_IMPACT_RD")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.RdImpact)
                                    .HasColumnName("RD_IMPACT")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.RiskImpact)
                                    .IsRequired()
                                    .HasColumnName("RISK_IMPACT")
                                    .HasMaxLength(50)
                                    .IsUnicode(false);

                entity.Property(e => e.RiskLevel)
                                    .HasColumnName("RISK_LEVEL")
                                    .HasMaxLength(10)
                                    .IsUnicode(false);

                entity.Property(e => e.Schedule).HasColumnName("SCHEDULE");

                entity.Property(e => e.TreatmentDescription)
                                    .HasColumnName("TREATMENT_DESCRIPTION")
                                    .HasMaxLength(500)
                                    .IsUnicode(false);

                entity.Property(e => e.TreatmentPlan).HasColumnName("TREATMENT_PLAN");

                entity.Property(e => e.UserCreated)
                                    .HasColumnName("USER_CREATED")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.Property(e => e.UserUpdate)
                                    .HasColumnName("USER_UPDATE")
                                    .HasMaxLength(45)
                                    .IsUnicode(false);

                entity.HasOne(d => d.TbMRiskMapping)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskMapping)
                                    .HasForeignKey(d => new { d.YearActive, d.AppropriatenessCt })
                                    .HasConstraintName("CT_APPROPRIATENESS_FK");

                entity.HasOne(d => d.TbMComInput)
                                    .WithMany(p => p.TbRRiskAssessment)
                                    .HasForeignKey(d => new { d.YearActive, d.CompanyKpi })
                                    .HasConstraintName("COM_KPI_FK");

                entity.HasOne(d => d.TbMDeptInput)
                                    .WithMany(p => p.TbRRiskAssessment)
                                    .HasForeignKey(d => new { d.YearActive, d.DepartmentKpi })
                                    .HasConstraintName("DEPT_KPI_FK");

                entity.HasOne(d => d.TbMFinancialImpact)
                                    .WithMany(p => p.TbRRiskAssessment)
                                    .HasForeignKey(d => new { d.YearActive, d.FinImpactIr })
                                    .HasConstraintName("FIN_IR_FK");

                entity.HasOne(d => d.TbMRiskIndicator)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskIndicator)
                                    .HasForeignKey(d => new { d.YearActive, d.ImpactEx })
                                    .HasConstraintName("EX_IMPACT");

                entity.HasOne(d => d.TbMRiskIndicatorNavigation)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskIndicatorNavigation)
                                    .HasForeignKey(d => new { d.YearActive, d.IrImpact })
                                    .HasConstraintName("IR_IMPACT_FK");

                entity.HasOne(d => d.TbMRiskIndicator1)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskIndicator1)
                                    .HasForeignKey(d => new { d.YearActive, d.LikelihoodEx })
                                    .HasConstraintName("EX_LIKELIHOOD");

                entity.HasOne(d => d.TbMRiskIndicator2)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskIndicator2)
                                    .HasForeignKey(d => new { d.YearActive, d.LikelihoodIr })
                                    .HasConstraintName("IR_LIKELIHOOD_FK");

                entity.HasOne(d => d.TbMRiskIndicator3)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskIndicator3)
                                    .HasForeignKey(d => new { d.YearActive, d.LikelihoodRd })
                                    .HasConstraintName("RD_LIKELIHOOD_FK");

                entity.HasOne(d => d.TbMOperationalImpact)
                                    .WithMany(p => p.TbRRiskAssessment)
                                    .HasForeignKey(d => new { d.YearActive, d.OpImpactIr })
                                    .HasConstraintName("OP_IR_FK");

                entity.HasOne(d => d.TbMRiskIndicator4)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskIndicator4)
                                    .HasForeignKey(d => new { d.YearActive, d.OperationCt })
                                    .HasConstraintName("CT_OPERATION_FK");

                entity.HasOne(d => d.TbMRiskMappingNavigation)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskMappingNavigation)
                                    .HasForeignKey(d => new { d.YearActive, d.OverallEf })
                                    .HasConstraintName("EF_OVERALL_FK");

                entity.HasOne(d => d.TbMRiskMapping1)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskMapping1)
                                    .HasForeignKey(d => new { d.YearActive, d.OverallRd })
                                    .HasConstraintName("RD_OVERALL_FK");

                entity.HasOne(d => d.TbMRiskMapping2)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskMapping2)
                                    .HasForeignKey(d => new { d.YearActive, d.OverallRiskIr })
                                    .HasConstraintName("IR_OVERALL_FK");

                entity.HasOne(d => d.TbMRiskIndicator5)
                                    .WithMany(p => p.TbRRiskAssessmentTbMRiskIndicator5)
                                    .HasForeignKey(d => new { d.YearActive, d.QlImpactIr })
                                    .HasConstraintName("QL_IR_FK");
            });
        }
    }
}
