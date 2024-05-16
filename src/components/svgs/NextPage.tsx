import React from 'react'

type NextPageProps = {
  disabled: boolean;
}

export default function NextPage({ disabled }: NextPageProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Expand_down_light">
    <path id="Vector 9" d="M9 6L15 12L9 18" stroke={disabled ? "#393E4F" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    </svg>
  )
}
