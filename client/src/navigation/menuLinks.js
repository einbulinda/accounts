import { url } from "navigation/CONSTANTS";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MoneyIcon from "@mui/icons-material/Money";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SettingsIcon from "@mui/icons-material/Settings";

export const menus = [
  {
    path: url.DASHBOARD,
    title: "Dashboard",
    type: "sideNav",
    icon: DashboardIcon,
  },
  {
    path: url.ADD_PROFILE,
    title: "Clients",
    type: "sideNav",
    icon: AssignmentIndIcon,
  },
  {
    path: url.ADD_ACCOUNT,
    title: "Manage Accounts",
    type: "sideNav",
    icon: ManageAccountsIcon,
  },
  {
    path: url.VAT_RETURN,
    title: "VAT Account",
    type: "sideNav",
    icon: AccountTreeIcon,
  },
  {
    path: url.ADD_PAYE,
    title: "PAYE Data",
    type: "sideNav",
    icon: MoneyIcon,
  },
  {
    path: url.ADD_EXPENSES,
    title: "Expenses",
    type: "sideNav",
    icon: MoneyOffIcon,
  },
  {
    path: url.NEW_ASSETS,
    title: "Fixed Assets",
    type: "sideNav",
    icon: ApartmentIcon,
  },
  {
    path: url.SETTINGS,
    title: "Settings",
    type: "sideNav",
    icon: SettingsIcon,
  },
  {
    path: url.INCOME_STATEMENT,
    type: "main",
    title: "Income Statement",
  },
  {
    path: url.BALANCE_SHEET,
    type: "main",
    title: "Balance Sheet",
  },
  {
    path: url.FIXED_ASSETS,
    type: "main",
    title: "PPE Schedule",
  },
  {
    path: url.CASH_FLOWS,
    type: "main",
    title: "Cash Flow",
  },
  {
    path: url.TRIAL_BALANCE,
    type: "main",
    title: "Trial Balance",
  },
  {
    path: url.TAX_COMPUTATION,
    type: "main",
    title: "Tax Computation",
  },
  {
    path: url.USER_PROFILE,
    type: "user",
    title: "Profile",
  },
  {
    path: url.USER_ACCOUNT,
    type: "user",
    title: "Account",
  },
];
// Have menu for accounts having the different sets of books as drop down menus
