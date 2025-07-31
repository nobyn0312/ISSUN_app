'use client'; // クライアントコンポーネント

import { useEffect, useState } from 'react';
import { firestore } from '@/lib/config/firebase'; // Firebaseのインポート
import { updateDoc, doc } from 'firebase/firestore'; // Firestore関連のインポート
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { ContentsAreaOrange } from '@/components/features/ContentsArea';
import { PrimaryButton } from '@/components/ui/Button';
import { useAuthContext } from '@/app/context/AuthContext';
import SnackbarComponent from '@/components/ui/Snackbar';
import { Container } from '@/components/ui/Container';

const handleUpdateProfile = async (
  uid: string,
  username: string,
  age: string,
  height: number,
  shape: string
) => {
  try {
    const userDocRef = doc(firestore, 'profile', uid);
    await updateDoc(userDocRef, {
      uid: uid,
      username: username,
      age: age,
      height: height,
      shape: shape,
    });

    console.log('User profile updated:', username, age, height, shape);
  } catch (error) {
    console.error(error);
  }
};

export default function EditProfile() {
  const {
    userId,
    username: contextUsername,
    age: contextAge,
    height: contextHeight,
    shape: contextShape,
  } = useAuthContext();

  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState<number>(0);
  const [shape, setShape] = useState('');
  const router = useRouter();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const setSnackbar = (message: string, severity: 'success' | 'error') => {
    console.log('Setting Snackbar:', { message, severity });
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    console.log('Snackbar Closed');

    setSnackbarOpen(false);
  };

  useEffect(() => {
    // コンテキストからの初期値を設定
    setUsername(contextUsername !== null ? contextUsername : '');
    setAge(contextAge !== null ? String(contextAge) : '未選択');
    setHeight(contextHeight !== null ? contextHeight : 0);
    setShape(contextShape !== null ? contextShape : '');
  }, [contextUsername, contextAge, contextHeight, contextShape]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      await handleUpdateProfile(userId, username, age, height, shape);
      // router.push("/top");
      setSnackbar('ユーザー情報更新しました', 'success');
      const timer = setTimeout(() => {
        router.push('/top');
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setSnackbar('失敗', 'error');
      console.error('User ID is not available');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div style={{ padding: '16px' }}>
          <section>
            <div style={{ padding: '16px 0 16px' }}>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#FF5E2A',
                }}
              >
                edit
              </p>
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#FF5E2A',
                }}
              >
                ユーザー情報の更新
              </h2>
            </div>

            <form onSubmit={onSubmit}>
              <ContentsAreaOrange style={{ marginBottom: '32px' }}>
                <div style={{ padding: '16px 0px 0' }}>
                  <label htmlFor='username'>ユーザーネーム:</label>
                  <br />
                  <input
                    type='text'
                    id='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                    }}
                  />
                </div>

                <div style={{ padding: '16px 0px 0' }}>
                  <label htmlFor='age'>年齢層:</label>
                  <br />
                  <select
                    id='age'
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                    }}
                  >
                    <option value=''>選択してください</option>
                    <option value='10-14歳'>10-14歳</option>
                    <option value='10代'>15-19歳</option>
                    <option value='20-24歳'>20-24歳</option>
                    <option value='25-29歳'>25-29歳</option>
                    <option value='30-34'>30-34歳</option>
                    <option value='35-39'>35-39歳</option>
                    <option value='40-44'>40-44歳</option>
                    <option value='45-49'>45-49歳</option>
                    <option value='50-54'>50-54歳</option>
                    <option value='55-59'>55-59歳</option>
                    <option value='60-64'>60-64歳</option>
                    <option value='65-69'>65-69歳</option>
                    <option value='70代以上'>70代以上</option>
                  </select>
                </div>

                <div style={{ padding: '16px 0px 0' }}>
                  <label htmlFor='height'>身長:</label>
                  <br />
                  <select
                    id='height'
                    value={height}
                    onChange={e => setHeight(Number(e.target.value))}
                    required
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                    }}
                  >
                    <option value='' disabled>
                      選択してください
                    </option>
                    {[...Array(61)].map((_, i) => {
                      const heightValue = 140 + i;
                      return (
                        <option key={heightValue} value={heightValue}>
                          {heightValue}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div style={{ padding: '16px 0px 16px' }}>
                  <label htmlFor='shape'>体型:</label>
                  <br />
                  <select
                    id='shape'
                    value={shape}
                    onChange={e => setShape(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                    }}
                  >
                    <option value=''>選択してください</option>
                    <option value='スリム'>スリム</option>
                    <option value='やや細め'>やや細め</option>
                    <option value='標準'>標準</option>
                    <option value='やや大きめ'>やや大きめ</option>
                    <option value='大きめ'>大きめ</option>
                  </select>
                </div>
              </ContentsAreaOrange>

              <PrimaryButton style={{ marginBottom: '32px' }} type='submit'>
                ユーザー情報の更新
              </PrimaryButton>
            </form>
          </section>

          <SnackbarComponent
            message={snackbarMessage}
            isOpen={snackbarOpen}
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            duration={1000}
          />
        </div>
      </Container>
    </>
  );
}
