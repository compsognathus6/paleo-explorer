import { useState, useEffect } from 'react'
import maplibregl from 'maplibre-gl'

import { useMapLibre } from '@/hooks/useMapLibre'
import { useDatasets } from '@/hooks/useDatasets'

import './MapCanvas.css'

export const MapCanvas = () => {
  const [bbox, setBbox] = useState<string | null>(null)

  const { setContainerRef, mapRef } = useMapLibre({
    onMoveEnd: (nextBbox) => setBbox(nextBbox),
  })

  const { data } = useDatasets(bbox)

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const markers: maplibregl.Marker[] = []

    for (const p of data?.data.points ?? []) {
      const marker = new maplibregl.Marker()
        .setLngLat([p.location.lon, p.location.lat])
        .setPopup(new maplibregl.Popup().setText(p.title))
        .addTo(map)

      markers.push(marker)
    }

    return () => {
      markers.forEach((mark) => mark.remove())
    }
  }, [data, mapRef])

  return <div ref={setContainerRef} className="mapcanvas" />
}
