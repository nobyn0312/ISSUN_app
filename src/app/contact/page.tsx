'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import Header from '@/components/layout/Header';
import { ContentsAreaOrange } from '@/components/features/ContentsArea';
import { SecondaryButton } from '@/components/ui/Button';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, message }),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      alert('お問い合わせを送信しました');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
      alert('お問い合わせの送信に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div style={{ padding: '16px' }}>
          <p
            style={{
              color: 'var(--primary-orange)',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            Contact
          </p>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--primary-orange)',
            }}
          >
            お問い合わせ
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
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className='text-black'
                placeholder='名前を入力してください'
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                }}
              />
            </div>

            <div style={{ padding: '16px 0px 0' }}>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className='text-black'
                placeholder='メールアドレスを入力してください'
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                }}
              />
            </div>

            <div style={{ padding: '16px 0px 16px' }}>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                className='text-black'
                placeholder='お問い合わせ内容を入力してください'
                style={{
                  width: '100%',
                  height: '250px',
                  padding: '8px',
                  borderRadius: '6px',
                }}
              />
            </div>
          </ContentsAreaOrange>

          <SecondaryButton type='submit' style={{ marginBottom: '32px' }}>
            {loading ? '送信中...' : '送信'}
          </SecondaryButton>
        </form>
      </Container>
    </>
  );
};

export default Contact;
