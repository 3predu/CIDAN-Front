import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import LeftBar from "../components/LeftBar";
import PlotGraph from "../components/PlotGraph";

export default function Dashboard() {
  const requisitos = [
    "Requisito 1",
    "Requisito 2",
    "Requisito 3",
    "Requisito 4",
  ];

  const requisitosUnidades = [
    {
      unidade: "Unidade 1",
      requisitos: [100, 200, 300, 400],
    },
    {
      unidade: "Unidade 2",
      requisitos: [100, 200, 300, 400],
    },
    {
      unidade: "Unidade 3",
      requisitos: [100, 200, 300, 400],
    },
    {
      unidade: "Unidade 4",
      requisitos: [100, 200, 300, 400],
    },
  ];

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
        <PlotGraph />

        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Unidade</TableCell>
                {requisitos.map((requisito) => (
                  <TableCell>{requisito}</TableCell>
                ))}
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {requisitosUnidades.map((requisitoUnidade) => (
                <TableRow>
                  <TableCell>{requisitoUnidade.unidade}</TableCell>
                  {requisitoUnidade.requisitos.map((requisito) => (
                    <TableCell>{requisito}</TableCell>
                  ))}
                  <TableCell>
                    {requisitoUnidade.requisitos.reduce((a, b) => a + b, 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}
