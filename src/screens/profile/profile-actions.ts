import { profileApi } from "./api/ProfileApi";

export const addData = async (profileData: Profile) => {
  const { data } = await profileApi.addData(profileData);
  return data;
};
