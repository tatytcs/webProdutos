//variável para configurar o endereço da API
const apiUrl = "http://localhost:8080";

//mapeamento de cada endpoint da API
export const endpoints = {
    cadastrar_produto : `${apiUrl}/api/produtos/cadastrar`,
    atualizar_produto : `${apiUrl}/api/produtos/atualizar`,
    excluir_produto : `${apiUrl}/api/produtos/excluir`,
    consultar_produtos : `${apiUrl}/api/produtos/consultar`,
    consultar_categorias : `${apiUrl}/api/categorias/consultar`
};
