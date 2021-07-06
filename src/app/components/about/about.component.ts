import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public web: string;

  constructor() { 
    this.title = "Dionisio Leal";
    this.subtitle = "Desarrallador web";
    this.web = "diolealc.com";
  }

  ngOnInit(): void {
  }

}
