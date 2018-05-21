import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatProgressSpinnerModule, MatCardModule, MatSelectModule, MatInputModule, MatDialogModule, MatDatepickerModule,
  MatNativeDateModule, DateAdapter, MatProgressBarModule
} from '@angular/material';
import { OverviewComponent } from './overview/overview.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { GoalsComponent } from './goals/goals.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AddGoalComponent } from './add-goal/add-goal.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/overview' },
  { path: 'overview', component: OverviewComponent },
  { path: 'expenses/:id', component: ExpensesComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'analytics', component: AnalyticsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    OverviewComponent,
    ExpensesComponent,
    AddExpenseComponent,
    GoalsComponent,
    AnalyticsComponent,
    AddGoalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({ ...environment.firebase, projectId: 'budget-8ed96' }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFirestoreModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddExpenseComponent, AddGoalComponent]
})
export class AppModule { }
