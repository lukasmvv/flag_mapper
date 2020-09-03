import React from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import classes from './Map.module.css';
var mapData = require('../../localData.json'); 

const map = (props) => {

    //var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    const geoData = mapData.map(m => {
        return m.GeoJSON;
    });

    return (
        <div className={classes.Map}>
            <p>this is the map</p>
            <Map 
                 center={[-29.162118, 24.845233]} 
                 zoom={6} 
                 style={{ width: '100%', height: '900px'}}
              >
              {/* <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               /> */}
               {/* <GeoJSON data={props.data}/> */}
               <GeoJSON data={geoData}/>
             </Map>
        </div>  
    );
};

export default map;