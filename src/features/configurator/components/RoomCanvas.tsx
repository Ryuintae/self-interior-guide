import { Canvas } from "@react-three/fiber";
import RoomScene from "./RoomScene";

export default function RoomCanvas() {
    return (
        <div className="h-[420px] w-full overflow-hidden rounded-3xl bg-slate-100 ring-1 ring-slate-200 lg:h-[520px] xl:h-[560px]">
            <Canvas
                shadows
                camera={{ position: [0, 7.5, 15.5], fov: 58 }}
                dpr={[1, 2]}
            >
                <RoomScene />
            </Canvas>
        </div>
    );
}