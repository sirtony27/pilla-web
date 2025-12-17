export interface SimulationProfile {
  hexOverlay: string; // The base color tint (e.g., "#FF0000")
  contrast: number; // 1.0 is normal, >1.0 increases contrast
  saturation: number; // 1.0 is normal, >1.0 boosts colors
  brightness: number; // 1.0 is normal
  sepia?: number; // 0.0 to 1.0
  warmth?: number; // 0.0 to 1.0 (simulated via sepia/hue)
  colorMatrixValues?: string; // Legacy SVG 
}

export interface ShaderConfig {
  targetHue: number; // 0.0 - 1.0 (Orange is approx 0.08)
  targetTolerance: number; // Range of effect
  targetBoost: number; // Multiplier for Sat/Lightness
  suppressHue: number; // 0.0 - 1.0 (Green is approx 0.3)
  suppressTolerance: number;
  suppressFactor: number; // 0.0 = grayscale, 1.0 = no change
}

export interface Lens {
  id: string;
  modelName: string; // e.g., "Outlaw X7"
  lensCode: string; // e.g., "64CM"
  description: string;
  transmission: number; // VLT percentage
  simulationProfile: SimulationProfile;
  shaderConfig?: ShaderConfig; // New WebGL Physics parameters
  family: "Post Calibración" | "Chromashift" | "Neutralizer" | "Progresivo";
  colorCategory: "Violeta" | "Rojo" | "Amarillo" | "Naranja" | "Verde" | "Marrón";
  imgUrl: string; // Placeholder for lens image
}
