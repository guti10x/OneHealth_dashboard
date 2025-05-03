import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';
import { ChartData } from 'chart.js'; 

@Component({
  selector: 'app-global-sleep-stats',
  standalone: false,
  templateUrl: './global-sleep-stats.component.html',
  styleUrls: ['./global-sleep-stats.component.scss']
})
export class GlobalSleepStatsComponent implements OnInit {

  // Overage variables
  averageRestLevel: number | null = null;

  // All data variables
  restLevelsSubject: any[] = [];
  sleepTimesSubject: Date[] = [];
  wakeUpTimesSubject: Date[] = [];

  // Data for the charts
  sleepLevelChartData: ChartData<'bar'> = {
    labels: ['Nivel de Descanso'],
    datasets: [
      {
        label: 'Nivel de Descanso',
        data: [this.averageRestLevel ?? 0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  sleepTimeChartData: ChartData<'line'> = {
    labels: Array(24).fill(''),  // 24 hours in a day
    datasets: [
      {
        label: 'Hora de Acostarse',
        data: Array(24).fill(0),
        fill: true,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      }
    ]
  };

  wakeUpTimeChartData: ChartData<'line'> = {
    labels: Array(24).fill(''),  // 24 hours in a day
    datasets: [
      {
        label: 'Hora de Despertar',
        data: Array(24).fill(0),  // Initialize array with zero occurrences for each hour
        fill: true,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4
      }
    ]
  };

  // Chart options for the bar chart (Nivel de Descanso)
  barChartOptions = {
    responsive: true
  };

  // Chart options for the line charts (Hora de Acostarse y Hora de Despertar)
  lineChartOptions = {
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 23,
        ticks: {
          stepSize: 1,
          callback: (value: any) => this.formatTime(value)
        }
      }
    }
  };

  constructor(private formulariosService: FirestoreService) {}

  ngOnInit(): void {
    this.formulariosService.averageRestLevel$.subscribe(value => {
      this.averageRestLevel = value;
      this.updateSleepLevelChart();
    });

    this.formulariosService.sleepTimes$.subscribe(value => {
      this.sleepTimesSubject = value;
      this.updateSleepTimeChart();
    });

    this.formulariosService.wakeUpTimes$.subscribe(value => {
      this.wakeUpTimesSubject = value;
      this.updateWakeUpTimeChart();
    });
  }

  // Update the bar chart data for "Nivel de Descanso"
  updateSleepLevelChart(): void {
    this.sleepLevelChartData.datasets[0].data = [this.averageRestLevel ?? 0];
  }

  // Update the line chart with time data for "Hora de Acostarse"
  updateSleepTimeChart(): void {
    const sleepHours = this.getTimeOccurrences(this.sleepTimesSubject);
    this.sleepTimeChartData.datasets[0].data = sleepHours;
  }

  // Update the line chart with time data for "Hora de Despertar"
  updateWakeUpTimeChart(): void {
    const wakeUpHours = this.getTimeOccurrences(this.wakeUpTimesSubject);
    this.wakeUpTimeChartData.datasets[0].data = wakeUpHours;
  }

  // Convert a date to an hour (0-23) and count the occurrences per hour
  getTimeOccurrences(times: Date[]): number[] {
    const hoursCount = Array(24).fill(0); 
    
    // Count occurrences for each hour (0-23)
    times.forEach((time: Date) => {
      const hour = time.getHours();
      hoursCount[hour] += 1;
    });

    return hoursCount;
  }

  // Format the time to be shown on the chart's x-axis as 'HH:00'
  formatTime(value: number): string {
    return `${value}:00`;
  }
}
