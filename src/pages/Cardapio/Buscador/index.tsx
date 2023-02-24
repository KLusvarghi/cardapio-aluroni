import React from "react";
import styles from './Buscador.module.scss';
import { CgSearch } from 'react-icons/cg'

// Para saber o tipo de cada prop, basta ir no arquivo que manda essas props e passar o mouse por cima da prop que ele mostr ao seu tipo
interface Props {
  busca: string,
  setBusca: React.Dispatch<React.SetStateAction<string>>
}

export default function Buscador({busca, setBusca}: Props) {
  return (
    <div className={styles.buscador}>
      <input 
        value={busca}
        placeholder="Buscar"
        onChange={(e) => setBusca(e.target.value)}
        type="text" 
      />
      <CgSearch
        size={20}
        color="#4D4C5F"
      />
    </div>
  )
}