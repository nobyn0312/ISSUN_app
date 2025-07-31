type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string; // 追加のクラスを受け取る
  type?: 'button' | 'submit' | 'reset'; // typeプロパティを追加
  style?: React.CSSProperties; // styleをpropsとして追加
  position?: 'left' | 'center' | 'right'; // positionオプショナル追加
};

const getPositionStyles = (position?: 'left' | 'center' | 'right') => {
  switch (position) {
    case 'left':
      return { justifyContent: 'flex-start' };
    case 'center':
      return { justifyContent: 'center' };
    case 'right':
      return { justifyContent: 'flex-end' };
    default:
      return { justifyContent: 'flex-start' };
  }
};

export const PrimaryButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  style,
  position = 'center',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        ...getPositionStyles(position),
      }}
    >
      <button
        onClick={onClick}
        className={`text-white font-bold rounded-full block w-full text-center p-3  ${className}`}
        style={{
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          background: 'var(--primary-orange)',
          color: 'white',
          transition: 'all 0.3s ease',
        }}
      >
        {children}
      </button>
    </div>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  style,
  position = 'center',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        ...getPositionStyles(position),
      }}
    >
      <button
        onClick={onClick}
        className={`font-bold rounded-full block w-full text-center p-3 bg-white ${className}`}
        style={{
          color: 'var(--primary-orange)',
          border: 'var(--primary-orange) solid 2px',
          maxWidth: '320px',
          height: '50px',
          ...style,
        }}
      >
        {children}
      </button>
    </div>
  );
};
