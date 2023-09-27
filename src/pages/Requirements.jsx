import { Box, Grow, Alert, Typography, TextField, Button, CircularProgress, Grid } from "@mui/material";
import LeftBar from "../components/LeftBar";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RequirementModel from "../models/RequirementModel";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import ServerSideException from "../exceptions/ServerSideException";
import CustomException from "../exceptions/CustomException";
import BadRequestException from "../exceptions/BadRequestException";
import EmptyFieldException from "../exceptions/EmptyFieldException";
import DataTable from "../components/DataTable";

export default function Requirements() {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");

    const [requirementName, setRequirementName] = useState("");
    const [requirementDescription, setRequirementDescription] = useState("");
    const [maxPoint, setMaxPoint] = useState(0);

    const [loadingSearch, setLoadingSearch] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);

    const [requirements, setRequirements] = useState([]);

    async function searchRequirements() {
        try {
            setLoadingSearch(true);

            const requirementSearchContent = {
                name: requirementName,
                description: requirementDescription,
                maxPoint
            }

            const { requirements } = await new RequirementModel({ ...requirementSearchContent }).findMany();

            setRequirements(requirements);

            if (requirements.length === 0) {
                setAlertMessage("Nenhum requisito encontrado");
                setAlertSeverity("info");
                setAlertOpen(true);
            }
        } catch (error) {
            console.log(error);

            if (error instanceof UnauthorizedException) {
                setAlertMessage(error.message);
                setAlertSeverity(error.severityAlert);
                setAlertOpen(true);
            } else if (error instanceof ServerSideException) {
                setAlertMessage(error.message);
                setAlertSeverity(error.severityAlert);
                setAlertOpen(true);
            } else if (error instanceof CustomException) {
                setAlertMessage(error.message);
                setAlertSeverity(error.severityAlert);
                setAlertOpen(true);
            } else if (error instanceof BadRequestException) {
                setAlertMessage(error.message);
                setAlertSeverity(error.severityAlert);
                setAlertOpen(true);
            }
        } finally {
            setLoadingSearch(false);
        }
    }

    async function addRequirement() {
        try {
            setLoadingAdd(true);

            const requirementModelProps = {
                name: requirementName,
                maxPoint,
                description: requirementDescription
            }

            const { message, severityWarning } = await new RequirementModel({ ...requirementModelProps }).create();

            setAlertMessage(message);
            setAlertSeverity(severityWarning);
            setAlertOpen(true);
        } catch (error) {
            console.log(error);

            if (error instanceof BadRequestException) {
                setAlertMessage(error.message);
                setAlertSeverity(error.severityAlert);
                setAlertOpen(true);
            } else if (error instanceof UnauthorizedException) {
                setAlertMessage(error.message);
                setAlertSeverity(error.severityAlert);
                setAlertOpen(true);
            } else if (error instanceof ServerSideException) {
                setAlertMessage(error.message);
                setAlertSeverity(error.severityAlert);
                setAlertOpen(true);
            } else if (error instanceof CustomException) {
                setAlertMessage(error.message);
                setAlertSeverity(error.severityAlert);
                setAlertOpen(true);
            } else if (error instanceof EmptyFieldException) {
                setAlertMessage(error.message);
                setAlertSeverity(error.severityAlert);
                setAlertOpen(true);
            }
        } finally {
            setLoadingAdd(false);
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
            <LeftBar />
            <Box
                sx={{
                    width: "calc(100% - 280px)",
                    p: 2,
                    overflowY: "auto",
                }}
            >
                <Grow in={alertOpen} mountOnEnter unmountOnExit>
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

                <Typography
                    variant="h4"
                    fontSize="2rem"
                    fontWeight={700}
                >
                    Requisitos
                </Typography>

                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={1}
                    sx={{
                        mt: 2,
                        boxShadow: "4",
                        p: 2,
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                    >
                        <TextField
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setRequirementName(e.target.value)}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                    >
                        <TextField
                            label="Quantidade de pontos"
                            variant="outlined"
                            type="number"
                            fullWidth
                            onChange={(e) => {
                                const pointNumber = parseInt(e.target.value);

                                if (isNaN(pointNumber)) {
                                    setMaxPoint(0);
                                } else if (pointNumber < 0) {
                                    setMaxPoint(0);
                                } else {
                                    setMaxPoint(pointNumber);
                                }
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                    >
                        <TextField
                            label="Descrição"
                            variant="outlined"
                            multiline
                            fullWidth
                            maxRows={10}
                            onChange={(e) => setRequirementDescription(e.target.value)}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        display="flex"
                        justifyContent="flex-end"
                        mb={1}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                marginRight: "10px",
                                backgroundColor: "#2eb82e",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#2eb82e",
                                    opacity: 0.8,
                                },
                                width: "125px",
                            }}
                            startIcon={
                                loadingSearch ? (
                                    <CircularProgress size="1.45rem" color="inherit" />
                                ) : (
                                    <SearchIcon />
                                )
                            }
                            onClick={searchRequirements}
                        >
                            Buscar
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#2eb82e",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#2eb82e",
                                    opacity: 0.8,
                                },
                            }}
                            startIcon={
                                loadingAdd ? (
                                    <CircularProgress size="1.45rem" color="inherit" />
                                ) : (
                                    <AddIcon />
                                )
                            }
                            onClick={addRequirement}
                        >
                            Adicionar
                        </Button>
                    </Grid>
                </Grid>

                {requirements.length > 0 && (
                    <DataTable
                        data={requirements}
                        columns={[
                            {
                                label: "Nome",
                                selector: (requirement) => requirement.name,
                            },
                            {
                                label: "Descrição",
                                selector: (requirement) => requirement.description,
                            },
                            {
                                label: "Pontos",
                                selector: (requirement) => requirement.maxPoint,
                            },
                            {
                                label: "Criado em",
                                selector: (requirement) => requirement.createdAt,
                            },
                            {
                                label: "Atualizado em",
                                selector: (requirement) => requirement.updatedAt,
                            }
                        ]}
                        options={[
                            {
                                element: <Button>Editar</Button>,
                                onClick: (unity) => console.log(`/unities/${unity.id}`),
                            }
                        ]}
                    />
                )}
            </Box>
        </Box>
    );
}