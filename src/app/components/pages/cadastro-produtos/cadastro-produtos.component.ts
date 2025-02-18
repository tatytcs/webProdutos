import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [
    CommonModule // para manipulação de dados que são gerados nos arquivos TypeScript e precisam ser exibidos na página HTML
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

  //evento executado sempre que o componente é carregado ou aberto no navegador

  ngOnInit() {
    //this.http.get: Chamada HTTP GET para buscar dados da API
    this.http.get('http://localhost:8080/api/categorias/consultar')
    .subscribe({next: (data) => { //quando a requisição é bem-sucedida e a resposta é recebida
      this.categorias = data as any[];

    }})
   ;
  }

}
