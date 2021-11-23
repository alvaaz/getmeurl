import { State, IActions } from "../types";

export const initialState: State = {
  images: null,
};

export const actions: IActions = {
  uploadingImages: "UPLOADING_IMAGES",
  setProgress: "SET_PROGRESS",
  setURL: "SET_URL",
};


export function reducer(state: State, action: any) {
  switch (action.type) {
    case actions.uploadingImages: {
      return {
        ...state,
        images: state.images
          ? [...state.images, action.payload]
          : [action.payload],
      };
    }
    case actions.setProgress: {
      return {
        ...state,
        images: state.images
          ? state.images.map((image) => {
              if (image.id === action.payload.id) {
                return {
                  ...image,
                  progress: action.payload.progress,
                };
              }
              return image;
            })
          : null,
      };
    }
    case actions.setURL: {
      return {
        ...state,
        images: state.images
          ? state.images.map((image) => {
              if (image.id === action.payload.id) {
                return {
                  ...image,
                  url: action.payload.url,
                };
              }
              return image;
            })
          : null,
      };
    }

    default:
      return state;
  }
}
