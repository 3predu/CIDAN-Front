import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import stylesDashboard from "../style/Dashboard.module.css";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useNavigate } from "react-router-dom";

export default function LeftBar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "280px",
        height: "100%",
        backgroundColor: "#d4e9e2",
        boxShadow: "4",
      }}
    >
      <Box className={stylesDashboard.Lista}>
        <img
          src="./images/logo-cdan.png"
          style={{ width: "80px", height: "80px", margin: "20px 0" }}
        />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <ListItemIcon>
                <HomeIcon style={{ color: "#1e3932" }} />
              </ListItemIcon>
              <ListItemText primary="Início" />
            </ListItemButton>
          </ListItem>
          <ListItemButton onClick={() => navigate("/unities")}>
            <ListItemIcon>
              <PeopleIcon style={{ color: "#1e3932" }} />
            </ListItemIcon>
            <ListItemText primary="Unidades" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/requirements")}>
            <ListItemIcon>
              <AccountTreeIcon style={{ color: "#1e3932" }} />
            </ListItemIcon>
            <ListItemText primary="Requisitos" />
          </ListItemButton>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon style={{ color: "#1e3932" }} />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
