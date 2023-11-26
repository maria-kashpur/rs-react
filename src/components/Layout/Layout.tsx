import Head from 'next/head';
import BtnError from '@/components/BtnError/BtnError';
import Search from '@/components/Search/Search';
import { usePathname } from 'next/navigation';
import InputNumber from '@/components/InputNumber/InputNumber';
import Pagination from '@/components/Pagination/Pagination';
import Cards from '@/components/Cards/Cards';
import { MouseEvent, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useGetPotionsQuery } from '@/store/reducers/hpApi';
import { getQuery, getQueryForLink } from '@/utils/getQuery';

const Layout = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetPotionsQuery(getQuery(router.query));

  const handleClickToMainPage = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (router.query.id !== undefined) {
      e.stopPropagation();
      router.push({
        pathname: '/',
        query: {
          ...getQueryForLink(router.query),
        },
      });
    }
  };

  return (
    <>
      <Head>
        <title>The Harry Potter Universe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="../public/23163_hogwarts_harry potter_crest_hufflepuff_ravenclaw_icon.png"
        />
      </Head>
      <main>
        <div className="content conteiner">
          <div className="content__header">
            <h1 className="content__title">Potions</h1>
            <BtnError />
            <Search />
          </div>
          <div className="content__main_wrap">
            <div
              className={`content__main ${pathname !== '/' ? 'blur' : ''}`}
              onClick={(e) => handleClickToMainPage(e)}
            >
              <InputNumber minValue={1} title={'Cards limit on the page:'} maxValue={100} />
              {data?.potions && data.potions.length !== 0 ? <Pagination /> : ''}
              <Cards />
            </div>
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
