import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../common/services/budget.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-period',
  templateUrl: './add-period.component.html',
  styleUrls: ['./add-period.component.scss']
})
export class AddPeriodComponent implements OnInit {
  periodForm: FormGroup;

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private dialog: MatDialogRef<AddExpenseComponent>) {
    this.periodForm = this.fb.group({
      income: [0, Validators.required],
    });
  }

  ngOnInit() {
  }

  addPeriod() {
    if (this.periodForm.valid) {
      this.budgetService.addPeriod(this.periodForm.value).subscribe(result => {
        this.dialog.close(result);
      });
    }
  }
}
