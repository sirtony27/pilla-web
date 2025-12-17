import { create } from 'zustand';
import { Lens } from '@/types';
import { lenses } from '@/data/lenses';

interface LensStore {
    selectedLens: Lens | null;
    isCompareMode: boolean;
    comparePosition: number; // 0 to 100
    selectLens: (lens: Lens) => void;
    setCompareMode: (enabled: boolean) => void;
    setComparePosition: (pos: number) => void;
}

export const useLensStore = create<LensStore>((set) => ({
    selectedLens: lenses[0], // Default to first lens
    isCompareMode: true,
    comparePosition: 50,
    selectLens: (lens) => set({ selectedLens: lens }),
    setCompareMode: (enabled) => set({ isCompareMode: enabled }),
    setComparePosition: (pos) => set({ comparePosition: pos }),
}));
