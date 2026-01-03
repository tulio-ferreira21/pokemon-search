function createErroMessage(Mensagem) {
  const divSearch = document.querySelector('.search');

  // Verifica se o elemento existe
  let errorMessage = document.querySelector('.error');

  // Caso não exista, cria
  if (!errorMessage) {
    errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorMessage.style.display = 'block';
    errorMessage.innerText = Mensagem;
    divSearch.appendChild(errorMessage);
  }

  // Se existir, atualiza
  errorMessage.style.display = 'block';
  errorMessage.innerText = Mensagem;

  setTimeout(function () {
    errorMessage.style.display = 'none';
  }, 3000);
}

function createCardPokemon(pokemon) {
  const overlay = document.querySelector('.overlay');
  let frontImage = pokemon.sprites.front_default;
  let backImage = pokemon.sprites.back_default;
  let pokemonName = pokemon.name;
  let pokemonId = pokemon.id;
  let pokemonHeight = pokemon.height / 10;
  let pokemonWeight = pokemon.weight / 10;

  let pokemonTypes = pokemon.types
    .map(t => t.type.name)
    .join(', ');

  let pokemonStats = pokemon.stats.map(s => (
    `<div class='stat'>
       <strong> ${upperCaseFirst(s.stat.name)}</strong> : ${s.base_stat}
        </div>
        `
  ))
    .join(``)

  const cardPokemon = document.createElement('div');
  cardPokemon.classList.add('card-pokemon');
  cardPokemon.innerHTML = `
    <div class="header-card">
      <div class="header-left">
       <img src='assets/public/icon.png'>
        <h3>${upperCaseFirst(pokemonName)} - ${pokemonId}</h3>
      </div>

      <div class="close-card">
        <h3>X</h3>
      </div>
    </div>

    <div class="img-card">
      <img 
        src="${frontImage}" 
        alt="Imagem frontal do Pokemón" 
        title="imagem do pokemón ${pokemonName}"
      >
    </div>

    <div class="card-info">
      <p><strong>Tipos:</strong> ${upperCaseFirst(pokemonTypes)}</p>
      <p><strong>Peso:</strong> ${pokemonWeight}Kg</p>
      <p><strong>Altura:</strong> ${pokemonHeight}m</p>
      <p>
        <strong>Status:</strong>
        <button id="stats-pokemon">Ver Status do Pokemón</button>
      </p>
    </div>
  `;

  const displayStats = cardPokemon.querySelector('#stats-pokemon')
  overlay.style.display = 'flex';
  // Coloquei o cardPokemom dentro do elemento overlay
  overlay.appendChild(cardPokemon);
  
  // Seleciono o .close-card dentro do cardPokemon para poder fechá-lo quando houver um click nele
  const closeCard = cardPokemon.querySelector('.close-card');
  closeCard.addEventListener('click', () => {
    overlay.style.display = 'none';
    cardPokemon.remove();
  });
  displayStats.addEventListener('click', () => {
    cardPokemon.style.maxWidth = '600px'
    cardPokemon.style.width = '100%'
    cardPokemon.innerHTML = `
    <div class="header-card">
      <div class="header-left">
      <img src='assets/public/icon.png'>
        <h3>${upperCaseFirst(pokemonName)} - ${pokemonId}</h3>
      </div>

      <div class="close-card">
        <h3>X</h3>
      </div>
    </div>

    <div class="img-card">
        <div>
            <h3>Imagem Frontal</h3>
                <img 
                    src="${frontImage}" 
                    alt="Imagem frontal do Pokemón" 
                    title="imagem do pokemón ${pokemonName}"
                >
            </div>
            <div>
            <h3>Imagem Traseira</h3>
                <img 
                    src="${backImage}" 
                    alt="Imagem traseira do Pokemón" 
                    title="imagem do pokemón ${pokemonName}"
                >
            </div>
    </div>
    <div class ='stats-pokemon'>
        ${pokemonStats}
    </div>
    `
    // Reseleciono o.close-card pois editei o inner-html: tenho que recriar eventos
    const closeCard = cardPokemon.querySelector('.close-card');
    closeCard.addEventListener('click', () => {
      overlay.style.display = 'none';
      cardPokemon.remove();
    });
  })
}

async function searchPokemon() {
  const pokemonInput = document.getElementById('pokemon');

  let pokemonName = pokemonInput.value.toLowerCase().trim();

  if (!pokemonName) {
    createErroMessage('Informe o nome do pokemón para bsuca');
    return;
  }

  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    const pokemon = data;
    createCardPokemon(pokemon);
  } catch (error) {
    createErroMessage(
      'Erro na requisição ou pokemón inexistente: ' + error.message
    );
  }
}

function upperCaseFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

document.querySelector('button').addEventListener('click', searchPokemon);
document.querySelector('button').addEventListener('keydown', (event)=>{
   if (event.key === 'Enter') searchPokemon;
})
document.querySelector('input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchPokemon();
  }
});

