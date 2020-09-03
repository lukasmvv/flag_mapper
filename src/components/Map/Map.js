import React, {Component} from 'react';
//import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import classes from './Map.module.css';
import MapGL, {Source, Layer} from 'react-map-gl';
import {dataLayer} from './map-style.js';
var mapData = require('../../data/localData.json'); 

const MAPBOX_TOKEN = 'pk.eyJ1IjoibHVrYXNtdnYiLCJhIjoiY2tlbXl1bXAxMzR2bTJ5bHRoYm9xbmZvZiJ9.grLSLQucuMr5Lbd-7UXpFQ'; // Set your mapbox token here

class map extends Component {

    state = {
        viewport: {
            latitude: -29.162118,
            longitude: 24.845233,
            zoom: 3,
            bearing: 0,
            pitch: 0
        },
        hoveredFeature: null,
        data: {
                type: "FeatureCollection",
                features: mapData.map(m => {
                return {
                    "type": "Feature",
                    "properties": {
                        "CODE": m.Code,
                        "NAME": m.Name,
                        "DISTRICT": m.District,
                        "AREA": m["Area(km2)[2]"],
                        "POPULATION": m["Population(2016)[3]"]
                    },
                    "geometry": m.GeoJSON
                };
            })
        }
    }
    

    handleClick = (e) => {
        //this.setState({ currentPos: e.latlng });
        console.log(e);
    }

    onEachFeature = (component, feature, layer) => {
        console.log(component);
        console.log(feature);
        console.log(layer);
        layer.on({
            // mouseover: this.highlightFeature.bind(this),
            // mouseout: this.resetHighlight.bind(this),
            // click: (feature) => clickToFeature(feature)
            click: this.clickToFeature.bind(this)
          });
    }

    clickToFeature = (e) => {
        console.log(e.target);
    }

    // renderDistricts = (data) => {
    //     return data.map(d => {
    //         let style = { color: 'blue' };
    //         if (d.properties.CODE.includes('WC')) {
    //             style = { color: 'red' };
    //         }
    //         return <GeoJSON key={d.properties.CODE} data={d} style={style} onEachFeature={this.onEachFeature.bind(null,this)}></GeoJSON>
    //     });
    // }

    _onViewportChange = viewport => this.setState({viewport});

    _onHover = event => {
        const {
          features,
          srcEvent: {offsetX, offsetY}
        } = event;
        const hoveredFeature = features && features.find(f => f.layer.id === 'data');
    
        this.setState({hoveredFeature, x: offsetX, y: offsetY});
      };

      _renderTooltip() {
        const {hoveredFeature, x, y} = this.state;
    
        return (
          hoveredFeature && (
            <div className="tooltip" style={{left: x, top: y}}>
              <div>State: {hoveredFeature.properties.NAME}</div>
              {/* <div>Median Household Income: {hoveredFeature.properties.value}</div>
              <div>Percentile: {(hoveredFeature.properties.percentile / 8) * 100}</div> */}
            </div>
          )
        );
      }

      _onClick = event => {
        const {
          features,
          srcEvent: { offsetX, offsetY }
        } = event;
        console.log(features[0])
      };

    render() {
        const {viewport, data} = this.state;
        return (
            <div className={classes.Map}>
                {/* <Map 
                     center={[-29.162118, 24.845233]} 
                     zoom={5.3} 
                     style={{ width: '100%', height: '100%'}}
                    //  onClick={handleClick}
                  >
                  <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   />
                   <GeoJSON data={props.data}/> */}
                   {/* <GeoJSON data={geoData} />
                   {this.renderDistricts(this.state.geoData)}
                 </Map> */}
                <MapGL
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapStyle="mapbox://styles/mapbox/light-v9"
                    onViewportChange={this._onViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    onHover={this._onHover}
                    onClick={this._onClick}
                    >
                    <Source type="geojson" data={data}>
                        <Layer {...dataLayer} />
                    </Source>
                    {this._renderTooltip()}
                </MapGL>
            </div>  
        );
    };
};

export default map;