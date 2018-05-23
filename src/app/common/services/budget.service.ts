import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, flatMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  get categories() {
    return ['Food', 'Entertainment', 'Donations/Gifts', 'Phone', 'Gas', 'Misc', 'Tesla', 'Household', 'Savings', 'Trip'];
  }

  getCurrentPeriod() {
    return this.afAuth.user
      .pipe(
        flatMap(user => {
          if (!user) {
            return of(null);
          }

          return this.db.collection('periods', ref => ref.where('uid', '==', user.uid).orderBy('start'))
            .snapshotChanges()
            .pipe(
              map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
              })[actions.length - 1]));
        })
      );
  }

  addPeriod(data) {
    return this.afAuth.user.pipe(
      flatMap(user => {
        return this.db.collection('periods').add({
          income: data.income,
          start: new Date(),
          uid: user.uid
        });
      })
    );
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
          return {id, ...data};
        })));
  }

  addExpense(data) {
    return combineLatest(this.afAuth.user, this.getCurrentPeriod()).pipe(
      flatMap(([user, period]) => {
        return this.db.collection('periods').doc(period.id).collection('expenses').add({
          ...data,
          uid: user.uid
        });
      }));
  }

  removeExpense(id) {
    return this.getCurrentPeriod().pipe(flatMap(period => {
      return this.db.collection('periods').doc(period.id).collection('expenses').doc(id).delete();
    }));
  }

  getGoals() {
    return this.afAuth.user
      .pipe(
        flatMap(user => {
          return this.db.collection('goals', ref => ref.where('uid', '==', user.uid))
            .snapshotChanges()
            .pipe(
              map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
              }))
            );
        })
      );
  }

  addGoal(data) {
    return this.afAuth.user
      .pipe(
        flatMap(user => {
          return this.db.collection('goals').add({
            ...data,
            uid: user.uid
          });
        })
      );
  }

  removeGoal(id) {
    return this.db.collection('goals').doc(id).delete();
  }
}
