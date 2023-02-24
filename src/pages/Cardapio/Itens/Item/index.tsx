import React from "react";
import styles from './Item.module.scss'
import logo from 'assets/logo.svg'
import cardapio from '../itens.json'
import classNames from 'classnames'

// podendo tipar com a interface
interface Props2 {
  title: string;
  description: string;
  photo: string;
  size: number;
  serving: number;
  price: number;
  id: number;
  category: {
      id: number;
      label: string;
  };
}

// ou podendo tipar com o type
//  quando fazemos isso, todos os objetos de 'cardapio' tem que ser identicos, assim, ele pega o typeof de im objeto do array, que no caso fazemos com o do index 0, e o tipo dele serve como type para o props
type Props = typeof cardapio[0]

export default function Item(props: Props) {
// desestruturando os objetos que vem de props
const {title, description, category, size, serving, price, photo} = props;
  return (
    <div className={styles.item}>
      <div className={styles.item__imagem}>
        <img src={photo} alt={title} />
      </div>
      <div className={styles.item__descricao}>
        <div className={styles.item__titulo}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className={styles.item__tags}>
          <div className={classNames({
            [styles.item__tipo]: true,
            // conforme o 'category' da vez, pegando o label dele que é o mesmo nome da class, apenas tendo que tranformar tudo em letra minuscula
            [styles[`item__tipo__${category.label.toLowerCase()}`]]: true
          })}>
            {category.label}
          </div>
          <div className={styles.item__porcao}>
            {size}g
          </div>
          <div className={styles.item__qtdpessoas}>
            Serve {serving} pessoa{serving === 1 ? '' : 's'}
          </div>
          <div className={styles.item__valor}>
            R$ {price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}