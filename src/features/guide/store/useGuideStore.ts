import { create } from "zustand";
import type {
    ConcernType,
    ExperienceLevel,
    GuideScenarioKey,
    LivingStatus,
    ScopeType,
    SpaceType,
    StepStatus,
} from "../types/guide";

type GuideState = {
    spaceType: SpaceType | null;
    scope: ScopeType | null;

    livingStatus: LivingStatus | null;
    concern: ConcernType | null;
    experienceLevel: ExperienceLevel | null;

    stepStatusByScenario: Record<string, Record<string, StepStatus>>;

    setSpaceType: (spaceType: SpaceType) => void;
    setScope: (scope: ScopeType) => void;
    setLivingStatus: (livingStatus: LivingStatus) => void;
    setConcern: (concern: ConcernType) => void;
    setExperienceLevel: (experienceLevel: ExperienceLevel) => void;

    getScenarioKey: () => GuideScenarioKey | null;
    getStepStatuses: () => Record<string, StepStatus>;
    setStepStatus: (stepId: string, status: StepStatus) => void;

    resetCurrentScenarioProgress: () => void;
    resetGuide: () => void;
};

export const useGuideStore = create<GuideState>((set, get) => ({
    spaceType: null,
    scope: null,

    livingStatus: null,
    concern: null,
    experienceLevel: null,

    stepStatusByScenario: {},

    setSpaceType: (spaceType) => set({ spaceType }),
    setScope: (scope) => set({ scope }),
    setLivingStatus: (livingStatus) => set({ livingStatus }),
    setConcern: (concern) => set({ concern }),
    setExperienceLevel: (experienceLevel) => set({ experienceLevel }),

    getScenarioKey: () => {
        const { spaceType, scope } = get();
        if (!spaceType || !scope) return null;
        return `${spaceType}-${scope}`;
    },

    getStepStatuses: () => {
        const key = get().getScenarioKey();
        if (!key) return {};
        return get().stepStatusByScenario[key] ?? {};
    },

    setStepStatus: (stepId, status) =>
        set((state) => {
            if (!state.spaceType || !state.scope) return state;

            const key = `${state.spaceType}-${state.scope}`;
            const currentScenario = state.stepStatusByScenario[key] ?? {};

            return {
                stepStatusByScenario: {
                    ...state.stepStatusByScenario,
                    [key]: {
                        ...currentScenario,
                        [stepId]: status,
                    },
                },
            };
        }),

    resetCurrentScenarioProgress: () =>
        set((state) => {
            if (!state.spaceType || !state.scope) return state;

            const key = `${state.spaceType}-${state.scope}`;

            return {
                stepStatusByScenario: {
                    ...state.stepStatusByScenario,
                    [key]: {},
                },
            };
        }),

    resetGuide: () =>
        set({
            spaceType: null,
            scope: null,
            livingStatus: null,
            concern: null,
            experienceLevel: null,
        }),
}));