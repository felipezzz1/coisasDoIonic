import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contatos: any;

  constructor(private router: Router) {
    this.contatos = [{nome: "Carlos Eduardo", telefone: 4421252454}, 
    {nome: "Jotair Elio Jr", telefone: 42999587452},
    {nome: "Kelly Wiggers", telefone: 4587851512}, 
    {nome: "Giovane Galvao", telefone: 421581558484}];
  }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

}
