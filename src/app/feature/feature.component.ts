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

  constructor(private featureService: FeatureService) { }

  ngOnInit(): void {
    this.getData();
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

  getData(): any {
    this.featureService.getData()
    .subscribe(data => {
      this.mapData = data;
      console.log("Data: ", this.mapData);
      this.drawMap(this.mapData);
    });
  }

  drawMap(mapdata) {
    this.map = Leaflet.map('map').setView([mapdata[0].Location.Lat, mapdata[0].Location.Lon], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '©Angular LeafLet',
    }).addTo(this.map);

    mapdata.forEach(item => {
      // console.log(item.ID, item.Location.Lat, item.Location.Lon, item.Gui.Color.Red, item.Gui.Color.Green, item.Gui.Color.Blue);
      Leaflet.circle(
        [item.Location.Lat, item.Location.Lon], 
        {fillColor: 'rgb('+ item.Gui.Color.Red + ',' + item.Gui.Color.Green + ',' + item.Gui.Color.Blue +')', fillOpacity: 0.5, radius: 5000}
      )
      .addTo(this.map).bindPopup(item.ID).openPopup();
    });

    //Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    //antPath([[28.644800, 77.216721], [34.1526, 77.5771]], 
    //  { color: '#FF0000', weight: 5, opacity: 0.6 })
    //  .addTo(this.map);
  }

}
