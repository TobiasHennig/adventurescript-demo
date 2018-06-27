function directionToNumber(direction) {
  return direction === 'hoch' ? 0 : direction === "rechts" ? 1 : direction === "runter" ? 2 : 3;
}

export function transformer(ast) {
  const commands = [];

  while (ast.body.length > 0) {
    var node = ast.body.shift()
    let functionName = '';
    let args = [];
    switch (node.name) {
      case 'Gehe':
        functionName = 'move';
        args = [{
          "type": "Literal",
          "value": parseInt(node.arguments[0].value),
          "raw": node.arguments[0].value
        }];
        break;
      case 'Schaue':
        functionName = 'look';
        args = [{
          "type": "Literal",
          "value": directionToNumber(node.arguments[0].value),
          "raw": directionToNumber(node.arguments[0].value) + ''
        }];
        break;
      case 'Springe':
        functionName = 'jump';
        args = [];
        break;
      case 'Schlage':
        functionName = 'hit';
        args = [];
        break;
      case 'Grabe':
        functionName = 'dig';
        args = [];
        break;
    }
    commands.push({
      type: "ExpressionStatement",
      expression: {
        type: "AwaitExpression",
        argument: {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "hero"
            },
            property: {
              type: "Identifier",
              name: functionName
            },
            computed: false
          },
          arguments: args
        }
      }
    })
  };

  const asycFn = {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "FunctionExpression",
        async: true,
        body: {
          type: "BlockStatement",
          body: commands
        }
      },
      arguments: []
    }
  };

  const js_ast = {
    type: 'Program',
    body: [asycFn],
    sourceType: 'module'
  }

  return js_ast
}