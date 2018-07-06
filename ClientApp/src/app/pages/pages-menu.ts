import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "nb-home",
    link: "/pages/dashboard",
    home: true
  },
  {
    title: "Transaction",
    icon: "nb-locked",
    children: [
      {
        title: "Risk Register",
        link: "/pages/transaction/risk-register"
      },
      {
        title: "View Draft",
        link: "/pages/transaction/view-draft"
      },
      {
        title: "Input Department KPI",
        link: "/pages/transaction/dept-input"
      },
      {
        title: "Input Loss Event Database",
        link: "/pages/transaction/accident-input"
      }
    ]
  },
  {
    title: "Report",
    icon: "nb-bar-chart",
    children: [
      {
        title: "Report And Chart",
        link: "/pages/charts/chartjs"
      }
    ]
  },
  {
    title: "Reminder",
    icon: "nb-locked",
    children: [
      {
        title: "Reminder",
        link: "/pages/master/risk-reminder"
      }
    ]
  },
  {
    title: "Master",
    icon: "nb-locked",
    children: [
      {
        title: "Company Input",
        link: "/pages/master/company-input"
      },
      {
        title: "Risk Indicator",
        link: "/pages/master/risk-indicator"
      },
      {
        title: "Risk Matriks Indicator",
        link: "/pages/master/risk-matriks-indicator"
      },
      {
        title: "Financial Indicator Risk",
        link: "/pages/master/financial-indicator-risk"
      },
      {
        title: "Operational Indicator Risk",
        link: "/pages/master/operational-indicator-risk"
      },
      {
        title: "Qualitative Indicator Risk",
        link: "/pages/master/qualitative-indicator"
      },
      {
        title: "Financial Data",
        link: "/pages/master/financial-data"
      }
    ]
  }
];
