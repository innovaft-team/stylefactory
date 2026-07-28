

export const locales = ['en', 'hr'];

export const defaultLocale = 'en';

export const loadLocaleFrom = (lang, ns) =>
    import(`@/locales/${lang}/${ns}.json`).then((m) => m.default);


export const pages = {
    '*': ['nav', "common"],
}