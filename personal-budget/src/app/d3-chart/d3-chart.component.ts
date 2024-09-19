import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'app-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss']
})
export class D3ChartComponent implements AfterViewInit {
  @ViewChild('chart', { static: true }) chartElement!: ElementRef;

  private data: number[] = [25, 110, 275]; // Use default data for testing

  constructor(private dataService: DataService) { }

  ngAfterViewInit() {
    // If using static data for testing
    this.createChart();

    // If using data from the service
    // this.dataService.getData().subscribe(data => {
    //   this.data = data;
    //   this.createChart();
    // });
  }

  private createChart(): void {
    if (!this.chartElement) return; // Ensure chartElement is defined

    const svg = d3.select(this.chartElement.nativeElement)
      .attr('width', 500)
      .attr('height', 300);

    svg.selectAll('*').remove(); // Clear any previous content

    svg.selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 60)
      .attr('y', d => 300 - d)
      .attr('width', 50)
      .attr('height', d => d)
      .attr('fill', (d, i) => ['yellow', 'blue', 'red'][i]); // Assign colors based on index
  }
}
