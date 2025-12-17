'use client';

import React, { useState, useEffect } from 'react';

interface DualRangeSliderProps {
    min: number;
    max: number;
    onChange: (values: [number, number]) => void;
}

export const DualRangeSlider = ({ min, max, onChange }: DualRangeSliderProps) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);

    useEffect(() => {
        onChange([minVal, maxVal]);
    }, [minVal, maxVal, onChange]);

    return (
        <div className="relative w-full h-6 flex items-center">
            {/* Background Track */}
            <div className="absolute w-full h-1 bg-neutral-800 rounded-full z-0 overflow-hidden">
                {/* Active Range Highlight */}
                <div
                    className="h-full bg-indigo-500 absolute"
                    style={{
                        left: `${((minVal - min) / (max - min)) * 100}%`,
                        right: `${100 - ((maxVal - min) / (max - min)) * 100}%`
                    }}
                />
            </div>

            {/* Inputs */}
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                }}
                className="pointer-events-none absolute h-0 w-full outline-none z-20 [-webkit-appearance:none]"
                style={{
                    // Custom CSS generated/inlined for thumb styling
                }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                }}
                className="pointer-events-none absolute h-0 w-full outline-none z-20 [-webkit-appearance:none]"
            />

            {/* Visual Thumbs (Since standard inputs are hard to style consistently across dual setup without complex css, 
          we rely on the native inputs but we need to ensure they have pointer-events) 
          
          Simpler approach: Just style the inputs. 
      */}
            <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #6366f1; /* Indigo 500 */
          position: relative;
          z-index: 30;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        input[type='range']::-moz-range-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #6366f1;
        }
      `}</style>
        </div>
    );
};
