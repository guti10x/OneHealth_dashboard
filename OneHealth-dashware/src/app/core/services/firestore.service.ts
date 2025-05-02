import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';

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
  private finalRankingSubject = new BehaviorSubject<string[]>([]);
  unlocks$ = this.unlocksSubject.asObservable();
  tiktokTime$ = this.tiktokTimeSubject.asObservable();
  screenTime$ = this.screenTimeSubject.asObservable();
  instagramTime$ = this.instagramTimeSubject.asObservable();
  finalRanking$ = this.finalRankingSubject.asObservable();
  private unlocksArraySubject = new BehaviorSubject<number[]>([]);
  private tiktokTimesArraySubject = new BehaviorSubject<number[]>([]);
  private screenTimesArraySubject = new BehaviorSubject<number[]>([]);
  private instagramTimesArraySubject = new BehaviorSubject<number[]>([]);
  private finalRankinsgArraySubject = new BehaviorSubject<string[]>([]);
  unlocksArray$ = this.unlocksArraySubject.asObservable();
  tiktokTimesArray$ = this.tiktokTimesArraySubject.asObservable();
  screenTimesArray$ = this.screenTimesArraySubject.asObservable();
  instagramTimesArray$ = this.instagramTimesArraySubject.asObservable();
  finalRankingsArray$ = this.finalRankinsgArraySubject.asObservable();
  
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
  
        formularios.forEach(form => {
          const sleepTime = form['sleep_time'] ? new Date(form['sleep_time'].seconds * 1000) : null;
          const wakeUpTime = form['wake_up_time'] ? new Date(form['wake_up_time'].seconds * 1000) : null;
          const restLevel = form['rest_level'] || 0;
  
          if (sleepTime && wakeUpTime) {
            const sleepDuration = (wakeUpTime.getTime() - sleepTime.getTime()) / (1000 * 60 * 60); // Duración en horas
            totalSleepDuration += sleepDuration;
          }
  
          if (sleepTime) totalSleepTime += sleepTime.getHours() * 60 + sleepTime.getMinutes();
          if (wakeUpTime) totalWakeUpTime += wakeUpTime.getHours() * 60 + wakeUpTime.getMinutes();
          totalRestLevel += restLevel;
  
          // Guardamos los valores para los gráficos
          if (restLevel) restLevels.push(restLevel);
          if (sleepTime) sleepTimes.push(sleepTime);
          if (wakeUpTime) wakeUpTimes.push(wakeUpTime);
        });
  
        return {
          totalForms: count,
          averageRestLevel: totalRestLevel / count,
          averageSleepTime: totalSleepTime / count,
          averageWakeUpTime: totalWakeUpTime / count,
          avgSleepDuration: totalSleepDuration / count,
          restLevels,
          sleepTimes,
          wakeUpTimes
        };
      })
    ).subscribe(result => {
      // Emitimos los datos a los Subjects correspondientes
      this.restLevelsSubject.next(result.restLevels);
      this.sleepTimesSubject.next(result.sleepTimes);
      this.wakeUpTimesSubject.next(result.wakeUpTimes);
  
      // Emitimos los otros valores a los Subjects de promedios
      this.totalFormsRecordsSubject.next(result.totalForms);
      this.averageRestLevelSubject.next(result.averageRestLevel);
      this.averageSleepTimeSubject.next(new Date(result.averageSleepTime * 60000));
      this.averageWakeUpTimeSubject.next(new Date(result.averageWakeUpTime * 60000));
      this.avgSleepDurationSubject.next(result.avgSleepDuration);
    });
  }
  
}