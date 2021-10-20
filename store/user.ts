import L from 'leaflet'

import { Geolocation } from '@capacitor/geolocation'
import { Storage } from '@capacitor/storage'

import { ActionTree, GetterTree, MutationTree } from 'vuex/types'
import { RootState } from '.'
import { User } from '~/types/user'

export interface UserState {
  user: User
  isAdmin: boolean
  isAuthenticated: boolean
  location: L.LatLng
}

export const state = (): UserState => ({
  user: {} as User,
  isAdmin: false,
  isAuthenticated: false,
  location: L.latLng(0, 0),
})

export const getters: GetterTree<UserState, RootState> = {
  getUser(state: UserState) {
    return state.user
  },
  getUserId(state: UserState) {
    return state.user.id
  },
  isAdmin(state: UserState) {
    return state.isAdmin
  },
  isInhabitant(state: UserState) {
    return !state.isAdmin
  },
  isAuthenticated(state: UserState) {
    return state.isAuthenticated
  },
}

export const actions: ActionTree<UserState, RootState> = {
  async locateUser({ commit }) {
    const pos = await Geolocation.getCurrentPosition()
    const latLng = L.latLng(
      pos.coords.latitude,
      pos.coords.longitude,
      pos.coords.altitude != null ? pos.coords.altitude : undefined
    )

    commit('setLocation', latLng)

    return L.latLng(latLng)
  },
  async addNewUser({ dispatch }) {
    const data = await this.$supabase.from<User>('unique_users').insert({ name: '' })

    dispatch('saveNewUser', data)
  },
  async saveNewUser({ commit }, user: User) {
    await Storage.set({
      key: 'userId',
      value: String(user.id),
    })

    commit('setUser', user)
  }
}

export const mutations: MutationTree<UserState> = {
  setUser(state: UserState, user: User) {
    state.user = user
  },
  setAdmin(state: UserState, payload: boolean) {
    state.isAdmin = payload
  },
  setAuthenticated(state: UserState, payload: boolean) {
    state.isAuthenticated = payload
  },
  setLocation(state: UserState, payload: L.LatLng) {
    state.location = payload
  },
}