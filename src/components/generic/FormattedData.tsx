import { useTranslation } from 'react-i18next';

export default function({ date }: { date: string }) {
  const { i18n } = useTranslation();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return <>{new Date(date).toLocaleDateString(i18n.language, options)}</>;
}
