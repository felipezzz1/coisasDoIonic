import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from '../../models/contato';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contatos: Contato[];

  constructor(private router: Router, private contatoService : ContatoService) {
    this.contatos = this.contatoService.contatos;
  }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  irParaDetalhar(contato : Contato){
    this.router.navigateByUrl("/detalhar",
    {state : {objeto : contato}});
  }

}
