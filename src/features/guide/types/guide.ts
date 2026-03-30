export type SpaceType = "원룸" | "침실" | "거실" | "주방";
export type ScopeType = "가구만" | "부분 시공" | "전체 시공";

export type GuideStep = {
    id: string;
    title: string;
    description: string;
    checklist: string[];
};

export type GuideRecommendationKey = `${SpaceType}-${ScopeType}`;