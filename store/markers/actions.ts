import { ActionTree } from 'vuex/types/index'
import { RootState } from '..'
import { MarkersState } from './state'

const actions: ActionTree<MarkersState, RootState> = {
  // async loadSettings({ commit }) {
  //   const response = await $supabase.settings.loadSettings();
  //   commit('saveSettings', response.data.data);
  // },
  // async loadShipLocations({ commit }) {
  //   const response = await $supabase.settings.loadShipLocations();
  //   commit('saveShipLocations', response.data.data);
  // }
}

export default actions
