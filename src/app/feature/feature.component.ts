import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { FeatureService } from './feature.service';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import * as xml2js from 'xml2js';
import { Console } from 'console';


@Component({
  selector: 'feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  title = 'leafletApps';
  map: Leaflet.Map;
  mapData: any;
  range: number = 10;
  form: any = {range: ''};

  marker: any;
  markerArray = [];

  constructor(private featureService: FeatureService) { }

  ngOnInit(): void {
    //this.getData();
    this.getXMLData();
  }

  //options = {
  //  layers: [
  //    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //      attribution: '&copy; OpenStreetMap contributors'
  //    })
  //  ],
  //  zoom: 7,
  //  center: latLng([ 46.879966, -121.726909 ])
  //};

  getXMLData(): any {
    // get xml data from the service
    this.featureService.getXMLData()
    .subscribe(data => { 
        const parser = new xml2js.Parser({ strict: false, trim: true });
        parser.parseString(data, (err, result) => {
          result = result.INTERVIEW.UNIT;
          console.log("Result: ", result);
          this.mapData = result;
          this.drawMap(this.mapData);
        });       
      }
    );
    return true;
  }

  getData(): any {
    // Get the map data from a service
    this.featureService.getData()
    .subscribe(data => {
      this.mapData = data;
      console.log("Data: ", this.mapData);
      this.drawMap(this.mapData);
    });
  }


  drawMap(mapdata) {
    console.log("draw:", mapdata[0].LOCATION[0].LON);
    // center map
    let latitude = mapdata[0].LOCATION[0].LAT[0];
    let longitude = mapdata[0].LOCATION[0].LON[0];
    console.log("Center: ", latitude);
    this.map = Leaflet.map('map').setView([latitude, longitude], 4);
    // Set a map layer, add to map
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '©Angular LeafLet',
    }).addTo(this.map);

    // create markers
    mapdata.forEach((item, index, array) => {
      console.log("Create markers: ", item.GUI[0].COLOR[0].RED[0]);
      this.marker = Leaflet.circle(
        [item.LOCATION[0].LAT[0], item.LOCATION[0].LON[0]], 
        {fillColor: 'rgb('+ item.GUI[0].COLOR[0].RED[0] + ',' + item.GUI[0].COLOR[0].GREEN[0] + ',' + item.GUI[0].COLOR[0].BLUE[0] +')', fillOpacity: 0.5, radius: 5000}
      );
      // add markers to an array for comparison
      this.markerArray.push(this.marker);
      //console.log("markers: ", markerArray);
      
      // Add pop up with marker ID
      this.marker.addTo(this.map).bindPopup(item.ID[0]).openPopup();

		});
		
		//Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    //antPath([[28.644800, 77.216721], [34.1526, 77.5771]], 
    //  { color: '#FF0000', weight: 5, opacity: 0.6 })
    //  .addTo(this.map);
    
  }
	
	setRange() {
		// Set range value
    this.range = this.form.range;
		console.log("Set range: " + this.range);
		// Fire check range function
		this.checkRange();
		// by forcing blur, user must click on input again to enter a new value
		document.getElementById('range.input').blur();
  }

  checkRange() {
		// Reset markers to original colors
		this.resetRange();

		// To compare markers for distance, loop through the array
		for(let i=0; i < this.markerArray.length; i++) {

			// Check each array element against all others
			this.markerArray.forEach((item, index, array) => {
				
				// If not the same element...
				if(this.markerArray[i] !== array[index]) {
					
					//console.log("markerArray ", i, " !==  array ", index );
					
					// get the range
					let range = this.range;

					// check the distance between the two markers
					let markerFrom = this.markerArray[i];
					let markerTo = array[index];
					let from = markerFrom.getLatLng();
					let to = markerTo.getLatLng();
					let distance = from.distanceTo(to)/1609.34;
					//console.log("distance: ", distance);

					// if distance <= range
					if(distance <= range) {
						// set the marker color to red
						this.markerArray[i].setStyle({fillColor: 'red'});
					}
				}
			});
		}
	}
	
	resetRange() {
		// Reset original marker colors
		for(let i=0; i < this.mapData.length; i++) {
			console.log("Reset: ", this.mapData[i]);
			this.markerArray[i].setStyle({fillColor: 'rgb('+ this.mapData[i].GUI[0].COLOR[0].RED[0] + ',' + this.mapData[i].GUI[0].COLOR[0].GREEN[0] + ',' + this.mapData[i].GUI[0].COLOR[0].BLUE[0] +')'});
		}
	}

}
