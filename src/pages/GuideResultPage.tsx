import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getGuideScenario } from "../features/guide/data/guideData";
import { useGuideStore } from "../features/guide/store/useGuideStore";
import type { GuideStep, StepStatus } from "../features/guide/types/guide";
import PageShell from "../shared/ui/PageShell";
import SectionCard from "../shared/ui/SectionCard";

function getNextReferenceStep(
    steps: GuideStep[],
    statuses: Record<string, StepStatus>
): GuideStep | null {
    return (
        steps.find((step) => {
            const status = statuses[step.id] ?? "not-started";
            return status !== "done";
        }) ?? null
    );
}

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

    const scenario = useMemo(() => {
        if (!spaceType || !scope) return null;
        return getGuideScenario(spaceType, scope);
    }, [spaceType, scope]);

    const stepStatuses = getStepStatuses();

    if (!scenario || !spaceType || !scope) {
        return (
            <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 sm:py-8">
                <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5">
                    <h1 className="text-2xl font-bold text-slate-950">
                        아직 선택된 가이드가 없어요
                    </h1>
                    <p className="mt-3 text-[15px] leading-7 text-slate-600">
                        시작 페이지에서 조건을 먼저 선택해주세요.
                    </p>

                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/guide")}
                            className="rounded-[18px] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            시작 페이지로 이동
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    const checkedSteps = scenario.steps.filter((step) => {
        const status = stepStatuses[step.id] ?? "not-started";
        return status === "done";
    });

    const uncheckedSteps = scenario.steps.filter((step) => {
        const status = stepStatuses[step.id] ?? "not-started";
        return status !== "done";
    });

    const nextReferenceStep = getNextReferenceStep(scenario.steps, stepStatuses);

    return (
        <PageShell
            eyebrow="GUIDE CHECKLIST"
            title={`${spaceType} · ${scope} 체크리스트`}
            description="필요한 항목만 골라서 참고해보세요. 순서대로 다 보지 않아도 괜찮아요."
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
                        <p className="text-sm font-semibold text-slate-500">한눈에 보기</p>
                        <h2 className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-slate-950">
                            {scenario.title}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            지금까지 체크한 항목은 {checkedSteps.length}개이고, 아직 안 본
                            항목은 {uncheckedSteps.length}개예요.
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            {nextReferenceStep ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/guide/step/${nextReferenceStep?.id}`)
                                    }
                                    className="rounded-[18px] bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                                >
                                    다시 보기
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => navigate(`/guide/step/${scenario?.steps[0].id}`)}
                                    className="rounded-[18px] bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                                >
                                    항목 다시 보기
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => navigate("/estimate")}
                                className="rounded-[18px] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                            >
                                견적 보러가기
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/guide")}
                                className="rounded-[18px] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                            >
                                선택 다시 하기
                            </button>
                        </div>
                    </SectionCard>

                    <SectionCard title="확인한 항목">
                        {checkedSteps.length === 0 ? (
                            <div className="rounded-[18px] bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600 ring-1 ring-slate-200">
                                아직 체크한 항목은 없어요. 필요한 항목부터 가볍게 살펴보면
                                됩니다.
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {checkedSteps.map((step, index) => (
                                    <li
                                        key={step.id}
                                        className="flex items-start gap-3 rounded-[18px] bg-emerald-50 px-4 py-4 text-sm leading-6 text-slate-700 ring-1 ring-emerald-100"
                                    >
                                        <span className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                                            {index + 1}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-slate-900">
                                                {step.title}
                                            </p>
                                            <p className="mt-1 text-slate-600">
                                                {step.shortDescription}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/guide/step/${step.id}`)}
                                            className="shrink-0 rounded-[14px] border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                                        >
                                            다시 보기
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </SectionCard>

                    <SectionCard title="아직 안 본 항목">
                        {uncheckedSteps.length === 0 ? (
                            <div className="rounded-[18px] bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600 ring-1 ring-slate-200">
                                아직 안 본 항목은 없어요. 그래도 나중에 다시 참고용으로 볼 수
                                있어요.
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {uncheckedSteps.map((step, index) => (
                                    <li
                                        key={step.id}
                                        className="flex items-start gap-3 rounded-[18px] bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 ring-1 ring-slate-200"
                                    >
                                        <span className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                                            {index + 1}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-slate-900">
                                                {step.title}
                                            </p>
                                            <p className="mt-1 text-slate-600">
                                                {step.shortDescription}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/guide/step/${step.id}`)}
                                            className="shrink-0 rounded-[14px] border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                                        >
                                            보기
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </SectionCard>
                </div>

                <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
                    <SectionCard title="선택 요약">
                        <div className="space-y-3">
                            <div className="rounded-[16px] bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                                <p className="text-xs font-medium text-slate-500">공간 / 범위</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {spaceType} · {scope}
                                </p>
                            </div>

                            <div className="rounded-[16px] bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                                <p className="text-xs font-medium text-slate-500">현재 상태</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {livingStatus ?? "-"}
                                </p>
                            </div>

                            <div className="rounded-[16px] bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                                <p className="text-xs font-medium text-slate-500">걱정되는 점</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {concern ?? "-"}
                                </p>
                            </div>

                            <div className="rounded-[16px] bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                                <p className="text-xs font-medium text-slate-500">경험 수준</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {experienceLevel ?? "-"}
                                </p>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="바로 가기">
                        <div className="space-y-3">
                            {nextReferenceStep ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/guide/step/${nextReferenceStep?.id}`)
                                    }
                                    className="w-full rounded-[18px] bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
                                >
                                    아직 안 본 항목 보기
                                </button>
                            ) : null}

                            <button
                                type="button"
                                onClick={() => navigate("/estimate")}
                                className="w-full rounded-[18px] border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                            >
                                견적 보러가기
                            </button>
                        </div>
                    </SectionCard>
                </div>
            </div>
        </PageShell>
    );
}