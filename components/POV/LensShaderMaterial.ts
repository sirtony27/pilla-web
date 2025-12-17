import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

export const LensShaderMaterial = shaderMaterial(
    {
        uTexture: null, // The Panoramic Image
        uSplit: 0.5, // 0.0 to 1.0 (Slider Position)
        uTint: new THREE.Color('#ffffff'), // Lens base color
        uTargetHue: 0.08, // Orange
        uTargetTol: 0.1,
        uTargetBoost: 1.0,
        uSuppressHue: 0.3, // Green
        uSuppressTol: 0.2,
        uSuppressFactor: 0.5,
        uResolution: new THREE.Vector2(1, 1) // For aspect ratio correction if needed
    },
    // Vertex Shader (Standard Plane)
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader (The Physics Logic)
    `
    uniform sampler2D uTexture;
    uniform float uSplit;
    uniform vec3 uTint;
    
    // Physics Uniforms
    uniform float uTargetHue;
    uniform float uTargetTol;
    uniform float uTargetBoost;
    uniform float uSuppressHue;
    uniform float uSuppressTol;
    uniform float uSuppressFactor;

    // Aspect Ratio Uniforms
    uniform vec2 uResolution; // Screen dimensions
    uniform vec2 uImageRes;   // Image dimensions

    varying vec2 vUv;

    // Helper: RGB to HSL
    vec3 rgb2hsl(vec3 c) {
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
    }

    // Helper: HSL to RGB
    vec3 hsl2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
    }

    // Helper: Cover UV Correction
    vec2 getCoverUv(vec2 uv, vec2 resolution, vec2 texRes) {
        float screenAspect = resolution.x / resolution.y;
        float texAspect = texRes.x / texRes.y;
        
        vec2 newUv = uv;
        
        if (screenAspect > texAspect) {
             // Screen is wider than image: Crop top/bottom
             float scale = screenAspect / texAspect;
             newUv.y = (newUv.y - 0.5) * scale + 0.5; // Scale Y around center
             // Fix: actually we want to map SCREEN UV to TEXTURE UV. 
             // If screen is wider, we need to pick a smaller vertical slice of the texture.
             // Wait, standard glsl cover logic:
             newUv.y = (uv.y - 0.5) * (resolution.y / resolution.x * texAspect) + 0.5;
             // Let's use a simpler known algo
             float r = texAspect / screenAspect;
             if (r < 1.0) { // Image is taller (narrower) than screen
                newUv.y = (uv.y - 0.5) * (1.0/r) + 0.5; 
             } else { // Image is wider than screen
                newUv.x = (uv.x - 0.5) * r + 0.5;
             }
        } else {
             // Screen is taller than image (or equal)
             float r = texAspect / screenAspect; // > 1 if image is wider
             // If image is wider, we need to crop sides.
              newUv.x = (uv.x - 0.5) * r + 0.5;
              // Wait my logic above was mixed.
              // Let's stick to the trusted method:
              // ratio = (screen.x/screen.y) / (img.x/img.y)
              // newUv = (uv - 0.5) * vec2(max(ratio, 1.), max(1./ratio, 1.)) + 0.5 ??? No.
        }
        return newUv;
    }

    void main() {
        // Calculate Aspect Ratio Correction ("Cover" style)
        float screenAspect = uResolution.x / uResolution.y;
        float imgAspect = uImageRes.x / uImageRes.y;
        
        vec2 ratio = vec2(
            min((screenAspect / imgAspect), 1.0),
            min((imgAspect / screenAspect), 1.0)
        );
        
        vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
        );
        
        // Use the corrected UV for texture sampling
        vec4 texColor = texture2D(uTexture, uv);
        vec3 finalColor = texColor.rgb;

        // Check Split using ORIGINAL vUv (screen space)
        if (vUv.x > uSplit) {
            // 1. Convert to HSL
            vec3 hsl = rgb2hsl(finalColor);
            float h = hsl.x;
            float s = hsl.y;
            float l = hsl.z;

            // 2. Physics: Target Boost (Orange)
            float distToTarget = abs(h - uTargetHue);
            if (distToTarget > 0.5) distToTarget = 1.0 - distToTarget; // Wrap hue

            if (distToTarget < uTargetTol) {
                // Smooth falloff
                float boost = smoothstep(uTargetTol, 0.0, distToTarget) * (uTargetBoost - 1.0) + 1.0;
                s *= boost;
                l *= boost;
            }

            // 3. Physics: Background Suppression (Green)
            float distToSuppress = abs(h - uSuppressHue);
            if (distToSuppress > 0.5) distToSuppress = 1.0 - distToSuppress;

            if (distToSuppress < uSuppressTol) {
                // Smooth falloff
                float suppression = smoothstep(uSuppressTol, 0.0, distToSuppress); 
                // Mix between original (1.0) and factor (0.0 or whatever)
                float factor = mix(1.0, uSuppressFactor, suppression);
                s *= factor;
                l *= factor * 0.8; // Also darken slightly
            }

            // 4. Convert back to RGB
            finalColor = hsl2rgb(vec3(h, s, l));

            // 5. Apply Global Tint (Multiply)
            finalColor *= uTint;
        } 
        // Else (Left side): Keep original texture 'finalColor'

        gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// extend({ LensShaderMaterial });
