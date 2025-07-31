'use client';

import SigninButton from '@/components/auth/SigninButton';
import { auth } from '@/lib/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserInfo from '@/components/user/UserInfo';
import SignOutButton from '@/components/auth/SignoutButton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ContentsAreaOrange } from '@/components/features/ContentsArea';
import Header from '@/components/layout/Header';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import SnackbarComponent from '@/components/ui/Snackbar';
import { Container } from '@/components/ui/Container';

// メールとパスワードの場合
const handleLogin = async (
  email: string,
  password: string,
  setSnackbar: (message: string, severity: 'success' | 'error') => void
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    setSnackbar('ログインしました', 'success');
  } catch (error) {
    setSnackbar('ログイン失敗', 'error');
    console.error(error);
  }
};

export default function SignIn() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // topへ遷移
  useEffect(() => {
    if (user) {
      setSnackbar('ログインしました', 'success');
      const timer = setTimeout(() => {
        router.push('/top');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password, setSnackbar);
  };

  return (
    <>
      <Header />
      <Container>
        <div style={{ padding: '16px' }}>
          <section>
            {user ? (
              <>
                <UserInfo />
                <SignOutButton />
              </>
            ) : (
              <>
                <div style={{ padding: '16px 0 16px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: 'var(--primary-orange)',
                    }}
                  >
                    Login
                  </p>
                  <h2
                    style={{
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: 'var(--primary-orange)',
                    }}
                  >
                    ログイン
                  </h2>
                </div>

                <form onSubmit={onSubmit}>
                  <ContentsAreaOrange style={{ marginBottom: '32px' }}>
                    <div>
                      <label htmlFor='email'>メールアドレス</label>
                      <br />
                      <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '6px',
                        }}
                      />
                    </div>
                    <div
                      style={{ padding: '16px 0px 0', marginBottom: '32px' }}
                    >
                      <label htmlFor='password'>パスワード:</label>
                      <br />
                      <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete='current-password'
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '6px',
                        }}
                      />
                    </div>
                  </ContentsAreaOrange>

                  <PrimaryButton style={{ marginBottom: '32px' }} type='submit'>
                    ログイン
                  </PrimaryButton>

                  <p
                    style={{
                      fontSize: '16px',
                      textAlign: 'center',
                      color: '#fff',
                      marginBottom: '16px',
                    }}
                  >
                    または
                  </p>
                </form>
                <SecondaryButton style={{ marginBottom: '32px' }}>
                  <a style={{ display: 'block' }} href='/signup'>
                    新規登録
                  </a>
                </SecondaryButton>
                <div
                  className='pt-4'
                  style={{ textAlign: 'center', borderTop: '2px solid #fff' }}
                >
                  <SigninButton />
                </div>
              </>
            )}
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
