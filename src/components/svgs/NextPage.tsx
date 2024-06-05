import useThemeContext from '@/contexts/theme.context';
import React from 'react'

type NextPageProps = {
  disabled: boolean;
}

export default function NextPage({ disabled }: NextPageProps) {

  const { theme } = useThemeContext();

  const color = theme === "dark" ? "white" : "#858EAD";
  const disabledColor = theme === "dark" ? "#393E4F" : "#D4D4D8";


  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Expand_down_light">
    <path id="Vector 9" d="M9 6L15 12L9 18" stroke={disabled ? disabledColor : color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    </svg>
  )
}
