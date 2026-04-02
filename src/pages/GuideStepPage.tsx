import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGuideScenario } from "../features/guide/data/guideData";
import { useGuideStore } from "../features/guide/store/useGuideStore";
import type { StepStatus } from "../features/guide/types/guide";
import PageShell from "../shared/ui/PageShell";
import SectionCard from "../shared/ui/SectionCard";

const statusOptions: { value: StepStatus; label: string; description: string }[] = [
    {
        value: "not-started",
        label: "아직 안 봤어요",
        description: "이 항목은 아직 확인하지 않았어요.",
    },
    {
        value: "roughly-done",
        label: "대충 봤어요",
        description: "대략 확인했지만 다시 볼 수 있어요.",
    },
    {
        value: "almost-done",
        label: "거의 체크했어요",
        description: "대부분 확인했고 조금만 더 보면 돼요.",
    },
    {
        value: "done",
        label: "확인했어요",
        description: "필요한 내용은 체크해둔 상태예요.",
    },
];

function getStatusLabel(status: StepStatus): string {
    switch (status) {
        case "not-started":
            return "안 봄";
        case "roughly-done":
            return "대충 봄";
        case "almost-done":
            return "거의 체크";
        case "done":
            return "확인함";
    }
}

function getStepFeedback(status: StepStatus): string {
    switch (status) {
        case "not-started":
            return "아직 안 봤다면 괜찮아요. 필요한 항목부터 가볍게 훑어봐도 충분해요.";
        case "roughly-done":
            return "대충 본 상태예요. 놓치기 쉬운 부분은 아래 실수 포인트에서 다시 확인해보세요.";
        case "almost-done":
            return "거의 체크한 상태예요. 마지막으로 빠진 항목만 다시 보면 됩니다.";
        case "done":
            return "좋아요. 이 항목은 확인해둔 상태예요. 필요하면 나중에 다시 와서 참고해도 됩니다.";
    }
}

export default function GuideStepPage() {
    const navigate = useNavigate();
    const { stepId } = useParams<{ stepId: string }>();
    const {
        spaceType,
        scope,
        livingStatus,
        concern,
        experienceLevel,
        getStepStatuses,
        setStepStatus,
    } = useGuideStore();

    if (!stepId) {
        return (
            <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 sm:py-8">
                <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5">
                    <h1 className="text-2xl font-bold text-slate-950">잘못된 접근이에요</h1>
                    <p className="mt-3 text-[15px] leading-7 text-slate-600">
                        항목 ID가 없어서 페이지를 열 수 없어요.
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

    const scenario = useMemo(() => {
        if (!spaceType || !scope) return null;
        return getGuideScenario(spaceType, scope);
    }, [spaceType, scope]);

    const stepStatuses = getStepStatuses();

    const currentIndex = scenario?.steps.findIndex((step) => step.id === stepId) ?? -1;
    const currentStep = currentIndex >= 0 ? scenario?.steps[currentIndex] : null;
    const prevStep =
        currentIndex > 0 && scenario ? scenario.steps[currentIndex - 1] : null;
    const nextStep =
        currentIndex >= 0 && scenario ? scenario.steps[currentIndex + 1] : null;

    if (!scenario || !currentStep) {
        return (
            <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 sm:py-8">
                <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5">
                    <h1 className="text-2xl font-bold text-slate-950">
                        항목 정보를 찾을 수 없어요
                    </h1>
                    <p className="mt-3 text-[15px] leading-7 text-slate-600">
                        가이드 선택이 초기화되었거나 잘못된 접근일 수 있어요.
                    </p>
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/guide")}
                            className="rounded-[18px] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            다시 선택하기
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    const currentStatus = stepStatuses[currentStep.id] ?? "not-started";
    const checkedCount = scenario.steps.filter((step) => {
        const status = stepStatuses[step.id] ?? "not-started";
        return status === "done";
    }).length;

    return (
        <PageShell
            eyebrow={`CHECK ITEM ${currentIndex + 1}`}
            title={currentStep.title}
            description="순서대로 보지 않아도 괜찮아요. 필요한 항목만 체크하듯 참고해도 됩니다."
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
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500">현재 항목</p>
                                <h2 className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-slate-950">
                                    {currentStep.title}
                                </h2>
                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                    {currentStep.shortDescription}
                                </p>
                            </div>

                            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                                체크 {checkedCount} / {scenario.steps.length}
                            </div>
                        </div>
                    </SectionCard>

                    <div className="rounded-[22px] bg-blue-50 px-5 py-5 ring-1 ring-blue-100">
                        <p className="text-sm font-semibold text-blue-700">참고 메모</p>
                        <p className="mt-2 text-sm leading-7 text-blue-900">
                            {getStepFeedback(currentStatus)}
                        </p>
                    </div>

                    <SectionCard title="이번 항목에서 보면 좋은 체크리스트">
                        <ul className="space-y-3">
                            {currentStep.checklist.map((item, index) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 rounded-[18px] bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 ring-1 ring-slate-200"
                                >
                                    <span className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                                        {index + 1}
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </SectionCard>

                    <SectionCard title="놓치기 쉬운 부분">
                        <ul className="space-y-3">
                            {currentStep.mistakes.map((mistake) => (
                                <li
                                    key={mistake}
                                    className="rounded-[18px] bg-amber-50 px-4 py-4 text-sm leading-6 text-slate-700 ring-1 ring-amber-100"
                                >
                                    {mistake}
                                </li>
                            ))}
                        </ul>
                    </SectionCard>

                    <SectionCard title="왜 참고하면 좋은가요?">
                        <p className="text-[16px] leading-8 text-slate-700 whitespace-pre-line">
                            {currentStep.whyItMatters}
                        </p>
                    </SectionCard>

                    <SectionCard title="상세 설명">
                        <p className="text-[16px] leading-8 text-slate-700 whitespace-pre-line">
                            {currentStep.description}
                        </p>
                    </SectionCard>

                    {currentStep.tip ? (
                        <div className="rounded-[22px] bg-violet-50 px-5 py-5 ring-1 ring-violet-100">
                            <p className="text-sm font-semibold text-violet-700">실전 팁</p>
                            <p className="mt-2 text-sm leading-7 text-violet-900 whitespace-pre-line">
                                {currentStep.tip}
                            </p>
                        </div>
                    ) : null}

                    <div className="rounded-[24px] bg-slate-50 px-5 py-5 ring-1 ring-slate-200">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500">
                                    마지막으로 체크해보세요
                                </p>
                                <h3 className="mt-1 text-lg font-bold tracking-[-0.02em] text-slate-950">
                                    이 항목은 어느 정도 확인했나요?
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    내용을 읽어본 뒤 지금 상태에 맞게 가볍게 표시해두면,
                                    나중에 다시 볼 때 더 편해요.
                                </p>
                            </div>

                            <div className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                                선택 사항
                            </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {statusOptions.map((option) => {
                                const selected = currentStatus === option.value;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setStepStatus(currentStep?.id, option.value)}
                                        className={`rounded-[18px] px-4 py-4 text-left transition ${
                                            selected
                                                ? "bg-white text-slate-950 ring-2 ring-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
                                                : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-sm font-semibold">{option.label}</p>
                                            {selected ? (
                                                <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-semibold text-white">
                                                    선택됨
                                                </span>
                                            ) : null}
                                        </div>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {option.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                navigate(prevStep ? `/guide/step/${prevStep.id}` : "/guide")
                            }
                            className="rounded-[18px] border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            {prevStep ? "이전 항목" : "선택 다시 하기"}
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(nextStep ? `/guide/step/${nextStep.id}` : "/guide/result")
                            }
                            className="rounded-[18px] bg-slate-950 px-5 py-4 text-sm font-semibold text-white hover:opacity-90"
                        >
                            {nextStep ? "다음 항목" : "전체 항목 보기"}
                        </button>
                    </div>
                </div>

                <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
                    <SectionCard title="현재 조건">
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

                    <SectionCard
                        title="전체 항목"
                        description={"순서대로 보지 않아도 되고, 필요한 것만\n골라서 확인해도 괜찮아요."}
                    >
                        <div className="space-y-2">
                            {scenario.steps.map((step, index) => {
                                const isActive = step.id === currentStep.id;
                                const status = stepStatuses[step.id] ?? "not-started";

                                return (
                                    <button
                                        key={step.id}
                                        type="button"
                                        onClick={() => navigate(`/guide/step/${step.id}`)}
                                        className={`flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-left text-sm transition ${
                                            isActive
                                                ? "bg-slate-950 text-white"
                                                : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <span className="font-semibold">
                                            {index + 1}. {step.title}
                                        </span>
                                        <span
                                            className={`ml-3 shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                                isActive
                                                    ? "bg-white/10 text-white"
                                                    : status === "done"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-slate-100 text-slate-500"
                                            }`}
                                        >
                                            {isActive ? "현재" : getStatusLabel(status)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/guide/result")}
                            className="mt-4 w-full rounded-[18px] border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            전체 항목 보기
                        </button>
                    </SectionCard>
                </div>
            </div>
        </PageShell>
    );
}