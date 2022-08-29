import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  contato : Contato;
  nome : string;
  telefone : number;
  genero : string;
  dataNascimento : string;
  data : string;
  edicao : boolean = true;

  constructor(private router : Router, private alertController: AlertController, private contatoService : ContatoService) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.contato = nav.extras.state.objeto;
    this.data = new Date().toISOString();
    this.nome = this.contato.nome;
    this.telefone = this.contato.telefone;
    this.genero = this.contato.genero;
    this.dataNascimento = this.contato.dataNascimento;
  }

  alterarEdicao(){
    if(this.edicao == true){
      this.edicao = false
    }else{
      this.edicao = true
    }
  }

  editar(){
    this.dataNascimento = this.dataNascimento.split("T")[0];
    console.log(this.genero + " " + this.dataNascimento);
    if(this.validar(this.nome) && this.validar(this.telefone) && this.validar(this.genero) && this.validar(this.dataNascimento)){
      if(this.contatoService.editar(this.contato, this.nome, this.telefone, this.genero, this.dataNascimento)){
        this.presentAlert("Agenda", "Sucesso" ,"Cliente Editado");
        this.router.navigate(['/home']);
      }else{
        this.presentAlert("Agenda", "Erro", "Todos os campos são obrigatórios");
      }
    }
  };

  excluir(){
    this.presentAlertConfirm("Agenda", "Excluir Contato", "Voce realmente deseja excluir o contato?");
  }

  private excluirContato(contato : Contato){
    if(this.contatoService.excluir(this.contato)){
      this.presentAlert("Agenda", "Sucesso" ,"Cliente Excluido");
      this.router.navigate(['/home']);
    }else{
      this.presentAlert("Agenda", "Erro", "Contato não encontrado");
    }
  }

  private validar( campo : any) : boolean{
    if(!campo){
      return false;
    }
    return true;
  }

  async presentAlert(header : string, subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertConfirm(header : string, subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.excluirContato(this.contato);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
