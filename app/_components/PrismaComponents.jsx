"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/**
 * WordsPullUp splits text by spaces and animates each word upwards with a stagger.
 * Supports showAsterisk on the final "a" of the last word.
 */
export function WordsPullUp({ text, className = "", showAsterisk = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span
            key={i}
            className={`inline-block relative mr-[0.25em] last:mr-0 py-1 ${
              isLast && showAsterisk ? "" : "overflow-hidden"
            }`}
          >
            <motion.span
              variants={wordVariants}
              className="inline-block relative"
            >
              {word}
              {isLast && showAsterisk && (
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
              )}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

/**
 * WordsPullUpMultiStyle accepts an array of { text, className } segments.
 * It splits all of them into individual words while preserving the segment's style,
 * and animates them with a stagger pull-up transition.
 */
export function WordsPullUpMultiStyle({ segments, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const allWords = [];
  segments.forEach((segment) => {
    const words = segment.text.split(" ");
    words.forEach((word) => {
      if (word !== "") {
        allWords.push({
          text: word,
          className: segment.className,
        });
      }
    });
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {allWords.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 py-1">
          <motion.span
            variants={wordVariants}
            className={`inline-block ${word.className || ""}`}
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * ScrollRevealParagraph animates a body paragraph into view with a clean fade-up
 * transition when it enters the viewport, ensuring readability.
 */
export function ScrollRevealParagraph({ text, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }}
      className={className}
    >
      {text}
    </motion.p>
  );
}
