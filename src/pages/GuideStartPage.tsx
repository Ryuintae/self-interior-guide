import { useNavigate } from "react-router-dom";
import { useGuideStore } from "../features/guide/store/useGuideStore";
import type { ScopeType, SpaceType } from "../features/guide/types/guide";

const spaceOptions: SpaceType[] = ["원룸", "침실", "거실", "주방"];
const scopeOptions: ScopeType[] = ["가구만", "부분 시공", "전체 시공"];

export default function GuideStartPage() {
    const navigate = useNavigate();
    const { spaceType, scope, setSpaceType, setScope, resetGuide } =
        useGuideStore();

    const isDisabled = !spaceType || !scope;

    const handleStart = () => {
        if (isDisabled) return;
        navigate("/guide/result");
    };

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-3xl">
                <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-blue-600">GUIDE START</p>
                            <h1 className="mt-2 text-2xl font-bold text-slate-900">
                                내 상황에 맞는 가이드를 찾아볼게요
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                공간과 작업 범위를 고르면, 우선 확인해야 할 단계들을 먼저
                                보여드릴게요.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={resetGuide}
                            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                            초기화
                        </button>
                    </div>

                    <section className="mt-8">
                        <h2 className="text-base font-semibold text-slate-900">
                            1. 어떤 공간인가요?
                        </h2>

                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {spaceOptions.map((option) => {
                                const selected = spaceType === option;

                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setSpaceType(option)}
                                        className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                                            selected
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-base font-semibold text-slate-900">
                            2. 어느 정도까지 할 예정인가요?
                        </h2>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            {scopeOptions.map((option) => {
                                const selected = scope === option;

                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setScope(option)}
                                        className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                                            selected
                                                ? "border-blue-600 bg-blue-600 text-white"
                                                : "border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="rounded-2xl border border-slate-300 px-5 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                        >
                            홈으로
                        </button>

                        <button
                            type="button"
                            onClick={handleStart}
                            disabled={isDisabled}
                            className={`rounded-2xl px-5 py-4 text-sm font-semibold text-white transition ${
                                isDisabled
                                    ? "cursor-not-allowed bg-slate-300"
                                    : "bg-slate-900 hover:opacity-90"
                            }`}
                        >
                            결과 보기
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}