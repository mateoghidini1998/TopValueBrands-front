"use client";
import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState("");

  // Función para actualizar el texto mostrado
  const updateText = (index: number) => {
    setDisplayedText((prev) => prev + (text[index] || ""));
  };

  // Función para inicializar el intervalo de la animación
  const startTypewriterEffect = () => {
    let index = 0;
    const interval = setInterval(() => {
      updateText(index);
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 25); // Ajusta la velocidad de la escritura aquí

    return interval;
  };

  useEffect(() => {
    setDisplayedText(""); // Resetea el texto mostrado al cambiar el texto de entrada
    const interval = startTypewriterEffect();

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente o cambiar el texto
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <h1 className={className}>{displayedText}</h1>;
};

export default TypewriterText;
