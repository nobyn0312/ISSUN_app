import Link from 'next/link';

type ItemCardProps = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
};

const ItemCard = ({ id, name, category, imageUrl }: ItemCardProps) => {
  return (
    <div className='mb-5'>
      <Link href={`/item/${id}`}>
        <div
          className='w-full aspect-[2/3] bg-cover bg-center'
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
      </Link>
      <div className='mt-2.5'>
        <h2 className='font-bold text-sm'>
          {name.length > 10 ? `${name.slice(0, 10)}...` : name}
        </h2>
        <p className='text-[var(--primary-orange)] text-xs font-bold'>{category}</p>
      </div>
    </div>
  );
};

export default ItemCard;