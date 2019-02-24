import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {Http, RequestOptions,Headers,Response} from '@angular/http';
import {Attributes,Departments,Programs,AcademicYears} from './response';

@Injectable()
export class AdminService {
url="http://localhost:3000";

  constructor(private http:Http) { }
  addDepartment(item:Departments){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/department`,
                  body, options)
                 .map((response:Response)=>response.json());
}

addProgram(item:Programs){
  let body = JSON.stringify(item);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(`${this.url}/program`,
                body, options)
               .map((response:Response)=>response.json());
}

addUnit(item:Attributes){
  let body = JSON.stringify(item);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(`${this.url}/unit`,
                body, options)
               .map((response:Response)=>response.json());
              }

}
