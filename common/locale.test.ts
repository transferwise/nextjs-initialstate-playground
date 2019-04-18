import { chooseLocale } from './locale';

describe('Locale', () => {
  it('chooses locale from URL as top priority', () => {
    expect(chooseLocale('es', 'pt')).toBe('pt');
  });

  it('chooses only valid 2 letter code locales', () => {
    expect(chooseLocale('en_us', 'pt')).toBe('pt');
    expect(chooseLocale('pt_BR', 'en')).toBe('en');
    expect(chooseLocale('this-is-so-wrong', 'tr')).toBe('tr');
  });

  it('chooses locale from session if nothing in URL', () => {
    expect(chooseLocale('es', undefined)).toBe('es');
  });

  it('chooses locale default if nothing is defined', () => {
    expect(chooseLocale()).toBe('en');
  });

  it('chooses locale from session if locale from URL is invalid', () => {
    expect(chooseLocale('pt', 'xx')).toBe('pt');
  });

  it('chooses locale default if nothing is valid', () => {
    expect(chooseLocale('xx', 'ww')).toBe('en');
  });
});
