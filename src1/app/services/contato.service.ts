import { Injectable } from '@angular/core';
import { Contato } from '../Class/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private _contatos : Contato[] = [];
  constructor() { }

  public get contatos() : Contato[]{
    return this._contatos;
  }

  public inserir(contato : Contato){
    this._contatos.push(contato);
  }
}
