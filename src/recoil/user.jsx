import { atom } from 'recoil';

export const UserState = atom({
  key: 'UserState',
  default:localStorage.getItem("User")?localStorage.getItem("User"):'',
});