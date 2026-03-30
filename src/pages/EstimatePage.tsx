import { useNavigate } from "react-router-dom";

export default function EstimatePage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-blue-600">ESTIMATE</p>
                <h1 className="mt-2 text-2xl font-bold text-slate-900">
                    견적 만들기 페이지
                </h1>
                <p className="mt-4 text-slate-600">
                    이 페이지는 다음 단계에서 공간 선택형 견적 UI로 확장할 예정입니다.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                >
                    홈으로 이동
                </button>
            </div>
        </main>
    );
}