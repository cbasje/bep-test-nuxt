import { GetterTree } from 'vuex/types'
import { RootState } from '..'
import { MarkersState } from './state'

const getters: GetterTree<MarkersState, RootState> = {
  getMarkers(state: MarkersState) {
    return state.markers
  },
}

export default getters
