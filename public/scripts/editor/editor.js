import { compile } from '/scripts/compiler/compiler.js';

const $playBtn = document.getElementById('playBtn');
const $code = document.getElementById('code');

$playBtn.addEventListener('click', () => {
  const code = $code.value.trim();
  if (code === '') return;
  eval(compile($code.value));
});
