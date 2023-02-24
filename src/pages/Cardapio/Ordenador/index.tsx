import React from "react";
import styles from './Ordenador.module.scss';
import opcoes from './opcoes.json';
import { useState } from "react";
import classNames from 'classnames';
import {MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'

interface Props {
  ordenador: string;
  setOrdenador: React.Dispatch<React.SetStateAction<string>>
}

export default function Ordenador({ordenador, setOrdenador}: Props) {

  const [open, setOpen] = useState(false)
  // caso ordenador exista, ele irá percorrer as opções e encotrar qual delas tem o mesmo valor que "ordenador"
  // e como ele retorna um objeto, queremos apenas o nome dele
  const nomeOrdenador = ordenador && opcoes.find((opcao) => ordenador === opcao.value)?.nome

  return (
    // para fazer um toggle, podemos negar o valor de "open" que ele sempre irá inverter de true para false e false apra true
    <button 
      className={classNames({
        [styles.ordenador]: true,
        // sendo apenas ativado quando o useState "ordenador" for diferente de vazio
        [styles['ordenador--ativo']]: ordenador !== ""
      })} 
      onClick={() => setOpen(!open)}
      // função para quando a gente clicar fora do botao ele fechar o as opções
      onBlur={() => setOpen(false)}
    >
      {/* sendo o span a situação atual do select
        Caso ordenador exista, ele exibe o nome da opção, caso não ele exibe a outra mensagem*/}
      <span>{nomeOrdenador || "Ordenar por"}</span>
      {/* utilizando a familia de icons do react-icons */}
      {open ? <MdKeyboardArrowUp size={20}/> : <MdKeyboardArrowDown size={20}/>}

      {/* essa div será as opções que teremos quando clicar no botão */}
      {/* utilizando classnames */}
      <div className={classNames({
        [styles.ordenador__options]: true,
        // só aplicando essa estilização se "open" for true
        [styles['ordenador__options--ativo']]: open,
      })}>
        {/* percorrendo o json com as opções de filtro*/}
        {opcoes.map((opcao) => (
          <div 
            className={styles.ordenador__option} 
            key={opcao.value}
            // então, ao clicar na opção será passado ao useState "ordenador" o value da opção clicada
            onClick={() => setOrdenador(opcao.value)}
          >
            {/* exibindo o nome das opçoes */}
            {opcao.nome}
          </div>
        ))}
      </div>
    </button>
  )
}