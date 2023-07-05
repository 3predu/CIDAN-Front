import { useState } from "react";

import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  Link,
  TextField,
  Slide,
  Alert,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import styles from "../style/SignIn.module.css";

import UserModel from "../models/UserModel";

import EmptyFieldException from "../exceptions/EmptyFieldException";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import ServerSideException from "../exceptions/ServerSideException";

export default function SignIn() {
  const [login, setLogin] = useState("");
  const [loginValid, setLoginValid] = useState(true);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [severityAlert, setSeverityAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const user = new UserModel({ login, password });

      const { message } = await user.signIn();

      setAlertOpen(true);
      setSeverityAlert("success");
      setMessageAlert(message);
    } catch (error) {
      if (error instanceof EmptyFieldException) {
        setAlertOpen(true);
        setSeverityAlert(error.severityAlert);
        setMessageAlert(error.message);

        !login && setLoginValid(false);
        !password && setPasswordValid(false);
      } else if (error instanceof UnauthorizedException) {
        setAlertOpen(true);
        setSeverityAlert(error.severityAlert);
        setMessageAlert(error.message);
      } else if (error instanceof ServerSideException) {
        setAlertOpen(true);
        setSeverityAlert(error.severityAlert);
        setMessageAlert(error.message);
      } else {
        setAlertOpen(true);
        setSeverityAlert("error");
        setMessageAlert(`Erro interno do servidor: ${error.message}`);
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
      <img src="./images/logo-cdan.png" alt="" className={styles.Logo} />
      <Box
        sx={{
          width: "50%",
          height: "100%",
        }}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form className={styles.Form} onSubmit={onSubmit}>
            <Slide direction="down" in={alertOpen} mountOnEnter unmountOnExit>
              <Alert
                severity={severityAlert}
                sx={{
                  mb: 2,
                }}
                onClose={() => setAlertOpen(false)}
              >
                {messageAlert}
              </Alert>
            </Slide>

            <Typography variant="h4" fontWeight={700} fontSize="2rem">
              Entrar
            </Typography>

            <Typography
              variant="caption"
              fontSize="0.875rem"
              fontWeight={400}
              color="rgb(108, 115, 127)"
              sx={{
                mb: 4,
              }}
            >
              Ainda não tem uma conta?{" "}
              <Link sx={{ color: "#2eb82e" }} href="/sign-up" underline="hover">
                Criar
              </Link>
            </Typography>

            <TextField
              label="Login"
              sx={{
                mb: 2,
                "& label.Mui-focused": {
                  color: "#2eb82e",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#2eb82e",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#2eb82e",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#2eb82e",
                  },
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: "12px",
                },
              }}
              onChange={(e) => setLogin(e.target.value)}
              onBlur={(e) => {
                if (!e.target.value) {
                  setLoginValid(false);
                } else {
                  setLoginValid(true);
                }
              }}
              error={!loginValid}
              helperText={!loginValid ? "Campo obrigatório" : ""}
            />

            <TextField
              type={passwordVisible ? "text" : "password"}
              label="Senha"
              sx={{
                mb: 4,
                "& label.Mui-focused": {
                  color: "#2eb82e",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#2eb82e",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#2eb82e",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#2eb82e",
                  },
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: "12px",
                },
                endAdornment: (
                  <IconButton
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => {
                if (!e.target.value) {
                  setPasswordValid(false);
                } else {
                  setPasswordValid(true);
                }
              }}
              error={!passwordValid}
              helperText={!passwordValid ? "Campo obrigatório" : ""}
            />

            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: "12px",
                backgroundColor: "#2eb82e",
              }}
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </Container>
      </Box>

      <Box
        sx={{
          width: "50%",
          height: "100%",
        }}
      >
        <img className={styles.Img} src="./images/cdan-culto.jpg" alt="" />
      </Box>
    </Box>
  );
}
