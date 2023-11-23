import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import type { GetServerSidePropsContext } from "next";

import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import styles from "@/styles/index.module.css";
import locales from "@/constants/locales.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { pathname, asPath, query } = router;
    const newLocale = event.target.value;

    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <>
      <Head>
        <title>{t("metadata.title")}</title>
        <meta name="description" content={t("metadata.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <select value={i18n.language} onChange={handleChange}>
          {locales.map((language) => (
            <option value={language.code} key={language.code}>
              {language.nativeName}
            </option>
          ))}
        </select>
      </header>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          {t("date", {
            val: new Date(),
            formatParams: {
              val: {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            },
          })}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
}
