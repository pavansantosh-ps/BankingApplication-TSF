import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private fs:AngularFirestore) { }

  createUser(payload) {
    return this.fs.collection('users').doc(payload.email).set(payload);
  }

  getUsers() {
    return this.fs.collection('users').ref.get();
  }

  getUser(email) {
    return this.fs.collection('users').doc(email).ref.get();
  }

  updateUser(payload) {
    return this.fs.collection('users').doc(payload.email).update(payload);
  }

  setHistory(payload){
    return this.fs.collection('history').add(payload);
  }

  timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  };

  searchForSender(email) {
    return this.fs.collection('history').ref.where("senderEmail", "==", email).get();
  }

  searchForReciever(email) {
    return this.fs.collection('history').ref.where("recieverEmail", "==", email).get();
  }
}
