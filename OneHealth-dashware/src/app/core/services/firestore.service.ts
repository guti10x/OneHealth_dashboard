import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  private totalUsersSubject = new BehaviorSubject<number>(0);
  private usersWithDeviceIdSubject = new BehaviorSubject<number>(0);
  private totalFormsRecordsSubject = new BehaviorSubject<number>(0);
  
  totalUsers$ = this.totalUsersSubject.asObservable();
  usersWithDeviceId$ = this.usersWithDeviceIdSubject.asObservable();
  totalFormsRecords$ = this.totalFormsRecordsSubject.asObservable();

  public loadUserCollection(): void {
    const ref = collection(this.firestore, 'users');
    collectionData(ref, { idField: 'id' })
      .pipe(
        map(users => {
          const total = users.length;
          const withDevice = users.filter(user => user['device']).length;

          this.totalUsersSubject.next(total);
          this.usersWithDeviceIdSubject.next(withDevice);
        })
      )
      .subscribe();
  }

  public loadFormulariosCollection(): void {
    const ref = collection(this.firestore, 'formularios');
    collectionData(ref, { idField: 'id' }).pipe(
      map(formularios => formularios.length)
    ).subscribe(total => {
      this.totalFormsRecordsSubject.next(total);
    });
  }
}
