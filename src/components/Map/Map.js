import { Card, CardContent, Typography } from "@material-ui/core"
import { Map as LafletMap, TileLayer } from "react-leaflet"
import FullscreenControl from "react-leaflet-fullscreen"
import "react-leaflet-fullscreen/dist/styles.css"
import { capitalize, showDataOnMap, showDataOnMapWW } from "./../../util"
import "./Map.css"

const Map = ({ countries, casesType, center, zoom, country }) => {
  return (
    <Card className="map__card">
      <CardContent>
        <Typography variant="h6" component="h3" className="header__card">
          {country} Map of {capitalize(casesType)}
        </Typography>
        <LafletMap center={center} zoom={zoom} className="map">
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
          <FullscreenControl position="topright" />

          {country === "Worldwide"
            ? showDataOnMapWW(countries, casesType)
            : showDataOnMap(countries, casesType, country)}
        </LafletMap>
      </CardContent>
    </Card>
  )
}

export default Map
