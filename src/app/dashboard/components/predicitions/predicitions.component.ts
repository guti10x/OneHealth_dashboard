import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';

@Component({
  selector: 'app-predicitions',
  standalone: false,
  templateUrl: './predicitions.component.html',
  styleUrl: './predicitions.component.scss'
})
export class PredicitionsComponent implements OnInit {

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    
  }
}
