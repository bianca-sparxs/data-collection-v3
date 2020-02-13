import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import 'firebase/firestore';
import {Router} from "@angular/router";

export interface User {
  name: string;
  completed: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private userDoc: AngularFirestoreDocument<User>;
  private user: Observable<User>;

  constructor(private afs: AngularFirestore, private router: Router) {
  }

  getUser() {
    return this.user;
  }

  // Used to redirect to dashboard.
  // TODO: put router.navigate in dashboard component for separation of concern
  validateUser(username) {
    if (!username) {
      alert("Please input a username"); // placeholder
    }
    this.afs.firestore.doc('/users/' + username).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          // console.log(docSnapshot.data().name);
          this.loadUserData(username);
          this.router.navigate(['/dashboard', username]).then(nav => {
            console.log(nav);
          }, err => {
            console.log(err);
          });
        } else {
          alert("User not found"); // placeholder
        }
      });
  }

  loadUserData(username) {
    this.userDoc = this.afs.doc('users/' + username);
    this.user = this.userDoc.valueChanges();
  }
}

