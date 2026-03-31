import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGuideScenario } from "../features/guide/data/guideData";
import { useGuideStore } from "../features/guide/store/useGuideStore";
import type { StepStatus } from "../features/guide/types/guide";
import PageShell from "../shared/ui/PageShell";
import ProgressBar from "../shared/ui/ProgressBar";
import SectionCard from "../shared/ui/SectionCard";

const statusOptions: { value: StepStatus; label: string; description: string }[] = [
    {
        value: "not-started",
        label: "아직 안 했어요",
        description: "이 단계는 아직 시작하지 않았어요.",
    },
    {
        value: "roughly-done",
        label: "대충만 했어요",
        description: "기본은 했지만 빠뜨린 부분이 있을 수 있어요.",
    },
    {
        value: "almost-done",
        label: "거의 끝냈어요",
        description: "조금만 더 점검하면 마무리할 수 있어요.",
    },
    {
        value: "done",
        label: "완료했어요",
        description: "이 단계는 충분히 끝냈어요.",
    },
];

const statusWeight: Record<StepStatus, number> = {
    "not-started": 0,
    "roughly-done": 0.4,
    "almost-done": 0.7,
    done: 1,
};

function getStepFeedback(status: StepStatus) {
    switch (status) {
        case "not-started":
            return "괜찮아요. 아직 시작 전이라면 체크리스트를 기준으로 하나씩 시작해보세요.";
        case "roughly-done":
            return "대충만 했다면 놓치기 쉬운 항목이 있을 수 있어요. 아래 실수 포인트를 꼭 같이 확인해보세요.";
        case "almost-done":
            return "거의 끝난 상태예요. 마지막으로 체크리스트를 빠짐없이 확인하면 안정적이에요.";
        case "done":
            return "좋아요. 이 단계는 완료 상태예요. 다음 단계로 넘어가도 됩니다.";
    }
}

export default function GuideStepPage() {
    const navigate = useNavigate();
    const { stepId } = useParams<{ stepId: string }>();
    const { spaceType, scope, getStepStatuses, setStepStatus } = useGuideStore();

    if (!stepId) {
        return (
            <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 sm:py-8">
                <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5">
                    <h1 className="text-2xl font-bold text-slate-950">
                        잘못된 접근이에요
                    </h1>
                    <p className="mt-3 text-[15px] leading-7 text-slate-600">
                        단계 ID가 없어서 페이지를 열 수 없어요.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/guide/result")}
                            className="rounded-[18px] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            결과 페이지로 이동
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

    const stepStatuses = getStepStatuses();

    const scenario = useMemo(() => {
        if (!spaceType || !scope) return null;
        return getGuideScenario(spaceType, scope);
    }, [spaceType, scope]);

    const currentIndex = scenario?.steps.findIndex((step) => step.id === stepId) ?? -1;
    const step = currentIndex >= 0 ? scenario?.steps[currentIndex] : null;
    const nextStep =
        currentIndex >= 0 && scenario ? scenario.steps[currentIndex + 1] : null;

    if (!scenario || !step) {
        return (
            <main className="min-h-screen bg-[#eef2f7] px-4 py-6 sm:px-6 sm:py-8">
                <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5">
                    <h1 className="text-2xl font-bold text-slate-950">
                        단계 정보를 찾을 수 없어요
                    </h1>
                    <p className="mt-3 text-[15px] leading-7 text-slate-600">
                        가이드 선택이 초기화되었거나 잘못된 접근일 수 있어요.
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

    const currentStatus = stepStatuses[step.id] ?? "not-started";

    const totalProgress = scenario.steps.reduce((acc, item) => {
        const status = stepStatuses[item.id] ?? "not-started";
        return acc + statusWeight[status];
    }, 0);

    const progress = Math.round((totalProgress / scenario.steps.length) * 100);

    return (
        <PageShell
            eyebrow={`STEP ${currentIndex + 1}`}
            title={step.title}
            description={step.shortDescription}
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
                        <p className="text-sm font-semibold text-slate-500">현재 내 상태 선택</p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {statusOptions.map((option) => {
                                const selected = currentStatus === option.value;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setStepStatus(step.id, option.value)}
                                        className={`rounded-[20px] px-4 py-4 text-left transition ${
                                            selected
                                                ? "bg-slate-950 text-white"
                                                : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <p className="text-sm font-semibold">{option.label}</p>
                                        <p
                                            className={`mt-2 text-sm leading-6 ${
                                                selected ? "text-slate-200" : "text-slate-600"
                                            }`}
                                        >
                                            {option.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </SectionCard>

                    <div className="rounded-[24px] bg-blue-50 px-5 py-5 ring-1 ring-blue-100">
                        <p className="text-sm font-semibold text-blue-700">상태 기반 피드백</p>
                        <p className="mt-2 text-sm leading-7 text-blue-900">
                            {getStepFeedback(currentStatus)}
                        </p>
                    </div>

                    <SectionCard>
                        <p className="text-sm font-semibold text-slate-500">왜 중요한가요?</p>
                        <p className="mt-3 text-[16px] leading-8 text-slate-700">
                            {step.whyItMatters}
                        </p>
                    </SectionCard>

                    <SectionCard>
                        <p className="text-sm font-semibold text-slate-500">설명</p>
                        <p className="mt-3 text-[16px] leading-8 text-slate-700">
                            {step.description}
                        </p>
                    </SectionCard>

                    <SectionCard>
                        <p className="text-sm font-semibold text-slate-500">자주 하는 실수</p>
                        <ul className="mt-4 space-y-3">
                            {step.mistakes.map((mistake) => (
                                <li
                                    key={mistake}
                                    className="rounded-[18px] bg-white px-4 py-4 text-sm leading-6 text-slate-700 ring-1 ring-slate-200"
                                >
                                    {mistake}
                                </li>
                            ))}
                        </ul>
                    </SectionCard>

                    <SectionCard>
                        <p className="text-sm font-semibold text-slate-500">체크리스트</p>
                        <ul className="mt-4 space-y-3">
                            {step.checklist.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-[18px] bg-white px-4 py-4 text-sm leading-6 text-slate-700 ring-1 ring-slate-200"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </SectionCard>

                    {step.tip ? (
                        <div className="rounded-[24px] bg-emerald-50 px-5 py-5 ring-1 ring-emerald-100">
                            <p className="text-sm font-semibold text-emerald-700">실전 팁</p>
                            <p className="mt-2 text-sm leading-7 text-emerald-900">
                                {step.tip}
                            </p>
                        </div>
                    ) : null}

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/guide/result")}
                            className="rounded-[20px] border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                            목록으로 돌아가기
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(nextStep ? `/guide/step/${nextStep.id}` : "/guide/result")
                            }
                            className="rounded-[20px] bg-slate-950 px-5 py-4 text-sm font-semibold text-white hover:opacity-90"
                        >
                            {nextStep ? "다음 단계 보기" : "결과 페이지로 이동"}
                        </button>
                    </div>
                </div>

                <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
                    <SectionCard>
                        <p className="text-sm font-semibold text-slate-900">전체 진행률</p>
                        <p className="mt-2 text-[28px] font-bold text-slate-950">
                            {progress}%
                        </p>
                        <div className="mt-4">
                            <ProgressBar value={progress} />
                        </div>
                    </SectionCard>

                    <SectionCard>
                        <p className="text-sm font-semibold text-slate-900">현재 내 상태</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            아래에서 지금 상태를 선택하면 진행률과 피드백이 반영돼요.
                        </p>
                    </SectionCard>
                </div>
            </div>
        </PageShell>
    );
}