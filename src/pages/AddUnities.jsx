import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Typography,
    Button,
    TextField,
    Alert,
    Grow
} from "@mui/material";
import stylesDashboard from "../style/Dashboard.module.css";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import UnityModel from "../models/UnityModel";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import ServerSideException from "../exceptions/ServerSideException";
import EmptyFieldException from "../exceptions/EmptyFieldException";
import BadRequestException from "../exceptions/BadRequestException";

export default function AddUnities() {
    const navigate = useNavigate();

    const [unityName, setUnityName] = useState("");

    const [alertOpen, setAlertOpen] = useState(false);
    const [severityAlert, setSeverityAlert] = useState("");
    const [messageAlert, setMessageAlert] = useState("");

    async function addUnity() {
        try {
            const unity = new UnityModel({ name: unityName });

            const { message } = await unity.create();

            navigate("/unities", { state: { message, severity: "success" }, replace: true });
        } catch (error) {
            if (error instanceof EmptyFieldException) {
                setAlertOpen(true);
                setSeverityAlert(error.severityAlert);
                setMessageAlert(error.message);
            } else if (error instanceof UnauthorizedException) {
                setAlertOpen(true);
                setSeverityAlert(error.severityAlert);
                setMessageAlert(error.message);
            } else if (error instanceof ServerSideException) {
                setAlertOpen(true);
                setSeverityAlert(error.severityAlert);
                setMessageAlert(error.message);
            } else if (error instanceof BadRequestException) {
                setAlertOpen(true);
                setSeverityAlert(error.severityAlert);
                setMessageAlert(error.message);
            } else {
                setAlertOpen(true);
                setSeverityAlert("error");
                setMessageAlert(error.message);
            }
        }
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
                <Grow
                    in={alertOpen}
                    mountOnEnter
                    unmountOnExit
                >
                    <Alert
                        severity={severityAlert}
                        sx={{
                            mb: 2,
                        }}
                        onClose={() => setAlertOpen(false)}
                    >
                        {messageAlert}
                    </Alert>
                </Grow>

                <Typography
                    variant="h4"
                    fontWeight={700}
                    fontSize="2rem"
                >
                    Adicionar Unidade
                </Typography>

                <Box
                    sx={{
                        boxShadow: "4",
                        p: 2,
                        mt: 2,
                        borderRadius: "4px",
                    }}
                >
                    <TextField
                        label="Nome da Unidade"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setUnityName(e.target.value)}
                    />

                    <Box
                        sx={{
                            mt: 2,
                            display: "flex",
                            justifyContent: "flex-end"
                        
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#2eb82e",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#2eb82e",
                                    opacity: 0.8
                                }
                            }}
                            startIcon={<AddIcon />}
                            onClick={addUnity}
                        >
                            Adicionar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}