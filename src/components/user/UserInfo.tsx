import { auth } from '@/lib/config/firebase';
import Image from 'next/image';
import { useAuthContext } from '@/app/context/AuthContext';
import { useState } from 'react';
import SignOutButton from '@/components/auth/SignoutButton';

const UserInfo = () => {
  const defaultPhotoURL = '/images/defaultUser.svg';
  const photoURL = auth.currentUser?.photoURL || defaultPhotoURL;
  // const { username } = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isLogin, username } = useAuthContext();

  function toggleLogin() {
    setIsOpen(prevState => !prevState);
  }

  return (
    <>
      <div onClick={() => toggleLogin()}>
        {photoURL && (
          <div style={{ margin: '0 auto' }}>
            <Image
              src={photoURL}
              width={30}
              height={30}
              alt='ユーザーアイコン'
              className='rounded-full'
              style={{ display: 'block', margin: '0 auto' }}
            />
            <p style={{ fontSize: '10px', paddingTop: '4px' }}>
              {isLogin ? username : 'ゲスト'}
            </p>
          </div>
        )}
      </div>

      {isOpen && (
        <div style={{ position: 'absolute', right: '0', top: '74px' }}>
          <ul
            style={{
              width: '190px',
              backgroundColor: '#fff',
              borderRadius: '5px',
            }}
          >
            {!isLogin ? (
              <li
                style={{
                  color: 'var(--primary-orange)',
                  fontWeight: 'bold',
                  padding: '15px 0',
                  textAlign: 'center',
                  border: '2px solid var(--primary-orange)',
                  borderRadius: '5px',
                }}
              >
                <a href='/signin'>ログイン / 新規登録</a>
              </li>
            ) : (
              <li
                style={{
                  padding: '15px 0',
                  color: 'var(--primary-orange)',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                <SignOutButton />
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default UserInfo;
