import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  public createUser(data: {nombre: string, url: string}) {
    return this.firestore.collection('userInfo').add(data);
  }
}
