import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

// public API
export const uploadImage = async (image) => {
  try {
    const response = await axios.post(
      API_URL + "/image",
      {
        image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
