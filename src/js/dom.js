import score from './topscores';

export const hide = () => {
  document.querySelector('.input').classList.add('hidden');
};

export const show = () => {
  document.querySelector('.input').classList.remove('hidden');
};

export const listener = () => {
  const input = document.querySelector('input');
  const savedName = localStorage.getItem('name');
  if (savedName != null) input.value = savedName;
  input.onkeyup = () => {
    score.name = input.value;
    localStorage.setItem('name', input.value);
  };
};
