import type {
    BudgetLevel,
    EstimateConfig,
    EstimateItem,
    EstimateResult,
    EstimateScopeType,
    EstimateSpaceType,
    StyleTone,
    EstimateItemKey,
} from "../types/estimate";

export const estimateItems: EstimateItem[] = [
    {
        key: "wall",
        label: "벽면",
        description: "도배, 페인트, 포인트 벽 등",
    },
    {
        key: "floor",
        label: "바닥",
        description: "장판, 데코타일, 러그 중심 개선",
    },
    {
        key: "lighting",
        label: "조명",
        description: "메인등, 무드등, 간접조명",
    },
    {
        key: "furniture",
        label: "가구",
        description: "침대, 소파, 테이블, 수납장 등",
    },
    {
        key: "storage",
        label: "수납",
        description: "붙박이 제외 수납 구성 보강",
    },
    {
        key: "fabric",
        label: "패브릭",
        description: "커튼, 침구, 쿠션, 러그 등",
    },
];

const estimateMatrix: Record<
    `${EstimateSpaceType}-${EstimateScopeType}`,
    EstimateConfig
> = {
    "원룸-가구만": {
        baseMin: 80,
        baseMax: 180,
        itemAdjustments: {
            furniture: { min: 40, max: 100 },
            lighting: { min: 10, max: 30 },
            fabric: { min: 10, max: 20 },
            storage: { min: 20, max: 40 },
        },
    },
    "원룸-부분 시공": {
        baseMin: 150,
        baseMax: 320,
        itemAdjustments: {
            wall: { min: 25, max: 60 },
            floor: { min: 35, max: 80 },
            lighting: { min: 15, max: 40 },
            furniture: { min: 30, max: 80 },
        },
    },
    "원룸-전체 시공": {
        baseMin: 300,
        baseMax: 700,
        itemAdjustments: {
            wall: { min: 40, max: 100 },
            floor: { min: 50, max: 140 },
            lighting: { min: 20, max: 50 },
            furniture: { min: 40, max: 120 },
            storage: { min: 30, max: 80 },
        },
    },

    "침실-가구만": {
        baseMin: 70,
        baseMax: 160,
        itemAdjustments: {
            furniture: { min: 35, max: 90 },
            fabric: { min: 15, max: 35 },
            lighting: { min: 10, max: 25 },
            storage: { min: 20, max: 40 },
        },
    },
    "침실-부분 시공": {
        baseMin: 130,
        baseMax: 280,
        itemAdjustments: {
            wall: { min: 25, max: 55 },
            floor: { min: 30, max: 70 },
            lighting: { min: 15, max: 35 },
            furniture: { min: 20, max: 50 },
        },
    },
    "침실-전체 시공": {
        baseMin: 260,
        baseMax: 560,
        itemAdjustments: {
            wall: { min: 35, max: 90 },
            floor: { min: 45, max: 110 },
            lighting: { min: 20, max: 45 },
            furniture: { min: 40, max: 90 },
            fabric: { min: 20, max: 40 },
        },
    },

    "거실-가구만": {
        baseMin: 120,
        baseMax: 260,
        itemAdjustments: {
            furniture: { min: 50, max: 130 },
            lighting: { min: 20, max: 45 },
            fabric: { min: 15, max: 30 },
            storage: { min: 25, max: 50 },
        },
    },
    "거실-부분 시공": {
        baseMin: 220,
        baseMax: 480,
        itemAdjustments: {
            wall: { min: 35, max: 80 },
            floor: { min: 45, max: 100 },
            lighting: { min: 20, max: 50 },
            furniture: { min: 30, max: 70 },
            storage: { min: 20, max: 50 },
        },
    },
    "거실-전체 시공": {
        baseMin: 450,
        baseMax: 980,
        itemAdjustments: {
            wall: { min: 50, max: 120 },
            floor: { min: 70, max: 180 },
            lighting: { min: 30, max: 70 },
            furniture: { min: 60, max: 160 },
            storage: { min: 40, max: 100 },
        },
    },

    "주방-가구만": {
        baseMin: 90,
        baseMax: 220,
        itemAdjustments: {
            furniture: { min: 30, max: 80 },
            storage: { min: 25, max: 60 },
            lighting: { min: 10, max: 25 },
        },
    },
    "주방-부분 시공": {
        baseMin: 220,
        baseMax: 520,
        itemAdjustments: {
            wall: { min: 20, max: 50 },
            floor: { min: 35, max: 80 },
            lighting: { min: 15, max: 35 },
            storage: { min: 30, max: 70 },
            furniture: { min: 30, max: 60 },
        },
    },
    "주방-전체 시공": {
        baseMin: 500,
        baseMax: 1200,
        itemAdjustments: {
            wall: { min: 30, max: 70 },
            floor: { min: 50, max: 120 },
            lighting: { min: 20, max: 45 },
            storage: { min: 50, max: 120 },
            furniture: { min: 40, max: 90 },
        },
    },
};

const toneMultiplier: Record<StyleTone, number> = {
    미니멀: 1,
    내추럴: 1.05,
    모던: 1.1,
    웜톤: 1.03,
};

const budgetMultiplier: Record<BudgetLevel, number> = {
    가성비: 0.9,
    밸런스: 1,
    프리미엄: 1.2,
};

function getEstimateComment(
    scope: EstimateScopeType,
    selectedItems: EstimateItemKey[],
    budgetLevel: BudgetLevel
) {
    if (scope === "전체 시공") {
        return "전체 시공은 항목 간 연계가 커서 예산 여유분 10~15%를 별도로 잡아두는 게 안전해요.";
    }

    if (selectedItems.includes("furniture") && selectedItems.includes("lighting")) {
        return "가구와 조명을 같이 손보면 체감 변화가 커서 첫 단계 MVP 견적으로 적합해요.";
    }

    if (budgetLevel === "가성비") {
        return "가성비 기준이라면 한 번에 많이 바꾸기보다 체감 큰 항목부터 나눠서 진행하는 편이 좋아요.";
    }

    return "현재 선택 기준으로는 무리 없이 시작 가능한 범위예요. 우선순위가 높은 항목부터 진행해보세요.";
}

export function calculateEstimate(params: {
    spaceType: EstimateSpaceType;
    scope: EstimateScopeType;
    styleTone: StyleTone;
    budgetLevel: BudgetLevel;
    selectedItems: EstimateItemKey[];
}): EstimateResult {
    const { spaceType, scope, styleTone, budgetLevel, selectedItems } = params;

    const config = estimateMatrix[`${spaceType}-${scope}`];
    let min = config.baseMin;
    let max = config.baseMax;

    selectedItems.forEach((item) => {
        const adjustment = config.itemAdjustments[item];
        if (adjustment) {
            min += adjustment.min;
            max += adjustment.max;
        }
    });

    const tone = toneMultiplier[styleTone];
    const budget = budgetMultiplier[budgetLevel];

    min = Math.round(min * tone * budget);
    max = Math.round(max * tone * budget);

    return {
        min,
        max,
        comment: getEstimateComment(scope, selectedItems, budgetLevel),
    };
}