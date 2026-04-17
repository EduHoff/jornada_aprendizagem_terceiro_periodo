"use client";

import { useState } from "react";
import { StepCliente } from "./steps/StepCliente";
import { StepRota } from "./steps/StepRota";
import { StepCarga } from "./steps/StepCarga";
import { StepResumo } from "./steps/StepResumo";

export class OrcamentoWizard {
  private step: number = 0;

  public getStep() {
    return this.step;
  }

  public next() {
    this.step++;
  }

  public back() {
    this.step--;
  }
}

export function WizardComponent() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({});

  function next(newData: any) {
    setData({ ...data, ...newData });
    setStep(step + 1);
  }

  function back() {
    setStep(step - 1);
  }

  switch (step) {
    case 0:
      return <StepCliente next={next} />;
    case 1:
      return <StepRota next={next} back={back} />;
    case 2:
      return <StepCarga next={next} back={back} />;
    case 3:
      return <StepResumo data={data} back={back} />;
    default:
      return <div>Fim</div>;
  }
}