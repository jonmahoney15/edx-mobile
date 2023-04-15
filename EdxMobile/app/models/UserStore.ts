import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { User, emptyUser } from './User';

export const UserStoreModel = types
  .model("UserStore")
  .props({
    username: "",
    country: "",
    language: "",
    date_joined: "",
    profile_image: "",
    level_of_education: "",
    name: "",
    email: "",
  })
  .actions((store) => ({
    setUserUsername(value?: string) {
      store.username = value
    },
    setUserCountry(value?: string) {
      store.country = value
    },
    setUserLanguage(value?: string) {
      store.language = value
    },
    setUserDateJoined(value?: string) {
      store.date_joined = value
    },
    setUserProfileImage(value?: string) {
      store.profile_image = value
    },
    setUserEducation(value?: string) {
      store.level_of_education = value
    },
    setUserFullName(value?: string) {
      store.name = value
    },
    setUserEmail(value?: string) {
      store.email = value
    }
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}