import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography,
} from "@mui/material";
import LeftBar from "../components/LeftBar";
import PlotGraph from "../components/PlotGraph";
import { useEffect, useState } from "react";
import { getTableData } from "../funcs";

export default function Dashboard() {
  const [tableData, setTableData] = useState([]);

  const [loadInit, setLoadInit] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const { table } = await getTableData();
        setTableData(table);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadInit(false);
      }
    }

    init();
  }, []);

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

        {loadInit ? (
          <Box
            sx={{
              dispaly: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
            <Typography>Pegando dados da tabela.</Typography>
          </Box>
        ) : tableData.length === 0 ? (
          <Typography>Nenhum dado encontrado.</Typography>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Requisito</TableCell>
                  {tableData.map((data) => (
                    <TableCell key={`Unidade-${data.unityName}`}>
                      {data.unityName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData[0].requirements.map((requirement) => (
                  <TableRow key={`Requisito-${requirement.name}`}>
                    <TableCell>{requirement.name}</TableCell>
                    {tableData.map((data) => (
                      <TableCell
                        key={`Unidade-${data.unityName}-Requisito-${requirement.name}`}
                      >
                        {
                          data.requirements.find(
                            (req) => req.name === requirement.name
                          ).point
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableCell>Total</TableCell>
                {tableData.map((data) => (
                  <TableCell key={`Unidade-${data.unityName}-Total`}>
                    {data.total}
                  </TableCell>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
}
