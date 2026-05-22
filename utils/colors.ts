function hexToRgb(hex: string) {
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)
  return { r, g, b }
}

function rgbToHex(r: number, g: number, b: number) {
  const clamp = (val: number) => Math.max(0, Math.min(255, val))
  const rh = clamp(r).toString(16).padStart(2, '0')
  const gh = clamp(g).toString(16).padStart(2, '0')
  const bh = clamp(b).toString(16).padStart(2, '0')
  return `#${rh}${gh}${bh}`
}

function blend(rgb: { r: number; g: number; b: number }, target: { r: number; g: number; b: number }, weight: number) {
  return {
    r: Math.round(rgb.r * (1 - weight) + target.r * weight),
    g: Math.round(rgb.g * (1 - weight) + target.g * weight),
    b: Math.round(rgb.b * (1 - weight) + target.b * weight)
  }
}

export function generatePalette(baseHex: string) {
  let hex = baseHex.trim()
  if (!hex.startsWith('#')) {
    hex = '#' + hex
  }
  // Validate hex format, fallback to default brand green if invalid
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    hex = '#0b5a33'
  }
  const rgb = hexToRgb(hex)
  const white = { r: 255, g: 255, b: 255 }
  const black = { r: 0, g: 0, b: 0 }

  return {
    50: rgbToHex(blend(rgb, white, 0.95).r, blend(rgb, white, 0.95).g, blend(rgb, white, 0.95).b),
    100: rgbToHex(blend(rgb, white, 0.85).r, blend(rgb, white, 0.85).g, blend(rgb, white, 0.85).b),
    200: rgbToHex(blend(rgb, white, 0.70).r, blend(rgb, white, 0.70).g, blend(rgb, white, 0.70).b),
    300: rgbToHex(blend(rgb, white, 0.50).r, blend(rgb, white, 0.50).g, blend(rgb, white, 0.50).b),
    400: rgbToHex(blend(rgb, white, 0.25).r, blend(rgb, white, 0.25).g, blend(rgb, white, 0.25).b),
    500: hex,
    600: rgbToHex(blend(rgb, black, 0.15).r, blend(rgb, black, 0.15).g, blend(rgb, black, 0.15).b),
    700: rgbToHex(blend(rgb, black, 0.30).r, blend(rgb, black, 0.30).g, blend(rgb, black, 0.30).b),
    800: rgbToHex(blend(rgb, black, 0.45).r, blend(rgb, black, 0.45).g, blend(rgb, black, 0.45).b),
    900: rgbToHex(blend(rgb, black, 0.60).r, blend(rgb, black, 0.60).g, blend(rgb, black, 0.60).b)
  }
}
