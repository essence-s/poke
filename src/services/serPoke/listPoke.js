const listPoke = async () =>{
  try{
    let url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
    const response = await fetch(url)
    const data = await response.json()
    return data
  }catch(e){
    console.log(e)
  }
}

export default listPoke
