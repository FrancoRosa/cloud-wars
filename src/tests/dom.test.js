import dom from '../js/dom';

describe('dom', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = '<body>'
      + '<div class="frame">'
      + '  <div class="input hidden">'
      + '    <input type="text" placeholder="-player name-" autofocus spellcheck="false">'
      + '  </div>'
      + '  <div class="loader hidden"></div>'
      + '</div>'
      + '</body>';
  });

  describe('hide', () => {
    test('it should add the class hidden to loader and input elements', () => {
      dom.hide();
      expect(document.querySelector('.loader').classList).toContain('hidden');
      expect(document.querySelector('.input').classList).toContain('hidden');
    });
  });

  describe('show', () => {
    test('it should remove the hidden class from input', () => {
      dom.show();
      expect(document.querySelector('.input').classList).not.toContain('hidden');
    });
  });

  describe('loader', () => {
    test('it should remove the class hidden from the loader', () => {
      dom.loader();
      expect(document.querySelector('.loader')).not.toContain('hidden');
    });
  });
});
