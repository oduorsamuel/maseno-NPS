import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

const BASEURL = 'http://localhost:3000/';

@Injectable()
export class HttpService {
    constructor(private http: Http) {}

    getCredentials() {
        const headers = new Headers();
        const credentials = sessionStorage.getItem('auth.credentials');
        headers.append('Authorization', 'Basic ' + credentials);
        return headers;
    }
    getSurveys() {
        return this.http.get(BASEURL + 'getSurveys', {
            headers: this.getCredentials()
          });
    }
    getLocations() {
        return this.http.get(BASEURL + 'getLocations', {
            headers: this.getCredentials()
          });
    }
    getDepartments(){
        return this.http.get(BASEURL + 'departments',{
            headers: this.getCredentials()
        })
    }
    getdept(){
        return this.http.get(BASEURL + 'dept',{
            headers:this.getCredentials()
        })
    }

    getPrograms(){
        return this.http.get(BASEURL + 'programs',{
            headers:this.getCredentials()
        })
    }

    filterPrograms(departmentId){
        return this.http.get(BASEURL+ `programs/${departmentId}`,{
          headers:this.getCredentials()
        })
      }

      filterUnits(programId,year,semester){
        return this.http.get(BASEURL+ `programs/${programId}/${year}/${semester}`,{
          headers:this.getCredentials()
        })
      }

    getUnits(){
        return this.http.get(BASEURL + 'units',{
            headers:this.getCredentials()
        })
    }
    getEncounters(){
        return this.http.get(BASEURL + 'allSurvey',{
            headers:this.getCredentials()
        })
    }

    getSearch(unitCode){
        return this.http.get(BASEURL+ `allSurveys/${unitCode}`,{
          headers:this.getCredentials()
        })
      }

    storeSurveys(response) {
        return this.http.post(BASEURL + 'storeSurveys', response, {
            headers: this.getCredentials()
          });
    }
    login(response) {
        return this.http.post(BASEURL + 'login', response, {
            headers: this.getCredentials()
          });
    }
    logout() {
        return this.http.get(BASEURL + 'logout', {
            headers: this.getCredentials()
          });
    }

}
