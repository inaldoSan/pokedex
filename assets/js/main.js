
const pokemonList = document.getElementById('pokemonList')

const loadMorebutton = document.getElementById('loadMoreButton')

const maxRecords = 151

const limit = 10

let offset = 0;



function loadPokemonItens(offset, limit) {
    
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>`
        
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>

        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)


loadMorebutton.addEventListener('click', () => {

    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMorebutton.parentElement.removeChild(loadMorebutton)

    } else {
        loadPokemonItens(offset, limit)
    }
})



