import { useEffect, useCallback, useRef } from 'react'
import maplibregl from 'maplibre-gl'

export interface UseMapLibreOptions {
  onMoveEnd: (bbox: string) => void
}

const boundsToBboxParam = (bounds: maplibregl.LngLatBounds): string => {
  const minLon = bounds.getWest()
  const minLat = bounds.getSouth()
  const maxLon = bounds.getEast()
  const maxLat = bounds.getNorth()

  return [minLon, minLat, maxLon, maxLat].map((n) => n.toFixed(4)).join(',')
}

export const useMapLibre = (options?: UseMapLibreOptions) => {
  const mapRef = useRef<maplibregl.Map | null>(null)
  const onMoveEndRef = useRef<UseMapLibreOptions['onMoveEnd']>(options?.onMoveEnd)

  // Mantiene el callback actualizado sin recrear el mapa
  useEffect(() => {
    onMoveEndRef.current = options?.onMoveEnd
  }, [options?.onMoveEnd])

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      mapRef.current?.remove()
      mapRef.current = null
      return
    }

    if (mapRef.current) return

    const map = new maplibregl.Map({
      container: node,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [4.2658, 39.8885],
      zoom: 5,
    })

    map.addControl(new maplibregl.NavigationControl(), 'top-right')

    const emitBox = () => {
      const bbox = boundsToBboxParam(map.getBounds())
      console.log(`[Map Bbox] ${bbox}`)
      onMoveEndRef.current?.(bbox)
    }

    map.on('load', emitBox)
    map.on('moveend', emitBox)

    mapRef.current = map
  }, [])

  return { setContainerRef, mapRef }
}
