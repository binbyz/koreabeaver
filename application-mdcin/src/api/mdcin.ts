import http from '@/http'
import { MdcinItem } from '@/api/types'
import { AxiosResponse } from 'axios'

export function fetchItems (): Promise<AxiosResponse<Partial<MdcinItem>[]>> {
  return http.get('/items?sort=recent&take=10&skip=0&brief=1')
}

export function fetchItem (id: number): Promise<AxiosResponse<MdcinItem>> {
  return http.get(`/item/${id}`)
}
