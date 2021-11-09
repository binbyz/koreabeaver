import http from '@/http'
import { AxiosResponse } from 'axios'

export function getLatestGoods (): Promise<AxiosResponse<any, any>> {
  return http.get('/get')
}
