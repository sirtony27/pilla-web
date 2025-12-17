import { Lens } from "@/types";

export const lenses: Lens[] = [
    {
        id: "64CM",
        modelName: "Outlaw X7",
        lensCode: "64CM",
        description: "El 64CM es una lente de súper realce para objetivos naranjas contra fondos verdes como árboles o pasto. Conocido como 'Banana', levanta el contraste de manera espectacular.",
        transmission: 64,
        family: "Chromashift",
        colorCategory: "Amarillo",
        imgUrl: "/lenses/64cm.png",
        simulationProfile: {
            hexOverlay: "#eeb44f",
            contrast: 1.15,
            saturation: 1.3,
            brightness: 1.1,
            sepia: 0.2
        },
        shaderConfig: {
            targetHue: 0.08, // Orange
            targetTolerance: 0.1,
            targetBoost: 1.4,
            suppressHue: 0.28, // Green
            suppressTolerance: 0.15,
            suppressFactor: 0.5 // darken green
        }
    },
    {
        id: "58ED",
        modelName: "Outlaw X7",
        lensCode: "58ED",
        description: "Enhanced Definition. Una lente violeta rica que neutraliza el fondo verde y hace estallar el plato naranja significativamente. Reproducción de color verdadero.",
        transmission: 58,
        family: "Post Calibración",
        colorCategory: "Violeta",
        imgUrl: "/lenses/58ed.png",
        simulationProfile: {
            hexOverlay: "#994c9e",
            contrast: 1.2,
            saturation: 1.4,
            brightness: 1.0,
            sepia: 0.1
        },
        shaderConfig: {
            targetHue: 0.08,
            targetTolerance: 0.12,
            targetBoost: 1.5,
            suppressHue: 0.28, // Green
            suppressTolerance: 0.3,
            suppressFactor: 0.2 // Heavy suppression (Purple neutralizes green)
        }
    },
    {
        id: "19CIN",
        modelName: "Outlaw X7",
        lensCode: "19CIN",
        description: "Chromashift High Contrast. Una lente roja intensa para luz brillante. Convierte los platos naranjas en bolas de luz brillantes, maximizando la adquisición.",
        transmission: 19,
        family: "Chromashift",
        colorCategory: "Rojo",
        imgUrl: "/lenses/19cin.png",
        simulationProfile: {
            hexOverlay: "#a62c2b",
            contrast: 1.35, // Slightly reduced to prevent blown out highlights with higher brightness
            saturation: 1.2,
            brightness: 1.15, // Significantly brighter (was 0.9)
            sepia: 0.0
        },
        shaderConfig: {
            targetHue: 0.05,
            targetTolerance: 0.08,
            targetBoost: 1.8,
            suppressHue: 0.3,
            suppressTolerance: 0.25,
            suppressFactor: 0.15 // Allow some background detail through (was 0.0)
        }
    },
    {
        id: "92PC",
        modelName: "Outlaw X7",
        lensCode: "92PC",
        description: "Pale Canary. Mínima reducción de luz, ideal para días de baja luminosidad o nublados. Levanta sutilmente el contraste sin oscurecer la visión.",
        transmission: 92,
        family: "Post Calibración",
        colorCategory: "Amarillo",
        imgUrl: "/lenses/92pc.png",
        simulationProfile: {
            hexOverlay: "#fcfc9f",
            contrast: 1.05,
            saturation: 1.1,
            brightness: 1.05,
            sepia: 0.0
        },
        shaderConfig: {
            targetHue: 0.1,
            targetTolerance: 0.15,
            targetBoost: 1.1, // Subtle
            suppressHue: 0.6, // Blue (Sky)
            suppressTolerance: 0.1,
            suppressFactor: 0.8
        }
    }
];
