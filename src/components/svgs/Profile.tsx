
type Props = {
    fill: string
}

export default function Globe({ fill }: Props) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Profile">
        <path id="Vector" d="M5.64203 7.22109C6.33677 7.72639 7.15782 8 8.00004 8C8.84207 8 9.66312 7.72627 10.3579 7.22109C11.3895 6.48417 12 5.26311 12 4.00002C12 1.78944 10.2105 0 8 0C5.78944 0 4 1.78956 4 4.00002C3.99985 5.26311 4.61045 6.48417 5.64195 7.22109H5.64203Z" fill={fill}/>
        <path id="Vector_2" d="M15.9046 14.2049C15.8473 13.8927 15.7901 13.5804 15.6946 13.2878C15.0264 10.9658 13.3847 9.09269 11.2276 8.11707C11.094 8.25373 10.9414 8.39024 10.7695 8.50729C10.006 9.07307 9.12778 9.36586 8.19233 9.36586C7.25688 9.36586 6.35967 9.07323 5.61518 8.50729C5.40519 8.35117 5.21424 8.17559 5.04247 8C2.16 9.17081 0.15557 12 0.0028546 15.2195C-0.0160538 15.4146 0.0602456 15.6098 0.193936 15.7659C0.327627 15.922 0.537478 16 0.728441 16H15.2555C15.4655 16 15.6565 15.922 15.79 15.7659C15.9237 15.6098 16 15.4147 16 15.2001C16 15.1025 16 15.0049 15.981 14.9269C15.9808 14.6927 15.9427 14.439 15.9045 14.2049L15.9046 14.2049Z" fill={fill}/>
        </g>
        </svg>
    )
  }
  