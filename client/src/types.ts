export interface ICity {
  formattedName: string
  lon: number
  lat: number
  placeId: string
}

export interface IAttraction {
  formattedName: string
  lat: number
  lon: number
  webLink: string
}

export interface IAttractionInCity {
  formattedName: string
  lat: number
  lon: number
  webLink: string
  isVisited: boolean
}

export interface IAttractionsInCity {
  city: ICity
  attractions: IAttraction[]
}

export type AttractionsInCities = IAttractionsInCity[]
