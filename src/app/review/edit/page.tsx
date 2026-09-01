'use client';

import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthContext } from '@/app/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import { ContentsAreaOrange } from '@/components/features/ContentsArea';
import { PrimaryButton } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const ReviewEdit = () => {
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('reviewId');
  const [title, setTitle] = useState('');
  const [rate, setRate] = useState('');
  const [size, setSize] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      if (!reviewId) return;

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('id', reviewId)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setTitle(data.title);
          setRate(String(data.rate));
          setSize(data.size);
          setComment(data.comment);
        } else {
          console.error('レビューが見つかりませんでした');
        }
      } catch (error) {
        console.error('レビューの取得に失敗しました', error);
      }
    };

    fetchReview();
  }, [reviewId]);

  // 編集後のデータを保存
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('ログインが必要です');
      return;
    }

    if (!reviewId) {
      alert('レビューIDが無効です');
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('reviews')
        .update({
          title,
          rate: Number(rate),
          size,
          comment,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reviewId);

      if (error) {
        throw error;
      }

      alert('レビューを更新しました');
    } catch (error) {
      console.error('レビューの更新に失敗しました', error);
      alert('レビューの更新に失敗しました');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div style={{ padding: '16px' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary-orange)' }}>
            Edit review
          </p>
          <h2
            style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary-orange)' }}
          >
            レビューを編集する
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
              <label htmlFor='title'>タイトル</label>
              <br />
              <input
                type='text'
                id='title'
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
              />
            </div>

            <div style={{ padding: '16px 0px 0' }}>
              <label htmlFor='rate'>評価</label>
              <br />
              <select
                id='rate'
                value={rate}
                onChange={e => setRate(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
              >
                <option value=''>選択してください</option>
                <option value='1'>★☆☆☆☆</option>
                <option value='2'>★★☆☆☆</option>
                <option value='3'>★★★☆☆</option>
                <option value='4'>★★★★☆</option>
                <option value='5'>★★★★★</option>
              </select>
            </div>

            <div style={{ padding: '16px 0px 0' }}>
              <label htmlFor='size'>購入サイズ</label>
              <br />
              <select
                id='size'
                value={size}
                onChange={e => setSize(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
              >
                <option value=''>選択してください</option>
                <option value='XS'>XS</option>
                <option value='S'>S</option>
                <option value='M'>M</option>
                <option value='L'>L</option>
                <option value='XL'>XL以上</option>
              </select>
            </div>

            <div style={{ padding: '16px 0px 0' }}>
              <label htmlFor='comment'>コメント</label>
              <br />
              <textarea
                id='comment'
                value={comment}
                onChange={e => setComment(e.target.value)}
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
            レビューを更新
          </PrimaryButton>
        </form>
      </Container>
    </>
  );
};

const ReviewEditWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ReviewEdit />
  </Suspense>
);

export default ReviewEditWrapper;
