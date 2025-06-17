import { create } from 'zustand';

interface RedirectState {
  redirectUrl: string;
  setRedirectUrl: (url: string) => void;
}

export const useRedirectStore = create<RedirectState>((set) => ({
  redirectUrl: "/",
  setRedirectUrl: (url) => set({ redirectUrl: url }),
}));

export const selectRedirectUrl = (state: RedirectState) => state.redirectUrl;
