import { create } from "zustand";
import type { ScopeType, SpaceType } from "../types/guide";

type GuideState = {
    spaceType: SpaceType | null;
    scope: ScopeType | null;
    setSpaceType: (spaceType: SpaceType) => void;
    setScope: (scope: ScopeType) => void;
    resetGuide: () => void;
};

export const useGuideStore = create<GuideState>((set) => ({
    spaceType: null,
    scope: null,
    setSpaceType: (spaceType) => set({ spaceType }),
    setScope: (scope) => set({ scope }),
    resetGuide: () =>
        set({
            spaceType: null,
            scope: null,
        }),
}));