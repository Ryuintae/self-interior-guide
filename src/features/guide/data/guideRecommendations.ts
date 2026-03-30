import type {
    GuideRecommendationKey,
    GuideStep,
    ScopeType,
    SpaceType,
} from "../types/guide";

const defaultSteps: GuideStep[] = [
    {
        id: "measure",
        title: "실측부터 진행하세요",
        description:
            "가구나 자재를 먼저 고르면 크기와 동선이 맞지 않을 수 있어요. 먼저 공간 크기와 문, 창문 위치를 확인해보세요.",
        checklist: [
            "방 가로/세로 길이 재기",
            "문 열리는 방향 확인",
            "창문 위치 확인",
            "콘센트 위치 확인",
        ],
    },
    {
        id: "budget",
        title: "예산을 먼저 나눠두세요",
        description:
            "셀프 인테리어는 중간에 추가 지출이 생기기 쉬워요. 큰 항목부터 예산을 나누는 게 중요해요.",
        checklist: [
            "가구 예산 정하기",
            "자재 예산 정하기",
            "예비비 10~15% 남겨두기",
        ],
    },
    {
        id: "order",
        title: "작업 순서를 정리하세요",
        description:
            "순서 없이 진행하면 다시 사거나 다시 시공해야 할 수 있어요. 진행 순서를 먼저 잡아두세요.",
        checklist: [
            "철거 여부 확인",
            "벽/바닥 작업 순서 정하기",
            "가구 배치 시점 정하기",
        ],
    },
];

const recommendationMap: Partial<Record<GuideRecommendationKey, GuideStep[]>> = {
    "원룸-가구만": [
        {
            id: "layout",
            title: "가구 배치 동선을 먼저 확인하세요",
            description:
                "원룸은 공간이 좁기 때문에 가구 크기보다 동선이 더 중요할 수 있어요.",
            checklist: [
                "침대 위치 정하기",
                "수납장 깊이 확인하기",
                "책상 배치 시 의자 공간 확보하기",
            ],
        },
        ...defaultSteps,
    ],
    "원룸-부분 시공": [
        {
            id: "priority",
            title: "부분 시공 범위를 먼저 확정하세요",
            description:
                "원룸은 전체를 다 건드리기보다 벽지, 바닥, 조명처럼 체감이 큰 부분부터 정하는 게 효율적이에요.",
            checklist: [
                "벽지 변경 여부 정하기",
                "바닥 시공 여부 정하기",
                "조명 교체 여부 정하기",
            ],
        },
        ...defaultSteps,
    ],
    "침실-가구만": [
        {
            id: "mood",
            title: "침실은 톤 통일부터 잡으세요",
            description:
                "침실은 휴식 공간이라 가구를 많이 두기보다 색감과 분위기 통일이 더 중요해요.",
            checklist: [
                "가구 톤 정하기",
                "침구 색상 정하기",
                "조명 색온도 확인하기",
            ],
        },
        ...defaultSteps,
    ],
};

export const getGuideSteps = (
    spaceType: SpaceType,
    scope: ScopeType
): GuideStep[] => {
    const key: GuideRecommendationKey = `${spaceType}-${scope}`;
    return recommendationMap[key] ?? defaultSteps;
};