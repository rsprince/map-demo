import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  data: any;
  xmldata: any = {};
  xmlDataUrl: string = 'assets/data.xml';
  dataUrl: string = 'assets/test.json';

  constructor(private http: HttpClient) { }

  getData() {
    this.data = this.http.get(this.dataUrl);
    return this.data;
  }

  getXMLData() {  
    this.xmldata = this.http.get(this.xmlDataUrl, {  
			headers: new HttpHeaders()  
			.set('Content-Type', 'text/xml')  
			.append('Access-Control-Allow-Methods', 'GET')  
			.append('Access-Control-Allow-Origin', '*')  
			.append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
			responseType: 'text'  
		});
		return this.xmldata;
  }

}
