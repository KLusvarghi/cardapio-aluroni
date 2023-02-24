import React from 'react';
import styles from './Filtros.module.scss';
import filtros from './filtros.json';
// importnando classnames
import classNames from 'classnames';

// sendo a mesma coisa que o de baixo
// interface Opcao {
//   id: number;
//   label: string;
// }

/* 
Uma maneira de tipar utilizando types, que é um tipo de interface porem de uma amenira mais básica 
Ele por si só já entende: passando o mouse por cima ele diz que seu tipo é:
type opcao = {
    label: string;
    id: number;
}
*/
type IOpcao = typeof filtros[0];

interface Props {
  filtro: number | null;
  setFiltro: React.Dispatch<React.SetStateAction<number | null>>
}

export default function Filtros({filtro, setFiltro}: Props) {

  function selecionarFiltro(opcao: IOpcao, ){
    // para que consiga desselecionar um filtro, verificamos se o clicado é o mesmo que está ativo, e se for, ele set 'setFiltro' para null
    if(filtro === opcao.id) return setFiltro(null)
    
    // ao selecioanr um filtro ele chamará essa opção e irá setar o useState "setFiltro" com o valor de opcao.id
    // console.log(opcao) // {label: 'Carnes', id: 2}
    // como return ele seta o valor de "setFiltro" para o id do filtro selecionado
    return setFiltro(opcao.id)
  }

  return (
    <div className={styles.filtros}>
      {/* percorrendo o json com as opções */}
      {filtros.map((opcao) => (
        <button
        // como uma classe com "--" dará erro tem que se fazer dessa maneira:
          className={classNames({
            // qual será o primeiro valor desse objeto
            // dizendo que ele semrpe será true
            [styles.filtros__filtro]: true,
            // dizendo o segunbdo valor
            // caso a condição colocada após ':' for concedida, ele aplica a estilização
            [styles['filtros__filtro--ativo']]: filtro === opcao.id

            // feito sem o 'classnames'
            // `${styles.filtros__filtro} ${filtro === opcao.id ? styles["filtros__filtro--ativo"] : ""}`
          })} 
          key={opcao.id}
          onClick={() => selecionarFiltro(opcao)}
        >
          {opcao.label}
        </button>
      ))}
    </div>
  )
}