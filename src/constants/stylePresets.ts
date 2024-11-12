export const STYLE_PRESETS = {
  natural: {
    name: 'Natural',
    description: 'True-to-life scenes with authentic lighting.',
    prompt: (prefix: string) => `${prefix}, photorealistic, natural lighting, high detail, 4k photography`,
  },
  cinematic: {
    name: 'Cinematic',
    description: 'Crafted drama, movie-style lighting to make it pop.',
    prompt: (prefix: string) => `${prefix}, cinematic lighting, anamorphic, dramatic atmosphere, depth of field`,
  },
  abstract: {
    name: 'Abstract',
    description: 'Get artsy—capture that conceptual, off-beat vibe.',
    prompt: (prefix: string) => `${prefix}, abstract art, conceptual, artistic interpretation, bold colors`,
  },
  minimal: {
    name: 'Minimal',
    description: 'Sleek and simple, no frills, just class.',
    prompt: (prefix: string) => `${prefix}, minimalist, clean lines, simple shapes, negative space`,
  }
} as const;