import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';

@Component({
  selector: 'app-location-stadistics',
  standalone: false,
  templateUrl: './location-stadistics.component.html',
  styleUrl: './location-stadistics.component.scss'
})
export class LocationStadisticsComponent implements OnInit {
  constructor(private firestoreService: FirestoreService) {}

  // Variables
  countries!: string[];
  states!: string[];

  ngOnInit(): void {
    this.firestoreService.countries$.subscribe(countries => {
      this.countries = countries;
    });

    this.firestoreService.states$.subscribe(states => {
      this.states = states;
    });
  }
}
