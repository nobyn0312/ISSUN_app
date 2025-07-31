import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';
import UserInfo from '@/components/user/UserInfo';
import { Container } from '@/components/ui/Container';

type HeaderProps = {
  onMenuToggle?: (isOpen: boolean) => void;
};

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <>
      <header className='relative border-t-2 border-b-2 border-[#ff5e2a]'>
        <Container>
          <div className='flex items-center justify-between h-[70px]'>
            <Nav onMenuToggle={onMenuToggle} />

            <div className='flex justify-center items-center'>
              <Link href='/'>
                <Image
                  src='/images/headerLogo2.svg'
                  alt='ヘッダーロゴ'
                  width={100}
                  height={30}
                />
              </Link>
            </div>

            <div className='pr-4 relative'>
              <UserInfo />
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
