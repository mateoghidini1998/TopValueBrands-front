import React from 'react'

type DotsSVGProps = {
  stroke: string
}

export default function DotsSVG({stroke}: DotsSVGProps) {
  return (
    <svg width="25" height="26" viewBox="0 0 25 26" fill={'none'} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12.5002" cy="13.344" r="1.04167" transform="rotate(-90 12.5002 13.344)" stroke={stroke} strokeWidth="2.08333" strokeLinecap="round"/>
    <circle cx="12.5002" cy="19.594" r="1.04167" transform="rotate(-90 12.5002 19.594)" stroke={stroke} strokeWidth="2.08333" strokeLinecap="round"/>
    <circle cx="12.5002" cy="7.09401" r="1.04167" transform="rotate(-90 12.5002 7.09401)" stroke={stroke} strokeWidth="2.08333" strokeLinecap="round"/>
    </svg>

  )
}
