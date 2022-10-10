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
  isVisited: boolean
}

export interface ICityWithAttractions {
  city: ICity
  attractions: IAttraction[]
}

export interface IPopup {
  cityWithAttractions: ICityWithAttractions
  popupType: 'city' | 'attraction'
  attraction?: IAttraction
}

export interface IMapViewport {
  latitude: number
  longitude: number
  zoom: number
}
