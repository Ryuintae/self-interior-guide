import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import { useConfiguratorStore } from "../store/useConfiguratorStore";

function RoomShell({
                       wallColor,
                       floorColor,
                   }: {
    wallColor: string;
    floorColor: string;
}) {
    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[12, 12]} />
                <meshStandardMaterial color={floorColor} />
            </mesh>

            <mesh position={[0, 2.5, -6]} castShadow receiveShadow>
                <boxGeometry args={[12, 5, 0.2]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>

            <mesh position={[-6, 2.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 5, 12]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>

            <mesh position={[6, 2.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 5, 12]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>
        </>
    );
}

function DecorativePlant({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.22, 0.28, 0.5, 24]} />
                <meshStandardMaterial color="#8b7355" />
            </mesh>

            <mesh castShadow position={[0, 0.8, 0]}>
                <sphereGeometry args={[0.45, 20, 20]} />
                <meshStandardMaterial color="#6f8f62" />
            </mesh>
        </group>
    );
}

function Cushion({
                     position,
                     color,
                 }: {
    position: [number, number, number];
    color: string;
}) {
    return (
        <mesh position={position} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.28, 0.5]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

function Frame({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1.2, 0.8, 0.06]} />
                <meshStandardMaterial color="#d6d3d1" />
            </mesh>
            <mesh position={[0, 0, 0.04]} castShadow receiveShadow>
                <boxGeometry args={[1, 0.6, 0.02]} />
                <meshStandardMaterial color="#e7e5e4" />
            </mesh>
        </group>
    );
}

function PendantLight() {
    return (
        <group position={[0, 4.1, -1.2]}>
            <mesh castShadow receiveShadow position={[0, -0.35, 0]}>
                <cylinderGeometry args={[0.45, 0.6, 0.55, 32]} />
                <meshStandardMaterial color="#f5f5f4" />
            </mesh>
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[0.03, 0.8, 0.03]} />
                <meshStandardMaterial color="#9ca3af" />
            </mesh>
        </group>
    );
}

function LivingRoomObjects({ furnitureColor }: { furnitureColor: string }) {
    return (
        <>
            <mesh position={[0, 0.8, 1.6]} castShadow receiveShadow>
                <boxGeometry args={[3.4, 1.2, 1.5]} />
                <meshStandardMaterial color={furnitureColor} />
            </mesh>

            <mesh position={[0, 1.45, 0.95]} castShadow receiveShadow>
                <boxGeometry args={[3.4, 1, 0.35]} />
                <meshStandardMaterial color={furnitureColor} />
            </mesh>

            <mesh position={[-1.45, 1.05, 1.6]} castShadow receiveShadow>
                <boxGeometry args={[0.3, 0.7, 1.4]} />
                <meshStandardMaterial color={furnitureColor} />
            </mesh>
            <mesh position={[1.45, 1.05, 1.6]} castShadow receiveShadow>
                <boxGeometry args={[0.3, 0.7, 1.4]} />
                <meshStandardMaterial color={furnitureColor} />
            </mesh>

            <Cushion position={[-0.8, 1.15, 1.45]} color="#e7e5e4" />
            <Cushion position={[0.0, 1.15, 1.45]} color="#d6d3d1" />
            <Cushion position={[0.8, 1.15, 1.45]} color="#cbd5e1" />

            <mesh position={[0, 0.45, -0.5]} castShadow receiveShadow>
                <boxGeometry args={[2, 0.16, 1.1]} />
                <meshStandardMaterial color="#7c5a43" />
            </mesh>

            <mesh position={[-0.78, 0.2, -0.08]} castShadow receiveShadow>
                <boxGeometry args={[0.12, 0.5, 0.12]} />
                <meshStandardMaterial color="#4b5563" />
            </mesh>
            <mesh position={[0.78, 0.2, -0.08]} castShadow receiveShadow>
                <boxGeometry args={[0.12, 0.5, 0.12]} />
                <meshStandardMaterial color="#4b5563" />
            </mesh>
            <mesh position={[-0.78, 0.2, -0.92]} castShadow receiveShadow>
                <boxGeometry args={[0.12, 0.5, 0.12]} />
                <meshStandardMaterial color="#4b5563" />
            </mesh>
            <mesh position={[0.78, 0.2, -0.92]} castShadow receiveShadow>
                <boxGeometry args={[0.12, 0.5, 0.12]} />
                <meshStandardMaterial color="#4b5563" />
            </mesh>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.2]} receiveShadow>
                <planeGeometry args={[4.6, 3]} />
                <meshStandardMaterial color="#e5e7eb" />
            </mesh>

            <mesh position={[0, 0.45, -5]} castShadow receiveShadow>
                <boxGeometry args={[3.2, 0.9, 0.6]} />
                <meshStandardMaterial color="#d6d3d1" />
            </mesh>

            <DecorativePlant position={[4.7, 0, -4.6]} />
            <Frame position={[-3.6, 3.1, -5.85]} />
            <Frame position={[3.4, 3.1, -5.85]} />
        </>
    );
}

function BedroomObjects({ furnitureColor }: { furnitureColor: string }) {
    return (
        <>
            <mesh position={[0, 0.42, 0.8]} castShadow receiveShadow>
                <boxGeometry args={[3.3, 0.45, 2.3]} />
                <meshStandardMaterial color={furnitureColor} />
            </mesh>

            <mesh position={[0, 0.72, 0.8]} castShadow receiveShadow>
                <boxGeometry args={[3.05, 0.35, 2.05]} />
                <meshStandardMaterial color="#f5f5f4" />
            </mesh>

            <mesh position={[0, 1.35, 1.9]} castShadow receiveShadow>
                <boxGeometry args={[3.3, 1.3, 0.22]} />
                <meshStandardMaterial color={furnitureColor} />
            </mesh>

            <mesh position={[-0.7, 0.95, 1.2]} castShadow receiveShadow>
                <boxGeometry args={[0.7, 0.2, 0.45]} />
                <meshStandardMaterial color="#e7e5e4" />
            </mesh>
            <mesh position={[0.7, 0.95, 1.2]} castShadow receiveShadow>
                <boxGeometry args={[0.7, 0.2, 0.45]} />
                <meshStandardMaterial color="#e7e5e4" />
            </mesh>

            <mesh position={[-2.35, 0.4, 1.35]} castShadow receiveShadow>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial color="#a8a29e" />
            </mesh>
            <mesh position={[2.35, 0.4, 1.35]} castShadow receiveShadow>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial color="#a8a29e" />
            </mesh>

            <mesh position={[4.6, 1.2, -2.9]} castShadow receiveShadow>
                <boxGeometry args={[1.3, 2.4, 1.5]} />
                <meshStandardMaterial color="#d6d3d1" />
            </mesh>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.2]} receiveShadow>
                <planeGeometry args={[4.3, 3.2]} />
                <meshStandardMaterial color="#ede9e1" />
            </mesh>

            <DecorativePlant position={[-4.8, 0, -4.8]} />
            <Frame position={[0, 3.1, -5.85]} />
        </>
    );
}

function KitchenObjects({ furnitureColor }: { furnitureColor: string }) {
    return (
        <>
            <mesh position={[0, 0.55, -5.1]} castShadow receiveShadow>
                <boxGeometry args={[5.8, 1.1, 0.85]} />
                <meshStandardMaterial color={furnitureColor} />
            </mesh>

            <mesh position={[0, 1.15, -5.1]} castShadow receiveShadow>
                <boxGeometry args={[6, 0.12, 0.92]} />
                <meshStandardMaterial color="#e7e5e4" />
            </mesh>

            <mesh position={[0, 2.45, -5.3]} castShadow receiveShadow>
                <boxGeometry args={[5.1, 1, 0.45]} />
                <meshStandardMaterial color="#cbd5e1" />
            </mesh>

            <mesh position={[0, 0.7, -1.8]} castShadow receiveShadow>
                <boxGeometry args={[2.7, 1.4, 1.25]} />
                <meshStandardMaterial color="#9ca3af" />
            </mesh>

            <mesh position={[0, 1.45, -1.8]} castShadow receiveShadow>
                <boxGeometry args={[2.9, 0.12, 1.35]} />
                <meshStandardMaterial color="#f5f5f4" />
            </mesh>

            <mesh position={[-1.15, 0.45, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.55, 0.9, 0.55]} />
                <meshStandardMaterial color="#6b7280" />
            </mesh>
            <mesh position={[0, 0.45, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.55, 0.9, 0.55]} />
                <meshStandardMaterial color="#6b7280" />
            </mesh>
            <mesh position={[1.15, 0.45, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.55, 0.9, 0.55]} />
                <meshStandardMaterial color="#6b7280" />
            </mesh>

            <DecorativePlant position={[4.9, 0, -4.7]} />
            <DecorativePlant position={[-4.9, 0, -4.7]} />
            <Frame position={[0, 3.05, -5.85]} />
        </>
    );
}

export default function RoomScene() {
    const { roomType, wallColor, floorColor, furnitureColor } = useConfiguratorStore();

    const roomObjects = useMemo(() => {
        switch (roomType) {
            case "bedroom":
                return <BedroomObjects furnitureColor={furnitureColor} />;
            case "kitchen":
                return <KitchenObjects furnitureColor={furnitureColor} />;
            case "living-room":
            default:
                return <LivingRoomObjects furnitureColor={furnitureColor} />;
        }
    }, [roomType, furnitureColor]);

    return (
        <>
            <color attach="background" args={["#f8fafc"]} />

            <ambientLight intensity={1.0} color="#ffffff" />
            <directionalLight
                position={[6, 10, 6]}
                intensity={1.35}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <directionalLight position={[-5, 6, -4]} intensity={0.3} color="#ffffff" />

            <RoomShell wallColor={wallColor} floorColor={floorColor} />
            <PendantLight />
            {roomObjects}

            <gridHelper args={[12, 12, "#d1d5db", "#e5e7eb"]} position={[0, 0.01, 0]} />

            <OrbitControls
                enablePan={false}
                minDistance={12}
                maxDistance={34}
                minPolarAngle={Math.PI / 3.3}
                maxPolarAngle={Math.PI / 2.1}
                target={[0, 2.1, -2.2]}
            />
        </>
    );
}