import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  // Header variables
  private totalUsersSubject = new BehaviorSubject<number>(0);
  private usersWithDeviceIdSubject = new BehaviorSubject<number>(0);
  private totalFormsRecordsSubject = new BehaviorSubject<number>(0);
  totalUsers$ = this.totalUsersSubject.asObservable();
  usersWithDeviceId$ = this.usersWithDeviceIdSubject.asObservable();
  totalFormsRecords$ = this.totalFormsRecordsSubject.asObservable();

  // Sleep variables
  private averageRestLevelSubject = new BehaviorSubject<number>(0);
  private averageSleepTimeSubject = new BehaviorSubject<Date | null>(null);
  private averageWakeUpTimeSubject = new BehaviorSubject<Date | null>(null);
  private avgSleepDurationSubject = new BehaviorSubject<number>(0);
  restLevelsSubject = new BehaviorSubject<number[]>([]);
  sleepTimesSubject = new BehaviorSubject<Date[]>([]);
  wakeUpTimesSubject = new BehaviorSubject<Date[]>([]);
  averageRestLevel$ = this.averageRestLevelSubject.asObservable();
  averageSleepTime$ = this.averageSleepTimeSubject.asObservable();
  averageWakeUpTime$ = this.averageWakeUpTimeSubject.asObservable();
  avgSleepDuration$ = this.avgSleepDurationSubject.asObservable();
  restLevels$ = this.restLevelsSubject.asObservable();
  sleepTimes$ = this.sleepTimesSubject.asObservable();
  wakeUpTimes$ = this.wakeUpTimesSubject.asObservable();

  // Mod variables
  private sadnessLevelSubject = new BehaviorSubject<number>(0);
  private maxAnxietyLevelSubject = new BehaviorSubject<number>(0);
  private happinessLevelSubject = new BehaviorSubject<number>(0);
  private avgEnergyLevelSubject = new BehaviorSubject<number>(0);
  private avgAnxietyLevelSubject = new BehaviorSubject<number>(0);
  private apathyLevelSubject = new BehaviorSubject<number>(0);
  sadnessLevel$ = this.sadnessLevelSubject.asObservable();
  maxAnxietyLevel$ = this.maxAnxietyLevelSubject.asObservable();
  happinessLevel$ = this.happinessLevelSubject.asObservable();
  avgEnergyLevel$ = this.avgEnergyLevelSubject.asObservable();
  avgAnxietyLevel$ = this.avgAnxietyLevelSubject.asObservable();
  apathyLevel$ = this.apathyLevelSubject.asObservable();
  private sadnessLevelsSubject = new BehaviorSubject<number[]>([]);
  private anxietyLevelsSubject = new BehaviorSubject<number[]>([]);
  private happinessLevelsSubject = new BehaviorSubject<number[]>([]);
  private energyLevelsSubject = new BehaviorSubject<number[]>([]);
  private apathyLevelsSubject = new BehaviorSubject<number[]>([]);
  sadnessLevels$ = this.sadnessLevelsSubject.asObservable();
  anxietyLevels$ = this.anxietyLevelsSubject.asObservable();
  happinessLevels$ = this.happinessLevelsSubject.asObservable();
  energyLevels$ = this.energyLevelsSubject.asObservable();
  apathyLevels$ = this.apathyLevelsSubject.asObservable();

  // Mobile variables
  private unlocksSubject = new BehaviorSubject<number>(0);
  private tiktokTimeSubject = new BehaviorSubject<number>(0);
  private screenTimeSubject = new BehaviorSubject<number>(0);
  private instagramTimeSubject = new BehaviorSubject<number>(0);
  private finalRankingSubject = new BehaviorSubject<{ app: string, position0: number, position1: number, position2: number }[]>([]);
  unlocks$ = this.unlocksSubject.asObservable();
  tiktokTime$ = this.tiktokTimeSubject.asObservable();
  screenTime$ = this.screenTimeSubject.asObservable();
  instagramTime$ = this.instagramTimeSubject.asObservable();
  finalRanking$ = this.finalRankingSubject.asObservable();
  private unlocksArraySubject = new BehaviorSubject<number[]>([]);
  private tiktokTimesArraySubject = new BehaviorSubject<number[]>([]);
  private screenTimesArraySubject = new BehaviorSubject<number[]>([]);
  private instagramTimesArraySubject = new BehaviorSubject<number[]>([]);
  unlocksArray$ = this.unlocksArraySubject.asObservable();
  tiktokTimesArray$ = this.tiktokTimesArraySubject.asObservable();
  screenTimesArray$ = this.screenTimesArraySubject.asObservable();
  instagramTimesArray$ = this.instagramTimesArraySubject.asObservable();
  
  // location
  private countriesSubject = new BehaviorSubject<string[]>([]);
  private statesSubject = new BehaviorSubject<string[]>([]);
  countries$ = this.countriesSubject.asObservable();
  states$ = this.statesSubject.asObservable();

  // Predictions

  // Biometric data

  public loadUserCollection(): void {
    const ref = collection(this.firestore, 'users');
    collectionData(ref, { idField: 'id' })
      .pipe(
        map(users => {
          const total = users.length;
          const withDevice = users.filter(user => user['device']).length;

          this.totalUsersSubject.next(total);
          this.usersWithDeviceIdSubject.next(withDevice);
        })
      )
      .subscribe();
  }

  private processSleepData(form: any) {
    const sleepTime = form['sleep_time'] ? new Date(form['sleep_time'].seconds * 1000) : null;
    const wakeUpTime = form['wake_up_time'] ? new Date(form['wake_up_time'].seconds * 1000) : null;
    let sleepDuration = 0;
  
    if (sleepTime && wakeUpTime) {
      sleepDuration = (wakeUpTime.getTime() - sleepTime.getTime()) / (1000 * 60 * 60);
    }
  
    return { sleepTime, wakeUpTime, sleepDuration };
  }

  private processLocationData(form: any) {
    const country = form['country'] || null;
    const state = form['state'] || null;
  
    return { country, state };
  }
  
  public loadFormulariosCollection(): void {
    const ref = collection(this.firestore, 'formularios');
    collectionData(ref, { idField: 'id' }).pipe(
      map(formularios => {
        let totalRestLevel = 0;
        let totalSleepTime = 0;
        let totalWakeUpTime = 0;
        let totalSleepDuration = 0;
        let count = formularios.length;
        const restLevels: number[] = [];
        const sleepTimes: Date[] = [];
        const wakeUpTimes: Date[] = [];
        const countries: string[] = [];
        const states: string[] = [];
  
        // Acumuladores móviles
        let totalUnlocks = 0;
        let totalTiktokTime = 0;
        let totalScreenTime = 0;
        let totalInstagramTime = 0;
  
        // Arrays móviles
        const unlocksArray: number[] = [];
        const tiktokTimesArray: number[] = [];
        const screenTimesArray: number[] = [];
        const instagramTimesArray: number[] = [];
  
        // Contador de apps por posición (0, 1, 2)
        const positionCounts: Record<string, number[]> = {};
  
        formularios.forEach(form => {
          // Datos de sueño
          const { sleepTime, wakeUpTime, sleepDuration } = this.processSleepData(form);
          if (sleepTime && wakeUpTime) totalSleepDuration += sleepDuration;
          if (sleepTime) totalSleepTime += sleepTime.getHours() * 60 + sleepTime.getMinutes();
          if (wakeUpTime) totalWakeUpTime += wakeUpTime.getHours() * 60 + wakeUpTime.getMinutes();
          totalRestLevel += form['rest_level'] || 0;
  
          if (form['rest_level']) restLevels.push(form['rest_level']);
          if (sleepTime) sleepTimes.push(sleepTime);
          if (wakeUpTime) wakeUpTimes.push(wakeUpTime);
  
          // Ubicación
          const { country, state } = this.processLocationData(form);
          if (country && !countries.includes(country)) countries.push(country);
          if (state && !states.includes(state)) states.push(state);
  
          // Datos móviles
          const unlocks = form['unlocks'] || 0;
          const tiktokTime = form['tiktok_time'] || 0;
          const screenTime = form['screen_time'] || 0;
          const instagramTime = form['instagram_time'] || 0;
  
          totalUnlocks += unlocks;
          totalTiktokTime += tiktokTime;
          totalScreenTime += screenTime;
          totalInstagramTime += instagramTime;
  
          unlocksArray.push(unlocks);
          tiktokTimesArray.push(tiktokTime);
          screenTimesArray.push(screenTime);
          instagramTimesArray.push(instagramTime);
  
          // Procesar final_ranking
          const rankingString = form['final_ranking'] || '';
          const apps: string[] = rankingString.split(',').map((app: string) => app.trim()).filter((app: string) => Boolean(app));
          apps.forEach((app: string, index: number) => {
            if (index <= 2) { // Solo contamos las posiciones 0, 1 y 2
              if (!positionCounts[app]) {
                positionCounts[app] = [0, 0, 0];
              }
              positionCounts[app][index]++;
            }
          });
        });
  
        // Crear el ranking final basado en la posición
        const finalRankingArray = Object.entries(positionCounts)
          .map(([app, counts]) => ({
            app,
            position0: counts[0],
            position1: counts[1],
            position2: counts[2]
          }))
          .sort((a, b) => (b.position0 + b.position1 + b.position2) - (a.position0 + a.position1 + a.position2));
  
        return {
          totalForms: count,
          averageRestLevel: totalRestLevel / count,
          averageSleepTime: totalSleepTime / count,
          averageWakeUpTime: totalWakeUpTime / count,
          avgSleepDuration: totalSleepDuration / count,
          restLevels,
          sleepTimes,
          wakeUpTimes,
          countries,
          states,
  
          averageUnlocks: totalUnlocks / count,
          averageTiktokTime: totalTiktokTime / count,
          averageScreenTime: totalScreenTime / count,
          averageInstagramTime: totalInstagramTime / count,
  
          unlocksArray,
          tiktokTimesArray,
          screenTimesArray,
          instagramTimesArray,
  
          finalRankingArray
        };
      })
    ).subscribe(result => {
      // Emitimos arrays de sueño y localización
      this.restLevelsSubject.next(result.restLevels);
      this.sleepTimesSubject.next(result.sleepTimes);
      this.wakeUpTimesSubject.next(result.wakeUpTimes);
      this.countriesSubject.next(result.countries);
      this.statesSubject.next(result.states);
  
      // Emitimos promedios de sueño
      this.totalFormsRecordsSubject.next(result.totalForms);
      this.averageRestLevelSubject.next(result.averageRestLevel);
      this.averageSleepTimeSubject.next(new Date(result.averageSleepTime * 60000));
      this.averageWakeUpTimeSubject.next(new Date(result.averageWakeUpTime * 60000));
      this.avgSleepDurationSubject.next(result.avgSleepDuration);
  
      // Emitimos datos móviles
      this.unlocksSubject.next(result.averageUnlocks);
      this.tiktokTimeSubject.next(result.averageTiktokTime);
      this.screenTimeSubject.next(result.averageScreenTime);
      this.instagramTimeSubject.next(result.averageInstagramTime);
  
      this.unlocksArraySubject.next(result.unlocksArray);
      this.tiktokTimesArraySubject.next(result.tiktokTimesArray);
      this.screenTimesArraySubject.next(result.screenTimesArray);
      this.instagramTimesArraySubject.next(result.instagramTimesArray);
  
      // Emitimos ranking final
      this.finalRankingSubject.next(result.finalRankingArray);
    });
  }
  
  
  
}