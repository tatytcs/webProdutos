import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  
import { ActivatedRoute } from '@angular/router';
import { endpoints } from '../../../configurations/enviroments';


@Component({
  selector: 'app-edicao-produtos',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './edicao-produtos.component.html',
  styleUrl: './edicao-produtos.component.css'
})
export class EdicaoProdutosComponent {

  id: string = '';
  categorias: any[] = []; //array de objetos
  erros: any = null; //objeto
  mensagem: string = ''; //mensagem de sucesso
 

  constructor(
    private http: HttpClient,
    //captura o id da URL
    private activatedRoute: ActivatedRoute    
  ) {}

  ngOnInit() {
    //captura o id da URL  
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.http.get(`${endpoints.obter_produto}/${this.id}`)
    .subscribe({
      next: (data : any) => {
        this.form.controls.nome.setValue(data.nome);
        this.form.controls.preco.setValue(data.preco);
        this.form.controls.quantidade.setValue(data.quantidade);
        this.form.controls.categoriaId.setValue(data.categoria.id);
      }
    });

  //fazendo uma requisição GET para a API
  this.http.get(endpoints.consultar_categorias)
  .subscribe({ //capturando a resposta da requisição
    next: (data) => { //se a requisição for bem sucedida
      this.categorias = data as any[];
    }
  });
}


form = new FormGroup({
  nome: new FormControl(''), 
  preco:new FormControl(''),
  quantidade:new FormControl(''),
  categoriaId:new FormControl('')
});

  onSubmit() {

     //this.http.post: Chamada HTTP POST para enviar dados para a API
      //this.form.value: Dados do formulário
      this.http.put(`${endpoints.atualizar_produto}/${this.id}`, this.form.value,
        {responseType: 'text'} //tipo de resposta que a API deve retornar
        ).subscribe({next: (data) => {  //quando a requisição é bem-sucedida e a resposta é recebida
          this.erros = null; //limpa os erros de validação do formulário
          this.mensagem = data; //armazena a mensagem de sucesso do cadastro
          
         },
         error:  (e) => { // quando a requisição falha
           this.erros = JSON.parse(e.error); //armazena os erros de validação do formulário
           this.mensagem = ''; //limpa a mensagem de sucesso do cadastro
         } 
      });

} 

}