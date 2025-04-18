import { useEffect, useState } from "react";
import "./TutorialOverlay.css";

type Step = {
  selector: string;
  title: string;
  description: string;
  tooltipOffsetHeight?: number;
  tooltipOffsetWidth?: number;
};

type TutorialOverlayProps = {
  steps: Step[];
  onClose: () => void;
};

type Position = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export default function TutorialOverlay({ steps, onClose }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetPos, setTargetPos] = useState<Position | null>(null);

  const step = steps[currentStep];

  useEffect(() => {
    const tryFindElement = () => {
      const el = document.querySelector(step.selector) as HTMLElement;
      const scrollContainer = document.querySelector(".tutorial-container") as HTMLElement;

      if (el && scrollContainer) {
        // Scroll into view si besoin
        el.scrollIntoView({ behavior: "smooth", block: "center" });

        // Laisse le temps à l'élément de se positionner
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();

          setTargetPos({
            top: rect.top - containerRect.top + scrollContainer.scrollTop,
            left: rect.left - containerRect.left + scrollContainer.scrollLeft,
            width: rect.width,
            height: rect.height,
          });
        }, 300);
      } else {
        setTimeout(tryFindElement, 100);
      }
    };

    tryFindElement();
  }, [step]);

  const handleNext = () => {
    if (currentStep + 1 < steps.length) {
      setCurrentStep(currentStep + 1);
      setTargetPos(null);
    } else {
      onClose();
    }
  };

  if (!targetPos) return <div className="tutorial-overlay" />;

  // Position du tooltip : dessous si possible, sinon au-dessus
  const tooltipHeight = 140;
  const placeAbove = window.innerHeight - (targetPos.top - window.scrollY) < tooltipHeight;
  const tooltipOffsetHeight = step.tooltipOffsetHeight ?? 0;
  const tooltipOffsetWidth = step.tooltipOffsetWidth ?? 0;

  return (
    <>
      <div className="tutorial-overlay" />

      <div
        className="highlight-box"
        style={{
          top: `${targetPos.top}px`,
          left: `${targetPos.left}px`,
          width: `${targetPos.width}px`,
          height: `${targetPos.height}px`,
        }}
      />

      <div
        className="tooltip-box"
        style={{
          top: placeAbove
          ? targetPos.top - tooltipHeight - 10 + tooltipOffsetHeight
          : targetPos.top + targetPos.height + 10 + tooltipOffsetHeight,
          left: targetPos.left + tooltipOffsetWidth,
        }}
      >
        <h3 className="font-bold mb-2">{step.title}</h3>
        <p className="mb-2">{step.description}</p>
        <button className="font-bold text-blue-800" onClick={handleNext}>
          Suivant
        </button>
      </div>
    </>
  );
}
