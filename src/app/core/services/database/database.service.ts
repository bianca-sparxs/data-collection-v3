import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import 'firebase/firestore';

export interface User {
  name: string;
  completed: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  private userDoc: AngularFirestoreDocument<User>;
  private user: Observable<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref;
    });
    this.users = this.usersCollection.valueChanges();
  }

  getUser() {
    return this.user;
  }

  getUsers() {
    return this.users;
  }

  validateUser(username) {
    if (!username) {
      alert("Please input a username"); // placeholder
    }
    // return the promise from firebase when attempting to get docSnapshot
    return this.afs.firestore.doc('/users/' + username).get();
  }

  loadUserData(username) {
    // let queryRef = this.afs.collection('users', ref => ref.where('name', '==', username));
    // console.log(queryRef);
    this.userDoc = this.afs.doc('users/' + username);
    this.user = this.userDoc.valueChanges();
  }

  createUser(username) {
    const usersCollection = this.afs.collection<User>('users');
    usersCollection.doc(username).set({name: username, completed: 0})
  }
}

