import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private _contatos : Contato[] = [];
  constructor() { 
    let contato = new Contato("Teste", 123, "masculino", "2002-07-01");
    this.inserir(contato);
  }

  public get contatos() : Contato[]{
    return this._contatos;
  }

  public inserir(contato : Contato){
    this._contatos.push(contato);
  }
}
