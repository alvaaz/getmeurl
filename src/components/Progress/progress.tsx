import { Container, Circle, Background, Trail } from "./style";

export const Progress = ({ percent }: { percent: number }) => (
  <Container>
    <Trail>
      <Circle viewBox="0 0 64 64" transform="rotate(90) scale(1 -1)">
        <path
          d="M6,32a26,26 0 1,0 52,0a26,26 0 1,0 -52,0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={`${
            163.38558959960938 * percent
          }px 163.38558959960938px`}
          strokeWidth="10"
          strokeDashoffset="0px"
        ></path>
      </Circle>
      <Background />
      {percent === 1 && (
        <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
          <path
            d="M22.668 33.333l5.333 5.334 13.334-13.334"
            fill="none"
            stroke="#22C55E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="26.399829864501953px 20.399829864501953px"
            opacity="1"
            strokeDashoffset="0px"
          ></path>
        </svg>
      )}
    </Trail>
  </Container>
);
