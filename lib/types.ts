export interface Outfit {
  name: string
  pieces: string[]
  colorPalette: string[]
  shoes: string
  accessories: string
  whyItWorks: string
  confidenceScore: number
}

export interface SavedOutfit extends Outfit {
  savedAt: string
  occasion: string
  style: string
}
