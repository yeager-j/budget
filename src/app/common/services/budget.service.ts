import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, flatMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private db: AngularFirestore) { }

  get categories() {
    return [ 'Food', 'Entertainment', 'Donations/Gifts', 'Phone', 'Gas', 'Misc', 'Tesla', 'Household', 'Savings', 'Trip' ];
  }

  getCurrentPeriod() {
    return this.db.collection('periods', ref => ref.orderBy('start'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })[0]));
  }

  getCurrentExpenses() {
    return this.getCurrentPeriod().pipe(flatMap(period => this.getExpenses(period.id)));
  }

  getExpenses(docID) {
    return this.db.collection('periods').doc(docID).collection('expenses')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  addExpense(data) {
    this.getCurrentPeriod().pipe(flatMap(period => this.db.collection('periods').doc(period.id).collection('expenses').add(data)));
  }
}
