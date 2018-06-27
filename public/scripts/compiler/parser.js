export function parser(tokens) {
  var AST = {
    type: 'Adventure',
    body: []
  }
  // extract a token at a time as current_token. Loop until we are out of tokens.
  while (tokens.length > 0) {
    const current_token = tokens.shift()

    // Since number token does not do anything by it self, we only analyze syntax when we find a word.
    if (current_token.type === 'word') {
      switch (current_token.value) {
        case 'gehe':
          var expression = {
            type: 'CallExpression',
            name: 'Gehe',
            arguments: []
          }
          // if current token is CallExpression of type Move, next token should be steps argument
          var argument = tokens.shift()
          if (argument.type === 'number') {
            expression.arguments.push({  // add argument information to expression object
              type: 'NumberLiteral',
              value: argument.value
            })
            AST.body.push(expression)    // push the expression object to body of our AST
          } else {
            throw 'Move command must be followed by a number.'
          }
          break
        case 'schaue':
          var expression = {
            type: 'CallExpression',
            name: 'Schaue',
            arguments: []
          }
          // if current token is CallExpression of type Move, next token should be direction argument
          var argument = tokens.shift()
          if (argument.type === 'word') {
            expression.arguments.push({  // add argument information to expression object
              type: 'StringLiteral',
              value: argument.value
            })
            AST.body.push(expression)    // push the expression object to body of our AST
          } else {
            throw 'Look command must be followed by a string.'
          }
          break
        case 'springe':
          var expression = {
            type: 'CallExpression',
            name: 'Springe',
            arguments: []
          }
          AST.body.push(expression)
          break
        case 'schlage':
          var expression = {
            type: 'CallExpression',
            name: 'Schlage',
            arguments: []
          }
          AST.body.push(expression)
          break
        case 'grabe':
          var expression = {
            type: 'CallExpression',
            name: 'Grabe',
            arguments: []
          }
          AST.body.push(expression)
          break
      }
    }
  }
  return AST
}
