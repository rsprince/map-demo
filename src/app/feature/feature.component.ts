import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { FeatureService } from './feature.service';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';


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
    this.getData();
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
    this.featureService.getXMLData();
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
    // center map (not working here)
    this.map = Leaflet.map('map').setView([mapdata[0].Location.Lat, mapdata[0].Location.Lon], 4);
    console.log("Center: ", [mapdata[0].Location.Lat, mapdata[0].Location.Lon]);
    // Set a map layer, add to map
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '©Angular LeafLet',
    }).addTo(this.map);

    // create markers
    mapdata.forEach((item, index, array) => {
      this.marker = Leaflet.circle(
        [item.Location.Lat, item.Location.Lon], 
        {fillColor: 'rgb('+ item.Gui.Color.Red + ',' + item.Gui.Color.Green + ',' + item.Gui.Color.Blue +')', fillOpacity: 0.5, radius: 5000}
      );
      // add markers to an array for comparison
      this.markerArray.push(this.marker);
      //console.log("markers: ", markerArray);
      
      // Add pop up with marker ID
      this.marker.addTo(this.map).bindPopup(item.ID).openPopup();

		});
		
		//Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    //antPath([[28.644800, 77.216721], [34.1526, 77.5771]], 
    //  { color: '#FF0000', weight: 5, opacity: 0.6 })
    //  .addTo(this.map);
    
  }
  
  centerMapOnMarker(map, marker) {
    var latLngs = [ marker.getLatLng() ];
    var markerBounds = Leaflet.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
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
			this.markerArray[i].setStyle({fillColor: 'rgb('+ this.mapData[i].Gui.Color.Red + ',' + this.mapData[i].Gui.Color.Green + ',' + this.mapData[i].Gui.Color.Blue +')'});
		}
	}

}
