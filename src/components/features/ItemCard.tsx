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
          className='w-full aspect-[2/3] rounded-lg bg-cover bg-center'
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
      </Link>
      <div className='mt-2.5'>
        <h2 className='font-bold text-sm'>
          {name.length > 10 ? `${name.slice(0, 10)}...` : name}
        </h2>
        <p className='text-[#ff5e2a] text-sm font-bold'>{category}</p>
      </div>
    </div>
  );
};

export default ItemCard;