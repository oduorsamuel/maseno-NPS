import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Departments } from './response';
const url="http://localhost:3000/";

@Injectable()
export class AdminService {
 

  constructor(private http:Http) { }
  getCredentials() {
    const headers = new Headers();
    const credentials = sessionStorage.getItem('auth.credentials');
    headers.append('Authorization', 'Basic ' + credentials);
    return headers;
}
  addDepartment(departments){
    return this.http.post(url + 'department',departments, {
      headers: this.getCredentials()
    });
                 
}

addProgram(programs){
  return this.http.post(url +'program', programs,{
    headers: this.getCredentials()
  });
 
}

addUnit(units){
 return this.http.post(url + 'unit', units,{
   headers:this.getCredentials()
 })
  }
getDepartments(){
  return this.http.get(url + 'departments',{
    headers:this.getCredentials()
  })
}
}
