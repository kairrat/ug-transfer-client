import { profileApi } from "../api/ProfileApi";

export const getProfile = async () => {
    const { data } = await profileApi.getProfile();
    return data;
}

export const updateProfile = async (updateData) => {
    const { data } = await profileApi.updateProfile(updateData);
    return data;
}