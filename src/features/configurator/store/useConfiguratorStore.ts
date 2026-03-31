import { create } from "zustand";

export type RoomType = "living-room" | "bedroom" | "kitchen";

type ConfiguratorState = {
    roomType: RoomType;
    wallColor: string;
    floorColor: string;
    furnitureColor: string;

    setRoomType: (roomType: RoomType) => void;
    setWallColor: (wallColor: string) => void;
    setFloorColor: (floorColor: string) => void;
    setFurnitureColor: (furnitureColor: string) => void;
    resetConfigurator: () => void;
};

const initialState = {
    roomType: "living-room" as RoomType,
    wallColor: "#f3efe7",
    floorColor: "#b78b63",
    furnitureColor: "#9ca3af",
};

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
    ...initialState,

    setRoomType: (roomType) => set({ roomType }),
    setWallColor: (wallColor) => set({ wallColor }),
    setFloorColor: (floorColor) => set({ floorColor }),
    setFurnitureColor: (furnitureColor) => set({ furnitureColor }),
    resetConfigurator: () => set(initialState),
}));