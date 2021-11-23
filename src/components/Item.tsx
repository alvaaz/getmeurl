import styled from "styled-components";

type ItemProps = {
  progress?: any;
  fileName: string;
  size: number;
  file: File | null;
  url: string | null;
};

const Container = styled.li`
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  &:last-child {
    border-bottom: none;
    padding-bottom: 0rem;
    margin-bottom: 0rem;
  }
`;

const Main = styled.figure`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  width: 100%;
`;

const Img = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  margin-right: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border-radius: 0.25rem;
`;

const Text = styled.figcaption`
  flex-grow: 1;
`;

const FileName = styled.p`
  line-height: 1.5rem;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 200px;
`;

const Progress = styled.div`
  position: relative;
  height: 2rem;
  width: 2rem;
`;

const Copy = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition-duration: 0.15s;
  &:hover {
    background-color: rgba(243, 244, 246, 1);
  }
`;

export function Item({ progress = 0, fileName, size, file, url }: ItemProps) {
  return (
    <Container>
      <Main>
        <Img src={file ? URL.createObjectURL(file) : ""} alt="" />
        <Text>
          <FileName>{fileName}</FileName>
          <small className="text-sm font-medium text-gray-500">{size} b</small>
        </Text>
        {url && (
          <Copy onClick={() => navigator.clipboard.writeText(url)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </Copy>
        )}
        {!url && (
          <Progress>
            <div className="absolute w-full h-full bg-green-100 rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 64 64"
                className="absolute inset-0 w-full h-full text-green-400"
                transform="rotate(90) scale(1 -1)"
              >
                <path
                  d="M6,32a26,26 0 1,0 52,0a26,26 0 1,0 -52,0"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeDasharray={`${
                    163.38558959960938 * progress
                  }px 163.38558959960938px`}
                  strokeWidth="10"
                  strokeDashoffset="0px"
                ></path>
              </svg>
              <div className="relative bg-white rounded-full w-5 h-5 shadow-sm"></div>
              {/* <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
              <path
                d="M22.668 33.333l5.333 5.334 13.334-13.334"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dasharray="26.399829864501953px 20.399829864501953px"
                opacity="1"
                stroke-dashoffset="0px"
              ></path>
            </svg> */}
            </div>
          </Progress>
        )}
      </Main>
    </Container>
  );
}
