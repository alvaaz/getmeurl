import { useState, DragEvent, useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { Item } from "..";
import { ImageIcon, ArrowIcon } from "../Icons";
import { Container, List, Place, UploadIcon, Placeholder, Hint } from "./style";
import { formatFileSize } from "../../lib";
import { Image } from "../../types";
import { useModal } from "../Modal/context";

export function FilesDragAndDrop() {
  const [counter, setCounter] = useState(0);
  const [dropped, setDropped] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [validFiles, setValidFiles] = useState<Image[]>([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState<File[]>([]);
  const { setModalContent } = useModal();

  const handleUpload = (files: Image[] | null) => {
    if (files) {
      files.forEach((image, index) => {
        const storageRef = ref(storage, `/images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image.file as File);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              snapshot.bytesTransferred / snapshot.totalBytes
            );

            files[index].progress = prog;
            setValidFiles([...files]);
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              files[index].url = downloadURL;
              setValidFiles([...files]);
            });
          }
        );
      });
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length) {
      handleFiles(files);
    }

    setCounter(0);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCounter((prev) => prev + 1);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCounter((prev) => prev - 1);
  };

  const fileSelected = (e: any) => {
    handleChange(e);
  };

  // Handle for add new images from select local files to the list
  const handleChange = (e: any) => {
    handleFiles(Object.entries(e.target.files).map((file) => file[1] as File));
  };

  const validateFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  // Handle for add new images from drag and drop area to the list
  const handleFiles = (fileList: File[]) => {
    if (fileList.length) {
      for (let i = 0; i < fileList.length; i++) {
        if (validateFile(fileList[i])) {
          setFiles((prev) => [...prev, fileList[i]]);
        } else {
          setUnsupportedFiles((prev) => [...prev, fileList[i]]);
        }
      }
    } else {
      console.log("No files selected");
    }
  };

  // useEffect to detect unsupported files and render in modal
  useEffect(() => {
    // Detect if there are unsupported files
    if (unsupportedFiles.length > 0) {
      setModalContent({
        content: unsupportedFiles.map((file) => (
          <Item
            fileName={file.name}
            size={formatFileSize(file.size, 2)}
            file={file}
            loading={false}
            url=""
          />
        )),
        onOk: () => setUnsupportedFiles([]),
      });
      // we are sending onOk fallback function that will remove all unsopportedFiles from the list
    } else {
      setModalContent({ content: null, onOk: () => {} });
    }
  }, [setModalContent, unsupportedFiles]);

  // useEffect to detect when files has been added to the list to hide the placeholder
  useEffect(() => {
    // detect duplicates
    let filteredArr = files.reduce((acc: Image[], current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([
          {
            name: current.name,
            progress: 0,
            url: null,
            file: current,
          },
        ]);
      } else {
        return acc;
      }
    }, []);
    handleUpload(filteredArr);
    setValidFiles([...filteredArr]);

    if (files.length > 0) {
      setDropped(true);
    }
  }, [files]);

  return (
    <Container
      onOver={counter}
      dropped={dropped}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      draggable={true}
    >
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
              onChange={fileSelected}
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
      <List>
        {validFiles &&
          [...validFiles].map((image, index) => (
            <Item
              key={index}
              loading={true}
              percent={image.progress}
              fileName={image.file!.name}
              size={formatFileSize(image.file!.size, 2)}
              file={image.file!}
              url={image.url}
            />
          ))}
      </List>
    </Container>
  );
}
