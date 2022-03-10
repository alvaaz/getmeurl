import React from "react";
import { Container, Inner, Arrow } from "./style";

export const Tooltip = ({ children }: { children: React.ReactNode }) => (
  <Container>
    <Inner>
      <Arrow
        aria-hidden="true"
        width="16"
        height="6"
        viewBox="0 0 16 6"
        className="-mt-px -ml-2"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
          fill="currentColor"
        ></path>
      </Arrow>
      {children}
    </Inner>
  </Container>
);
