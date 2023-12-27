import { createEvent, createStore } from "effector";
import { Profile } from "../../../types/profile";
import { ISettings } from 'src/features/profile';

interface ProfileState {
  data: Profile;
  settings: ISettings | null;
}

const initialState = {
  data: {},
  settings: null
}

export const setProfileData = createEvent<Profile>();
export const setSettings = createEvent<ISettings>();

export const $profile = createStore<ProfileState>(initialState)
  .on(setProfileData, (state, data) => {
    return { ...state, data: data };
  })
  .on(setSettings, (state, settings) => ({...state, settings}))
