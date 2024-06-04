type Props = {
  color:string
};
export const DeleteButton = ({color}: Props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.91667 3.49996V11.6666C2.91667 11.976 3.03958 12.2728 3.25838 12.4916C3.47717 12.7104 3.77391 12.8333 4.08333 12.8333H9.91667C10.2261 12.8333 10.5228 12.7104 10.7416 12.4916C10.9604 12.2728 11.0833 11.976 11.0833 11.6666V3.49996H2.91667ZM2.91667 3.49996H1.75M2.91667 3.49996H12.25M4.66667 3.49996V2.33329C4.66667 2.02387 4.78958 1.72713 5.00838 1.50833C5.22717 1.28954 5.52391 1.16663 5.83333 1.16663H8.16667C8.47609 1.16663 8.77283 1.28954 8.99162 1.50833C9.21042 1.72713 9.33333 2.02387 9.33333 2.33329V3.49996"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
