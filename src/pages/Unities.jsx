import {
  Box,
  Typography,
  Button,
  Grow,
  Alert,
  TextField,
  CircularProgress
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LeftBar from "../components/LeftBar";
import DataTable from "../components/DataTable";
import UnityModel from "../models/UnityModel";

export default function Unities() {
  const [unityName, setUnityName] = useState("");

  const [unities, setUnities] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [loading, setLoading] = useState(false);

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

  async function searchUnities() {
    try {
      setLoading(true);

      const { unities } = await new UnityModel({}).findMany(unityName);

      setUnities(unities);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontSize="2rem" fontWeight={700}>
            Unidades
          </Typography>

          <Button
            sx={{
              backgroundColor: "#2eb82e",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#2eb82e",
                opacity: 0.8,
              },
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
                width: "125px",
              }}
              startIcon={loading ? <CircularProgress size="1.45rem" color="inherit" /> : <SearchIcon />}
              onClick={searchUnities}
            >
              Buscar
            </Button>
          </Box>
        </Box>

        {
          unities.length > 0 && (
            <DataTable
              data={unities}
              columns={[
                {
                  label: "Nome",
                  selector: (unity) => unity.name
                },
                {
                  label: "Criada em",
                  selector: (unity) => unity.createdAt
                },
                {
                  label: "Atualizada em",
                  selector: (unity) => unity.updatedAt
                },
                {
                  label: "Desativada em",
                  selector: (unity) => unity.deletedAt
                }
              ]}
              options={[
                {
                  element: (
                    <Button>
                      Editar
                    </Button>
                  ),
                  onClick: (unity) => console.log(`/unities/${unity.id}`)
                },
                {
                  element: (
                    <Button>
                      Desativar
                    </Button>
                  ),
                  onClick: (unity) => console.log(`/unities/${unity.id}`)
                }
              ]}
            />
          )
        }
      </Box>
    </Box>
  );
}
