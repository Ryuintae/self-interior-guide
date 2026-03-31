import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-[#f6f7fb] px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-6xl">
                <section className="rounded-[32px] bg-white px-6 py-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5 sm:px-10 sm:py-10">
                    <p className="text-[13px] font-semibold text-blue-600">
                        SELF INTERIOR GUIDE
                    </p>

                    <h1 className="mt-3 text-[34px] font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-[52px]">
                        처음 하는 셀프 인테리어,
                        <br />
                        단순 정보 말고
                        <br />
                        내 상황에 맞게 정리해드릴게요.
                    </h1>

                    <p className="mt-5 max-w-2xl text-[16px] leading-8 text-slate-600">
                        공간과 작업 범위를 선택하고, 현재 상황을 간단히 진단하면 지금 가장
                        먼저 봐야 할 단계들을 맞춤형으로 보여드려요.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/guide")}
                            className="rounded-[20px] bg-slate-950 px-5 py-4 text-[15px] font-semibold text-white transition hover:opacity-90"
                        >
                            가이드 시작하기
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/estimate")}
                            className="rounded-[20px] border border-slate-300 bg-white px-5 py-4 text-[15px] font-semibold text-slate-900 transition hover:bg-slate-50"
                        >
                            견적 만들기
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}