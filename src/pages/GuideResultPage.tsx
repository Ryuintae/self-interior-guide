import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGuideStore } from "../features/guide/store/useGuideStore";
import { getGuideSteps } from "../features/guide/data/guideRecommendations";

export default function GuideResultPage() {
    const navigate = useNavigate();
    const { spaceType, scope } = useGuideStore();

    const steps = useMemo(() => {
        if (!spaceType || !scope) return [];
        return getGuideSteps(spaceType, scope);
    }, [spaceType, scope]);

    if (!spaceType || !scope) {
        return (
            <main className="min-h-screen bg-slate-50 px-6 py-10">
                <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <h1 className="text-2xl font-bold text-slate-900">
                        아직 선택한 정보가 없어요
                    </h1>
                    <p className="mt-3 text-slate-600">
                        가이드 시작 페이지에서 공간과 범위를 먼저 선택해주세요.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/guide")}
                        className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                    >
                        가이드 시작으로 이동
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-4xl">
                <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <p className="text-sm font-semibold text-blue-600">GUIDE RESULT</p>

                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        {spaceType} / {scope} 기준으로
                        <br />
                        먼저 확인하면 좋은 단계들이에요
                    </h1>

                    <p className="mt-4 text-base leading-7 text-slate-600">
                        지금 단계에서는 완벽한 시공 가이드보다, 초보자가 실수하기 쉬운
                        포인트를 먼저 정리해보는 게 중요해요.
                    </p>

                    <div className="mt-8 grid gap-4">
                        {steps.map((step, index) => (
                            <article
                                key={step.id}
                                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                            >
                                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {step.title}
                                    </h2>
                                </div>

                                <p className="mt-4 text-sm leading-6 text-slate-600">
                                    {step.description}
                                </p>

                                <ul className="mt-4 space-y-2">
                                    {step.checklist.map((item) => (
                                        <li
                                            key={item}
                                            className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-800 ring-1 ring-slate-200"
                                        >
                                            • {item}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/guide")}
                            className="rounded-2xl border border-slate-300 px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                        >
                            다시 선택하기
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white hover:opacity-90"
                        >
                            홈으로 이동
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}