import { profileApi } from "./api/ProfileApi";
import { Profile } from "../../types/profile";

export const addData = async (profileData: Profile) => {
  const { data } = await profileApi.addData(profileData);
  return data;
};
