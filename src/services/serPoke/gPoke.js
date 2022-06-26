const listPoke = async () =>{
  try{
    let url = `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
    const response = await fetch(url)
    const data = await response.json()
    return data
  }catch(e){
    console.log(e)
  }
}

const listPokeData = async(url) =>{
  let response = await fetch(url)
  let data = await response.json()
  return data
}

const getPokeImg = async(numbername) =>{
  try{
    let url = `https://pokeapi.co/api/v2/pokemon/${numbername}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.sprites.front_default)
    return data.sprites.front_default
  }catch(e){
    console.log(e)
  }
}

const getTypesPoke = async(url) =>{
  try{
    let response = await fetch(url)
    let data = await response.json()
    return data
  }catch(e){
    console.log(e)
  }
}

const getPokeSpecies = async(url) =>{
  try{
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    return data
  }catch(e){
    console.log(e)
  }
}

const getEvolutionChain = async(url) =>{
  try{
    let response = await fetch(url)
    let data = await response.json()
    // console.log(data)
    return data
  }catch(e){
    console.log(e)
  }
}



export {listPoke,listPokeData,getPokeImg,getTypesPoke,getPokeSpecies,getEvolutionChain}
