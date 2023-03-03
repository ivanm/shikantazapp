import { atom, type RecoilState } from "recoil";

export const greetingToggleState: RecoilState<boolean> = atom<boolean>(
  {
    key: "greetingToggle",
    default: false,
  }
);
