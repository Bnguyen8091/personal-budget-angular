import { AfterViewInit, Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'; // Import required components from Chart.js

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
      {
        data: [] as number[], // Ensure data is typed as number[]
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
        ]
      }
    ],
    labels: [] as string[] // Ensure labels are typed as string[]
  };

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    // Register the required components for the Pie chart
    Chart.register(PieController, ArcElement, Tooltip, Legend);

    this.http.get('http://localhost:3000/budget')
      .subscribe(
        (res: any) => {
          // Access myBudget directly from the response object
          if (res && res.myBudget) {
            for (let i = 0; i < res.myBudget.length; i++) {
              this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
              this.dataSource.labels[i] = res.myBudget[i].title;
            }
            this.createChart(); // Create the chart after data has been populated
          } else {
            console.error('Invalid response structure: ', res);
          }
        },
        (error) => {
          console.error('Error fetching budget data:', error);
        }
      );
  }


  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement | null; // Handle potential null value
    if (ctx) { // Check if ctx exists
      new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
      });
    } else {
      console.error('Canvas element not found');
    }
  }
}
