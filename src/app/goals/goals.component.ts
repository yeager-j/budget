import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BudgetService } from '../common/services/budget.service';
import {MatDialog} from '@angular/material';
import {AddGoalComponent} from '../add-goal/add-goal.component';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  goals: Observable<any>;

  constructor(private budgetService: BudgetService, private dialog: MatDialog) {
    this.goals = this.budgetService.getGoals();
  }

  ngOnInit() {
  }

  round(num) {
    return Math.round(num);
  }

  removeGoal(id) {
    this.budgetService.removeGoal(id);
  }

  openAddGoalDialog() {
    const dialogRef = this.dialog.open(AddGoalComponent, {
      width: '450px'
    });
  }
}
