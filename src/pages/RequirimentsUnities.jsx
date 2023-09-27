import { Box, Grow, Alert, Typography, TextField, Button } from "@mui/material";
import LeftBar from "../components/LeftBar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UnityModel from "../models/UnityModel";
import RequirementModel from "../models/RequirementModel";
import BadRequestException from "../exceptions/BadRequestException";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import NotFoundException from "../exceptions/NotFoundException";
import ServerSideException from "../exceptions/ServerSideException";
import CustomException from "../exceptions/CustomException";

export default function RequirementsUnities() {
  const params = useParams();
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setSeverityAlert] = useState("");
  const [alertMessage, setMessageAlert] = useState("");

  const [unity, setUnity] = useState({});
  const [requirements, setRequirements] = useState([]);

  const [searchedUnityRequirements, setSearchedUnityRequirements] = useState(false);
  const [unityRequirements, setUnityRequirements] = useState([]);


  useEffect(() => {
    async function init() {
      try {
        const unityId = params.id;

        const requirementSearchContent = {
          name: "",
          description: "",
          maxPoint: 0
        }

        const [{ unity }, { requirements }] = await Promise.all([
          new UnityModel({ id: unityId }).findById(),
          new RequirementModel({ ...requirementSearchContent }).findMany()
        ]);

        setUnity(new UnityModel({ ...unity }));
        setRequirements(requirements.map(requirement => new RequirementModel({ ...requirement })));
      } catch (error) {
        if (error instanceof BadRequestException) {
          navigate("/dashboard", { state: { message: error.message, severityAlert: error.severityAlert }, replace: true });
        } else if (error instanceof UnauthorizedException) {
          navigate("/dashboard", { state: { message: error.message, severityAlert: error.severityAlert }, replace: true });
        } else if (error instanceof NotFoundException) {
          navigate("/dashboard", { state: { message: error.message, severityAlert: error.severityAlert }, replace: true });
        } else if (error instanceof ServerSideException) {
          navigate("/dashboard", { state: { message: error.message, severityAlert: error.severityAlert }, replace: true });
        } else if (error instanceof CustomException) {
          navigate("/dashboard", { state: { message: error.message, severityAlert: error.severityAlert }, replace: true });
        }
      }
    }

    init();
  }, []);

  useEffect(() => {
    async function getUnityRequirements() {
      try {
        const unityId = unity.id;

        const { requirements } = await new UnityModel({ id: unityId }).getRequirements();

        setUnityRequirements(requirements);
      } catch (error) {

      } finally {
        setSearchedUnityRequirements(true);
      }
    }

    if (unity instanceof UnityModel) {
      getUnityRequirements();
    }
  }, [unity]);

  function changePointRequirements(requirement, point) {
    try {
      const tempUnityRequirements = [...unityRequirements];

      const requirementId = requirement.id;

      const searchedRequirementIndex = unityRequirements.findIndex(unityRequirement => unityRequirement.id === requirementId);

      if (searchedRequirementIndex !== -1) {
        tempUnityRequirements[searchedRequirementIndex].point = parseInt(point);

        setUnityRequirements(tempUnityRequirements);
      } else {
        tempUnityRequirements.push({
          id: requirement.id,
          name: requirement.name,
          maxPoint: requirement.maxPoint,
          description: requirement.description,
          createdAt: requirement.createdAt,
          updatedAt: requirement.updatedAt,
          point: parseInt(point)
        });

        setUnityRequirements(tempUnityRequirements);
      }
    } catch (error) {
      setAlertOpen(true);
      setSeverityAlert("error");
      setMessageAlert(error.message);
    }
  }

  async function saveUnityRequirements() {
    try {
      const unityId = unity.id;

      const requirements = {
        requirements: unityRequirements.map(e => ({
          id: e.id,
          point: e.point
        }))
      }

      const { message, severityAlert } = await new UnityModel({ id: unityId }).saveRequirements(requirements);

      navigate("/dashboard", { state: { message, severityAlert }, replace: true });
    } catch (error) {
      if (error instanceof BadRequestException) {
        navigate("/dashboard", { state: { message: error.message, severityAlert: error.severityAlert }, replace: true });
      } else if (error instanceof UnauthorizedException) {
        navigate("/dashboard", { state: { message: error.message, severityAlert: error.severityAlert }, replace: true });
      } else if (error instanceof ServerSideException) {
        navigate("/dashboard", { state: { message: error.message, severityAlert: error.severityAlert }, replace: true });
      } else if (error instanceof CustomException) {
        navigate("/dashboard", { state: { message: error.message, severityAlert: error.severityAlert }, replace: true });
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
          searchedUnityRequirements && requirements.map(requirement => (
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
                Pontuação máxima: {requirement.maxPoint}
              </Typography>
              <TextField
                label="Pontuação obtida"
                variant="outlined"
                type="number"
                sx={{
                  mt: 2,
                }}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: requirement.maxPoint
                  }
                }}
                value={unityRequirements.find(unityRequirement => unityRequirement.id === requirement.id)?.point || ""}
                onChange={(event) => changePointRequirements(requirement, event.target.value)}
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
            onClick={saveUnityRequirements}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
