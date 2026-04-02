import { Link } from "react-router-dom";
import RoomCanvas from "../features/configurator/components/RoomCanvas";
import {
    type RoomType,
    useConfiguratorStore,
} from "../features/configurator/store/useConfiguratorStore";
import PageShell from "../shared/ui/PageShell";
import SectionCard from "../shared/ui/SectionCard";

type ColorOption = {
    label: string;
    value: string;
};

const roomOptions: Array<{ label: string; value: RoomType; description: string }> = [
    {
        label: "거실",
        value: "living-room",
        description: "소파, 러그, 테이블 중심의 기본 거실 프리뷰",
    },
    {
        label: "침실",
        value: "bedroom",
        description: "침대, 협탁, 수납장 중심의 침실 프리뷰",
    },
    {
        label: "주방",
        value: "kitchen",
        description: "하부장, 상부장, 아일랜드 중심의 주방 프리뷰",
    },
];

const wallColors: ColorOption[] = [
    { label: "웜 화이트", value: "#f3efe7" },
    { label: "라이트 베이지", value: "#e7dccd" },
    { label: "소프트 그레이", value: "#d6d9df" },
    { label: "세이지", value: "#cdd6c4" },
];

const floorColors: ColorOption[] = [
    { label: "오크 우드", value: "#b78b63" },
    { label: "월넛", value: "#7c5a43" },
    { label: "애쉬", value: "#c5b7a5" },
    { label: "쿨 그레이", value: "#9ca3af" },
];

const furnitureColors: ColorOption[] = [
    { label: "라이트 그레이", value: "#9ca3af" },
    { label: "차콜", value: "#4b5563" },
    { label: "크림", value: "#e7e5e4" },
    { label: "올리브", value: "#7c8b6b" },
];

function OptionCard({
                        label,
                        description,
                        selected,
                        onClick,
                    }: {
    label: string;
    description: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                selected
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
            }`}
        >
            <div className="text-sm font-semibold">{label}</div>
            <p className={`mt-1 text-sm ${selected ? "text-slate-200" : "text-slate-500"}`}>
                {description}
            </p>
        </button>
    );
}

function ColorChip({
                       label,
                       value,
                       selected,
                       onClick,
                   }: {
    label: string;
    value: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                selected
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
            }`}
        >
      <span
          className="h-6 w-6 rounded-full ring-1 ring-black/10"
          style={{ backgroundColor: value }}
      />
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}

function calculateEstimate(
    roomType: RoomType,
    wallColor: string,
    floorColor: string,
    furnitureColor: string
) {
    const baseMap: Record<RoomType, number> = {
        "living-room": 190,
        bedroom: 155,
        kitchen: 280,
    };

    const premiumWalls = ["#e7dccd", "#cdd6c4"];
    const premiumFloors = ["#7c5a43"];
    const premiumFurniture = ["#4b5563", "#7c8b6b"];

    let total = baseMap[roomType];

    if (premiumWalls.includes(wallColor)) total += 15;
    if (premiumFloors.includes(floorColor)) total += 30;
    if (premiumFurniture.includes(furnitureColor)) total += 20;

    return {
        min: total,
        max: total + 80,
    };
}

export default function EstimatePage() {
    const {
        roomType,
        wallColor,
        floorColor,
        furnitureColor,
        setRoomType,
        setWallColor,
        setFloorColor,
        setFurnitureColor,
        resetConfigurator,
    } = useConfiguratorStore();

    const estimate = calculateEstimate(roomType, wallColor, floorColor, furnitureColor);

    const selectedRoomLabel =
        roomOptions.find((room) => room.value === roomType)?.label ?? "거실";
    const selectedWallLabel =
        wallColors.find((item) => item.value === wallColor)?.label ?? "웜 화이트";
    const selectedFloorLabel =
        floorColors.find((item) => item.value === floorColor)?.label ?? "오크 우드";
    const selectedFurnitureLabel =
        furnitureColors.find((item) => item.value === furnitureColor)?.label ??
        "라이트 그레이";

    return (
        <PageShell
            title="3D 견적 미리보기"
            description="왼쪽에서 공간을 바로 보고, 오른쪽 옵션만 스크롤하면서 빠르게 비교해보세요."
            headerAction={
                <Link
                    to="/guide/result"
                    className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    가이드 결과로
                </Link>
            }
        >
            <div className="space-y-6">
                {/* 상단 예상 견적 바 */}
                <section className="rounded-[28px] bg-slate-900 px-6 py-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-300">예상 견적 범위</p>
                            <div className="mt-2 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                                {estimate.min}만 ~ {estimate.max}만
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-300">
                                정확한 시공 견적이 아니라, 현재 선택 기준으로 빠르게 감을 잡기 위한 범위예요.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-200 lg:min-w-[320px]">
                            <div className="text-slate-400">공간</div>
                            <div className="text-right font-semibold text-white">{selectedRoomLabel}</div>
                            <div className="text-slate-400">벽</div>
                            <div className="text-right font-semibold text-white">{selectedWallLabel}</div>
                            <div className="text-slate-400">바닥</div>
                            <div className="text-right font-semibold text-white">{selectedFloorLabel}</div>
                            <div className="text-slate-400">가구</div>
                            <div className="text-right font-semibold text-white">
                                {selectedFurnitureLabel}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 본문 */}
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                    {/* 왼쪽 3D */}
                    <div>
                        <SectionCard
                            title="3D 미리보기"
                            description="드래그해서 각도를 돌려보고, 스크롤로 확대/축소할 수 있어요."
                        >
                            <RoomCanvas />
                        </SectionCard>
                    </div>

                    {/* 오른쪽 옵션 */}
                    <div className="xl:h-[670px] xl:overflow-hidden">
                        <div className="flex h-full flex-col rounded-[28px] bg-slate-50 ring-1 ring-slate-200">
                            <div className="flex-1 overflow-y-auto p-4 xl:pr-3">
                                <div className="space-y-4">
                                    <SectionCard
                                        title="공간 선택"
                                        description={"먼저 어떤 공간을 바꾸고 싶은지 \n골라보세요."}
                                    >
                                        <div className="grid gap-3">
                                            {roomOptions.map((room) => (
                                                <OptionCard
                                                    key={room.value}
                                                    label={room.label}
                                                    description={room.description}
                                                    selected={roomType === room.value}
                                                    onClick={() => setRoomType(room.value)}
                                                />
                                            ))}
                                        </div>
                                    </SectionCard>

                                    <SectionCard
                                        title="벽 색상"
                                        description={"페인트 변경 느낌으로 벽 컬러를 \n바로 바꿔볼 수 있어요."}
                                    >
                                        <div className="grid gap-3">
                                            {wallColors.map((color) => (
                                                <ColorChip
                                                    key={color.value}
                                                    label={color.label}
                                                    value={color.value}
                                                    selected={wallColor === color.value}
                                                    onClick={() => setWallColor(color.value)}
                                                />
                                            ))}
                                        </div>
                                    </SectionCard>

                                    <SectionCard
                                        title="바닥 색상"
                                        description="전체 분위기를 크게 좌우하는 요소예요."
                                    >
                                        <div className="grid gap-3">
                                            {floorColors.map((color) => (
                                                <ColorChip
                                                    key={color.value}
                                                    label={color.label}
                                                    value={color.value}
                                                    selected={floorColor === color.value}
                                                    onClick={() => setFloorColor(color.value)}
                                                />
                                            ))}
                                        </div>
                                    </SectionCard>

                                    <SectionCard
                                        title="가구 메인 컬러"
                                        description={"대표 가구 컬러를 바꾸는 방식으로 \n반영돼요."}
                                    >
                                        <div className="grid gap-3">
                                            {furnitureColors.map((color) => (
                                                <ColorChip
                                                    key={color.value}
                                                    label={color.label}
                                                    value={color.value}
                                                    selected={furnitureColor === color.value}
                                                    onClick={() => setFurnitureColor(color.value)}
                                                />
                                            ))}
                                        </div>
                                    </SectionCard>

                                    <SectionCard
                                        title="빠른 액션"
                                        description={"현재 선택을 초기화하거나 다른 가이드로 \n돌아갈 수 있어요."}
                                    >
                                        <div className="flex flex-col gap-3">
                                            <button
                                                type="button"
                                                onClick={resetConfigurator}
                                                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                            >
                                                초기화
                                            </button>

                                            <Link
                                                to="/guide"
                                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                                            >
                                                가이드 다시 보기
                                            </Link>
                                        </div>
                                    </SectionCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}