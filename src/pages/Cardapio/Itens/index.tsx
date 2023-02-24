import React, { useEffect, useState } from "react";
import styles from './Itens.module.scss';
import cardapio from './itens.json';
import Item from './Item'

// tipando as props recebidas como parametro
interface Props {
  busca: string,
  filtro: number | null,
  ordenador: string
}

export default function Itens(props: Props) {
  // sendo essa a lsita a ser renderizada
  const [lista, setLista] = useState(cardapio)
  const { busca, filtro, ordenador } = props


  function testaBusca(title: string){
    // testando "busca" e o "i" quer dizer para o regex que ele será caseinsensitive, não importando letras maiusculas e minusculas
    const regex = new RegExp(busca, 'i')

    return regex.test(title)
  }
  
  function testaFiltro(id: number){
    // se o item.category.id for igual ao filtro, quer dizer que bate com o filtro
    if(filtro !== null) return filtro === id
    
    // caso não bata, ele apenas retorna true
    return true
  }

  // ao tipar o parametro, dizemos que seu tipo é de 'cardapio'
  function ordenarLista(novaLista: typeof cardapio) {
    switch(ordenador){
      case 'porcao':
        // sendo o sort para ordenar
        // ele espera dois parametro, ele assim percorrendo a lista e comparando se o a.size (que se refere a quantidade de pessoas por porção) é maior que b.size, se for true retornamos 1 e caso essa condição seja false retornamos -1
        return novaLista.sort((a, b) => a.size > b.size ? 1 : -1)
      case "qtd_pessoas":
        return novaLista.sort((a, b) => a.serving > b.serving ? 1 : -1)
      case "preco":
        return novaLista.sort((a, b) => a.price > b.price ? 1 : -1)
      default:
        return novaLista
    }
  }


// sempre que a busca ou o filtro atualiza, temos que atualizar o componente
useEffect(() => {
  // assim filtrando pior cardapio, por que se uma hora a gente filtrar "lista" e nela tiver apenas "massa" por exemplo, quando agente for quere filtrar "vegano" nela, a gente não irá conseguir por que não irá existir
  const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id)) // tendo que testar a busca e o filtro para ver se eles corresponde com a busca ou o filtro do usuário

  // e no final setando a lista que é exibida para a novaLista com o filtro ou busca desejada
  // mas alem disso, chamando outra função que irá ordenar os itens filtrados
  setLista(ordenarLista(novaLista))
}, [busca, filtro, ordenador])

  return (
    <div className={styles.itens}>
      {/* percorrendo a lista de cardápios */}
      {lista.map(item => (
        <Item 
          key={item.id}
          // passando cada item via props com o spread operator
          {...item}
        />
      ))}
    </div>
  )
}