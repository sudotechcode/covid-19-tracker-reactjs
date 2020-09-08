import React from 'react'
import { Map as LeafLetMap, TileLayer } from 'react-leaflet'
import { showDataOnMap } from '../util'

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="app__map">
            <LeafLetMap center={center} zoom={zoom}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* loop countries and draw circles */}
                {showDataOnMap(countries, casesType)}
            </LeafLetMap>
        </div>
    )
}

export default Map
