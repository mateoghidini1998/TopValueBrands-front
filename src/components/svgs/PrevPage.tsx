import useThemeContext from '@/contexts/theme.context';
import React from 'react'

type PrevPageProps = {
  disabled: boolean;
}


export default function PrevPage({ disabled }: PrevPageProps) {
  const { theme } = useThemeContext();

  const color = theme === "dark" ? "white" : "#858EAD";
  const disabledColor = theme === "dark" ? "#393E4F" : "#D4D4D8";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke={disabled ? disabledColor : color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  )
}
