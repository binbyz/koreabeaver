import http from '@/http'
import { AxiosResponse } from 'axios'

export function getLatestGoods (): Promise<AxiosResponse<any, any>> {
  return http.get('/items?sort=recent&take=10&skip=0')
}
