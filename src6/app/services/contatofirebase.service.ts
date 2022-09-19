import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatofirebaseService {
private PATH : string = 'contatos';

  constructor(private angularFirestore : AngularFirestore) { }
   getContato(id : string){
     return this.angularFirestore.collection(this.PATH).doc(id).valueChanges();
   };

   getContatos(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
   };

   inserirContato(contato : Contato){
    return this.angularFirestore.collection(this.PATH).add({nome : contato.nome,
      telefone : contato.telefone, genero : contato.genero, dataNascimento : contato.dataNascimento});
   };

   editarContato(contato : Contato, id : string){
    return this.angularFirestore.collection(this.PATH).doc(id).update({nome : contato.nome,
      telefone : contato.telefone, genero : contato.genero, dataNascimento : contato.dataNascimento});
   };

   excluirContato(contato : Contato){
    return this.angularFirestore.collection(this.PATH).doc(contato.id).delete();
   };
}
