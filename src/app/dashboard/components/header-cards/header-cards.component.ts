import { Component } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';

@Component({
  selector: 'app-header-cards',
  standalone: false,
  templateUrl: './header-cards.component.html',
  styleUrl: './header-cards.component.scss'
})
export class HeaderCardsComponent {
  totalUsers: number | null = null;
  activeUsers: number | null = null;
  totalRecords: number | null = null;
  totalPredicitions : number | null = null;
  totalAnxietyPredicitionsDetected: number | null = null;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService.totalUsers$.subscribe(total => {
      this.totalUsers = total;
    });

    this.firestoreService.usersWithDeviceId$.subscribe(active => {
      this.activeUsers = active;
    });

    this.firestoreService.totalFormsRecords$.subscribe(records => {
       this.totalRecords = records;
    });

    this.firestoreService.numberPredictions$.subscribe(predictions => {
      this.totalPredicitions = predictions;
    });

    this.firestoreService.numberHighAnxietyPredictions$.subscribe(predictions => {
      this.totalAnxietyPredicitionsDetected = predictions;
    });
  }
}
