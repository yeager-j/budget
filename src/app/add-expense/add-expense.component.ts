import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../common/services/budget.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  categories: string[];

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private dialog: MatDialogRef<AddExpenseComponent>) {
    this.categories = this.budgetService.categories;
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      amount: [0, Validators.required],
      date: [new Date(), Validators.required]
    });
  }

  ngOnInit() {
  }

  addExpense() {
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value);
      this.budgetService.addExpense(this.expenseForm.value).subscribe(result => {
        this.dialog.close(result);
      });
    }
  }
}
