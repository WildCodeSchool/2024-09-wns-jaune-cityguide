import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TutorialOverlay.css";

type Step = {
  selector: string;
  title: string;
  description: string;
  tooltipOffsetHeight?: number;
  tooltipOffsetWidth?: number;
  leftAdjustment?: number;
  action?: () => void;
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

export default function TutorialOverlay({
  steps,
  onClose,
}: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetPos, setTargetPos] = useState<Position | null>(null);
  const navigate = useNavigate();
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const step = steps[currentStep];

  useEffect(() => {
    const tryFindElement = () => {
      const el = document.querySelector(step.selector) as HTMLElement;
      const scrollContainer = document.querySelector(
        ".tutorial-container"
      ) as HTMLElement;

      if (el && scrollContainer) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });

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

  useEffect(() => {
    if (targetPos && nextButtonRef.current) {
      setTimeout(() => {
        nextButtonRef.current?.focus();
      }, 100);
    }
  }, [targetPos, currentStep]);

  const handleNext = () => {
    const current = steps[currentStep];
    if (current.action) {
      current.action();
    }

    if (currentStep + 1 < steps.length) {
      setCurrentStep(currentStep + 1);
      setTargetPos(null);
    } else {
      onClose();
      navigate("/inscription");
    }
  };

  if (!targetPos) return <div className="tutorial-overlay" />;

  const tooltipHeight = 140;
  const placeAbove =
    window.innerHeight - (targetPos.top - window.scrollY) < tooltipHeight;
  const tooltipOffsetHeight = step.tooltipOffsetHeight ?? 0;
  const tooltipOffsetWidth = step.tooltipOffsetWidth ?? 0;
  const leftAdjustment = step.leftAdjustment ?? 0;

  return (
    <>
      <div className="tutorial-overlay" />

      <div
        className="highlight-box"
        style={{
          top: `${targetPos.top}px`,
          left: `${targetPos.left - leftAdjustment}px`,
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
        <button
          ref={nextButtonRef}
          className="font-bold custom-purple tutorial-next-button"
          onClick={handleNext}
        >
          Suivant
        </button>
      </div>
    </>
  );
}
