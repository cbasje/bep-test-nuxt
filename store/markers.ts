import { ActionTree, GetterTree, MutationTree } from 'vuex/types'
import { RootState } from '.'
import { MapMarker } from '~/types/map-marker'

export interface MarkersState {
  markers: MapMarker[]
}

export const state = (): MarkersState => ({
  markers: [],
})

export const getters: GetterTree<MarkersState, RootState> = {
  getMarkers(state: MarkersState) {
    return state.markers
  },
}

export const actions: ActionTree<MarkersState, RootState> = {
  // async loadSettings({ commit }) {
  //   const response = await $supabase.settings.loadSettings();
  //   commit('saveSettings', response.data.data);
  // },
  // async loadShipLocations({ commit }) {
  //   const response = await $supabase.settings.loadShipLocations();
  //   commit('saveShipLocations', response.data.data);
  // }
}

export const mutations: MutationTree<MarkersState> = {
  add(state: MarkersState, marker: MapMarker) {
    state.markers.push(marker)
  },
  addMultiple(state: MarkersState, markers: MapMarker[]) {
    state.markers.push(...markers)
  },
  remove(state: MarkersState, marker: MapMarker) {
    state.markers.splice(state.markers.indexOf(marker), 1)
  },
}
