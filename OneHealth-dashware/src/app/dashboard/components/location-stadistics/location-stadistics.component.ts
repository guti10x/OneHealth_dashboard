import { Component } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';

@Component({
  selector: 'app-location-stadistics',
  standalone: false,
  templateUrl: './location-stadistics.component.html',
  styleUrl: './location-stadistics.component.scss'
})
export class LocationStadisticsComponent {
  constructor(private firestoreService: FirestoreService) {}

  // Variables
  countries!: string[];
  states!: string[];

  ngOnInit(): void {
    this.firestoreService.countries$.subscribe(values => {
      this.countries = values;
      console.log('countries:', values);
    });

    this.firestoreService.states$.subscribe(values => {
      this.states = values;
      console.log('states:', values);
    });
  }
}
