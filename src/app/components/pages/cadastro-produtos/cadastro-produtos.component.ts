import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { endpoints } from '../../../configurations/enviroments';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [
    CommonModule, // para manipulação de dados que são gerados nos arquivos TypeScript e precisam ser exibidos na página HTML
    ReactiveFormsModule,
     
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {
  //any[]= vai receber um array de qualquer dado
  //=[] o atributo categorias começa com um array vazio
  categorias : any[] = [];

  //método construtor executado automaticamente quando a classe é instanciada
  //O http esta sendo injetado no componente como um serviço Angular
  constructor(private http: HttpClient){}

  erros: any = null; //variável para armazenar os erros de validação do formulário
  mensagem: string = ''; //variável para armazenar a mensagem de sucesso do cadastro

  //evento executado sempre que o componente é carregado ou aberto no navegador
  ngOnInit() {
    //this.http.get: Chamada HTTP GET para buscar dados da API
    this.http.get(endpoints.consultar_categorias)
    .subscribe({next: (data) => { //quando a requisição é bem-sucedida e a resposta é recebida
      this.categorias = data as any[]; //

    }})
   ;
  }

    //FormGroup: Representa um grupo de controles no formulário
    //FormControl: Representa um campo de formulário

    form = new FormGroup({
      nome: new FormControl(''), 
      preco:new FormControl(''),
      quantidade:new FormControl(''),
      categoriaId:new FormControl('')
    });

    onSubmit() {
      //this.http.post: Chamada HTTP POST para enviar dados para a API
      //this.form.value: Dados do formulário
      this.http.post(endpoints.cadastrar_produto, this.form.value,
      {responseType: 'text'} //tipo de resposta que a API deve retornar
      ).subscribe({next: (data) => {  //quando a requisição é bem-sucedida e a resposta é recebida
        this.erros = null; //limpa os erros de validação do formulário
        this.mensagem = data; //armazena a mensagem de sucesso do cadastro
        this.form.reset(); //limpa os campos do formulário
       },
       error:  (e) => { // quando a requisição falha
         this.erros = JSON.parse(e.error); //armazena os erros de validação do formulário
         this.mensagem = ''; //limpa a mensagem de sucesso do cadastro
       } 
    });



  }

}
