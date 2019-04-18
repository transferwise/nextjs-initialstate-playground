import { setLocaleHeaderForAllRequests } from './isomorphic-fetch';

// Help center available locales
export enum Locale {
  EN = 'en',
  // TODO: enable CZ when the translation of UI labels are done
  // See https://crowdin.com/project/help-center-frontend
  // CZ = 'cz',
  DE = 'de',
  ES = 'es',
  FR = 'fr',
  HU = 'hu',
  IT = 'it',
  // TODO change ja to jp, once we get rid of old support center
  JA = 'ja',
  PL = 'pl',
  PT = 'pt',
  RO = 'ro',
  RU = 'ru',
  TR = 'tr',
}

export const availableLanguages: Array<{ value: Locale; label: string }> = [
  {
    value: Locale.DE,
    label: 'Deutsch',
  },
  {
    value: Locale.EN,
    label: 'English (UK)',
  },
  {
    value: Locale.ES,
    label: 'Español',
  },
  {
    value: Locale.FR,
    label: 'Français',
  },
  {
    value: Locale.IT,
    label: 'Italiano',
  },
  {
    value: Locale.HU,
    label: 'Magyar',
  },
  {
    value: Locale.PL,
    label: 'Polski',
  },
  {
    value: Locale.PT,
    label: 'Português',
  },
  {
    value: Locale.RO,
    label: 'Română',
  },
  {
    value: Locale.TR,
    label: 'Türkçe',
  },
  {
    value: Locale.RU,
    label: 'Русский',
  },
  {
    value: Locale.JA,
    label: '日本語',
  },
];

const localFallback = Locale.EN;

// List of priorities to choose from where the locale should come from
// From url: /:locale?/help
// From FES: locale Frontend Service provides
// localFallback: if FES and URL provides nothings
const localeChoicePriority = ['fromUrl', 'fromFES', 'localFallback'];

// Internal locale data structure with all available locale choices
interface MultipleLocaleChoices {
  fromUrl?: string;
  fromFES?: string;
  localFallback?: string;
}

function stringToLocale(locale: string): Locale {
  // We should accept non standard locales, such as hu-HU, en-US
  // Backender: SomeEnum[value] == SomeEnum.valueOf(value)
  return Locale[locale.substring(0, 2).toUpperCase()];
}

function isValid(locale?: string): boolean {
  return !!locale && !!stringToLocale(locale);
}

function choseLocaleFromMultipleChoices(localeChoices: MultipleLocaleChoices): Locale {
  const choice = localeChoicePriority.filter(c => isValid(localeChoices[c]))[0] as string;
  return stringToLocale(localeChoices[choice]);
}

function buildLocaleChoices(fromFES?: string, fromUrl?: string): MultipleLocaleChoices {
  return {
    fromFES,
    fromUrl,
    localFallback,
  };
}

export function chooseLocale(locale?: string, fromUrl?: string): Locale {
  return choseLocaleFromMultipleChoices(buildLocaleChoices(locale, fromUrl));
}

export function setLocaleForRequests(locale: Locale) {
  setLocaleHeaderForAllRequests(locale);
}
