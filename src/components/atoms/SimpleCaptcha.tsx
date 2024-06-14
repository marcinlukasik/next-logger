"use client";

import { useEffect, useRef } from "react";

export const SimpleCaptcha = ({
  duration = 30000,
  onTextChange,
}: {
  duration?: number;
  onTextChange: (value: string) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runCaptcha = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const generatedNumbers = generateNumbers();
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(generatedNumbers, 50, 20);

    onTextChange(generatedNumbers);
  };

  useEffect(() => {
    runCaptcha();

    let timer = setTimeout(function timerFunc() {
      runCaptcha();
      timer = setTimeout(timerFunc, duration);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <canvas
        className="mx-auto"
        id="simple-captcha-canvas"
        ref={canvasRef}
        width="100"
        height="30"
      ></canvas>
    </div>
  );
};

const generateNumbers = (): string => {
  let numbers = "";
  for (let i = 0; i < 6; i++) {
    numbers += Math.floor(Math.random() * 10);
  }
  return numbers;
};
