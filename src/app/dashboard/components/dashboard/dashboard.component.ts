import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements  OnInit {

  constructor(private firestoreService: FirestoreService, 
    @Inject(PLATFORM_ID) private platformId: Object ){
    }

  ngOnInit(): void {

    //this.firestoreService.loadFormulariosCollection();
    //this.firestoreService.loadUserCollection();
    
      if (isPlatformBrowser(this.platformId)) {
      // Verifica si la página ya se cargó completamente
      if (document.readyState === 'complete') {
        this.llamarServicio();
      } else {
        // Espera al evento de carga completa
        window.addEventListener('load', () => {
          this.llamarServicio();
        });
      }
    }
    
  }

  llamarServicio() {
    this.firestoreService.loadUserCollection().subscribe((res: any) => {
      console.log('Servicio llamado después de cargar la página User collection:', res);
    });
    this.firestoreService.loadFormulariosCollection();
    this.firestoreService.loadModelPredictions().subscribe((res: any) => {
      console.log('Servicio llamado después de cargar la página Predicition Collection:', res);
    });
    this.firestoreService.loadTrainingStatistics();
  }

  downloadExcel() {
    this.firestoreService.exportFormulariosToExcel();
  }
}
