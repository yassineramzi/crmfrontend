import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  responsive: Array<ApexResponsive>;
};

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart-couverture-par-potentiel") 
  public chartCouvertureParPotentiel: ChartComponent;
  public chartOptionsCouvertureParPotentiel: Partial<ChartOptions>;

  @ViewChild("chart-visite-par-jour") 
  public chartVisiteParJour: ChartComponent;
  public chartOptionsVisiteParJour: Partial<ChartOptions>;

  @ViewChild("chart-visite-par-spécialité-par-jour") 
  public chartVisiteParSpecialiteParJour: ChartComponent;
  public chartOptionsVisiteParSpecialiteParJour: Partial<ChartOptions>;

  constructor(){
    this.chartOptionsCouvertureParPotentiel = {
      series: [
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime"
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chartOptionsVisiteParJour = {
      series: [
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime"
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chartOptionsVisiteParSpecialiteParJour = {
      series: [
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime"
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
  }

}
