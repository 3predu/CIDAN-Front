import {
    useState,
    useEffect
} from "react";

import {
    Box,
    Container,
    Typography,
    Link
} from "@mui/material";

import styles from "../style/SignIn.module.css";

export default function SignIn() {
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
                    width: "50%",
                    height: "100%"
                }}
            >
                <Container
                    sx={{
                        width: "85%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        variant="h4"
                    >
                        Entrar
                    </Typography>

                    <Typography
                        variant="caption"
                        color="rgb(108, 115, 127)"
                    >
                        Não tem uma conta? <Link underline="hover">Criar</Link>
                    </Typography>
                </Container>
            </Box>

            <Box
                sx={{
                    width: "50%",
                    height: "100%",
                }}
            >
                <img
                    src="IMG_2593.jpg"
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    alt=""
                />
            </Box>
        </Box>
    );
}