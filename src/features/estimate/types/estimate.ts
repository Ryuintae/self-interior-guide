export type EstimateSpaceType = "원룸" | "침실" | "거실" | "주방";
export type EstimateScopeType = "가구만" | "부분 시공" | "전체 시공";
export type StyleTone = "미니멀" | "내추럴" | "모던" | "웜톤";
export type BudgetLevel = "가성비" | "밸런스" | "프리미엄";

export type EstimateItemKey =
    | "wall"
    | "floor"
    | "lighting"
    | "furniture"
    | "storage"
    | "fabric";

export type EstimateItem = {
    key: EstimateItemKey;
    label: string;
    description: string;
};

export type EstimateConfig = {
    baseMin: number;
    baseMax: number;
    itemAdjustments: Partial<Record<EstimateItemKey, { min: number; max: number }>>;
};

export type EstimateResult = {
    min: number;
    max: number;
    comment: string;
};