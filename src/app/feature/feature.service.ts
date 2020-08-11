import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  data: any;
  //dataUrl: string = 'assets/data.xml';
  dataUrl: string = 'assets/test.json';

  constructor(private http: HttpClient) { }

  getData() {
    this.data = this.http.get(this.dataUrl);
    return this.data;
  }

  //getData() {
  //  this.http.get(this.dataUrl)
  //  .subscribe(data => {
  //    this.data = data;
  //    console.log("Data: ", this.data);
  //  });
  //  const parser = new xml2js.Parser({ strict: false, trim: true });
  //  parser.parseString(this.data, (err, result) => {
  //    console.log("Result: ", result);
  //    return result;
  //  });
  //}

}
