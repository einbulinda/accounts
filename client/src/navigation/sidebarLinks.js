import { url } from "navigation/CONSTANTS";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MoneyIcon from "@mui/icons-material/Money";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SettingsIcon from "@mui/icons-material/Settings";

export const sidebarLinks = [
  {
    path: url.DASHBOARD,
    title: "Dashboard",
    icon: DashboardIcon,
  },
  {
    path: url.ADD_PROFILE,
    title: "Clients",
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
    path: url.ADD_EXPENSES,
    title: "Expenses",
    icon: MoneyOffIcon,
  },
  {
    path: url.NEW_ASSETS,
    title: "Fixed Assets",
    icon: ApartmentIcon,
  },
  {
    path: url.SETTINGS,
    title: "Settings",
    icon: SettingsIcon,
  },
];
// Have menu for accounts having the different sets of books as drop down menus
