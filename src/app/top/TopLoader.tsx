import ContentLoader from "react-content-loader";
import Image from "next/image";
import styles from './top.module.css';
import Sort from "@/components/Sort";

interface TopLoaderProps {
	onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TopLoader = ({ onSortChange }: TopLoaderProps) => (
	<>
		<div className={styles.msg_wrap}>
			<h1>
				<Image
					src='/images/top_logo.svg'
					width={480}
					height={480}
					alt='BOXロゴ'
					style={{ marginBottom: "32px" }}
					id={`content-loader-${Math.random()}`} // ユニークな ID を生成
				/>
			</h1>
			<div className={styles.msg}>
				<p style={{ textAlign: "center", lineHeight: "1.75" }}>
					ISSUNは、低身長でもファッションを楽しむためのアプリ。
					<br />
					ユニクロ、ZOZOTOWN、様々なアパレルの着用レビューを登録して、共有し、ファッションの幅を広げよう。
				</p>
				<p
					style={{
						textAlign: "center",
						lineHeight: "1.75",
						padding: "16px 0 16px",
					}}
				>
					小さくても、一寸法師のように強くありたい
				</p>
			</div>
		</div>
		<Sort className='mb-4' onChange={onSortChange} />
		<ul className={`flex justify-between flex-wrap ${styles.item_wrap}`}>
			{Array.from({ length: 8 }).map((_, index) => (
				<li key={index} style={{ marginBottom: "20px" }}>
					<ContentLoader
						viewBox='0 0 250 375'
						backgroundColor='#f0f0f0'
						foregroundColor='#dedede'
					>
						<rect x='0' y='0' rx='8' ry='8' width='100%' height='100%' />
					</ContentLoader>
					<div style={{ marginTop: "10px" }}>
						<ContentLoader
							width={150}
							height={27}
							backgroundColor='#f0f0f0'
							foregroundColor='#dedede'
						>
							<rect x='0' y='0' rx='4' ry='4' width='150' height='18' />
						</ContentLoader>
						<ContentLoader
							width={100}
							height={27}
							backgroundColor='#f0f0f0'
							foregroundColor='#dedede'
						>
							<rect x='0' y='0' rx='4' ry='4' width='100' height='16' />
						</ContentLoader>
					</div>
				</li>
			))}
		</ul>
	</>
);

export default TopLoader;
