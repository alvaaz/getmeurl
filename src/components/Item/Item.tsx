import { ItemProps } from "../../types";
import { Container, Main, Copy, Text, Img, FileName } from "./style";
import { Link } from "../Icons/";
import { useState } from "react";
import { Tooltip, Progress } from "../";

export function Item({
  percent = 0,
  fileName,
  size,
  file,
  url,
  loading,
}: ItemProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Main>
        <Img src={file ? URL.createObjectURL(file) : ""} alt="" />
        <Text>
          <FileName>{fileName}</FileName>
          <small className="text-sm font-medium text-gray-500">{size}</small>
        </Text>
        {url && (
          <Copy onClick={() => handleClick(url)}>
            {copied && <Tooltip>Copied!</Tooltip>}
            <Link />
          </Copy>
        )}
        {!url && loading && <Progress percent={percent} />}
      </Main>
    </Container>
  );
}
