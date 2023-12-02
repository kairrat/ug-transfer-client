import { createEvent, createStore } from "effector";
import { Profile } from "../../../types/profile";

interface ProfileState {
  data: Profile;
}

export const setProfileData = createEvent<Profile>();

export const $profile = createStore<ProfileState>({
  data: {},
}).on(setProfileData, (state, data) => {
  return { ...state, data: data };
});
