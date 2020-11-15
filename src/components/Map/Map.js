import React from 'react';
import './Map.css';
import { Map as LafletMap, TileLayer } from 'react-leaflet';
import { Card, CardContent } from '@material-ui/core';
import { showDataOnMap, showDataOnMapWW } from './../../util';
import 'react-leaflet-fullscreen/dist/styles.css'
import FullscreenControl from 'react-leaflet-fullscreen';

const Map = ({ countries, casesType, center, zoom, country }) => {
  return (
    <Card className="map">
      <LafletMap center={center} zoom={zoom}>
        {/* <CardContent> */}
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
        />
        <FullscreenControl position="topright" />
        
        {country === 'Worldwide' ? showDataOnMapWW(countries, casesType) : showDataOnMap(countries, casesType, country)}
        
        {/* </CardContent> */}
      </LafletMap>
    </Card>
  )
}

export default Map;
