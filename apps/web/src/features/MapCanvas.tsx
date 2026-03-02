import { useMapLibre } from '@/hooks/useMapLibre'
import './MapCanvas.css'

export const MapCanvas = () => {
  const { setContainerRef } = useMapLibre({
    onMoveEnd: (bbox: string) => {
      console.log(`[MapCanvas] Bbox updated: ${bbox}`)
    },
  })

  return <div ref={setContainerRef} className="mapcanvas" />
}
