'use client';

import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import { ContentsAreaOrange } from '@/components/features/ContentsArea';
import { PrimaryButton } from '@/components/ui/Button';

import { useSubmitReview } from '@/hooks/useSubmitReview';
import { Container } from '@/components/ui/Container';

const ReviewCreate = () => {
  const {
    title,
    setTitle,
    rate,
    setRate,
    size,
    setSize,
    comment,
    setComment,
    handleSubmit,
  } = useSubmitReview();

  return (
    <>
      <Header />
      <Container>
        <div style={{ padding: '16px' }}>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'var(--primary-orange)',
            }}
          >
            Add review
          </p>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--primary-orange)',
            }}
          >
            レビューの投稿
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <ContentsAreaOrange
            style={{
              margin: '0 auto 16px',
              marginBottom: '32px',
              padding: '0 16px',
            }}
          >
            <div style={{ padding: '16px 0px 0' }}>
              <input
                type='text'
                id='title'
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='タイトルを入力してください'
                style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
              />
            </div>

            <div style={{ padding: '16px 0px 0' }}>
              <select
                id='rate'
                value={rate}
                onChange={e => setRate(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
              >
                <option value=''>評価を選択してください</option>
                <option value='1'>★☆☆☆☆</option>
                <option value='2'>★★☆☆☆</option>
                <option value='3'>★★★☆☆</option>
                <option value='4'>★★★★☆</option>
                <option value='5'>★★★★★</option>
              </select>
            </div>

            <div style={{ padding: '16px 0px 0' }}>
              <select
                id='size'
                value={size}
                onChange={e => setSize(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
              >
                <option value=''>購入サイズを選択してください</option>
                <option value='XS'>XS</option>
                <option value='S'>S</option>
                <option value='M'>M</option>
                <option value='L'>L</option>
                <option value='XL'>XL以上</option>
              </select>
            </div>

            <div style={{ padding: '16px 0px 0' }}>
              <textarea
                id='comment'
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder='コメントを入力してください'
                style={{
                  width: '100%',
                  height: '250px',
                  padding: '8px',
                  borderRadius: '6px',
                }}
              />
            </div>
          </ContentsAreaOrange>

          <PrimaryButton type='submit' style={{ marginBottom: '32px' }}>
            レビューを投稿
          </PrimaryButton>
        </form>
      </Container>
    </>
  );
};

// Suspenseは非同期 フォールバック中の処理を追加する
const ReviewCreateWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ReviewCreate />
  </Suspense>
);

export default ReviewCreateWrapper;
