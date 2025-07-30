"use client";

interface SelectCategoryProps {
	className?: string;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ className }) => {
	return (
		<>
			<div className={`flex justify-end ${className}`}>
				<select
					name='category'
					id='category-select'
					className='text-black p-2 rounded-md border'
				>
					<option value=''>ALL</option>
					<option value='outer'>アウター</option>
					<option value='shirts'>Tシャツ・シャツ</option>
					<option value='pants'>パンツ</option>
				</select>
			</div>
		</>
	);
};

export default SelectCategory;
