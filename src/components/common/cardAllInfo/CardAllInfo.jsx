import React, {useEffect, useState} from "react";
import CardPoke from "../cardPoke/CardPoke";
import './cardAllInfo.css'

import loadPoke from 'assets/load.gif'

import {listPokeData,getPokeSpecies,getEvolutionChain, getPokeImg} from "services/serPoke/gPoke"

const CardAllInfo = ({setState,state,data}) =>{

  // console.log(data)
  let [dataPokeSpecies,setDataPokeSpecies] = useState()
  let [dataEvolutionChain,setDataEvolutionChain] = useState([])

  const pokeSpecies = async (url) =>{
    // console.log(url)
    if(!url)return
    let resPoSp = await getPokeSpecies(url)
    setDataPokeSpecies(resPoSp)

    let resEvCh = await getEvolutionChain(resPoSp.evolution_chain.url) 

    let urlEC1=resEvCh.chain
    let urlEC2=urlEC1?.evolves_to[0]
    let urlEC3=urlEC2?.evolves_to[0]

    let urlsEC=[
      {name:urlEC1.species.name},
      {name:urlEC2?.species.name},
      {name:urlEC3?.species.name}
    ]

    let promises=urlsEC.map(async(r)=>{
      return await getPokeImg(r.name)
    })

    let resP=await Promise.all(promises)
    setDataEvolutionChain(resP)

    // setTimeout(()=>console.log(resP),5000)
  }
// setTimeout(()=>console.log(dataPokeSpecies),5000)

  let onArrowCLose = ()=>{
    setState(false)
    setDataPokeSpecies(null)
    setDataEvolutionChain([])
  }

  useEffect(()=>{
    if(Object.entries(data).length>0){
      pokeSpecies(data?.species?.url)
       // console.log(data)
    }
     // console.log(Object.entries(data))
   
  },[data])
    
  return (  
             
    state&&
    <div className="cardAllInfo">

        <div className="cardAllInfo-arrowClose" onClick={()=>onArrowCLose()}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </div>

      <div className="cardAllInfo-container">
        
        
        
        <CardPoke data={data} design={2}></CardPoke>
       
        <div className="cardAllInfo-pokeDate">
          <div className="cardAllInfo-title">Bio</div>
          {/* <div className="cardAllInfo-pokeDateContent"> */}

          {/* </div> */}
          <div className="cardAllInfo-bio">
            {dataPokeSpecies?.flavor_text_entries[0].flavor_text}
            {/* {dataPokeSpecies.length>0?'sita':'nota'} */}
          </div>
          <div className="cardAllInfo-weight">weight :<span>{data.weight}</span></div>
          <div className="cardAllInfo-height">height :<span>{data.height}</span></div>
          <div className="cardAllInfo-abilities">
            abilities :
            <div className="cardAllInfo-ability">
              {data.abilities?.map((ability)=>
              <span key={ability.ability.name}>
                  {`${ability.ability.name} ${ability.is_hidden?'(hidden)':''}`}
              </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="cardAllInfo-evolutionChain">
          <div className="cardAllInfo-title">Evolution</div>
          <div className="cardAllInfo-evolutionImg">
            {dataEvolutionChain.length>0?dataEvolutionChain.map((img,i)=>{
            // console.log(img)
            return img&&<img key={i} src={img} alt=""/>
            }): <img src={loadPoke}></img>}
          </div>
         
        </div>

        <div className="cardAllInfo-training">
          <div className="cardAllInfo-title">Training</div>
          <div className="cardAllInfo-baseExp">
            Base EXP : <span>{data.base_experience}</span>
          </div>
          <div className="cardAllInfo-baseHappiness">
            Base Happiness : <span>{dataPokeSpecies?.base_happiness}</span>
          </div>
          <div className="cardAllInfo-captureRate">
            Capture Rate : <span>{dataPokeSpecies?.capture_rate}</span>
          </div>
          <div className="cardAllInfo-growthRate">
            Growth Rate : <span>{dataPokeSpecies?.growth_rate.name}</span>
          </div>
        </div>

        <div className="cardAllInfo-stats">
          <div className="cardAllInfo-title">Stats</div>
          <div className="cardAllInfo-statsContent">
            {data?.stats.map((stat)=>
            <div key={stat.stat.name} className="cardAllInfo-statsItem">
                {stat.stat.name}
                <span>{stat.base_stat}</span>
            </div>
            )}
          </div>
        </div>

      </div>

    </div> 
  )
}

export default CardAllInfo
