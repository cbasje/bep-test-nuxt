import L from 'leaflet'
import { Geolocation } from '@capacitor/geolocation'

import { ActionTree, GetterTree, MutationTree } from 'vuex/types'

export interface RootState {
  location: L.LatLng
  isLoadingLocation: boolean
  zoom: number
}

export const state = (): RootState => ({
  // location: L.latLng(52.175982, 5.645263),
  location: L.latLng(52.002, 4.371),
  isLoadingLocation: false,
  // zoom: 8,
  zoom: 17,
})

export const getters: GetterTree<RootState, RootState> = {
  getLocation(state: RootState) {
    return state.location
  },
  isLoadingLocation(state: RootState) {
    return state.isLoadingLocation
  },
  getZoom(state: RootState) {
    return state.zoom
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async locateUser({ commit }) {
    commit('setLoadingLocation', true)

    const pos = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
    const latLng = L.latLng(
      pos.coords.latitude,
      pos.coords.longitude,
      pos.coords.altitude != null ? pos.coords.altitude : undefined
    )

    commit('setLocation', latLng)
    commit('user/setLocation', latLng)

    return latLng
  },
}

export const mutations: MutationTree<RootState> = {
  setLocation(state: RootState, payload: L.LatLng) {
    state.location = payload
    state.isLoadingLocation = false
  },
  setZoom(state: RootState, payload: number) {
    state.zoom = payload
  },
  setLoadingLocation(state: RootState, payload: boolean) {
    state.isLoadingLocation = payload
  },
}
