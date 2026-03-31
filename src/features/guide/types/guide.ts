export type SpaceType = "원룸" | "침실" | "거실" | "주방";
export type ScopeType = "가구만" | "부분 시공" | "전체 시공";

export type LivingStatus = "현재 거주 중" | "비어 있는 공간";
export type ConcernType = "예산" | "순서" | "배치" | "자재 선택";
export type ExperienceLevel = "처음 해봐요" | "조금 해봤어요" | "꽤 익숙해요";

export type StepStatus =
    | "not-started"
    | "roughly-done"
    | "almost-done"
    | "done";

export type GuideStep = {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    whyItMatters: string;
    mistakes: string[];
    checklist: string[];
    tip?: string;
};

export type GuideScenario = {
    title: string;
    subtitle: string;
    summary: string;
    steps: GuideStep[];
};

export type GuideScenarioKey = `${SpaceType}-${ScopeType}`;