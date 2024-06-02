import * as Mapir from "mapir-react-component";

function NoskheMapMarker(props: { coordinates: number[]; anchor: string }) {
  return <Mapir.Marker Image="/map-marker.svg" {...props} />;
}

export { NoskheMapMarker };
