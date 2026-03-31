import { useNavigate } from "react-router-dom";

export default function EstimatePage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-[#f6f7fb] px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-4xl rounded-[32px] bg-white px-8 py-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5">
                <p className="text-[13px] font-semibold text-blue-600">ESTIMATE</p>
                <h1 className="mt-3 text-[30px] font-bold tracking-[-0.03em] text-slate-950">
                    견적 만들기 페이지
                </h1>
                <p className="mt-4 text-[15px] leading-7 text-slate-600">
                    다음 단계에서 공간 선택형 견적 UI와 3D 옵션 구조를 추가할 예정입니다.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mt-6 rounded-[20px] bg-slate-950 px-5 py-4 text-sm font-semibold text-white"
                >
                    홈으로 이동
                </button>
            </div>
        </main>
    );
}