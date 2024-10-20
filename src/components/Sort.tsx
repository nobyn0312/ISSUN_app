"use client";

import React from "react";

interface SortProps {
	className?: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sort: React.FC<SortProps> = ({ className, onChange }) => {
	return (
		<div className={`flex justify-end ${className}`}>
			<select
				name='sort'
				id='sort-select'
				onChange={onChange} // onChangeの名前を修正
				className='text-black p-2 rounded-md border'
			>
				<option value='newest'>新着順</option>
				<option value='oldest'>おすすめ順</option>
			</select>
		</div>
	);
};

export default Sort;
