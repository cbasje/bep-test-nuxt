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
  getFeedbackById(state: FeedbackState) {
    return (id: number) => {
      return state.feedback.find((res) => res.id === id)
    }
  },
}

export const actions: ActionTree<FeedbackState, RootState> = {
  async loadFeedback({ commit }) {
    const { body } = await this.$supabase
      .from<FeedbackResponse>('feedback')
      .select('*')
      .filter('lat', 'neq', '0')
      .filter('lng', 'neq', '0')

    commit('setFeedback', body);
  },
  async getWeather({ rootState }) {
    const location = rootState.location

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${process.env.VUE_APP_WEATHER}&units=metric&lang=nl`
    const { data } = await this.$axios.$get(url)
    console.log(data.main)

    return data.main.temp
  },
  async saveFeedback({ commit }, payload: FeedbackResponse) {
    const data = await this.$supabase.from<FeedbackResponse>('feedback').insert(payload)
    commit('add', data)
  },
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
