import { create } from 'zustand';
import { RefObject } from 'react';

interface ScrollRefStore {
  wrapperRef: RefObject<HTMLElement | null> | null;
  setWrapperRef: (ref: RefObject<HTMLElement | null> | null) => void;
  resetWrapperRef: () => void;
}

export const useScrollRefStore = create<ScrollRefStore>((set) => ({
  wrapperRef: null,
  setWrapperRef: (ref) => set({ wrapperRef: ref }),
  resetWrapperRef: () => set({ wrapperRef: null }),
}));
