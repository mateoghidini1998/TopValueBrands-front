import React from 'react'

type PrevPageProps = {
  disabled: boolean;
}

export default function PrevPage({ disabled }: PrevPageProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke={disabled ? "#393E4F" : "white"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  )
}
