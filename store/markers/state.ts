import { MapMarker } from "~/types/map-marker";

export interface MarkersState {
  markers: MapMarker[]
}

function state(): MarkersState {
  return {
    markers: []
  }
};

export default state;
