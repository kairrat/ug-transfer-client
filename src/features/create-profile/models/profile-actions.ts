import { profileApi } from "../api/ProfileApi";
import { Profile } from "../../../types/profile";
import axios from "axios";

export const addData = async (profileData: Profile) => {
  try {
    const { data } = await profileApi.addData(profileData)
    return data;
  } catch (err) {
    console.error('Failed to update profile', err);
  }
};

export const getProfile = async () => {
  try {
    const { data } = await profileApi.getProfile();
    return data;
  } catch (err) {
    console.error('Failed to get profile', err);
  }
}

export const uploadProfileImages = async (uploadData) => {
  try {
    const { data, status, statusText } = await profileApi.uploadImages(uploadData);
    return data;
  } catch (err) {
    console.error('Failed to upload image', err);
  }
}