import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService.loadUserCollection();
    this.firestoreService.loadFormulariosCollection();
  }
}
