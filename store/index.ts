import L from 'leaflet'
import { ActionTree, GetterTree, MutationTree } from 'vuex/types'

export interface RootState {

  location: L.LatLng
  zoom: number
}

export const state = (): RootState => ({
  // location: L.latLng(52.175982, 5.645263),
  location: L.latLng(52.002, 4.371),
  zoom: 8,
})

export const getters: GetterTree<RootState, RootState> = {
  getLocation(state: RootState) {
    return state.location
  },
  getZoom(state: RootState) {
    return state.zoom
  },
}

export const actions: ActionTree<RootState, RootState> = {
  //
}

export const mutations: MutationTree<RootState> = {
  setLocation(state: RootState, payload: L.LatLng) {
    state.location = payload
  },
  setZoom(state: RootState, payload: number) {
    state.zoom = payload
  },
}
