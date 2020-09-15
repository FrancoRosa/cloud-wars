import score from './topscores';

const dom = (() => {
  const hide = () => {
    document.querySelector('.input').classList.add('hidden');
    document.querySelector('.loader').classList.add('hidden');

    const input = document.querySelector('input');
    score.user.user = input.value;
    localStorage.setItem('name', input.value);
  };

  const show = () => {
    const input = document.querySelector('input');
    document.querySelector('.loader').classList.add('hidden');
    document.querySelector('.input').classList.remove('hidden');
    const savedName = localStorage.getItem('name');
    input.value = savedName;
  };

  const loader = () => {
    document.querySelector('.loader').classList.remove('hidden');
  };

  return {
    hide,
    show,
    loader,
  };
})();

export default dom;