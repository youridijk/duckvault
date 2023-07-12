import en from './translations/en.json';
import nl from './translations/nl.json';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {ReactNativeLanguageDetector} from 'react-native-localization-settings';
import 'intl-pluralrules';

const resources = {
  en: {
    translation: en,
  },
  nl: {
    translation: nl,
  },
};

i18n.use(ReactNativeLanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});
