import React, {useEffect, useState} from "react"
import { CardAllInfo } from "components/common"
import CardPoke from "components/common/cardPoke/CardPoke"

// import listPoke from "services/serPoke/listPoke"
// import listPokeData from "services/serPoke/listPokeData"
import {listPoke,listPokeData,getTypesPoke} from "services/serPoke/gPoke"
import './home.css'
const Home = () =>{

  let [pokemonesData,setPokemonData] = useState([])

  let listDataPokemon=async()=>{
    let pokemoness=await listPoke();
    // console.log(pokemoness.results)
    const promises = pokemoness.results.map(async (pokemon) =>{
      return await listPokeData(pokemon.url)
    })
    const results1 = await Promise.all(promises)

    // const promisesTypes = results1.map(async (dataPoke) =>{
    //   return await getTypesPoke(dataPoke.types[0].type.url)
    // })
    // const results2 = await Promise.all(promisesTypes)    
    setPokemonData(results1)
    // console.log(results1)
    // console.log(results2)
  } 
  let [stateModal,setStateModal] = useState(false)
  let [dataModal,setDataModal]= useState({})

  let onModal=(data)=>{
    setStateModal(true)
    setDataModal(data)
  }

  useEffect(()=>{
    listDataPokemon() 
  },[])

  return(
    <div className="home">
      <div className="pokemones">
        <CardAllInfo setState={setStateModal} state={stateModal} data={dataModal}></CardAllInfo>
        {pokemonesData.length>0?pokemonesData.map(r=> <CardPoke key={r.name} data={r} onClick={()=>onModal(r)}></CardPoke> ):'nel'}
 
      </div>
    </div>
  )
}

export default Home
