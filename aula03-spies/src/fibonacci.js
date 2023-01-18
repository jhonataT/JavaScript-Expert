class fibonacci {
  *execute (input, current = 0, next = 1) {
    if(input === 0) {
      return 0;
    }
    yield current // como se tivesse retornando valores sobre demanda
    yield* this.execute(input - 1, next, current + next) // yield* vai delegar a função, mas não retorna valor
  }
}

module.exports = fibonacci;