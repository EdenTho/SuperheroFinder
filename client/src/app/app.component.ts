import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SuperHero } from './models/superhero';
import { SuperHeroFinderService } from './services/superhero-finder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  mostPopular?: SuperHero[]

  constructor(private superHeroFinder: SuperHeroFinderService) { }

  ngOnInit() {
    this.superHeroFinder.getMostPopular().subscribe(res => {
      this.mostPopular = res;
      console.log(this.mostPopular);
    })
  }

  searchForHero(name: string) {
    return this.superHeroFinder.getAllByName(name);
  }
}
