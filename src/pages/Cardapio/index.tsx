// import React from "react";
import { useState } from "react";
import styles from "./Cardapio.module.scss";
import {ReactComponent as Logo} from "assets/logo.svg";
import Buscador from "./Buscador";
import Filtros from "./Filtros";
import Ordenador from "./Ordenador";
import Itens from './Itens'

export default function Cardapio() {
  const [busca, setBusca] = useState("")
  
  // setando seu estado inicial como null para que não seja necessario ter um filtro
  // sendo number por que será filtrado pelo id
  const [filtro, setFiltro] = useState<number | null>(null) 
  // definindo com um valor vazio por que no json há uma opção vazia, que é para que o usuário clique nela e limpe o ordenador
  const [ordenador, setOrdenador] = useState("")
  return (
    <main>
      <nav className={styles.menu}>
        <Logo/>
      </nav>
      <header className={styles.header}>
        <div className={styles.header__text}>
          A casa do código e da massa
        </div>
      </header>
      <section className={styles.cardapio}>
        <h3 className={styles.cardapio__titulo}>Cardápio</h3>
        <Buscador 
          busca={busca} 
          setBusca={setBusca}
        />
        <div className={styles.cardapio__filtros}>
          {/* passando como props o useState filtro e setFiltro */}
          <Filtros filtro={filtro} setFiltro={setFiltro}/>
          <Ordenador ordenador={ordenador} setOrdenador={setOrdenador}/>
        </div>
        {/* passando como props a 'busca' 'filtro' e o 'ordenador', para que de fato conseguimos fazer funcionar eles */}
        <Itens 
          busca={busca} 
          filtro={filtro} 
          ordenador={ordenador}
        />
      </section>
    </main>
  )
}