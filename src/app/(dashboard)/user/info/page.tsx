'use client';

import Header from '@/components/layout/Header';
import { ContentsAreaOrange } from '@/components/features/ContentsArea';
import { PrimaryButton } from '@/components/ui/Button';
import { useAuthContext } from '@/app/context/AuthContext';
import Link from 'next/link';

const Page = () => {
  // useAuthContext からユーザー情報を取得
  const { username, age, height, shape } = useAuthContext();

  return (
    <>
      <Header />
      <div style={{ padding: '16px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary-orange)' }}>
          ユーザー情報
        </h2>

        <ContentsAreaOrange>
          <div style={{ padding: '16px 0 16px' }}>
            <p>名前: {username || '未設定'}</p>
          </div>
          <div>
            <p style={{ padding: '16px 0 16px' }}>
              年齢: {age !== null ? age : '未設定'}
            </p>
          </div>
          <p>身長: {height !== null ? height : '未設定'}</p>
          <p>体型: {shape || '未設定'}</p>
        </ContentsAreaOrange>
      </div>
      <PrimaryButton>
        <Link style={{ display: 'block' }} href={'/user/edit'}>
          ユーザー情報を更新する
        </Link>
      </PrimaryButton>
    </>
  );
};

export default Page;
