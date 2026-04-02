import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getGuideScenario } from "../features/guide/data/guideData";
import { useGuideStore } from "../features/guide/store/useGuideStore";
import type {
    ConcernType,
    ExperienceLevel,
    LivingStatus,
    ScopeType,
    SpaceType,
} from "../features/guide/types/guide";
import PageShell from "../shared/ui/PageShell";
import SectionCard from "../shared/ui/SectionCard";

const spaceOptions: SpaceType[] = ["원룸", "침실", "거실", "주방"];
const scopeOptions: ScopeType[] = ["가구만", "부분 시공", "전체 시공"];
const livingOptions: LivingStatus[] = ["현재 거주 중", "비어 있는 공간"];
const concernOptions: ConcernType[] = ["예산", "순서", "배치", "자재 선택"];
const experienceOptions: ExperienceLevel[] = [
    "처음 해봐요",
    "조금 해봤어요",
    "꽤 익숙해요",
];

type OptionButtonProps = {
    label: string;
    selected: boolean;
    onClick: () => void;
};

function OptionButton({ label, selected, onClick }: OptionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-[18px] px-4 py-4 text-sm font-semibold transition ${
                selected
                    ? "bg-slate-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.15)]"
                    : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
        >
            {label}
        </button>
    );
}

type SummaryRowProps = {
    label: string;
    value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
    const empty = value === "아직 선택 전";

    return (
        <div className="flex items-start justify-between gap-3 rounded-[16px] bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
            <span className="text-sm font-medium text-slate-500">{label}</span>
            <span
                className={`text-right text-sm font-semibold ${
                    empty ? "text-slate-400" : "text-slate-900"
                }`}
            >
                {value}
            </span>
        </div>
    );
}

export default function GuideStartPage() {
    const navigate = useNavigate();
    const {
        spaceType,
        scope,
        livingStatus,
        concern,
        experienceLevel,
        setSpaceType,
        setScope,
        setLivingStatus,
        setConcern,
        setExperienceLevel,
        resetGuide,
    } = useGuideStore();

    const scenario = useMemo(() => {
        if (!spaceType || !scope) return null;
        return getGuideScenario(spaceType, scope);
    }, [spaceType, scope]);

    const isDisabled =
        !spaceType || !scope || !livingStatus || !concern || !experienceLevel || !scenario;

    const selectedCount = [
        spaceType,
        scope,
        livingStatus,
        concern,
        experienceLevel,
    ].filter(Boolean).length;

    const guideHint = useMemo(() => {
        if (!scenario) {
            return "공간과 범위를 먼저 고르면 더 맞는 체크리스트를 보여드릴게요.";
        }

        return scenario.subtitle;
    }, [scenario]);

    return (
        <PageShell
            eyebrow="GUIDE START"
            title="내 상황에 맞는 체크리스트를 찾아볼게요"
            description="순서대로 전부 볼 필요는 없어요. 필요한 항목만 골라서 참고하듯 확인해도 괜찮아요."
            headerAction={
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="rounded-[16px] border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                    홈으로
                </button>
            }
        >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-5">
                    <SectionCard>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500">핵심 선택</p>
                                <h2 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-slate-950">
                                    어떤 공간을, 어느 정도까지 바꿀 예정인가요?
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    이 두 가지를 고르면 더 맞는 체크리스트를 먼저 보여드릴 수
                                    있어요.
                                </p>
                            </div>

                            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                                {selectedCount} / 5 선택됨
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 xl:grid-cols-2">
                            <div className="rounded-[22px] bg-slate-50 p-5 ring-1 ring-slate-200">
                                <p className="text-sm font-semibold text-slate-900">
                                    1. 어떤 공간인가요?
                                </p>
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    {spaceOptions.map((option) => (
                                        <OptionButton
                                            key={option}
                                            label={option}
                                            selected={spaceType === option}
                                            onClick={() => setSpaceType(option)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[22px] bg-slate-50 p-5 ring-1 ring-slate-200">
                                <p className="text-sm font-semibold text-slate-900">
                                    2. 어느 정도까지 할 예정인가요?
                                </p>
                                <div className="mt-4 grid gap-3">
                                    {scopeOptions.map((option) => (
                                        <OptionButton
                                            key={option}
                                            label={option}
                                            selected={scope === option}
                                            onClick={() => setScope(option)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="추가 선택"
                        description="아래 정보는 설명 문구를 조금 더 현실적으로 맞추는 데 사용돼요."
                    >
                        <div className="rounded-[24px] bg-slate-50 p-4 ring-1 ring-slate-200">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-[22px] bg-white p-5 ring-1 ring-slate-200">
                                    <p className="text-sm font-semibold text-slate-900">
                                        3. 지금 살면서 진행하나요?
                                    </p>
                                    <div className="mt-4 grid gap-3">
                                        {livingOptions.map((option) => (
                                            <OptionButton
                                                key={option}
                                                label={option}
                                                selected={livingStatus === option}
                                                onClick={() => setLivingStatus(option)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[22px] bg-white p-5 ring-1 ring-slate-200">
                                    <p className="text-sm font-semibold text-slate-900">
                                        4. 가장 걱정되는 건 무엇인가요?
                                    </p>
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {concernOptions.map((option) => (
                                            <OptionButton
                                                key={option}
                                                label={option}
                                                selected={concern === option}
                                                onClick={() => setConcern(option)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 rounded-[22px] bg-white p-5 ring-1 ring-slate-200">
                                <p className="text-sm font-semibold text-slate-900">
                                    5. 셀프 인테리어 경험은 어느 정도인가요?
                                </p>
                                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                    {experienceOptions.map((option) => (
                                        <OptionButton
                                            key={option}
                                            label={option}
                                            selected={experienceLevel === option}
                                            onClick={() => setExperienceLevel(option)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SectionCard>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="rounded-[18px] border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            홈으로
                        </button>

                        <button
                            type="button"
                            disabled={isDisabled}
                            onClick={() => {
                                if (!scenario?.steps.length) return;
                                navigate(`/guide/step/${scenario.steps[0].id}`);
                            }}
                            className={`rounded-[18px] px-5 py-4 text-sm font-semibold text-white transition ${
                                isDisabled
                                    ? "cursor-not-allowed bg-slate-300"
                                    : "bg-slate-950 hover:opacity-90"
                            }`}
                        >
                            체크리스트 보기
                        </button>
                    </div>
                </div>

                <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
                    <SectionCard title="선택 요약">
                        <div className="space-y-3">
                            <SummaryRow label="공간" value={spaceType ?? "아직 선택 전"} />
                            <SummaryRow label="범위" value={scope ?? "아직 선택 전"} />
                            <SummaryRow
                                label="현재 상태"
                                value={livingStatus ?? "아직 선택 전"}
                            />
                            <SummaryRow
                                label="걱정되는 점"
                                value={concern ?? "아직 선택 전"}
                            />
                            <SummaryRow
                                label="경험 수준"
                                value={experienceLevel ?? "아직 선택 전"}
                            />
                        </div>

                        <div className="mt-5 rounded-[18px] bg-slate-950 px-4 py-4 text-white">
                            <p className="text-xs font-medium text-slate-300">보여줄 가이드</p>
                            <p className="mt-1 text-sm font-semibold">
                                {scenario ? scenario.title : "아직 선택 전"}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-300">
                                {guideHint}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={resetGuide}
                            className="mt-4 w-full rounded-[18px] border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            선택 초기화
                        </button>
                    </SectionCard>
                </div>
            </div>
        </PageShell>
    );
}