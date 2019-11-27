import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  active: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
  }

  getRoute(){
    if (this.router.url !== '/') return "afterSearch";
  }

  search(query: string){
    console.log(query);
    this.active = true;
    this.router.navigate([`movies/${query}`])
  }
}
