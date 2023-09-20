import Plot from "react-plotly.js";

export default function PlotGraph() {
  const chartData = {
    x: ["Unidade 1", "Unidade 2", "Unidade 3", "Unidade 4"],
    y: [100, 200, 300, 400],
    type: "bar",
    marker: {
      color: "#2eb82e",
    },
    width: 0.25,
  };

  const charLayout = {
    autosize: false,
    width: 1000,
    height: 500,
    title: "Requisitos por Unidade",
    dragmode: false,
  };

  return (
    <Plot
      data={[chartData]}
      config={{ displayModeBar: false }}
      layout={charLayout}
    />
  );
}
