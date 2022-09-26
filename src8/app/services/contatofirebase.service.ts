import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contato } from '../models/contato';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, deleteObject } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class ContatofirebaseService {
private PATH : string = 'contatos';

  constructor(private angularFirestore : AngularFirestore, 
    private angulaFireStorage : AngularFireStorage) { }

   getContato(id : string){
     return this.angularFirestore
     .collection(this.PATH)
     .doc(id)
     .valueChanges();
   };

   getContatos(){
    return this.angularFirestore
    .collection(this.PATH)
    .snapshotChanges();
   };

   inserirContato(contato : Contato){
    return this.angularFirestore
    .collection(this.PATH)
    .add({nome : contato.nome,
      telefone : contato.telefone, 
      genero : contato.genero, 
      dataNascimento : contato.dataNascimento,
      downloadURL : contato.downloadURL});
   };

   editarContato(contato : Contato, id : string){
    return this.angularFirestore
    .collection(this.PATH)
    .doc(id)
    .update({nome : contato.nome,
      telefone : contato.telefone, 
      genero : contato.genero, 
      dataNascimento : contato.dataNascimento,
      downloadURL : contato.downloadURL});
   };

   excluirContato(contato : Contato){
    return this.angularFirestore
    .collection(this.PATH)
    .doc(contato.id)
    .delete();
   };

   enviarImagem(imagem : any, contato : Contato){
     const file = imagem.item(0);
     if(file.type.split('/')[0] !== 'image'){
       console.error('Tipo não suportado');
       return;
     }
     const path = `images/${new Date().getTime()}_${file.name}`;
     const fileRef = this.angulaFireStorage.ref(path);
     let task = this.angulaFireStorage.upload(path, file);
     task.snapshotChanges().pipe(
       finalize(()=>{
         let uploadedFileURL = fileRef.getDownloadURL();
         uploadedFileURL.subscribe((resp)=>{
           contato.downloadURL = resp;
           this.inserirContato(contato);
         })
       })
     ).subscribe();
     return task;
   }

   editarImagem(imagem : any, contato : Contato, id : string){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.error('Tipo não suportado');
      return;
    }
    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this.angulaFireStorage.ref(path);
    let task = this.angulaFireStorage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe((resp)=>{
          contato.downloadURL = resp;
          this.editarContato(contato, id);
        })
      })
    ).subscribe();
    return task;
  }

  excluirImagem(imagem : any){
    const file = imagem.item(0);
    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this.angulaFireStorage.ref(path);
    let task = this.angulaFireStorage.upload(path, file);
    const storage = getStorage();
    const Ref = ref(storage, path);
    Ref.toString();
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe((resp)=>{
          deleteObject(Ref).then(() => {
          console.log("A");
    }).catch((error) => {
      console.log(error);
    });
        })
      })
    ).subscribe();
    return task;
  }

}
