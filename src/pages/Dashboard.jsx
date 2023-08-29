import {
  Box,
  Collapse,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import stylesDashboard from "../style/Dashboard.module.css";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const chartData = {
    x: ["Unidade 1", "Unidade 2", "Unidade 3", "Unidade 4"],
    y: [100, 200, 300, 400],
    type: "bar",
  }

  const requisitos = ["Requisito 1", "Requisito 2", "Requisito 3", "Requisito 4"];

  const requisitosUnidades = [
    {
      unidade: "Unidade 1",
      requisitos: [100, 200, 300, 400]
    },
    {
      unidade: "Unidade 2",
      requisitos: [100, 200, 300, 400]
    },
    {
      unidade: "Unidade 3",
      requisitos: [100, 200, 300, 400]
    },
    {
      unidade: "Unidade 4",
      requisitos: [100, 200, 300, 400]
    }
  ]

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
              <ListItemButton
                onClick={() => navigate("/dashboard")}
              >
                <ListItemIcon>
                  <HomeIcon style={{ color: "#1e3932" }} />
                </ListItemIcon>
                <ListItemText primary="Início" />
              </ListItemButton>
            </ListItem>
            <ListItemButton
              onClick={() => navigate("/unities")}
            >
              <ListItemIcon>
                <PeopleIcon style={{ color: "#1e3932" }} />
              </ListItemIcon>
              <ListItemText primary="Unidades" />
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

      <Box
        sx={{
          width: "calc(100% - 280px)",
          p: 2
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Plot
            data={[chartData]}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Unidade</TableCell>
                {
                  requisitos.map(requisito => (
                    <TableCell>{requisito}</TableCell>
                  ))
                }
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
                {
                  requisitosUnidades.map(requisitoUnidade => (
                    <TableRow>
                      <TableCell>{requisitoUnidade.unidade}</TableCell>
                      {
                        requisitoUnidade.requisitos.map(requisito => (
                          <TableCell>{requisito}</TableCell>
                        ))
                      }
                      <TableCell>{requisitoUnidade.requisitos.reduce((a, b) => a + b, 0)}</TableCell>
                    </TableRow>
                  ))
                }
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}
