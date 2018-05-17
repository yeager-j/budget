import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BudgetService } from '../common/services/budget.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/index';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  loaded = false;
  period: Observable<any>;
  remainingBudget: Observable<number>;
  remainingBudgetPercent: Subject<number> = new Subject<number>();

  constructor(private budgetService: BudgetService, private router: Router) {
    this.period = this.budgetService.getCurrentPeriod();
    this.period.subscribe((period: any) => {
      this.remainingBudget = this.budgetService.getExpenses(period.id).pipe(map(expenses => {
        let total = 0;
        expenses.forEach((expense: any) => total += expense.amount);
        const remaining = Math.round((period.income - total) * 100) / 100;

        this.remainingBudgetPercent.next(Math.round((remaining / period.income) * 100));
        return remaining;
      }));

      this.loaded = true;
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
