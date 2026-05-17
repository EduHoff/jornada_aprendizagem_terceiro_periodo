"use client";

import { useState } from "react";

import { StepUploadPDF } from "./steps/StepUploadPDF";
import { StepRevisao } from "./steps/StepRevisao";
import { StepVolumetria } from "./steps/StepVolumetria";
import { StepFrete } from "./steps/StepFrete";
import { StepFinal } from "./steps/StepFinal";

import { WizardData } from "./types";

export function WizardComponent() {
  const [step, setStep] = useState(0);

  const [data, setData] = useState<WizardData>({});

  function next(newData: Partial<WizardData>) {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));

    setStep((prev) => prev + 1);
  }

  function back() {
    setStep((prev) => prev - 1);
  }

  switch (step) {
    case 0:
      return <StepUploadPDF next={next} />;

    case 1:
      return (
        <StepRevisao
          data={data}
          next={next}
          back={back}
        />
      );

    case 2:
      return (
        <StepVolumetria
          data={data}
          next={next}
          back={back}
        />
      );

    case 3:
      return (
        <StepFrete
          data={data}
          next={next}
          back={back}
        />
      );

    case 4:
      return (
        <StepFinal
          data={data}
          back={back}
        />
      );

    default:
      return <div>Fim</div>;
  }
}