import Button from "@mui/material/Button";
import { CustomLink } from "components/CustomLink";
import DashboardHeader from "components/DashboardHeader";
import AppLayout from "layout/AppLayout";
import { url } from "navigation/CONSTANTS";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useSelector } from "react-redux";
import CustomTable from "components/CustomTable";

const AllProfiles = () => {
  const profiles = useSelector((state) => state.profile.profiles);

  const columns = [
    { id: "companyName", label: "Client Name", minWidth: 50 },
    { id: "kraPin", label: "KRA PIN", minWidth: 50 },
    { id: "yearEnd", label: "Accounting Period", minWidth: 50 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  return (
    <AppLayout>
      <DashboardHeader
        title="Client Profiles"
        icon={BusinessCenterIcon}
        button={
          <CustomLink path={url.ADD_PROFILE}>
            <Button variant="contained" color="primary" sx={{ px: "2rem" }}>
              New Client
            </Button>
          </CustomLink>
        }
      />
      <CustomTable items={profiles} columns={columns} url={url.EDIT_PROFILE} />
    </AppLayout>
  );
};

export default AllProfiles;
