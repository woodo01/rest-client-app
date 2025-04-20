import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import useLanguageSwitcher from '../../hooks/useLanguageSwitcher';
import app from '@/app';

function LocaleDropDown(): JSX.Element {
  const t = useTranslations('shared');
  const { currentLocale, changeLanguage, localesList } = useLanguageSwitcher();

  const changeLang = (data: (typeof app.locale)[number]): void => {
    changeLanguage(data);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span>{t(currentLocale)}</span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => changeLang(localesList[0])}
        >
          {t(localesList[0])}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => changeLang(localesList[1])}
        >
          {t(localesList[1])}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LocaleDropDown;
