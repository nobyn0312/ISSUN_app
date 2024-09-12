// src/Top/page.tsx
"use client"; // クライアントコンポーネントとして明示

import Image from "next/image";
import { mockItems } from "../../../mockItemData"; // モックデータのインポート

const TopPage = () => {
	return (
		<main style={{ padding: "24px" }}>
			<section>
				<Image
					src="/images/topLogo.webp"
					width={480}
					height={480}
					alt='BOXロゴ'
				/>
				<ul className="flex justify-between flex-wrap">
					{mockItems.map((item) => (
						<li key={item.id} style={{ marginBottom: "20px", width: "48%" }}>
							<Image
								src={item.Image}
								width={300}
								height={200}
								alt={item.ProductsName}
                className="rounded-md	"
							/>
							{/* <p>{item.ProductsName}</p>
              <p>{item.Price}</p>
              <p style={{ whiteSpace: 'pre-line' }}>{item.Detail}</p> */}
						</li>
					))}
				</ul>
			</section>
		</main>
	);
};

export default TopPage;
