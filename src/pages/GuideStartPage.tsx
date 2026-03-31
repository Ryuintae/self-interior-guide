import { useNavigate } from "react-router-dom";
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

    const isDisabled =
        !spaceType || !scope || !livingStatus || !concern || !experienceLevel;

    return (
        <PageShell
            eyebrow="GUIDE START"
            title="내 상황에 맞는 가이드를 찾아볼게요"
            description="공간과 작업 범위를 고르고, 현재 상황을 간단히 진단하면 더 맞춤형으로 보여드릴게요."
        >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-5">
                    <SectionCard>
                        <p className="text-[17px] font-semibold text-slate-950">
                            1. 어떤 공간인가요?
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {spaceOptions.map((option) => {
                                const selected = spaceType === option;
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setSpaceType(option)}
                                        className={`rounded-[20px] px-4 py-4 text-sm font-semibold transition ${
                                            selected
                                                ? "bg-slate-950 text-white"
                                                : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </SectionCard>

                    <SectionCard>
                        <p className="text-[17px] font-semibold text-slate-950">
                            2. 어느 정도까지 할 예정인가요?
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            {scopeOptions.map((option) => {
                                const selected = scope === option;
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setScope(option)}
                                        className={`rounded-[20px] px-4 py-4 text-sm font-semibold transition ${
                                            selected
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </SectionCard>

                    <SectionCard>
                        <p className="text-[17px] font-semibold text-slate-950">
                            3. 지금 살면서 진행하나요?
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {livingOptions.map((option) => {
                                const selected = livingStatus === option;
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setLivingStatus(option)}
                                        className={`rounded-[20px] px-4 py-4 text-sm font-semibold transition ${
                                            selected
                                                ? "bg-slate-950 text-white"
                                                : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </SectionCard>

                    <SectionCard>
                        <p className="text-[17px] font-semibold text-slate-950">
                            4. 가장 걱정되는 건 무엇인가요?
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {concernOptions.map((option) => {
                                const selected = concern === option;
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setConcern(option)}
                                        className={`rounded-[20px] px-4 py-4 text-sm font-semibold transition ${
                                            selected
                                                ? "bg-slate-950 text-white"
                                                : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </SectionCard>

                    <SectionCard>
                        <p className="text-[17px] font-semibold text-slate-950">
                            5. 셀프 인테리어 경험은 어느 정도인가요?
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            {experienceOptions.map((option) => {
                                const selected = experienceLevel === option;
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setExperienceLevel(option)}
                                        className={`rounded-[20px] px-4 py-4 text-sm font-semibold transition ${
                                            selected
                                                ? "bg-slate-950 text-white"
                                                : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </SectionCard>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="rounded-[20px] border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            홈으로
                        </button>

                        <button
                            type="button"
                            disabled={isDisabled}
                            onClick={() => navigate("/guide/result")}
                            className={`rounded-[20px] px-5 py-4 text-sm font-semibold text-white transition ${
                                isDisabled
                                    ? "cursor-not-allowed bg-slate-300"
                                    : "bg-slate-950 hover:opacity-90"
                            }`}
                        >
                            맞춤 가이드 보기
                        </button>
                    </div>
                </div>

                <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
                    <SectionCard>
                        <p className="text-sm font-semibold text-slate-900">선택 요약</p>

                        <div className="mt-4 space-y-3">
                            {[
                                ["공간", spaceType ?? "아직 선택 전"],
                                ["범위", scope ?? "아직 선택 전"],
                                ["현재 상태", livingStatus ?? "아직 선택 전"],
                                ["가장 걱정되는 점", concern ?? "아직 선택 전"],
                                ["경험 수준", experienceLevel ?? "아직 선택 전"],
                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="rounded-[20px] bg-slate-50 p-4 ring-1 ring-slate-200"
                                >
                                    <p className="text-xs font-medium text-slate-500">{label}</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={resetGuide}
                            className="mt-5 w-full rounded-[18px] border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            선택 초기화
                        </button>
                    </SectionCard>
                </div>
            </div>
        </PageShell>
    );
}