import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { endpoints } from '../../../configurations/enviroments';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  mensagem: string = '';//variável para exibir mensagem de sucesso
  mensagemErro: string = '';//variável para exibir mensagem de erro
  erros: any = null;//variável para armazenar os erros
mensagemSucesso: any;

  constructor(private http : HttpClient) { }

  //função para criar um novo usuário
  form = new FormGroup({
    nome : new FormControl(''),
    email : new FormControl(''),
    senha : new FormControl(''),
    senhaConfirmacao : new FormControl(''),

});
  
   
   onSubmit(){
    
    //limpar as mensagens exibidas na tela
    this.mensagem = '';
    this.mensagemErro = '';

    if(this.form.value.senha == this.form.value.senhaConfirmacao){
     
   //enviando a requisição de cadastro do usuário para a API
   this.http.post(endpoints.criar_usuario, this.form.value)
   .subscribe({ //capturando o retorno da API (resposta)
     next: (data: any) => { //retorno de sucesso
       //exibir mensagem de sucesso
       this.mensagemSucesso = `Parabéns ${data.nome}, sua conta foi criada com sucesso.`;
       //limpar o formulário
       this.form.reset();
     },
     error: (e) => { //retorno de erro
       if (typeof e.error === "string") {
         this.mensagemErro = e.error;
       }
       else {
         this.erros = e.error;
       }
     }
   });
}
else {
 this.mensagemErro = "Senhas não conferem, por favor verifique.";
}
}
}
