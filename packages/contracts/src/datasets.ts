export interface DatasetPoint {
  id: string
  title: string
  location: { lon: number; lat: number }
  datasetType: string
}

export interface DatasetsResponse {
  meta: {
    requestId: string
    bbox: string
    zoom: number
    timeFromBP: number
    timToBP: number
    cache: string
    generatedAt: string
  }
  data: {
    points: DatasetPoint[]
    clusters: unknown[]
  }
}
