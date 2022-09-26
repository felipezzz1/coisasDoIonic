import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private _contatos : Contato[] = [];
  constructor() { 
    let contato = new Contato("Teste", 40028922, "masculino", "2002-07-01");
    this.inserir(contato);
  }

  public get contatos() : Contato[]{
    return this._contatos;
  }

  public inserir(contato : Contato){
    this._contatos.push(contato);
  }

  public editar(contato : Contato, nome : string, telefone : number, genero : string, dataNascimento : string) : boolean{
    for(let i=0; i<this._contatos.length; i++){
      if(this._contatos[i].id == contato.id){
        this._contatos[i].nome = nome;
        this._contatos[i].telefone = telefone;
        this._contatos[i].genero = genero;
        this._contatos[i].dataNascimento = dataNascimento;
        return true
      }
    }
    return false;
  };

  public excluir(contato : Contato) : boolean{
    for(let i = 0; i<this.contatos.length; i++){
      if(this._contatos[i].id == contato.id){
        this.contatos.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}
