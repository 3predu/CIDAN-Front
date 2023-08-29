import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Typography,
    Button,
    Grow,
    Alert,
    TextField
} from "@mui/material";
import stylesDashboard from "../style/Dashboard.module.css";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material";

export default function Unities() {
    const navigate = useNavigate();
    const location = useLocation();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        if (location.state) {
            const state = location.state;

            setAlertOpen(true);
            setAlertMessage(state.message);
            setAlertSeverity(state.severity);

            window.history.replaceState({}, document.title);

            delete location.state;
        }
    }, []);

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
                        severity={alertSeverity}
                        sx={{
                            mb: 2,
                        }}
                        onClose={() => setAlertOpen(false)}
                    >
                        {alertMessage}
                    </Alert>
                </Grow>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        variant="h4"
                        fontSize="2rem"
                        fontWeight={700}
                    >
                        Unidades
                    </Typography>

                    <Button
                        sx={{
                            backgroundColor: "#2eb82e",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#2eb82e",
                                opacity: 0.8
                            }
                        }}
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/unities/add")}
                    >
                        Adicionar
                    </Button>
                </Box>

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
                        // onChange={(e) => setUnityName(e.target.value)}
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
                            startIcon={<SearchIcon />}
                            // onClick={addUnity}
                        >
                            Buscar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}