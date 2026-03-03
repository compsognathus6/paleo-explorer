import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { DatasetsResponse } from '@paleo-explorer/contracts'
import { getJson } from '@/shared/api/bff'

export const useDatasets = (bbox: string | null) => {
  return useQuery({
    queryKey: ['datasets', bbox],
    enabled: Boolean(bbox),
    queryFn: async () => {
      const qs = new URLSearchParams()
      if (bbox) qs.set('bbox', bbox)
      return getJson<DatasetsResponse>(`/api/datasets?${qs.toString()}`)
    },
    placeholderData: keepPreviousData,
  })
}
