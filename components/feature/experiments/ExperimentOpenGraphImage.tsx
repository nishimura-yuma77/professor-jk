import { ImageResponse } from "next/og"
import loadJapaneseFont from "@/components/feature/open-graph/loadJapaneseFont"
import { getExperiment } from "@/const/experiments"

export const EXPERIMENT_OPEN_GRAPH_SIZE = {
  width: 1200,
  height: 630,
}

export async function createExperimentOpenGraphImage(slug: string) {
  const experiment = getExperiment(slug)
  if (!experiment) {
    throw new Error(`Experiment not found: ${slug}`)
  }

  const fontText = `${experiment.code}${experiment.status}${experiment.visibility}${experiment.title}${experiment.subtitle ?? ""}JK LABEXPERIMENT ARCHIVE`
  const fontData = await loadJapaneseFont(fontText)

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          border: "2px solid #3a3833",
          color: "#ead3bb",
          backgroundColor: "#11100e",
          backgroundImage:
            "linear-gradient(rgba(232,146,58,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(232,146,58,0.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          padding: "54px 64px",
          fontFamily: "Noto Sans JP",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#e8923a", fontFamily: "monospace", fontSize: 30 }}>
            {experiment.code}
          </span>
          <div style={{ display: "flex", gap: 24, fontFamily: "monospace", fontSize: 20 }}>
            <span
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                color: experiment.status === "ACTIVE" ? "#00b200" : "#eded2d",
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  backgroundColor: "currentColor",
                }}
              />
              {experiment.status}
            </span>
            <span style={{ color: experiment.visibility === "PUBLIC" ? "#00b200" : "#8a684f" }}>
              {experiment.visibility}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
          <span style={{ color: "#e8923a", fontFamily: "monospace", fontSize: 20, letterSpacing: "0.16em" }}>
            EXPERIMENT FILE
          </span>
          <span style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em" }}>
            {experiment.title}
          </span>
          {experiment.subtitle && (
            <span style={{ color: "#8a684f", fontFamily: "monospace", fontSize: 28 }}>
              {experiment.subtitle}
            </span>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ color: "#8a684f", fontFamily: "monospace", fontSize: 18 }}>
            RECORD ACCESS: PUBLIC
          </span>
          <span style={{ color: "#e8923a", fontFamily: "monospace", fontSize: 18 }}>
            JK LAB // EXPERIMENT ARCHIVE
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            right: 64,
            bottom: 86,
            width: 280,
            height: 2,
            background: "#e8923a",
            boxShadow: "0 0 18px rgba(232,146,58,0.7)",
          }}
        />
      </div>
    ),
    {
      ...EXPERIMENT_OPEN_GRAPH_SIZE,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  )
}
