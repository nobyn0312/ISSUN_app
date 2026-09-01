import { fetchItemById, Item } from '@/lib/api/fetchItems';

export const fetchItemDetail = (id: string): Promise<Item | null> => {
  return fetchItemById(id).catch(() => {
    console.error('アイテムフェッチエラー:');
    return null;
  });
};
