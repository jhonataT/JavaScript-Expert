const sinon = require('sinon');
const Fibonacci = require('./fibonacci');
const assert = require('assert');

// Fibonacci: o próximo valor correspondente à soma dos dois anteriores
// dado 3:
// 0,1,1
// dado 5:
// 0,1,1,2,3

(async () => { 
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // generators retornam iterators, (.next)
    // existem 3 formas de ler os dados
    // usando as funções .next, for await e rest/spread
    for await (const i of fibonacci.execute(4)) {}
    // Nosso algoritmo vai sempre começar do zero!
    const expectedCallCount = 5
    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);
    // input = 5, current 0, next = 1
    // input = 4, current 1, next = 1
    // input = 3, current 1, next = 2
    // input = 2, current 2, next = 3
    // input = 1, current 5, next = 8
    console.log(`results: ${results}`);
    
    const { args } = spy.getCall(2);
    const expectedResult = [0,1,1,2,3];

    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    });
    
    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(expectedResult, results);
  }
})()