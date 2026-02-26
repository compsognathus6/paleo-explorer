import type { FastifyInstance } from 'fastify'

export async function datasetsRoutes(app: FastifyInstance) {
  app.get('/datasets', async (request) => {
    //bbbox string "minLon,minLat,maxLon,maxLat"
    const { bbox = '' } = request.query as { bbox?: string }

    return {
      meta: {
        requestId: request.id,
        bbox,
        zoom: 0,
        timeFromBP: 0,
        timeToBP: 0,
        cache: 'MISS',
        generatedAt: new Date().toISOString(),
      },
      data: {
        points: [
          {
            id: 'point-1',
            title: 'Demo dataset point 1',
            location: { lon: 4.2658, lat: 39.8885 },
            datasetType: 'demo',
          },
          {
            id: 'point-2',
            title: 'Demo dataset point 2',
            location: { lon: -64.7505, lat: 32.3078 },
            datasetType: 'demo',
          },
        ],
        clusters: [],
      },
    }
  })
}
