import Plot from "react-plotly.js";
import { getChartData } from "../funcs";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function PlotGraph() {
  const [chartData, setChartData] = useState([]);

  const [loadInit, setLoadInit] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const { chartData } = await getChartData();
        setChartData({
          x: chartData.map((item) => item.unityName),
          y: chartData.map((item) => item.unityPoint),
          type: "bar",
          marker: {
            color: "#2eb82e",
          },
          width: 0.25,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadInit(false);
      }
    }

    init();
  }, []);

  const charLayout = {
    autosize: false,
    width: 1000,
    height: 500,
    title: "Requisitos por Unidade",
    dragmode: false,
  };

  function load() {
    if (loadInit) {
      return (
        <Box
          sx={{
            dispaly: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography>Pegando dados do gráfico.</Typography>
        </Box>
      );
    } else if (chartData.length === 0) {
      return <Typography>Nenhum dado encontrado.</Typography>;
    } else {
      return (
        <Plot
          data={[chartData]}
          config={{ displayModeBar: false }}
          layout={charLayout}
        />
      );
    }
  }

  return load();
}
