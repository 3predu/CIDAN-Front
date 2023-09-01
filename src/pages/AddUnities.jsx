import { Box, Typography, Button, TextField, Alert, Grow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import UnityModel from "../models/UnityModel";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import ServerSideException from "../exceptions/ServerSideException";
import EmptyFieldException from "../exceptions/EmptyFieldException";
import BadRequestException from "../exceptions/BadRequestException";
import LeftBar from "../components/LeftBar";

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

      navigate("/unities", {
        state: { message, severity: "success" },
        replace: true,
      });
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
      <LeftBar />

      <Box
        sx={{
          width: "calc(100% - 280px)",
          p: 2,
        }}
      >
        <Grow in={alertOpen} mountOnEnter unmountOnExit>
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

        <Typography variant="h4" fontWeight={700} fontSize="2rem">
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
              justifyContent: "flex-end",
            }}
          >
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
