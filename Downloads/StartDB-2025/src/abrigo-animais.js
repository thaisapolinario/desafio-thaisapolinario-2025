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
    }
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
  }
}

export { AbrigoAnimais as AbrigoAnimais };
