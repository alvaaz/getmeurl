import { useCallback, useEffect, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { FilesDragAndDrop } from "./components";
import { Image } from "./types";

function App() {
  const [files, setFiles] = useState<Image[]>([]);

  const handleUpload = (files: Image[] | null) => {
    if (files) {
      files.forEach((image, index) => {
        const storageRef = ref(storage, `/images/${image.file!.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image.file as File);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              snapshot.bytesTransferred / snapshot.totalBytes
            );

            files[index].progress = prog;
            setFiles([...files]);
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              files[index].url = downloadURL;
              setFiles([...files]);
            });
          }
        );
      });
    }
  };

  const onDrop = (fileList: File[]) => {
    if (fileList.length) {
      for (let i = 0; i < fileList.length; i++) {
        let newImage: Image = {
          id: null,
          file: null,
          progress: 0,
          url: null,
        };
        newImage.file = fileList[i];
        newImage.id = uuidv4();
        setFiles((prev) => {
          if (prev) {
            return [...prev, newImage];
          }
          return [newImage];
        });
      }
    } else {
      console.log("No files selected");
    }
  };

  return (
    <div className="bg-gray-100 h-screen w-screen items-center justify-center flex">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <FilesDragAndDrop
          onDrop={(files) => onDrop(files)}
          formats={["jpg", "png"]}
          files={files}
        />
      </div>
    </div>
  );
}

export default App;
