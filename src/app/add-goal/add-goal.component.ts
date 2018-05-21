import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {BudgetService} from '../common/services/budget.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent implements OnInit {
  goalForm: FormGroup;

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private dialog: MatDialogRef<AddGoalComponent>) {
    this.goalForm = this.fb.group({
      balance: [0, Validators.required],
      commitment: [0, Validators.required],
      goal: [0, Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addGoal() {
    if (this.goalForm.valid) {
      this.budgetService.addGoal(this.goalForm.value).subscribe(result => {
        this.dialog.close(result);
      });
    }
  }
}
