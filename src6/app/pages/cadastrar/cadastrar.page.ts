import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ContatofirebaseService } from 'src/app/services/contatofirebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  data : string;
  form_cadastrar : FormGroup;
  isSubmitted : boolean = false;

  constructor(private alertController: AlertController, 
    private router: Router, 
    private loadingCtrl : LoadingController,
    private contatoFS : ContatofirebaseService, 
    private formBuilder : FormBuilder) { 

  }

  ngOnInit() {
    this.data = new Date().toISOString();
    this.form_cadastrar = this.formBuilder.group({
      nome : ["",[Validators.required]],
      telefone : ["", [Validators.required, Validators.minLength(10)]],
      genero : ["", [Validators.required]],
      dataNascimento : ["", [Validators.required]] 
    });
  }

  get errorControl(){
    return this.form_cadastrar.controls;
  }
  
  submitForm():boolean{
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      this.presentAlert("Agenda", "Erro", "Todos os campos são obrigatórios");
      return false;
    }else{
      this.cadastrar();
    }
  }

  // cadastrar metodo mais dificil '-' 
  //private cadastrar(){
    //let contato : Contato = new Contato(this.form_cadastrar.value['nome'], this.form_cadastrar.value['telefone'], this.form_cadastrar.value['genero'], this.form_cadastrar.value['dataNascimento']);
    //this.contatoService.inserir(contato);
    //this.presentAlert("Agenda", "Sucesso" ,"Cliente Cadastrado");
    //this.router.navigate(['/home']);
  //}

  //normal
  private cadastrar(){
    this.showLoading("aguarde", 100000);
    this.contatoFS.inserirContato(this.form_cadastrar.value).then(()=>{
      this.loadingCtrl.dismiss();
      this.presentAlert("Agenda", "Sucesso" ,"Cliente Cadastrado");
      this.router.navigate(['/home']);
    })
    .catch((error)=>{
      this.loadingCtrl.dismiss();
      this.presentAlert("Agenda", "Erro" ,"Erro ao cadastrar cliente");
      console.log(error);
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

  async showLoading(mensagem : string, duracao : number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });

    loading.present();
  }
}
