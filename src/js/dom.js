import score from './topscores';

export const hide = () => {
  document.querySelector('.input').classList.add('hidden');
  document.querySelector('.loader').classList.add('hidden');

  const input = document.querySelector('input');
  score.user.user = input.value;
  localStorage.setItem('name', input.value);
};

export const show = () => {
  const input = document.querySelector('input');
  document.querySelector('.loader').classList.add('hidden');
  document.querySelector('.input').classList.remove('hidden');
  const savedName = localStorage.getItem('name');
  input.value = savedName;
};

export const loader = () => {
  document.querySelector('.loader').classList.remove('hidden');
}