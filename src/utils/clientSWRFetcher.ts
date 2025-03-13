import { clientInstance } from './clientInstance'

export const clientSWRFetcher = async (url: string) =>
  await clientInstance().get(url)
    .then(response => response.data)
