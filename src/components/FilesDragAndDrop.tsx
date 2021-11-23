import { useRef, useEffect, useState } from "react";
import { Image } from "../types";
import styled from "styled-components";
import { Item } from "./";

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

type FilesDragAndDropProps = {
  onUpload?: (files: Image[]) => void;
  formats?: string[];
  onDrop?: (files: File[]) => void;
  onDragging?: (st: boolean) => void;
  files?: Image[];
  onChange: any;
};

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
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
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
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.2319,10.6401 C5.5859,11.0641 6.2159,11.1221 6.6399,10.7681 L10.9999,7.1351 L10.9999,19.0001 C10.9999,19.5521 11.4479,20.0001 11.9999,20.0001 C12.5519,20.0001 12.9999,19.5521 12.9999,19.0001 L12.9999,7.1351 L17.3599,10.7681 C17.7849,11.1221 18.4149,11.0641 18.7679,10.6401 C19.1219,10.2161 19.0649,9.5851 18.6399,9.2321 L12.6399,4.2321 C12.5929,4.1921 12.5369,4.1731 12.4849,4.1431 C12.4439,4.1191 12.4079,4.0911 12.3629,4.0731 C12.2459,4.0271 12.1239,4.0001 11.9999,4.0001 C11.8759,4.0001 11.7539,4.0271 11.6369,4.0731 C11.5919,4.0911 11.5559,4.1191 11.5149,4.1431 C11.4629,4.1731 11.4069,4.1921 11.3599,4.2321 L5.3599,9.2321 C4.9359,9.5851 4.8779,10.2161 5.2319,10.6401"></path>
              </svg>
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
