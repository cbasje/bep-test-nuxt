import { ActionTree, GetterTree, MutationTree } from 'vuex/types'
import { RootState } from '.'
import { FeedbackResponse } from '~/types/feedback-response'

export interface FeedbackState {
  feedback: FeedbackResponse[]
}

export const state = (): FeedbackState => ({
  feedback: [],
})

export const getters: GetterTree<FeedbackState, RootState> = {
  getFeedback(state: FeedbackState) {
    return state.feedback
  },
}

export const actions: ActionTree<FeedbackState, RootState> = {
  // async loadSettings({ commit }) {
  //   const response = await $supabase.settings.loadSettings();
  //   commit('saveSettings', response.data.data);
  // },
  // async loadShipLocations({ commit }) {
  //   const response = await $supabase.settings.loadShipLocations();
  //   commit('saveShipLocations', response.data.data);
  // }
}

export const mutations: MutationTree<FeedbackState> = {
  add(state: FeedbackState, response: FeedbackResponse) {
    state.feedback.push(response)
  },
  addMultiple(state: FeedbackState, feedback: FeedbackResponse[]) {
    state.feedback.push(...feedback)
  },
  setFeedback(state: FeedbackState, feedback: FeedbackResponse[]) {
    state.feedback = feedback
  },
  remove(state: FeedbackState, response: FeedbackResponse) {
    state.feedback.splice(state.feedback.indexOf(response), 1)
  },
}
