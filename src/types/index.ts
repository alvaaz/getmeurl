export type Image = {
  id: string | null;
  progress: number;
  file: File | null;
  url: string | null;
};

export interface State {
  images: Image[] | null;
}

export interface IActions {
  uploadingImages: string;
  setProgress: string;
  setURL: string;
}

export type FilesDragAndDropProps = {
  onUpload?: (files: Image[]) => void;
  formats?: string[];
  onDrop?: (files: File[]) => void;
  onDragging?: (st: boolean) => void;
  files?: Image[];
  onChange: any;
};
