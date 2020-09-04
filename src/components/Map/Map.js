import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./Map.css"; // overwrite default map css
import classes from './Map.module.css';
import localMuni from '../../data/localData.json'; 

// https://www.youtube.com/watch?v=D4jq5Bd9bTA&list=WL&index=2&t=0s&ab_channel=CodingWithAdam
// https://datahub.io/

const totalPop = 57780000;

class map extends Component {

    totalPopulation = localMuni.map(m => parseInt(m["Population(2016)[3]"].replaceAll(',',''))).reduce((a, b) => a + b, 0);
    state = {
        viewport: {
            latitude: -29.162118,
            longitude: 24.845233,
            zoom: 5.4
        },
        color: "#FFFF00",
        data: {
                type: "FeatureCollection",
                features: localMuni.map(m => {
                return {
                    "type": "Feature",
                    "properties": {
                        "CODE": m.Code,
                        "NAME": m.Name,
                        "DISTRICT": m.District,
                        "PROVINCE": m.Province,
                        "AREA": m["Area(km2)[2]"],
                        "POPULATION": parseInt(m["Population(2016)[3]"].replaceAll(',','')),
                        "POPPER": 100*parseInt(m["Population(2016)[3]"].replaceAll(',',''))/this.totalPopulation
                    },
                    "geometry": m.GeoJSON
                };
            })
        }
    }
    
    componentDidMount() {
      console.log(this.state);
    }

    getColor = (d) => {
      if (d==='Gauteng') {
        return 'red';
      } else if (d==='Western Cape') {
        return 'green';
      } else if (d==='Eastern Cape') {
        return 'blue';
      } else if (d==='KwaZulu-Natal') {
        return 'pink';
      } else if (d==='Northern Cape') {
        return 'yellow';
      } else if (d==='Free State') {
        return 'orange';
      } else if (d==='Limpopo') {
        return 'salmon';
      } else if (d==='Mpumalanga') {
        return 'aqua';
      } else if (d==='North West') {
        return 'grey';
      }
      return 'white';
    }

    districtStyle = {
        fillColor: 'green',
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '2',
        fillOpacity: 0.5
    };

    onEachDistrict = (district, layer) => {  
      const dName = district.properties.NAME;
      const pop = district.properties.POPULATION;
      //console.log(countryName);
      layer.bindPopup(`${dName}: ${pop} / ${district.properties.POPPER}`);
      layer.options.fillColor = this.getColor(district.properties.PROVINCE);
      //console.log(district.properties.POPPER);
      layer.options.fillOpacity = district.properties.POPPER;
      layer.on({
        mouseover: this.mouseover,
        click: this.clickToFeature,
      });
    };

    mouseover = (e) => {
      // e.target.setStyle({
      //   color: 'green',
      //   fillColor: 'yellow'
      // });
    }

    clickToFeature = (e) => {
      const muniProps = e.target.feature.properties;
      console.log(muniProps);
      e.target.setStyle({
        // color: 'green',
        fillColor: this.state.color,
        fillOpacity: 1
      });
    }

    colorChange = (e) => {
      this.setState({color: e.target.value});
    }

    render() {
      const {viewport, data} = this.state;
      
      return (
          <div className={classes.Map}>
              <Map center={[viewport.latitude, viewport.longitude]} zoom={viewport.zoom} style={{ width: '100%', height: '100%'}}>
                <GeoJSON data={data.features} style={this.districtStyle} onEachFeature={this.onEachDistrict}/>
              </Map>
              {/* <input type="color" value={this.state.color} onChange={this.colorChange}></input> */}
          </div>  
      );
    };
};

export default map;