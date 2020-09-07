import React, {Component} from 'react';
// import { Map, TileLayer, Marker, Popup, GeoJSON, withLeaflet } from 'react-leaflet';
import { Map, GeoJSON, withLeaflet } from 'react-leaflet';
import PrintControlDefault from 'react-leaflet-easyprint';
import "leaflet/dist/leaflet.css";
import "./Map.css"; // overwrite default map css
import classes from './Map.module.css';
import localMuni from '../../data/localData.json'; 
import {connect} from 'react-redux';
import * as actions from '../../store/actions/areas';

// https://www.youtube.com/watch?v=D4jq5Bd9bTA&list=WL&index=2&t=0s&ab_channel=CodingWithAdam
// https://datahub.io/

// wrap `PrintControl` component with `withLeaflet` HOC
const PrintControl = withLeaflet(PrintControlDefault);

class map extends Component {

    totalPopulation = localMuni.map(m => parseInt(m["Population(2016)[3]"].replaceAll(',',''))).reduce((a, b) => a + b, 0);
    state = {
        customSize: {
          width: 0, // pixels at 90dpi
          height: 0, //pixels at 90dpi
          className: 'a3CssClass',
          tooltip: 'A custom A3 size'
        },
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
                        "POPPER": 100*parseInt(m["Population(2016)[3]"].replaceAll(',',''))/this.totalPopulation,
                        "COLOR": "#FFF000"
                    },
                    "geometry": m.GeoJSON
                };
            })
        }
    }
    
    componentDidMount() {
      // setting size for export and print options after initial component mount
      if (this.state.customSize.width===0) {
        const cSize = {
          width: document.getElementById('MapDiv').clientWidth, // pixels at 90dpi
          height: document.getElementById('MapDiv').clientHeight, //pixels at 90dpi
          className: 'a3CssClass',
          tooltip: 'A custom A3 size'
        };
        this.setState({customSize: cSize});
      }
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
      // const dName = district.properties.NAME;
      const pop = district.properties.POPULATION;
      // layer.bindPopup(`${dName}: ${pop}`);
      layer.options.fillColor = this.getColor(district.properties.PROVINCE);
      layer.options.color = 'grey';
      layer.options.fillOpacity = district.properties.POPPER;
      layer.on({
        mouseover: this.mouseover,
        click: this.clickToFeature,
      });
      this.props.addToTotalPop(pop);
    };

    mouseover = (e) => {
      // e.target.setStyle({
      //   color: 'green',
      //   fillColor: 'yellow'
      // });
      const muniProps = e.target.feature.properties;
      const population = muniProps.POPULATION;
      const muniName = muniProps.NAME;
      this.props.updateLocalPop(population, muniName);
    }

    clickToFeature = (e) => {
      const muniProps = e.target.feature.properties;
      const population = muniProps.POPULATION;
      const area = this.props.areas.filter(area => area.active);
      if (area.length!==0) {
        const newColor = area[0].color;
        const oldColor = e.target.options.fillColor;
        e.target.setStyle({
          // color: 'pink',
          fillColor: newColor,
          fillOpacity: 1
        });
        this.props.updatePopulations(oldColor, newColor, population);
      }
    }

    colorChange = (e) => {
      this.setState({color: e.target.value});
    }

    render() {
      const {viewport, data} = this.state;
      return (
          <div className={classes.Map}id={'MapDiv'}>
              <Map center={[viewport.latitude, viewport.longitude]} zoom={viewport.zoom} zoomSnap={0.25} zoomDelta={0.25} style={{ width: '100%', height: '100%'}}>
                <GeoJSON data={data.features} style={this.districtStyle} onEachFeature={this.onEachDistrict}/>
                  <PrintControl ref={(ref) => { this.printControl = ref; }} position="topleft" sizeModes={['Current', 'A4Portrait', 'A4Landscape', this.state.customSize]} hideControlContainer={false} />
                  <PrintControl position="topleft" sizeModes={['Current', 'A4Portrait', 'A4Landscape', this.state.customSize]} hideControlContainer={false} title="Export as PNG" exportOnly />
              </Map>
          </div>  
      );
    };
};

const mapStateToProps = state => {
  return {
      areas: state.areas
  }
}

const mapDispatchToProps = dispatch => {
    return {
      updatePopulations: (oldColor, newColor, population) => dispatch(actions.updatePopulations(oldColor, newColor, population)),
      updateLocalPop: (localPop, localMuni) => dispatch(actions.updateLocalPop(localPop, localMuni)),
      addToTotalPop: (pop) => dispatch(actions.addToTotalPop(pop))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(map);