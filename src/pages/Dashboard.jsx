import {
  Box,
  Collapse,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import stylesDashboard from "../style/Dashboard.module.css";
import InboxIcon from "@mui/icons-material/Inbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  function handleClick() {
    setOpen(!open);
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
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
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon style={{ color: "#1e3932" }} />
                </ListItemIcon>
                <ListItemText primary="Início" />
              </ListItemButton>
            </ListItem>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <PeopleIcon style={{ color: "#1e3932" }} />
              </ListItemIcon>
              <ListItemText primary="Unidades" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 5 }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Unidade 1" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 5 }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Unidade 2" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 5 }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Unidade 3" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 5 }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Unidade 4" />
                </ListItemButton>
              </List>
            </Collapse>
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

      <Box
        sx={{
          width: "calc(100% - 280px)",
        }}
      >
        <Typography>Olá Mundo!</Typography>
      </Box>
    </Box>
  );
}
