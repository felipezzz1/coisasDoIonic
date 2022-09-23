import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/models/contato';
import { ContatofirebaseService } from 'src/app/services/contatofirebase.service';


@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  contato : Contato;
  form_editar : FormGroup;
  isSubmitted : boolean = false;
  data : string;
  edicao : boolean = true;

  constructor(private router : Router, 
    private alertController: AlertController, 
    private contatoFS : ContatofirebaseService,
    private formBuilder : FormBuilder) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.contato = nav.extras.state.objeto;
    this.data = new Date().toISOString();
    this.form_editar = this.formBuilder.group({
      nome : [this.contato.nome, [Validators.required]],
      telefone : [this.contato.telefone, [Validators.required, Validators.minLength(10)]],
      genero : [this.contato.genero, [Validators.required]],
      dataNascimento : [this.contato.dataNascimento, [Validators.required]] 
    });
  }

  get errorControl(){
    return this.form_editar.controls;
  }
  
  submitForm():boolean{
    this.isSubmitted = true;
    if(!this.form_editar.valid){
      this.presentAlert("Agenda", "Erro", "Todos os campos são obrigatórios");
      return false;
    }else{
      this.editar();
    }
  }

  alterarEdicao(){
    if(this.edicao == true){
      this.edicao = false
    }else{
      this.edicao = true
    }
  }

  editar(){
    this.contatoFS.editarContato(this.form_editar.value, this.contato.id)
    .then(()=>{
      this.presentAlert("Agenda", "Sucesso" ,"Cliente Editado");
      this.router.navigate(['/home']);  
    })
    .catch((error)=>{
      this.presentAlert("Agenda", "Erro", "Erro ao editar cliente");
      console.log(error);
    })
     
  };

  excluir(){
    this.presentAlertConfirm("Agenda", "Excluir Contato", "Voce realmente deseja excluir o contato?");
  }

  private excluirContato(contato : Contato){
    this.contatoFS.excluirContato(this.contato)
    .then(()=>{
      this.presentAlert("Agenda", "Sucesso" ,"Cliente Excluido");
      this.router.navigate(['/home']);
    })
    .catch((error)=>{
      this.presentAlert("Agenda", "Erro", "Contato não encontrado");
      console.log(error)
    })
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
