"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SpotlightCard({ children, className = "", variants, href }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Dynamically switch between custom Link or div wrapper
  if (href) {
    // Wrap custom link with motion capabilities
    const MotionLink = motion(Link);
    return (
      <MotionLink
        href={href}
        variants={variants}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden group transition-all duration-300 border border-neutral-800/80 ${className}`}
      >
        {/* Background radial spotlight glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(222, 219, 200, 0.08), transparent 80%)`,
          }}
        />
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group transition-all duration-300 border border-neutral-800/80 ${className}`}
    >
      {/* Background radial spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(222, 219, 200, 0.08), transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
