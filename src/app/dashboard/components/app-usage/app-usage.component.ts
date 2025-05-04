import { Component } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';

@Component({
  selector: 'app-app-usage',
  standalone: false,
  templateUrl: './app-usage.component.html',
  styleUrl: './app-usage.component.scss'
})
export class AppUsageComponent {

  unlocks!: number;
  tiktokTime!: number;
  screenTime!: number;
  instagramTime!: number;

  finalRankingSubject: { app: string; position0: number; position1: number; position2: number; }[] = [];
  unlocksArray: number[] = [];
  tiktokTimesArray: number[] = [];
  screenTimesArray: number[] = [];
  instagramTimesArray: number[] = [];

  podium: { app: string }[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService.unlocks$.subscribe(value => {
      this.unlocks = value;
      console.log('unlocks:', value);
    });

    this.firestoreService.tiktokTime$.subscribe(value => {
      this.tiktokTime = value;
      console.log('tiktokTime:', value);
    });

    this.firestoreService.screenTime$.subscribe(value => {
      this.screenTime = value;
      console.log('screenTime:', value);
    });

    this.firestoreService.instagramTime$.subscribe(value => {
      this.instagramTime = value;
      console.log('instagramTime:', value);
    });

    this.firestoreService.finalRanking$.subscribe(value => {
      this.finalRankingSubject = value;
      console.log('finalRanking:', value);

      // Calcular podio ordenando por peso de medallas
      const sorted = [...value].sort((a, b) => {
        const aScore = a.position0 * 3 + a.position1 * 2 + a.position2 * 1;
        const bScore = b.position0 * 3 + b.position1 * 2 + b.position2 * 1;
        return bScore - aScore;
      });

      this.podium = sorted.slice(0, 3).map(entry => ({ app: entry.app }));
    });

    this.firestoreService.unlocksArray$.subscribe(value => {
      this.unlocksArray = value;
      console.log('unlocksArray:', value);
    });

    this.firestoreService.tiktokTimesArray$.subscribe(value => {
      this.tiktokTimesArray = value;
      console.log('tiktokTimesArray:', value);
    });

    this.firestoreService.screenTimesArray$.subscribe(value => {
      this.screenTimesArray = value;
      console.log('screenTimesArray:', value);
    });

    this.firestoreService.instagramTimesArray$.subscribe(value => {
      this.instagramTimesArray = value;
      console.log('instagramTimesArray:', value);
    });
  }
}
