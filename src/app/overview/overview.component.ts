import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BudgetService } from '../common/services/budget.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/index';
import { AddPeriodComponent } from '../add-period/add-period.component';
import { MatDialog } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(private budgetService: BudgetService, private router: Router, private dialog: MatDialog, public afAuth: AngularFireAuth) {
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

  openAddPeriodDialog() {
    const dialogRef = this.dialog.open(AddPeriodComponent, {
      width: '450px'
    });
  }

  viewExpenses() {
    this.budgetService.getCurrentPeriod().subscribe(period => {
      console.log(period);
      this.router.navigate(['/expenses', period.id]);
    });
  }
}
