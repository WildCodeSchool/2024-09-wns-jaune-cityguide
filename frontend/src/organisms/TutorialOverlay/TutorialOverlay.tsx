import { useEffect, useState } from "react";
import "./TutorialOverlay.css";

type Step = {
  selector: string;
  title: string;
  description: string;
};

type TutorialOverlayProps = {
  steps: Step[];
  onClose: () => void;
};

export default function TutorialOverlay({ steps, onClose }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = steps[currentStep];

  useEffect(() => {
    const tryFindElement = () => {
      const el = document.querySelector(step.selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        // Retry until found (with a limit to avoid infinite loop)
        setTimeout(tryFindElement, 100); // retry every 100ms
      }
    };

    tryFindElement();
  }, [step]);

  const handleNext = () => {
    if (currentStep + 1 < steps.length) {
      setCurrentStep(currentStep + 1);
      setTargetRect(null); // reset to wait for the next element
    } else {
      onClose();
    }
  };

  return (
    <>
      <div className="tutorial-overlay" />

      {targetRect && (
        <>
          <div
            className="highlight-box"
            style={{
              top: targetRect.top + window.scrollY - 80,
              left: targetRect.left + window.scrollX,
              width: targetRect.width,
              height: targetRect.height,
            }}
          />
          <div
            className="tooltip-box"
            style={{
              top: targetRect.bottom + window.scrollY - 150,
              left: targetRect.left + window.scrollX,
            }}
          >
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <button onClick={handleNext}>Suivant</button>
          </div>
        </>
      )}
    </>
  );
}
