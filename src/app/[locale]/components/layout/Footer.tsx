import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Footer = (): JSX.Element => {
  const t = useTranslations('footer');
  return (
    <footer className="flex justify-between items-end p-2">
      <a
        href="https://github.com/woodo01/graphiql-app"
        target="_blank"
        rel="noreferrer"
      >
        {t('githubLink')}
      </a>
      <p>| 2025 |</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/rss-logo.svg"
          alt="Rolling Scopes Logo"
          width={45}
          height={45}
          priority={true}
        />
      </a>
    </footer>
  );
};

export default Footer;
