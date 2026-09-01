import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthContext } from '@/app/context/AuthContext';
import { useSearchParams } from 'next/navigation';

export const useSubmitReview = () => {
  const { user, username } = useAuthContext();
  const searchParams = useSearchParams();
  const itemId = searchParams.get('itemId');

  const [title, setTitle] = useState('');
  const [rate, setRate] = useState('');
  const [size, setSize] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('ログインが必要です');
      return;
    }

    if (!itemId) {
      alert('アイテムIDが無効です');
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from('reviews').insert({
        user_id: user.id,
        item_id: itemId,
        username: username,
        title,
        rate: Number(rate),
        size,
        comment,
      });

      if (error) {
        throw error;
      }

      alert('レビューを送信しました');
      window.location.href = '/top';

      setTitle('');
      setRate('');
      setSize('');
      setComment('');
    } catch (error) {
      console.error(error);
      alert('レビューの送信に失敗しました');
    }
  };

  return {
    title,
    setTitle,
    rate,
    setRate,
    size,
    setSize,
    comment,
    setComment,
    handleSubmit,
  };
};
