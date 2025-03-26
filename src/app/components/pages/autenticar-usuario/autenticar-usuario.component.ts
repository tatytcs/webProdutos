import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { endpoints } from '../../../configurations/enviroments';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  mensagem: string = ''; //mensagem de erro
  erros: any = null; //erros de validação

  constructor(private http: HttpClient) { }

  // Formulário de autenticação
  form = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.email]), // Campo obrigatório
    senha : new FormControl('', [Validators.required,Validators.minLength(8)]) // Campo obrigatório e mínimo de 6 caracteres
  });

  onSubmit() {

   //fazendo a requisição para a API
   this.http.post(endpoints.autenticar_usuario, this.form.value)
   .subscribe({ //capturando o retorno da API (resposta)
     next: (data: any) => { //retorno de sucesso
       //gravar os dados do usuário autenticado na sessão do navegador
       sessionStorage.setItem('usuario', JSON.stringify(data));
       //redirecionar para a página do dashboard
       location.href = '/pages/dashboard';
     },
     error: (e) => { //retorno de erro
       if(typeof e.error === "string") {              
         this.mensagem = e.error;
       }
       else {
         this.erros = e.error;              
       }
     }
   });    
}
}

