import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getGuideScenario } from "../features/guide/data/guideData";
import { useGuideStore } from "../features/guide/store/useGuideStore";
import type { StepStatus } from "../features/guide/types/guide";
import PageShell from "../shared/ui/PageShell";
import ProgressBar from "../shared/ui/ProgressBar";
import SectionCard from "../shared/ui/SectionCard";

const statusWeight: Record<StepStatus, number> = {
    "not-started": 0,
    "roughly-done": 0.4,
    "almost-done": 0.7,
    done: 1,
};

export default function GuideResultPage() {
    const navigate = useNavigate();
    const {
        spaceType,
        scope,
        livingStatus,
        concern,
        experienceLevel,
        getStepStatuses,
    } = useGuideStore();

    const stepStatuses = getStepStatuses();

    const scenario = useMemo(() => {
        if (!spaceType || !scope) return null;
        return getGuideScenario(spaceType, scope);
    }, [spaceType, scope]);

    if (!scenario || !spaceType || !scope) {
        return (
            <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 sm:py-8">
                <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5">
                    <h1 className="text-2xl font-bold text-slate-950">
                        아직 선택한 정보가 없어요
                    </h1>
                    <p className="mt-3 text-[15px] leading-7 text-slate-600">
                        가이드 시작 페이지에서 공간과 범위를 먼저 선택해주세요.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/guide")}
                            className="rounded-[18px] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            다시 선택하기
                        </button>
                    </div>

                    <div className="mt-3">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-slate-700 hover:underline"
                        >
                            홈으로 이동
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    const totalProgress = scenario.steps.reduce((acc, step) => {
        const status = stepStatuses[step.id] ?? "not-started";
        return acc + statusWeight[status];
    }, 0);

    const progress = Math.round((totalProgress / scenario.steps.length) * 100);

    return (
        <PageShell
            eyebrow="GUIDE RESULT"
            title={`${spaceType} / ${scope} 기준으로 먼저 확인하면 좋은 단계들이에요`}
            description={scenario.summary}
        >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-4">
                    {scenario.steps.map((step, index) => (
                        <SectionCard key={step.id}>
                            <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                  {index + 1}
                </span>
                                <h2 className="text-[22px] font-bold tracking-[-0.03em] text-slate-950">
                                    {step.title}
                                </h2>
                            </div>

                            <p className="mt-4 text-[15px] leading-7 text-slate-600">
                                {step.shortDescription}
                            </p>

                            <ul className="mt-4 space-y-3">
                                {step.checklist.map((item) => (
                                    <li
                                        key={item}
                                        className="rounded-[18px] bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 ring-1 ring-slate-200"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                onClick={() => navigate(`/guide/step/${step.id}`)}
                                className="mt-5 rounded-[18px] bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
                            >
                                자세히 보기
                            </button>
                        </SectionCard>
                    ))}

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/guide")}
                            className="rounded-[20px] border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            다시 선택하기
                        </button>
                    </div>

                    <div className="pt-1">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-slate-700 hover:underline"
                        >
                            홈으로 이동
                        </button>
                    </div>
                </div>

                <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
                    <SectionCard>
                        <p className="text-sm font-semibold text-slate-900">진행률</p>
                        <p className="mt-2 text-[28px] font-bold tracking-[-0.03em] text-slate-950">
                            {progress}%
                        </p>
                        <div className="mt-4">
                            <ProgressBar value={progress} />
                        </div>
                    </SectionCard>

                    <SectionCard>
                        <p className="text-sm font-semibold text-slate-900">내 선택 요약</p>
                        <div className="mt-4 space-y-3">
                            <div className="rounded-[20px] bg-slate-50 p-4 ring-1 ring-slate-200">
                                <p className="text-xs font-medium text-slate-500">현재 상태</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {livingStatus ?? "-"}
                                </p>
                            </div>
                            <div className="rounded-[20px] bg-slate-50 p-4 ring-1 ring-slate-200">
                                <p className="text-xs font-medium text-slate-500">가장 걱정되는 점</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {concern ?? "-"}
                                </p>
                            </div>
                            <div className="rounded-[20px] bg-slate-50 p-4 ring-1 ring-slate-200">
                                <p className="text-xs font-medium text-slate-500">경험 수준</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {experienceLevel ?? "-"}
                                </p>
                            </div>
                        </div>
                    </SectionCard>
                </div>
            </div>
        </PageShell>
    );
}