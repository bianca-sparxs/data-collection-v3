import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import 'firebase/firestore';
import {map} from "rxjs/operators";

export interface User {
  name: string;
  completed: number;
}

export interface UserId extends  User {id: string}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<UserId[]>;

  private userDoc: AngularFirestoreDocument<User>;
  private user: Observable<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref;
    });

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        // console.log({id, ...data});
        return {id, ...data};
      }))
    )
  }

  getUser() {
    return this.user;
  }

  getUsers() {
    return this.users;
  }

  loadUserData(userId) {
    console.log(this.users);
    this.userDoc = this.afs.doc('users/' + userId);
    this.user = this.userDoc.snapshotChanges().pipe(
      map(a => {
          const data = a.payload.data() as User;
          const id = a.payload.id;
          console.log({id, ...data});
          return {id, ...data};
      }));
  }

  createUser(username) {
    const usersCollection = this.afs.collection<User>('users');
    usersCollection.doc(username).set({name: username, completed: 0})
  }
}

