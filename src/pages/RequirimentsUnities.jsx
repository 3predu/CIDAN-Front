import { Box, Grow, Alert, Typography, TextField, Button } from "@mui/material";
import LeftBar from "../components/LeftBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnityModel from "../models/UnityModel";
import RequirementModel from "../models/RequirementModel";

export default function RequirementsUnities() {
  const params = useParams();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setSeverityAlert] = useState("");
  const [alertMessage, setMessageAlert] = useState("");

  const [unity, setUnity] = useState({});
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        const unityId = params.id;

        const requirementSearchContent = {
          name: "",
          description: "",
          pointAmount: 0
        }

        const [{ unity }, { requirements }] = await Promise.all([
          new UnityModel({ id: unityId }).findById(),
          new RequirementModel({ ...requirementSearchContent }).findMany()
        ]);

        setUnity(new UnityModel({ ...unity }));
        setRequirements(requirements.map(requirement => new RequirementModel({ ...requirement })));
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (unity instanceof UnityModel) {
      console.log(unity);
    }
  }, [unity]);

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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontSize="2rem" fontWeight={700}>
            Requisitos da unidade {unity.name}
          </Typography>
        </Box>
        
        {
          requirements.map(requirement => (
            <Box
              key={requirement.id}
              sx={{
                boxShadow: "4",
                p: 2,
                mt: 2,
                borderRadius: "4px",
                overflowY: "auto",
              }}
            >
              
              <Typography variant="h5" fontSize="1.5rem">
                Nome: {requirement.name}
              </Typography>
              <Typography variant="body1" fontSize="1rem" fontWeight={400}>
                Descrição: {requirement.description}
              </Typography>
              <Typography variant="body1" fontSize="1rem" fontWeight={400}>
                Pontuação máxima: {requirement.pointAmount}
              </Typography>
              <TextField
                label="Pontuação obtida"
                variant="outlined"
                type="number"
                sx={{
                  mt: 2,
                }}

              />
            </Box>
          ))
        }

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            bottom: 0,
            position: "sticky",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              ml: 2,
            }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
