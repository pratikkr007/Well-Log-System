import Plot from "react-plotly.js";

export default function PlotSection({ data, curve }) {

  if (!data || !data.depth?.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 h-[400px] flex items-center justify-center">
        <p className="text-gray-400">No Data Loaded</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="h-[600px]">
        <Plot
          data={[
            {
              x: data.values,
              y: data.depth,
              type: "scatter",
              mode: "lines",
              line: { color: "#2563eb", width: 2 },
              name: curve
            }
          ]}
          layout={{
            autosize: true,
            margin: { t: 20, l: 70, r: 30, b: 50 },

            yaxis: {
              autorange: "reversed",
              title: {
                text: "Depth (ft)",   // change to (m) if needed
                font: { size: 14 }
              },
              showgrid: true,
              gridcolor: "#e5e7eb",
              zeroline: false
            },

            xaxis: {
              title: {
                text: curve || "Curve Value",
                font: { size: 14 }
              },
              showgrid: true,
              gridcolor: "#e5e7eb",
              zeroline: false
            }
          }}
          style={{ width: "100%", height: "100%" }}
          useResizeHandler
        />
      </div>

    </div>
  );
}
