class AbrigoAnimais {

    constructor(){ //criando uma nova instancia
      this.animais_do_abrigo = {
        //definindo os animais que ainda estao no abrigo
        Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
        Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
        Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
        Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
        Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
        Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
        Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] }
        };

      this.brinquedos_do_abrigo = new Set(
        Object.values(this.animais_do_abrigo).flatMap(a => a.brinquedos)
    );

    }
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      //separando por virgula
      const pessoa1 = brinquedosPessoa1.split(",").map(b => b.trim());
      const pessoa2 = brinquedosPessoa2.split(",").map(b => b.trim());
      const entrada_animal = ordemAnimais.split(",").map(a => a.trim());

      if (new Set(entrada_animal).size !== entrada_animal.length) {
        return { erro: "Animal inválido" };
      }
      for (let animal of entrada_animal) {
        if (!this.animais_do_abrigo[animal]) {
          return { erro: "Animal inválido" };
        }
      }

      const juntos = [...pessoa1, ...pessoa2];
      if (new Set(juntos).size !== juntos.length) {
        return { erro: "Brinquedo inválido" };
      }

      for (let brinquedo of juntos) {
        if (!this.brinquedos_do_abrigo.has(brinquedo)){
          return { erro: "Brinquedo inválido" };
        } 
      }

      const resultado = [];
      const adotados = { pessoa1: [], pessoa2: [] };
      const chavePessoa = (destino) => destino === "pessoa 1" ? "pessoa1"
                                  : destino === "pessoa 2" ? "pessoa2"
                                  : null;

      for (let animal of entrada_animal) {
        const {  tipo, brinquedos } = this.animais_do_abrigo[animal];

        const cumpre_regra_pessoa1 = this.sequencia(pessoa1, brinquedos, animal);
        const cumpre_regra_pessoa2 = this.sequencia(pessoa2, brinquedos, animal);

        let destino = "abrigo";

        if (cumpre_regra_pessoa1 && !cumpre_regra_pessoa2 && adotados.pessoa1.length < 3) destino = "pessoa 1";
        else if (cumpre_regra_pessoa2 && !cumpre_regra_pessoa1 && adotados.pessoa2.length < 3) destino = "pessoa 2";
        else if (cumpre_regra_pessoa1 && cumpre_regra_pessoa2) {
          destino = "abrigo";
        }

        // Loco so pode ser adotado se a pessoa já tiver um animal
        if (animal === "Loco") {
          const chave = chavePessoa(destino);
          if (chave && adotados[chave].length === 0) {
            destino = "abrigo";
          }
        }


        //comfirma adoção
        if (destino.startsWith("pessoa")) {
          const chave = chavePessoa(destino);
          adotados[chave].push(animal);
        }

        resultado.push(`${animal} - ${destino}`);
      }

      return {  lista: resultado.sort((a, b) => a.localeCompare(b))  };
    } catch {
      return { erro: "Erro inesperado" };
    }


  }

    sequencia(lista, alvo, animal) {
    if (animal === "Loco") {
      //não importa com a ordem
      return alvo.every(b => lista.includes(b));
    }

    let i = 0;
    for (let item of lista) {
      if (item === alvo[i]) i++;
      if (i === alvo.length) return true;
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
