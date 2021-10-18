import { ActionTree, GetterTree, MutationTree } from 'vuex/types'
import { RootState } from '.'
import { Solution } from '~/types/solution'


export interface SolutionsState {
  solutions: Solution[]
}

export const state = (): SolutionsState => ({
  solutions: [],
})

export const getters: GetterTree<SolutionsState, RootState> = {
  getSolutions(state: SolutionsState) {
    return state.solutions
  },
  getSolutionById(state: SolutionsState) {
    return (id: number) => {
      return state.solutions.find(sol => sol.id === id);
    }
  }
}

export const actions: ActionTree<SolutionsState, RootState> = {
  // async loadSettings({ commit }) {
  //   const response = await $supabase.settings.loadSettings();
  //   commit('saveSettings', response.data.data);
  // },
  // async loadShipLocations({ commit }) {
  //   const response = await $supabase.settings.loadShipLocations();
  //   commit('saveShipLocations', response.data.data);
  // }
}

export const mutations: MutationTree<SolutionsState> = {
  add(state: SolutionsState, solution: Solution) {
    state.solutions.push(solution)
  },
  addMultiple(state: SolutionsState, solutions: Solution[]) {
    state.solutions.push(...solutions)
  },
  setSolutions(state: SolutionsState, solutions: Solution[]) {
    state.solutions = solutions
  },
  remove(state: SolutionsState, solution: Solution) {
    state.solutions.splice(state.solutions.indexOf(solution), 1)
  },
}
