import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export function InteractiveGrid() {
  const mouseX = useMotionValue(-1000); // Start far offscreen
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 40, stiffness: 100, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.pageX);
      mouseY.set(e.pageY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Dynamic radial gradient acting as a mask for the glowing grid lines
  const gridHighlightMask = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(220px circle at ${x}px ${y}px, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 80%)`
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" id="interactive-grid-container">
      {/* Base Grid Lines (Subtle & Dark) */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "linear-gradient(#1D1D1D 1px, transparent 1px), linear-gradient(90deg, #1D1D1D 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Highly Interactive Glowing Blue Grid Lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(16, 114, 251, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 114, 251, 0.35) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: gridHighlightMask,
          WebkitMaskImage: gridHighlightMask,
        }}
      />
    </div>
  );
}
