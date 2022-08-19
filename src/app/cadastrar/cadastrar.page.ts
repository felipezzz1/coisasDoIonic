import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome : string;
  telefone : number;
  constructor(private alertController: AlertController) { 

  }

  ngOnInit() {
  }

  cadastrar(){
    if(this.validar(this.nome) && this.validar(this.telefone)){
      console.log(this.nome + " " + this.telefone);
      this.presentAlert("Agenda", "Sucesso" ,"Cliente Cadastrado");
    }else{
      this.presentAlert("Agenda", "Erro", "Todos os campos são obrigatórios");
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

}
