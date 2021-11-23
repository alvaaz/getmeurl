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
