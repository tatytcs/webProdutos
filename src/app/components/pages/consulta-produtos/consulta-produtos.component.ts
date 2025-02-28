import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl,FormsModule,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { endpoints } from '../../../configurations/enviroments';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consulta-produtos',
  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink  
],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent {

  // Variável para armazenar os produtos retornados pela API(No caso JSON)
  produtos: any = [];
  // Variável para armazenar a mensagem de retorno da API
  mensagem: string = '';

  //Para inicializar o HTTPClient é preciso declarar uma variavel http do tipo HTTPClient no construtor
  constructor(private http: HttpClient) { }

  // Formulário de consulta de produtos
  form = new FormGroup({
    nome: new FormControl(''),    
  });

  onSubmit() {

    // this.form.value.nome é o valor do campo nome do formulário
    // O comando GET é para fazer uma requisição do tipo GET para a API
    
    this.http.get(`${endpoints.consultar_produtos}/${this.form.value.nome}`)
    .subscribe({next: data => {
        // Atribui o retorno da API para a variável produtos(No caso this é uma variavel declarada na classe)
        // O comando as any é para forçar o retorno da API para o tipo any 
        this.produtos = data as any;
      }
    
    });
  }

  // Método para excluir um produto
  // O método recebe como parâmetro o id do produto a ser excluído
  onDelete(id: string) {

    if (confirm('Deseja realmente excluir o produto?')) {

    
    // O comando DELETE é para fazer uma requisição do tipo DELETE para a API
    // O comando responseType: 'text' é para forçar o retorno da API para o tipo texto
    this.http.delete(`${endpoints.excluir_produto}/${id}` , {responseType: 'text'})
    // O método subscribe é para receber o retorno da API
   // O comando data => é uma função lambda que recebe o retorno da API
    .subscribe({next: data => {
      // Atribui o retorno da API para a variável mensagem(No caso this é uma variavel declarada na classe)
      this.mensagem = data;
        // Após excluir o produto, o método onSubmit é chamado para atualizar a lista de produtos
        this.onSubmit();
      }
    
    });
  }

  }
}
