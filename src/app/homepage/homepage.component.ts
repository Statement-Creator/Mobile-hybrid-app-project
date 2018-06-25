import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.getScoresCall();
    this.getArtistsCall();
  }

  scores = [];
  artists25=[];

  getScoresCall(){
    this.dataService.getScores().subscribe(data=> {this.scores=data;console.log(this.scores);});
  }

  getArtistsCall(){
    this.dataService.getTopArtists().subscribe(data=>{this.artists25=data.artists.artist[0].name;});
  }

}
