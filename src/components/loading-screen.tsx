"use client";

import { useState, useEffect } from "react";
import { personal } from "@/data";
import { introDone, markIntroDone } from "@/lib/intro-state";

export function LoadingScreen() {
  const [text, setText] = useState("");
  const [lifting, setLifting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Already played (bfcache restore) — skip immediately
    if (introDone) {
      window.dispatchEvent(new Event("intro-done"));
      setTimeout(() => setGone(true), 0);
      return;
    }

    let i = 0;
    const name = personal.loading;

    const typeId = setInterval(() => {
      i++;
      setText(name.slice(0, i));
      if (i >= name.length) {
        clearInterval(typeId);

        // Brief hold, then lift curtain + signal hero simultaneously
        setTimeout(() => {
          setLifting(true);
          markIntroDone();
          window.dispatchEvent(new Event("intro-done"));
          setTimeout(() => setGone(true), 750);
        }, 380);
      }
    }, 65);

    return () => clearInterval(typeId);
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        backgroundColor: "#07070f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: lifting ? "translateY(-100%)" : "translateY(0)",
        transition: lifting
          ? "transform 700ms cubic-bezier(0.7, 0, 0.3, 1)"
          : "none",
        pointerEvents: lifting ? "none" : "auto",
      }}
    >
      <span
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "#e4e4e7",
          letterSpacing: "-0.04em",
          fontFamily: "var(--font-roboto)",
        }}
      >
        {text}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "0.85em",
            backgroundColor: "#a1a1aa",
            marginLeft: "2px",
            verticalAlign: "middle",
            animation: "cursor-blink 1000ms ease-in-out infinite",
          }}
        />
      </span>
    </div>
  );
}
