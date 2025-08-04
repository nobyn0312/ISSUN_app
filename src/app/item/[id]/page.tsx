'use client';

// アイテム詳細ページ

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchItemDetail } from '@/lib/api/fetchItemDetail';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { PrimaryButton } from '@/components/ui/Button';
import Review from '@/components/features/Review';
import { notFound } from 'next/navigation';
import { Item } from '@/lib/api/fetchItems';
import { Container } from '@/components/ui/Container';

const ItemDetail = ({ params }: { params: { id: string } }) => {
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchItemDetail(params.id).then(fetchedItem => {
      if (!fetchedItem) {
        notFound(); // アイテムが見つからない場合は notFound を呼び出す
      } else {
        setItem(fetchedItem);
      }
    });
  }, [params.id]);
  if (!item) {
    return <p>Loading...</p>; // アイテムがまだ読み込まれていない場合の表示
  }

  return (
    <>
      <Header />
      <Container>
        <main className='p-6'>
          <Image
            src={item.imageUrl}
            width={450}
            height={300}
            alt={item.name}
            className='rounded-md mx-auto mb-6'
          />
          <section className='bg-[var(--primary-orange)] mx-auto p-4 rounded-2xl mb-6 text-white'>
            <h1 className='text-3xl font-bold mb-4'>{item.name}</h1>

            <p className='text-xl font-bold'>PRICE</p>
            <p className='text-2xl font-bold mb-4'>¥{item.price}</p>

            <p className='text-xl font-bold'>DETAIL</p>
            <p className='text-sm whitespace-pre-line leading-8'>
              {item.detail}
            </p>
          </section>

          <Suspense>
            <Review itemId={item.id} />
          </Suspense>

          <PrimaryButton className='mx-auto'>
            <Link href={item.url as string} className='block' target='_blank'>
              販売ショップへ
            </Link>
          </PrimaryButton>
        </main>
      </Container>
    </>
  );
};

export default ItemDetail;
