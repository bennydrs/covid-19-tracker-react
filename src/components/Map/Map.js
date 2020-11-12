import React from 'react';
import './Map.css';
import { Map as LafletMap, TileLayer } from 'react-leaflet';
import { Card, CardContent } from '@material-ui/core';
import { showDataOnMap } from './../../util';

const Map = ({ countries, casesType, center, zoom }) => {
  return (
    <Card className="map">
      <LafletMap center={center} zoom={zoom}>
        {/* <CardContent> */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
        {/* </CardContent> */}
      </LafletMap>
    </Card>
  )
}

export default Map;
