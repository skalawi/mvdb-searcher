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
  
  constructor(private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
  }

  search(query: string){
    console.log(query);
    this.router.navigate([`movies/${query}`])
  }
}
