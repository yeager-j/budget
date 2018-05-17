import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }

  openAddExpenseDialog() {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '450px'
    });
  }
}
