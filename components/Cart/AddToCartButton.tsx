'use client';

import React from 'react';
import { useCartStore, CartItem } from '@/store/useCartStore';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

interface AddToCartButtonProps {
    item: Omit<CartItem, 'id'> & { id?: string }; // id optional in input, we generate unique if needed or use sku
    sku: string; // Product ID
}

export const AddToCartButton = ({ item, sku }: AddToCartButtonProps) => {
    const addItem = useCartStore((state) => state.addItem);

    const handleAdd = () => {
        addItem({
            id: crypto.randomUUID(),
            lensId: sku,
            lensCode: item.lensCode,
            modelName: item.modelName,
            price: item.price,
            image: item.image
        });
        toast.success(`Modelo ${item.lensCode} agregado al pedido`, {
            description: "Revisá el carrito para finalizar la solicitud.",
            duration: 3000,
        });
    };

    return (
        <button
            onClick={handleAdd}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-500 transition-colors mb-4 shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 active:scale-95 duration-100"
        >
            <ShoppingBag size={20} />
            AGREGAR AL CARRITO
        </button>
    );
};
