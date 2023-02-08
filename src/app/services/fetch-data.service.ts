import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parser } from 'xml2js';
@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(public http: HttpClient) { }

  public xmlItems: any;

  getProduction() {


    //make the http request
    return this.http
      .get('assets/data/heise-atom.xml', {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then((data) => {
            this.xmlItems = data;
          });
      });
    /*Read Data*/
  }


  parseXML(data: any) {
    return new Promise(resolve => {
      let k: string | number,
        arr: any = [],
        parser = new Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err: any, result: any) {
        let obj = result.feed;
        for (k in obj.entry) {
          let item = obj.entry[k];
          arr.push({
            updated: item.updated[0],
            title: item.title[0],
            published: item.published[0],
            link: item.link[0],
            summary: item.summary[0],
            content: item.content[0],
            id: item.id[0]
          });
        }
        resolve(arr);
      });
    });
  }
}