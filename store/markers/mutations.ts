import { MarkersState } from './state'
import { MapMarker } from '~/types/map-marker'

const mutations = {
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

export default mutations
