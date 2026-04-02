import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type HeroSlide = {
    id: number;
    label: string;
    title: string;
    description: string;
    image: string;
};

const heroSlides: HeroSlide[] = [
    {
        id: 1,
        label: "SELF INTERIOR GUIDE",
        title: "처음 하는 셀프 인테리어,\n무엇부터 해야 할지 정리해드릴게요.",
        description:
            "공간과 작업 범위, 현재 상황을 선택하면 지금 가장 먼저 해야 할 단계들을 맞춤형으로 \n 확인할 수 있어요.",
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    },
    {
        id: 2,
        label: "INTERIOR ESTIMATE",
        title: "예산이 막막하다면,\n공간별 예상 견적부터 확인해보세요.",
        description:
            "거실, 침실, 주방 기준으로 옵션을 선택하고 셀프 시공과 부분 시공의 비용 감각을 \n 빠르게 잡아보세요.",
        image:
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
    },
    {
        id: 3,
        label: "3D CONFIGURATOR",
        title: "벽, 바닥, 가구 컬러를 바꾸며\n내 공간 무드를 미리 확인해보세요.",
        description:
            "설명만 읽는 게 아니라 직접 비교하면서 더 빠르게 결정할 수 있도록 3D 기반 configurator로 확장하고 있어요.",
        image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    },
    {
        id: 4,
        label: "PROMOTION",
        title: "요즘 많이 보는\n인테리어 추천 상품을 함께 확인해보세요.",
        description:
            "가이드와 견적만 보는 게 아니라, 실제로 많이 찾는 분위기와 추천 아이템 흐름까지 \n 한 번에 볼 수 있게 광고형 슬라이드도 추가했어요.",
        image:
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    },
];

const featureCards = [
    {
        title: "맞춤 가이드",
        description: "내 공간과 현재 상황에 맞는 셀프 인테리어 순서를 \n 정리해줘요.",
        badge: "Guide",
    },
    {
        title: "예상 견적 확인",
        description: "공간별 옵션을 선택하며 대략적인 비용 감각을 빠르게 \n잡을 수 있어요.",
        badge: "Estimate",
    },
    {
        title: "3D 미리보기",
        description: "벽, 바닥, 가구 컬러를 바꾸며 내 취향에 맞는 분위기를 \n비교해볼 수 있어요.",
        badge: "Preview",
    },
];

function ArrowLeftIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
                d="M14.5 5L8 12L14.5 19"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ArrowRightIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
                d="M9.5 5L16 12L9.5 19"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function HomePage() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentSlide = useMemo(() => heroSlides[currentIndex], [currentIndex]);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
        }, 8000);

        return () => window.clearInterval(timer);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    };

    return (
        <main className="min-h-screen bg-[#f6f7fb] px-4 py-4 sm:px-6 sm:py-6">
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
                <section className="overflow-hidden rounded-[32px] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
                    <div className="relative min-h-[540px] sm:min-h-[580px] lg:min-h-[660px]">
                        <img
                            key={currentSlide.id}
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-900/20" />
                        <div className="absolute left-[-80px] top-[-80px] h-52 w-52 rounded-full bg-blue-400/20 blur-3xl" />
                        <div className="absolute bottom-[-80px] right-[-30px] h-60 w-60 rounded-full bg-fuchsia-400/15 blur-3xl" />

                        <div className="relative z-10 flex min-h-[500px] items-center px-6 py-8 sm:min-h-[540px] sm:px-8 sm:py-9 lg:min-h-[560px] lg:px-12">
                            <div className="w-full max-w-3xl text-white">
                                <p className="text-[12px] font-semibold tracking-[0.18em] text-blue-200 sm:text-[13px]">
                                    {currentSlide.label}
                                </p>

                                <h1 className="mt-4 whitespace-pre-line text-[30px] font-bold leading-[1.12] tracking-[-0.045em] sm:text-[42px] lg:text-[43px]">
                                    {currentSlide.title}
                                </h1>

                                <p className="mt-5 max-w-2xl whitespace-pre-line text-[15px] leading-7 text-slate-200 sm:text-[16px] sm:leading-8">
                                    {currentSlide.description}
                                </p>

                                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/guide")}
                                        className="rounded-[20px] bg-white px-5 py-3.5 text-[15px] font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
                                    >
                                        가이드 보기
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate("/estimate")}
                                        className="rounded-[20px] border border-white/25 bg-white/10 px-5 py-3.5 text-[15px] font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/15"
                                    >
                                        견적 만들기
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-5 left-6 z-20 flex items-center gap-2 sm:left-8 lg:left-12">
                            {heroSlides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    aria-label={`${index + 1}번 슬라이드`}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2.5 rounded-full transition-all ${
                                        currentIndex === index
                                            ? "w-8 bg-white"
                                            : "w-2.5 bg-white/45 hover:bg-white/70"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="absolute bottom-5 right-6 z-20 flex gap-3 sm:right-8 lg:right-12">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/25"
                                aria-label="이전 슬라이드"
                            >
                                <ArrowLeftIcon />
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/25"
                                aria-label="다음 슬라이드"
                            >
                                <ArrowRightIcon />
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    {featureCards.map((card) => (
                        <div
                            key={card.title}
                            className="whitespace-pre-line rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ring-1 ring-black/5 transition hover:-translate-y-1"
                        >
                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                {card.badge}
                            </span>

                            <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.03em] text-slate-950">
                                {card.title}
                            </h2>

                            <p className="mt-3 text-[14px] leading-7 text-slate-600">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}