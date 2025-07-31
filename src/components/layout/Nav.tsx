'use client';
import { useState } from 'react';
import styles from './Nav.module.css';
import SignOutButton from '@/components/auth/SignoutButton';
import { useAuthContext } from '@/app/context/AuthContext';

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isLogin } = useAuthContext();

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className={`${styles.navContainer} flex`}>
      <button
        onClick={toggleMenu}
        className={styles.navButton}
        style={{width: '70px' }}
      >
        <div className={`${styles.bar}`}></div>
        <div className={`${styles.bar}`}></div>
        <div className={`${styles.bar}`}></div>
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-50'
          onClick={toggleMenu}
        />
      )}

      <div>
        <div className='inner'>
          <nav
            className={`${styles.menu} ${isOpen ? styles.open : ''}`}
            style={{ height: '100vh' }}
          >
            {/* <div className='flex justify-start pl-2 mb-2'>
              <p>{isLogin ? username : 'ゲスト'}</p>
            </div> */}
            <ul>
              <li>
                <a href='/'>TOP</a>
              </li>
              {isLogin && (
                <>
                  <li>
                    <a href='/mypage/'>マイページ</a>
                  </li>
                  <li>
                    <a href='/create/'>アイテムの追加</a>
                  </li>
                </>
              )}
              <li>
                <a href='/signin'>ログイン</a>
              </li>
              <li>
                <a href='/signup'>新規登録</a>
              </li>
              <li
                style={{
                  padding: '15px 0',
                  color: 'var(--primary-orange)',
                  fontWeight: 'bold',
                }}
              >
                <SignOutButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Nav;
