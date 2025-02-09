export interface Member {
  name: string
  github?: string
  twitter?: string
  linkedin?: string;
}

export interface Community {
  id: string
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  location: {
    lat: number
    lng: number
  }
  province: string
  category: string
  website?: string
  twitter?: string
  whatsapp?: string;
  telegram?: string;
  discord?: string;
  members: Member[]
}

