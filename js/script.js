const ContainerError = document.getElementById('err');
const ExibirResultado = document.getElementById('resultado');
const btnEnviar = document.getElementById('btn-enviar');

btnEnviar.addEventListener('click', ProcurarPokemon);

async function ProcurarPokemon() {
    const NomePokemon = document
        .getElementById('pokemon')
        .value
        .toLowerCase();

    if (!NomePokemon) {
        ContainerError.innerText = 'Informe o nome do pokemón para busca';
        return;
    }

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${NomePokemon}`
        );

        if (!response.ok) {
            throw new Error('Pokemón não encontrado');
        } else {
            ContainerError.innerText = '';
        }

        const data = await response.json();
        MostrarPokemon(data);

    } catch (error) {
        ContainerError.innerText = error.message;
    }
}

function MostrarPokemon(pokemon) {
    const tipos = pokemon.types
        .map(t => t.type.name)
        .join(', ');

    const pesoPokemon = pokemon.weight / 10;
    const alturaPokemon = pokemon.height / 10;

    ExibirResultado.style.display = 'flex';
    ExibirResultado.innerHTML = `
        <div class="pokemon" id="card-pokemon">
            <div class="fechar">
                <div class="pokemon-name">
                    <img src="public/icon.png">
                    <h2>${UpperCaseforFirst(pokemon.name)} - ${pokemon.id}</h2>
                </div>
                <h1 id="fechar-card">X</h1>
            </div>

            <div class="pokemon-img">
                <img src="${pokemon.sprites.front_default}">
            </div>

            <hr><br>

            <p>
                <strong>Tipos:</strong> ${UpperCaseforFirst(tipos)}
            </p>
            <p>
                <strong>Altura:</strong> ${alturaPokemon} m
            </p>
            <p>
                <strong>Peso:</strong> ${pesoPokemon} Kg
            </p>
        </div>
    `;

    document
        .getElementById('fechar-card')
        .addEventListener('click', () => {
            const cardPokemon = document.getElementById('card-pokemon');
            cardPokemon.style.display = 'none';
            ExibirResultado.style.display = 'none';
        });
}

function UpperCaseforFirst(palavra) {
    const PrimeiraLetra = palavra.substring(0, 1);
    const RestoPalavra = palavra.substring(1);

    return PrimeiraLetra.toUpperCase() + RestoPalavra;
}
