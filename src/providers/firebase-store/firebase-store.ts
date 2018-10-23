import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseStoreProvider {

  constructor(public afs: AngularFirestore) {
    console.log('Hello FirebaseStoreProvider Provider');
  }

  listMovies(){
    return this.afs.collection('/Movies').snapshotChanges().pipe( 
      map(actions => actions.map(item => {
        const id = item.payload.doc.id;
        const data = item.payload.doc.data();
        data['id'] = id;
        return data;
      }))
    );
  }
  addMovies(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Movies').add({
        title: value.title,
        genre: value.genre,
        year: parseInt(value.year)
      })
      .then(
        (res) => {
          resolve(res)
        },
          err => reject(err)
      )
    })
  }
  deleteMovies(id){
    this.afs.doc('/Movies/' + id).delete();
  }
  updateMovies(id, data){
    this.afs.doc('/Movies/' + id).update(data);
  }
}
