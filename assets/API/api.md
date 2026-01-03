# URL da API
API_URL =  `https://pokeapi.co/api/v2/pokemon/{nome-ou-id-pokemon}` ;

# Objetos da URL
- NOME = .name
- ID = .id
- IMAGEM_FRONTAL = .sprites.front_default
- IMAGEM_TRASEIRA = .sprites.back_default
- ALTURA = .height / 10
- PESO = .weight / 10

# MAPEAMENTOS
- TIPOS = .types.map(t => t.type.name)
- STATUS_BASE = .stats.map( s =>({
    nome: s.stat.name,
    valor: s.base_stat
}))