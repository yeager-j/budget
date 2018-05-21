import { Component, HostListener, OnInit } from '@angular/core';
import { BudgetService } from '../common/services/budget.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/internal/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {AddExpenseComponent} from '../add-expense/add-expense.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  scrolledDown = false;
  expenses: Observable<any>;
  expensesFilter: Observable<any>;
  nameFilter = '';
  categoryFilter = 'All';
  categories: string[] = ['All'];

  constructor(private budgetService: BudgetService, private route: ActivatedRoute, private dialog: MatDialog) {
    this.categories = this.categories.concat(this.budgetService.categories);
    this.expenses = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.budgetService.getExpenses(params.get('id'));
        } else {
          return this.budgetService.getCurrentExpenses();
        }
      })
    );

    this.applyFilter();
  }

  applyFilter() {
    this.expensesFilter = this.expenses.pipe(
      map(expenses => {
        return expenses.filter(expense => {
          return (this.categoryFilter === 'All' ? true : expense.category.includes(this.categoryFilter)) &&
            expense.name.toLowerCase().includes(this.nameFilter.toLowerCase());
        });
      })
    );
  }

  ngOnInit() {
  }

  openAddExpenseDialog() {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '450px'
    });
  }

  removeExpense(id) {
    this.budgetService.removeExpense(id).subscribe(result => {
      console.log('Got em');
    });
  }
}
