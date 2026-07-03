"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  alt = "Comparação antes e depois",
}: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg select-none cursor-ew-resize aspect-[4/3] bg-muted"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      role="slider"
      aria-label="Comparação antes e depois"
      aria-valuenow={Math.round(sliderPosition)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(100, p + 2));
      }}
    >
      {/* Before image (base layer, full size) */}
      <img
        src={beforeImage}
        alt={`${alt} — antes`}
        className="absolute inset-0 w-full h-full object-cover"
        width={1200}
        height={900}
        decoding="async"
      />

      {/* After image (same size/crop as before, revealed via clip-path) */}
      <img
        src={afterImage}
        alt={`${alt} — depois`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        width={1200}
        height={900}
        decoding="async"
      />

      {/* Labels */}
      <div
        className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-sm text-xs font-medium text-white transition-opacity duration-200"
        style={{ opacity: sliderPosition > 20 ? 1 : 0 }}
      >
        Antes
      </div>
      <div
        className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-white/80 backdrop-blur-sm text-xs font-medium text-neutral-800 transition-opacity duration-200"
        style={{ opacity: sliderPosition < 80 ? 1 : 0 }}
      >
        Depois
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-shadow duration-150"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center border border-neutral-200">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-neutral-700"
          >
            <path d="M6 4L2 8L6 12" />
            <path d="M10 4L14 8L10 12" />
          </svg>
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-colors duration-150 ${
          isDragging ? "bg-black/5" : ""
        }`}
      />
    </div>
  );
}
