import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BudgetService } from '../common/services/budget.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  goals: Observable<any>;

  constructor(private budgetService: BudgetService) {
    this.goals = this.budgetService.getGoals();
  }

  ngOnInit() {
  }

  round(num) {
    return Math.round(num);
  }
}
