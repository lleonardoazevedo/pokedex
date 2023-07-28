const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let seachPokemon = 1;


const fetchPokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async(pokemon) => {

    pokemonName.innerHTML = 'Loading...'


    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        seachPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não Encontrado :(';
        pokemonNumber.innerHTML = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (seachPokemon > 1) {
        seachPokemon -= 1;
        renderPokemon(seachPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    seachPokemon += 1;
    renderPokemon(seachPokemon);
});

renderPokemon('1');
/*o await só funciona se definir que é uma função async = assincrona.
ele vai executar o fetch e depois retornar o que esta no console log
    
const data - extrair a resposta da api.
    
render vai pegar os dados e renderizar o pokemon*/