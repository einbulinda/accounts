import { url } from "navigation/CONSTANTS";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MoneyIcon from "@mui/icons-material/Money";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

export const sidebarLinks = [
  {
    path: url.DASHBOARD,
    title: "Dashboard",
    icon: DashboardIcon,
  },
  {
    path: url.ADD_PROFILE,
    title: "New Company",
    icon: AssignmentIndIcon,
  },
  {
    path: url.ADD_ACCOUNT,
    title: "Manage Accounts",
    icon: ManageAccountsIcon,
  },
  {
    path: url.VAT_RETURN,
    title: "VAT Account",
    icon: AccountTreeIcon,
  },
  {
    path: url.ADD_PAYE,
    title: "PAYE Data",
    icon: MoneyIcon,
  },
  {
    path: url.EXPENSES,
    title: "Expenses",
    icon: MoneyOffIcon,
  },
];
// Have menu for accounts having the different sets of books as drop down menus
