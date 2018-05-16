import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BudgetService } from '../common/services/budget.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  period: Observable<any>;
  remainingBudget: Observable<number>;

  constructor(private budgetService: BudgetService, private router: Router) {
    this.period = this.budgetService.getCurrentPeriod();
    this.period.subscribe((period: any) => {
      this.remainingBudget = this.budgetService.getExpenses(period.id).pipe(map(expenses => {
        let total = 0;
        expenses.forEach((expense: any) => total += expense.amount);
        return Math.round((period.income - total) * 100) / 100;
      }));
    });
  }

  ngOnInit() {
  }

  viewExpenses() {
    this.budgetService.getCurrentPeriod().subscribe(period => {
      console.log(period);
      this.router.navigate(['/expenses', period.id]);
    });
  }
}
