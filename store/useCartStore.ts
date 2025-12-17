import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
    id: string; // SKU or unique ID
    lensId: string; // Link to product page
    lensCode: string; // e.g. "64CM"
    modelName: string; // e.g. "Outlaw X6"
    price: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    toggleCart: () => void;
    closeCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (item) => {
                const currentItems = get().items;
                // Simple logic: Allow duplicates? For now, yes, or just add distinct items.
                // Let's just push unique ID items.
                // If we want to prevent adding the EXACT same item twice, we can check.
                // For simplicity, we'll append with a unique cart ID if needed, 
                // but for now let's assume one of each type or just list them.
                set({ items: [...currentItems, item], isOpen: true }); // Auto open cart on add
            },

            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },

            clearCart: () => {
                set({ items: [] });
            },

            toggleCart: () => {
                set({ isOpen: !get().isOpen });
            },

            closeCart: () => {
                set({ isOpen: false });
            }
        }),
        {
            name: 'pilla-cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
