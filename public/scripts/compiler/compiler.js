import { lexer } from './lexer.js';
import { parser } from './parser.js';
import { transformer } from './transformer.js';
import { generate } from '/vendor/astring.js';

export function compile(code) {
  const tokens = lexer(code);
  console.group('lexer');
  console.log(tokens);
  console.groupEnd('lexer');

  const tokens2 = tokens.slice(0); // Clone

  const ast = parser(tokens2);
  console.group('parser');
  console.log(ast);
  console.groupEnd('parser');

  const ast2 = JSON.parse(JSON.stringify(ast)); // Clone

  const js_ast = transformer(ast2);
  console.group('transformer');
  console.log(js_ast);
  console.groupEnd('transformer');

  const js_string = generate(js_ast);
  console.group('renderer');
  console.log(js_string);
  console.groupEnd('renderer');

  return js_string;
}

