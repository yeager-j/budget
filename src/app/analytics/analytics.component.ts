import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BudgetService } from '../common/services/budget.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  chart = null;

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.budgetService.getCurrentExpenses().subscribe((expenses: any) => {
      const categorizedExpenses = [];

      for (const category of this.budgetService.categories) {
        if (expenses.filter(e => e.category === category).length === 0) { continue; }

        categorizedExpenses.push({
          category: category,
          total: expenses
            .filter(e => e.category === category)
            .map(e => e.amount)
            .reduce((accululator, currentValue) => accululator + currentValue)
        });
      }

      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: categorizedExpenses.map(e => e.category),
          datasets: [{
            label: '# of Votes',
            data: categorizedExpenses.map(e => e.total),
            backgroundColor: this.colorList(categorizedExpenses.length),
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Spending Totals'
          }
        }
      });
    });
  }

  colorList(count) {
    const colors = [];

    for (let i = 0; i < 1; i += 1 / count) {
      colors.push(`rgba(${this.hsvToRgb(i, 0.75, 0.95).join(', ')}, 0.5)`);
    }

    return colors;
  }

  hsvToRgb(h, s, v) {
    const h_i = Math.floor((h * 6));
    const f = h * 6 - h_i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r;
    let g;
    let b;

    switch (h_i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
    }

    return [Math.floor((r * 256)), Math.floor((g * 256)), Math.floor((b * 256))];
  }
}
