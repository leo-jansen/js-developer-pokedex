const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <div class="card border-secondary text-center m-2">
            <h5 class="card-header">#${pokemon.number}.${pokemon.name}</h5>
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${pokemon.photo}" alt="${pokemon.name}" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h6 class="card-title">Types</h6>
                        <ul class="list-group list-group-flush">
                            ${pokemon.types.map(type => `<li class="list-group-item ${type}">${type}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})