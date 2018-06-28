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
  songNames=[];
  lyrics;
  songTitle;

  toggleVar:boolean=true;
  toggleVar1:boolean=true;
  toggleVar2:boolean=true;
  toggleVar3:boolean=false;


  chosenArtist:String;
  chosenDifficulty;
  chosenSong;



  getScoresCall(){
    this.dataService.getScores().subscribe(data=> {this.scores=data;console.log(this.scores);});
  }

  getArtistsCall(){
    this.dataService.getTopArtists().subscribe(data=>{this.artists25=data.artists.artist; console.log(this.artists25); });
  }

  artistGotChosen(name){
    this.toggleVar = !this.toggleVar;
    this.chosenArtist = name;
    console.log(this.chosenArtist);
  }

  getTopSongsCall(){
    this.dataService.getTopSongsOfArtist(this.chosenArtist).subscribe(data=>{this.songNames=data.toptracks.track;})
  }

  getSongLyricsCall(){
    this.dataService.getSongLyrics(this.chosenSong,this.chosenArtist).subscribe(data=>{this.lyrics = data.result.track.text; this.songTitle = data.result.track.name; console.log(this.lyrics)});
  }

  songChosen(song){
    this.chosenSong= song;
    this.toggleVar2 = !this.toggleVar2
    this.getSongLyricsCall();
  }

  chosenDiff(difficulty){
    if(difficulty == "Easy" ){
      this.chosenDifficulty = "easy";
    }else if(difficulty == "Medium"){
      this.chosenDifficulty == "medium";
    }else{
      this.chosenDifficulty == "hard";
    }
    this.toggleVar1 = !this.toggleVar1;
    this.getTopSongsCall();
  }

  wrongAnswer1;
  wrongAnswer2;
  wrongAnswer3;

  lyricsSeperator(){
    const seperatedLyrics = this.lyrics.split('\n');
    let firstRandomNum = Math.floor((Math.random() * seperatedLyrics.length) + 1);
    let secondRandomNum = Math.floor((Math.random() * seperatedLyrics.length) + 1);
    let thirdRandomNum = Math.floor((Math.random() * seperatedLyrics.length) + 1);
    if(seperatedLyrics[firstRandomNum].charAt(0)=='' || seperatedLyrics[firstRandomNum].charAt(0)=='[' ){
      firstRandomNum += 2;
    }else{
      this.wrongAnswer1 = seperatedLyrics[firstRandomNum];
    }

    if(seperatedLyrics[secondRandomNum].charAt(0)=='' || seperatedLyrics[secondRandomNum].charAt(0)=='[' ){
      secondRandomNum += 2;
    }else{
      this.wrongAnswer2 = seperatedLyrics[secondRandomNum];
    }

    if(seperatedLyrics[thirdRandomNum].charAt(0)=='' || seperatedLyrics[thirdRandomNum].charAt(0)=='[' ){
      thirdRandomNum += 2;
    }else{
      this.wrongAnswer3 = seperatedLyrics[thirdRandomNum];
    }
    this.toggleVar3=true;

  }
  i:number=0;
  previousLyric;
  correctAnswer;
  previousVerse(){
    const seperatedLyrics = this.lyrics.split('\n');
    if(seperatedLyrics[this.i].charAt(0)=='' || seperatedLyrics[this.i].charAt(0)=='[' ){
      this.i += 2;
      this.previousLyric = seperatedLyrics[this.i];
    }else{
      this.previousLyric = seperatedLyrics[this.i];
    }
    if(seperatedLyrics[this.i+1].charAt(0)=='' || seperatedLyrics[this.i+1].charAt(0)=='[' ){
      this.i += 2;
      this.correctAnswer = seperatedLyrics[this.i+1];
    }else{
      this.correctAnswer = seperatedLyrics[this.i+1];
    }
  }
  incrementI(){
    this.i += 1;
  }
  correctAnswerPoint(){

  }
  incorrectAnswer(){

  }
  timer(){
    
  }


}
