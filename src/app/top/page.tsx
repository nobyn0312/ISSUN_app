'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { fetchItems, Item } from '@/lib/api/fetchItems';
import Sort from '@/components/features/Sort';
import styles from './top.module.css';

import { Container } from '@/components/ui/Container';

const TopPage = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    const getItems = async () => {
      try {
        const fetchedItems = await fetchItems(sortOrder);
        setItems(fetchedItems);
      } catch (error) {
        setError('データ取得失敗');
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, [sortOrder]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'newest' | 'oldest');
  };

  // エラー状態の表示
  if (error) {
    return (
      <>
        <Header />
        <main className='p-6'>
          <p>{error}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <main className='p-6'>
          <div className={styles.msg_wrap}>
            <h1>
              <Image
                src='/images/top_logo.svg'
                width={480}
                height={480}
                alt='BOXロゴ'
                className='mb-8'
                priority
              />
            </h1>
            <div className={styles.msg}>
              <p className='text-center leading-7 text-sm font-bold mt-2'>
                ISSUNは、低身長でもファッションを楽しむためのwebサービスです。
                <br />
                様々なファッションアイテムを共有して、自分に合う服を見つけよう。
              </p>
            </div>
          </div>
          <Sort className='mb-4' onChange={handleSortChange} />
          <section>
            <div className={`flex flex-wrap ${styles.item_wrap}`}>
              {loading
                ? // ローディング中はスケルトンローダーを表示
                  Array.from({ length: 8 }).map((_, index) => (
                    <div key={`skeleton-${index}`} className='mb-5'>
                      <div className='w-full aspect-[2/3] bg-gray-200 rounded-lg animate-pulse' />
                      <div className='mt-2.5'>
                        <div className='w-[150px] h-[18px] bg-gray-200 mb-2 animate-pulse' />
                        <div className='w-[100px] h-4 bg-gray-200 animate-pulse' />
                      </div>
                    </div>
                  ))
                : // データ読み込み後は実際のアイテムを表示
                  items.map(item => (
                    <div key={item.id} className='mb-5'>
                      <Link href={`/item/${item.id}`}>
                        <div
                          className='w-full aspect-[2/3] rounded-lg bg-cover bg-center'
                          style={{
                            backgroundImage: `url(${item.imageUrl})`,
                          }}
                        />
                      </Link>
                      <div className='mt-2.5'>
                        <h2 className='font-bold text-sm'>
                          {item.name.length > 10
                            ? `${item.name.slice(0, 10)}...`
                            : item.name}
                        </h2>
                        <p className='text-[#ff5e2a] text-sm font-bold'>
                          {item.category}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </section>
        </main>
      </Container>
    </>
  );
};

export default TopPage;
