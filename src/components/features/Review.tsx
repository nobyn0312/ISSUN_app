'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/context/AuthContext';

type ReviewProps = {
  itemId: string;
};

type ReviewData = {
  reviewId: string;
  title: string;
  comment: string;
  username: string;
  rate: number;
  size: string;
  createdAt: Date;
};

const Review = ({ itemId }: ReviewProps) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const router = useRouter();
  const { isLogin, height } = useAuthContext();

  // レビュー取得
  const fetchReviews = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('item_id', itemId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const fetchedReviews: ReviewData[] = (data ?? []).map(row => ({
        reviewId: row.id,
        title: row.title,
        comment: row.comment,
        username: row.username,
        rate: Number(row.rate),
        size: row.size,
        createdAt: new Date(row.created_at),
      }));
      setReviews(fetchedReviews);
    } catch (error) {
      console.error(error);
    }
  }, [itemId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // レビュー編集ボタン
  const handleEdit = (reviewId: string) => {
    router.push(`/review/edit?reviewId=${reviewId}`);
  };

  // レビュー削除
  const handleDelete = async (reviewId: string) => {
    const isConfirmed = confirm('レビューを削除しますか？');
    if (isConfirmed) {
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from('reviews')
          .delete()
          .eq('id', reviewId);

        if (error) {
          throw error;
        }

        alert('削除完了');
        window.location.reload();
      } catch (error) {
        alert('エラーが発生しました');
      }
    } else {
      alert('削除をキャンセルしました');
    }
  };

  // 日付をフォーマット
  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = ('00' + (date.getMonth() + 1)).slice(-2);
    const d = ('00' + date.getDate()).slice(-2);
    return `${y}/${m}/${d}`;
  };

  return (
    <section
      style={{
        background: '#ffffff',
        color: '#333333',
        borderRadius: '15px',
        border: '2px solid var(--primary-orange)',
        marginBottom: '24px',
        padding: '16px',
      }}
    >
      <div className='flex align-bottom items-end justify-between mb-4'>
        <div style={{ width: '40%' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>minnano</p>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Review</h2>
          <p>reviewer：{reviews.length}</p>
        </div>
        {isLogin && (
          <Link href={`/review/create?itemId=${itemId}`}>レビューを書く</Link>
        )}
      </div>

      <div
        style={{
          overflowY: reviews.length >= 2 ? 'scroll' : 'visible',
          height: reviews.length >= 2 ? '620px' : 'auto',
        }}
      >
        {reviews.map((review, index) => {
          const formattedDate = formatDate(review.createdAt);
          return (
            <div
              key={index}
              style={{
                padding: '16px',
                background: '#E6E6E6',
                borderRadius: '10px',
                marginBottom: '24px',
                minHeight: '300px',
              }}
            >
              <div className='flex justify-between'>
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginBottom: '8px',
                  }}
                  className='flex align-middle justify-center'
                >
                  {review.title}
                </p>
                <div
                  className='flex align-middle justify-center'
                  style={{ gap: '8px' }}
                >
                  {isLogin && (
                    <>
                      <button
                        style={{ color: '#333', fontWeight: 'bold' }}
                        onClick={() => handleEdit(review.reviewId)}
                      >
                        編集
                      </button>
                      <button
                        style={{ color: 'var(--primary-orange)', fontWeight: 'bold' }}
                        onClick={() => handleDelete(review.reviewId)}
                      >
                        削除
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p style={{ fontWeight: 'light', marginBottom: '8px' }}>
                {formattedDate}
              </p>

              <p style={{ color: 'var(--primary-orange)', fontSize: '20px' }}>
                {'★'.repeat(review.rate) + '☆'.repeat(5 - review.rate)}
              </p>

              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                SIZE：{review.size}
              </p>
              <div
                style={{
                  border: '1px solid #333',
                  width: '100%',
                  marginBottom: '8px',
                }}
              ></div>
              <p
                style={{
                  lineHeight: '1.75',
                  marginBottom: '60px',
                  whiteSpace: 'pre-line',
                }}
              >
                {review.comment}
              </p>

              <div className='flex gap-2'>
                <p>
                  <small>{review.username}</small>
                </p>
                <p>
                  <small>{height}cm</small>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Review;
