import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Definición de la interfaz para los datos del excell
export interface FormularioData {
  id: string;
  user_id: string;
  rest_level: number;
  sleep_time: string;
  wake_up_time: string;
  unlocks: number;
  tiktok_time: number;
  screen_time: number;
  instagram_time: number;
  final_ranking: string;
  sadnessLevel: number;
  maxAnxietyLevel: number;
  happinessLevel: number;
  avgEnergyLevel: number;
  avgAnxietyLevel: number;
  apathyLevel: number;
  country: string;
  state: string;
  date: string
}

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore: Firestore) { }

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
  //private unlocksArraySubject = new BehaviorSubject<number[]>([]);
  //private tiktokTimesArraySubject = new BehaviorSubject<number[]>([]);
  //private screenTimesArraySubject = new BehaviorSubject<number[]>([]);
  //private instagramTimesArraySubject = new BehaviorSubject<number[]>([]);
  //unlocksArray$ = this.unlocksArraySubject.asObservable();
  //tiktokTimesArray$ = this.tiktokTimesArraySubject.asObservable();
  //screenTimesArray$ = this.screenTimesArraySubject.asObservable();
  //instagramTimesArray$ = this.instagramTimesArraySubject.asObservable();

  // location
  private countriesSubject = new BehaviorSubject<string[]>([]);
  private statesSubject = new BehaviorSubject<string[]>([]);
  countries$ = this.countriesSubject.asObservable();
  states$ = this.statesSubject.asObservable();

  // Predictions
  private numberPredictionsSubject = new BehaviorSubject<number>(0);
  private numberHighAnxietyPredictionsSubject = new BehaviorSubject<number>(0);
  private averageAnxietySubject = new BehaviorSubject<number>(0);
  private linearRegressionAvgSubject = new BehaviorSubject<{ mse: number, r2: number } | null>(null);
  private predictionDistributionSubject = new BehaviorSubject<number[]>(new Array(11).fill(0));
  linearRegressionAvg$ = this.linearRegressionAvgSubject.asObservable();
  numberPredictions$ = this.numberPredictionsSubject.asObservable();
  numberHighAnxietyPredictions$ = this.numberHighAnxietyPredictionsSubject.asObservable();
  averageAnxiety$ = this.averageAnxietySubject.asObservable();
  predictionDistribution$ = this.predictionDistributionSubject.asObservable();

  // Biometric data
  //

  ////// OBTENER DATOS DE LA BASE DE DATOS //////
  // Obtener datos de los uuarios de la base de datos
  public loadUserCollection(): Observable<void> {
    const ref = collection(this.firestore, 'users');
    return collectionData(ref, { idField: 'id' })
      .pipe(
        map(users => {
          const total = users.length;
          const withDevice = users.filter(user => user['device']).length;

          this.totalUsersSubject.next(total);
          this.usersWithDeviceIdSubject.next(withDevice);
        })
      );
  }

  // Obtener datos de los formularios de la base de datos 
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

        let totalUnlocks = 0;
        let totalTiktokTime = 0;
        let totalScreenTime = 0;
        let totalInstagramTime = 0;

        const unlocksArray: number[] = [];
        const tiktokTimesArray: number[] = [];
        const screenTimesArray: number[] = [];
        const instagramTimesArray: number[] = [];

        const positionCounts: Record<string, number[]> = {};

        // Nuevos acumuladores y arrays
        let totalSadness = 0;
        let totalAnxiety = 0;
        let totalEnergy = 0;
        let totalHappiness = 0;
        let totalApathy = 0;
        let maxAnxiety = 0;

        const sadnessLevels: number[] = [];
        const anxietyLevels: number[] = [];
        const happinessLevels: number[] = [];
        const energyLevels: number[] = [];
        const apathyLevels: number[] = [];

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

          // Ranking
          const rankingString = form['final_ranking'] || '';
          const apps: string[] = rankingString.split(',').map((app: string): string => app.trim()).filter((app: string): boolean => Boolean(app));
          apps.forEach((app, index) => {
            if (index <= 2) {
              if (!positionCounts[app]) positionCounts[app] = [0, 0, 0];
              positionCounts[app][index]++;
            }
          });

          // Nuevos campos emocionales
          const sadness = form['sadnessLevel'] || 0;
          const maxAnxietyLevel = form['maxAnxietyLevel'] || 0;
          const happiness = form['happinessLevel'] || 0;
          const avgEnergy = form['avgEnergyLevel'] || 0;
          const avgAnxiety = form['avgAnxietyLevel'] || 0;
          const apathy = form['apathyLevel'] || 0;

          totalSadness += sadness;
          totalAnxiety += avgAnxiety;
          totalEnergy += avgEnergy;
          totalHappiness += happiness;
          totalApathy += apathy;

          if (maxAnxietyLevel > maxAnxiety) maxAnxiety = maxAnxietyLevel;

          sadnessLevels.push(sadness);
          anxietyLevels.push(avgAnxiety);
          happinessLevels.push(happiness);
          energyLevels.push(avgEnergy);
          apathyLevels.push(apathy);
        });

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
          finalRankingArray,
          averageSadnessLevel: totalSadness / count,
          maxAnxietyLevel: maxAnxiety,
          averageHappinessLevel: totalHappiness / count,
          averageEnergyLevel: totalEnergy / count,
          averageAnxietyLevel: totalAnxiety / count,
          averageApathyLevel: totalApathy / count,
          sadnessLevels,
          anxietyLevels,
          happinessLevels,
          energyLevels,
          apathyLevels
        };
      })
    ).subscribe(result => {
      // Sueño y localización
      this.restLevelsSubject.next(result.restLevels);
      this.sleepTimesSubject.next(result.sleepTimes);
      this.wakeUpTimesSubject.next(result.wakeUpTimes);
      this.countriesSubject.next(result.countries);
      this.statesSubject.next(result.states);

      this.totalFormsRecordsSubject.next(result.totalForms);
      this.averageRestLevelSubject.next(result.averageRestLevel);
      this.averageSleepTimeSubject.next(new Date(result.averageSleepTime * 60000));
      this.averageWakeUpTimeSubject.next(new Date(result.averageWakeUpTime * 60000));
      this.avgSleepDurationSubject.next(result.avgSleepDuration);

      // Datos móviles
      this.unlocksSubject.next(result.averageUnlocks);
      this.tiktokTimeSubject.next(result.averageTiktokTime);
      this.screenTimeSubject.next(result.averageScreenTime);
      this.instagramTimeSubject.next(result.averageInstagramTime);
      //this.unlocksArraySubject.next(result.unlocksArray);
      //this.tiktokTimesArraySubject.next(result.tiktokTimesArray);
      //this.screenTimesArraySubject.next(result.screenTimesArray);
      //this.instagramTimesArraySubject.next(result.instagramTimesArray);

      // Ranking
      this.finalRankingSubject.next(result.finalRankingArray);

      // Datos emocionales
      this.sadnessLevelSubject.next(result.averageSadnessLevel);
      this.maxAnxietyLevelSubject.next(result.maxAnxietyLevel);
      this.happinessLevelSubject.next(result.averageHappinessLevel);
      this.avgEnergyLevelSubject.next(result.averageEnergyLevel);
      this.avgAnxietyLevelSubject.next(result.averageAnxietyLevel);
      this.apathyLevelSubject.next(result.averageApathyLevel);

      this.sadnessLevelsSubject.next(result.sadnessLevels);
      this.anxietyLevelsSubject.next(result.anxietyLevels);
      this.happinessLevelsSubject.next(result.happinessLevels);
      this.energyLevelsSubject.next(result.energyLevels);
      this.apathyLevelsSubject.next(result.apathyLevels);
    });
  }

  // Obtener datos de las predicciones realizadas
  public loadModelPredictions(): Observable<void> {
    const ref = collection(this.firestore, 'model_predictions');
    return collectionData(ref, { idField: 'id_user' }).pipe(
      map((predictions: any[]) => {
        const distribution = new Array(11).fill(0);
        let sumAnxiety = 0;
        let countHighAnxiety = 0;

        predictions.forEach(pred => {
          const value = Math.round(pred['predicted_maxAnxietyLevel']) || 0;
          if (value >= 0 && value <= 10) {
            distribution[value]++;
          }
          sumAnxiety += value;

          if (pred['predicted_maxAnxietyLevel'] > 6) {
            countHighAnxiety++;
          }
        });

        const total = predictions.length;
        const avgAnxiety = total > 0 ? sumAnxiety / total : 0;

        this.predictionDistributionSubject.next(distribution);
        this.averageAnxietySubject.next(avgAnxiety);
        this.numberPredictionsSubject.next(total);
        this.numberHighAnxietyPredictionsSubject.next(countHighAnxiety);
      })
    );
  }

  public loadTrainingStatistics(): void {
    const ref = collection(this.firestore, 'models_stats');
    collectionData(ref).subscribe((docs: any[]) => {
      if (!docs.length) {
        this.linearRegressionAvgSubject.next(null);
        return;
      }

      let sumaMSE = 0;
      let sumaR2 = 0;
      let count = 0;

      docs.forEach(doc => {
        const linear = doc['Linear Regression'];
        if (linear && typeof linear.MSE === 'number' && typeof linear.R2 === 'number') {
          sumaMSE += linear.MSE;
          sumaR2 += linear.R2;
          count++;
        }
      });

      if (count > 0) {
        this.linearRegressionAvgSubject.next({
          mse: sumaMSE / count,
          r2: sumaR2 / count
        });
      } else {
        this.linearRegressionAvgSubject.next(null);
      }
    });
  }


  ///// FUNCIONES AUXILIARES //////
  // Procesar datos de sueño y localización
  private processSleepData(form: any) {
    const sleepTime = form['sleep_time'] ? new Date(form['sleep_time'].seconds * 1000) : null;
    const wakeUpTime = form['wake_up_time'] ? new Date(form['wake_up_time'].seconds * 1000) : null;
    let sleepDuration = 0;

    if (sleepTime && wakeUpTime) {
      sleepDuration = (wakeUpTime.getTime() - sleepTime.getTime()) / (1000 * 60 * 60);
    }

    return { sleepTime, wakeUpTime, sleepDuration };
  }

  // Procesar datos de localización
  private processLocationData(form: any) {
    const country = form['country'] || null;
    const state = form['state'] || null;

    return { country, state };
  }


  ///// EXPORTAR A EXCEL //////
  // Exportar datos de la bd a Excel
  public exportFormulariosToExcel(): void {
    const ref = collection(this.firestore, 'formularios');
    collectionData(ref, { idField: 'id' }).subscribe((formularios: any[]) => {
      const exportData: FormularioData[] = formularios.map((form: any) => ({
        id: form.id,
        user_id: form.id_user,
        date: form.recorded_at ? new Date(form.recorded_at.seconds * 1000).toISOString() : '',
        rest_level: form.rest_level || 0,
        sleep_time: form.sleep_time ? new Date(form.sleep_time.seconds * 1000).toISOString() : '',
        wake_up_time: form.wake_up_time ? new Date(form.wake_up_time.seconds * 1000).toISOString() : '',
        unlocks: form.unlocks || 0,
        tiktok_time: form.tiktok_time || 0,
        screen_time: form.screen_time || 0,
        instagram_time: form.instagram_time || 0,
        final_ranking: form.final_ranking || '',
        sadnessLevel: form.sadnessLevel || 0,
        maxAnxietyLevel: form.maxAnxietyLevel || 0,
        happinessLevel: form.happinessLevel || 0,
        avgEnergyLevel: form.avgEnergyLevel || 0,
        avgAnxietyLevel: form.avgAnxietyLevel || 0,
        apathyLevel: form.apathyLevel || 0,
        country: form.country || '',
        state: form.state || ''
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Formularios');

      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `formularios-${new Date().toISOString().slice(0, 10)}.xlsx`);
    });
  }

}