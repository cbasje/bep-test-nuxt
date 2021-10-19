import L from 'leaflet'
// FIXME
// eslint-disable-next-line import/named
import { Geolocation, Position } from '@capacitor/geolocation'

import { ActionTree, GetterTree, MutationTree } from 'vuex/types'

export interface RootState {
  isAdmin: boolean
  isAuthenticated: boolean
  location: L.LatLng
}

export const state = (): RootState => ({
  isAdmin: false,
  isAuthenticated: false,
  // location: L.latLng(52.175982, 5.645263),
  location: L.latLng(52.002, 4.371),
})

export const getters: GetterTree<RootState, RootState> = {
  isAdmin(state: RootState) {
    return state.isAdmin
  },
  isInhabitant(state: RootState) {
    return !state.isAdmin
  },
  isAuthenticated(state: RootState) {
    return state.isAuthenticated
  },
  getLocation(state: RootState) {
    return state.location
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async locateUser({ commit }) {
    await Geolocation.getCurrentPosition()
      .then((pos: Position) => {
        const location = L.latLng(pos.coords.latitude, pos.coords.longitude)
        commit('setLocation', location)
      })
      .catch((error: Error) => {
        throw error
      })
  },
}

export const mutations: MutationTree<RootState> = {
  setAdmin(state: RootState, payload: boolean) {
    state.isAdmin = payload
  },
  setAuthenticated(state: RootState, payload: boolean) {
    state.isAuthenticated = payload
  },
  setLocation(state: RootState, payload: L.LatLng) {
    state.location = payload
  },
}
