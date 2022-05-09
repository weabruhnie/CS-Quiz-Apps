let alg2_Questions =[]

window.onload = () => {
  function createKatex(string) {
    return katex.renderToString(string)
  }

  alg2_Questions = [
    {
      q: createKatex("32^{3}"),
  
      options: [
        'myFunction()', // 0
        'call myFunction()', // 1
        'call function myFunction()', // 2
        'all of the above' // 3
      ],
  
      answer: 0 // use index above to pick correct answer!
    },
    {
      q: 'How to write an IF statemente in JavaScript?',
  
      options: [
          'if i==5 then', 
          'if(i==5)', 
          'if i= 5', 
          'if i = 5 then'
      ],
  
      answer: 1
    },
    {
      q: 'How to you select an element based on its css class',
      options: [
        'getElementById',
        'getElementByClass',
        'querySelector',
        'getElementByCss'
      ],
      answer: 2
    },
    {
      q: 'Last test',
      options: [
        '0',
        '1',
        '2',
        '3'
      ],
      answer: 0
    },
  ]
}