export type Image = {
  name: string | null;
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
  onDragging?: (st: boolean) => void;
};

export type ItemProps = {
  percent?: any;
  fileName: string;
  size: string;
  file: File | null;
  url: string | null;
  loading?: boolean;
};
