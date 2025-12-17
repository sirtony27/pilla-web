import { useMemo } from 'react';
import { SimulationProfile } from '@/types';

interface SimulationStyles {
    backdropFilter: string;
    backgroundColor: string;
    mixBlendMode?: 'multiply' | 'overlay' | 'soft-light' | 'color' | 'normal';
}

export const useLensSimulation = (profile: SimulationProfile | undefined): SimulationStyles => {
    return useMemo(() => {
        if (!profile) {
            return {
                backdropFilter: 'none',
                backgroundColor: 'transparent',
            };
        }

        // Construct the backdrop filter string
        // We utilize backdrop-filter to manipulate the scene behind the overlay
        const filters = [
            `contrast(${profile.contrast * 100}%)`,
            `saturate(${profile.saturation * 100}%)`,
            `brightness(${profile.brightness * 100}%)`,
            profile.sepia ? `sepia(${profile.sepia * 100}%)` : null,
        ].filter(Boolean).join(' ');

        return {
            backdropFilter: filters,
            // The background color acts as the physical tint of the lens
            // We use a low opacity to allow the scene to show through, but colored enough to tint it
            backgroundColor: profile.hexOverlay + '40', // Adding hex alpha roughly 25% (40 in hex is 64/255)
            // mixBlendMode can be adjusted. 'multiply' is good for subtractive lenses, 
            // but 'color' or 'overlay' might feel more like looking through glass without darkening too much.
            // Let's try 'multiply' for now or 'normal' if we just rely on opacity. 
            // With backdrop-filter handling contrast/sat, the color just needs to tint.
            // 'color' blend mode forces the hue/sat of the overlay onto the bg.
            mixBlendMode: 'multiply'
        };
    }, [profile]);
};
