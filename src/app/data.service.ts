import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http:Http) { }

  getScores(){
  return this.http.get('http://localhost:3000/api/scores').pipe(map(res=>res.json()));
}

  getTopArtists(){
    return this.http.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key={APIKEY}&limit=25&format=json').pipe(map(res=>res.json()));
  }

}