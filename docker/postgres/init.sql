-- 洋服アイテム登録用スキーマ
-- Next.js の create フォーム / Item 型に合わせた定義

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE item_category AS ENUM ('outer', 'shirt', 'pants');

CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  category item_category NOT NULL,
  detail TEXT NOT NULL,
  image_url TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_items_created_at ON items (created_at DESC);
CREATE INDEX idx_items_category ON items (category);

COMMENT ON TABLE items IS '登録された洋服アイテム';
COMMENT ON COLUMN items.name IS 'アイテム名';
COMMENT ON COLUMN items.price IS '価格（円）';
COMMENT ON COLUMN items.category IS 'outer: アウター / shirt: Tシャツ・シャツ / pants: パンツ';
COMMENT ON COLUMN items.detail IS '詳細・仕様';
COMMENT ON COLUMN items.image_url IS '画像URL';
COMMENT ON COLUMN items.url IS '購入先URL';
