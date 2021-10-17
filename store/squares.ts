import { ActionTree, GetterTree, MutationTree } from 'vuex/types'
import { RootState } from '.'
import { Square } from '~/types/square'

export interface SquaresState {
  squares: Square[]
}

export const state = (): SquaresState => ({
  squares: [],
})

export const getters: GetterTree<SquaresState, RootState> = {
  getSquares(state: SquaresState) {
    return state.squares
  },
}

export const actions: ActionTree<SquaresState, RootState> = {
  // async loadSettings({ commit }) {
  //   const response = await $supabase.settings.loadSettings();
  //   commit('saveSettings', response.data.data);
  // },
  // async loadShipLocations({ commit }) {
  //   const response = await $supabase.settings.loadShipLocations();
  //   commit('saveShipLocations', response.data.data);
  // }
}

export const mutations: MutationTree<SquaresState> = {
  add(state: SquaresState, square: Square) {
    state.squares.push(square)
  },
  addMultiple(state: SquaresState, squares: Square[]) {
    state.squares.push(...squares)
  },
  setSquares(state: SquaresState, squares: Square[]) {
    state.squares = squares
  },
  remove(state: SquaresState, square: Square) {
    state.squares.splice(state.squares.indexOf(square), 1)
  },
}
