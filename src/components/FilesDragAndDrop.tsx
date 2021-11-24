import { useRef, useEffect, useState } from "react";
import { FilesDragAndDropProps } from "../types";
import styled from "styled-components";
import { Item } from "./";
import { ImageIcon, ArrowIcon } from "./Icons";

const Container = styled.div<{ onOver: number; dropped: boolean }>`
  display: flex;
  justify-content: center;
  ${({ onOver, dropped }) => {
    if (onOver) {
      return `
        border-width: 2px;
        border-color: rgba(79, 70, 229);
        border-style: dashed;
      `;
    }
    if (dropped) {
      return `
        border-width: 1px;
        border-color: #e0e0e0;
      `;
    }
    return `
      border-width: 2px;
      border-color: #e0e0e0;
      border-style: dashed;
    `;
  }}

  transition: border-color 0.4s ease;
  border-radius: 0.375rem;
  width: 20rem;
  height: 20rem;
  position: relative;
`;

const List = styled.ul<{ dropped: boolean }>`
  width: 100%;
  padding-top: 0.5rem;
  li {
    margin-bottom: 0.75rem;
    animation-name: fadeIn;
    animation-duration: 0.3s;
    animation-fill-mode: backwards;
    transition: opacity 0.4s ease, transform 0.4s ease;
    &:nth-child(1) {
      animation-delay: 0.24s;
    }
    &:nth-child(2) {
      animation-delay: 0.32s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
    &:nth-child(4) {
      animation-delay: 0.48s;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }
`;

const Place = styled.div<{ dropped: boolean; onOver: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: ${({ onOver, dropped }) => {
    if (dropped) {
      return "translate(-50%, -100%)";
    }
    if (onOver) {
      return "translate(-50%, -50%)";
    }
    return "translate(-50%, 0%)";
  }}}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: ${({ onOver }) => onOver - 1};
  opacity: ${({ onOver }) => onOver};
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

const UploadIcon = styled.div`
  & > div {
    position: relative;
    width: 48px;
    height: 48px;
    background-color: rgba(79, 70, 229);
    border-radius: 50%;
    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
  }
`;

const Placeholder = styled.div<{ onOver: number; dropped: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  text-align: center;
  z-index: ${({ dropped }) => (dropped ? -1 : 0)};
  transform: ${({ onOver, dropped }) => {
    if (dropped || onOver) {
      return "translate(-50%, -100%)";
    }
    return "translate(-50%, -50%)";
  }}}

  opacity: ${({ onOver, dropped }) => {
    if (onOver || dropped) {
      return 0;
    }
    return 1;
  }}}

  transition: opacity 0.4s ease, transform 0.4s ease;
`;

const Hint = styled.div`
  color: gray;
  font-size: 14px;
  line-height: 23px;
  text-align: center;
  width: 100%;
  pointer-events: none;
  min-width: max-content;
`;

export function FilesDragAndDrop({
  onUpload,
  onDrop,
  files,
  onChange,
}: FilesDragAndDropProps) {
  const drop = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    if (drop.current) {
      drop.current.addEventListener("dragover", handleDragOver);
      drop.current.addEventListener("drop", handleDrop);
      drop.current.addEventListener("dragenter", handleDragEnter);
      drop.current.addEventListener("dragleave", handleDragLeave);

      let currentDrag = drop.current;
      return () => {
        if (currentDrag) {
          currentDrag.removeEventListener("dragover", handleDragOver);
          currentDrag.removeEventListener("drop", handleDrop);
          currentDrag.removeEventListener("dragenter", handleDragEnter);
          currentDrag.removeEventListener("dragleave", handleDragLeave);
        }
      };
    }
  });

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  function handleDrop(e: any) {
    e.preventDefault();
    const files = e.dataTransfer ? [...e.dataTransfer.files] : [];
    onDrop && onDrop(files);
    onUpload && onUpload(files);
    setCounter(0);

    setDropped(true);
  }

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setCounter((prev) => prev + 1);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setCounter((prev) => prev - 1);
  };

  return (
    <>
      <Container ref={drop} onOver={counter} dropped={dropped}>
        <Placeholder onOver={counter} dropped={dropped}>
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600 justify-center">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/gif, image/jpeg, image/png"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setDropped(true);
                  }
                  onChange(e);
                }}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </Placeholder>
        <Place onOver={counter} dropped={dropped}>
          <UploadIcon>
            <div>
              <ArrowIcon />
            </div>
          </UploadIcon>
          <Hint>Drop your files to upload</Hint>
        </Place>
        <List dropped={dropped}>
          {files &&
            [...files].map((image, index) => (
              <Item
                key={index}
                progress={image.progress}
                fileName={image.file!.name}
                size={image.file!.size}
                file={image.file!}
                url={image.url}
              />
            ))}
        </List>
      </Container>
    </>
  );
}
