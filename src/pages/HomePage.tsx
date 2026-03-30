import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-3xl">
                <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <p className="text-sm font-semibold text-blue-600">
                        SELF INTERIOR GUIDE
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        처음 하는 셀프 인테리어,
                        <br />
                        어디서부터 시작할지 알려드릴게요.
                    </h1>

                    <p className="mt-4 text-base leading-7 text-slate-600">
                        초보자를 위한 단계별 가이드와, 나중에 확장될 공간 기반 견적
                        기능까지 연결하는 셀프 인테리어 서비스입니다.
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => navigate("/guide")}
                            className="rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            가이드 시작하기
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/estimate")}
                            className="rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            견적 만들기
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}