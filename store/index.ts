import { GetterTree, MutationTree } from "vuex/types"

export interface RootState {
  isAdmin: boolean
  isAuthenticated: boolean
}

export const state = (): RootState => ({
  isAdmin: false,
  isAuthenticated: false,
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
  }
}

export const mutations: MutationTree<RootState> = {
  setAdmin(state: RootState, payload: boolean) {
    state.isAdmin = payload
  },
  setAuthenticated(state: RootState, payload: boolean) {
    state.isAuthenticated = payload
  },
}
