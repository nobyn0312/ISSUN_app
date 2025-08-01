'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { PrimaryButton } from '@/components/ui/Button';
import { ContentsAreaGray } from '@/components/features/ContentsArea';
import { useUploadFile } from '@/hooks/useUploadFile';
import { Container } from '@/components/ui/Container';

const Page = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [detail, setDetail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const { progress, loading, uploadFile } = useUploadFile();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const itemData = {
      name,
      price: Number(price),
      category,
      detail,
      url,
    };

    await uploadFile(file, itemData);

    setName('');
    setPrice('');
    setCategory('');
    setDetail('');
    setFile(null);
    setUrl('');
  };

  return (
    <>
      {loading ? (
        <>
          <h2>アップロード中: {Math.round(progress)}%</h2>
        </>
      ) : (
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
                Add item
              </p>
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: 'var(--primary-orange)',
                }}
              >
                アイテムの追加
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <ContentsAreaGray
                style={{
                  margin: '0 auto 16px',
                  marginBottom: '32px',
                  padding: '0 16px',
                }}
              >
                <div style={{ padding: '16px 0px 0' }}>
                  <label>アイテム名:</label>
                  <br />
                  <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className='text-black'
                    placeholder='商品名を入力'
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                    }}
                  />
                </div>

                <div style={{ padding: '16px 0px 0' }}>
                  <label>価格:</label>
                  <br />
                  <input
                    type='text'
                    className='text-black'
                    placeholder='金額を入力してください'
                    value={price}
                    required
                    onChange={e => setPrice(e.target.value)}
                    style={{
                      padding: '8px',
                      width: '200px',
                      borderRadius: '6px',
                    }}
                  />
                </div>

                <div style={{ padding: '16px 0px 0' }}>
                  <label>画像:</label>
                  <br />
                  <input
                    type='file'
                    onChange={handleFileChange}
                    accept='.png, .jpeg,.jpg, .webp'
                    required
                    style={{ borderRadius: '6px' }}
                  />
                </div>

                <div style={{ padding: '16px 0px 0' }}>
                  <label>カテゴリー</label>
                  <br />
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className='text-black'
                    style={{ padding: '8px' }}
                  >
                    <option value=''>カテゴリーを選択</option>
                    <option value='outer'>アウター</option>
                    <option value='shirt'>Tシャツ・シャツ</option>
                    <option value='pants'>パンツ</option>
                  </select>
                </div>

                <div style={{ padding: '16px 0px 0' }}>
                  <label>詳細:</label>
                  <br />
                  <textarea
                    value={detail}
                    onChange={e => setDetail(e.target.value)}
                    required
                    aria-multiline
                    className='text-black'
                    style={{
                      width: '100%',
                      height: '250px',
                      padding: '8px',
                      borderRadius: '6px',
                    }}
                  />
                </div>

                <div style={{ padding: '16px 0px 16px' }}>
                  <label>購入先URL:</label>
                  <br />
                  <input
                    type='text'
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    required
                    className='text-black'
                    placeholder='https://'
                    style={{ padding: '8px', borderRadius: '6px' }}
                  />
                </div>
              </ContentsAreaGray>

              <PrimaryButton type='submit' style={{ marginBottom: '32px' }}>
                アイテムを追加
              </PrimaryButton>
            </form>
          </Container>
        </>
      )}
    </>
  );
};

export default Page;
