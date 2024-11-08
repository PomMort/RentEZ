import { TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
	const { user } = useSelector((state) => state.productListData);

	return (
		<div className='grid grid-cols-2 gap-5'>
			<TextField
				id='outlined-basic'
				label='Username'
				variant='outlined'
				disabled
				value={user?.userName}
			/>
			<TextField
				id='outlined-basic'
				label='Email'
				variant='outlined'
				disabled
				value={user?.email}
			/>

			<TextField
				id='outlined-basic'
				label='Họ và tên'
				variant='outlined'
				value={user?.fullName}
			/>
			<TextField
				id='outlined-basic'
				label='Số điện thoại'
				variant='outlined'
				value={user?.phoneNumber}
			/>
			<div className='col-span-2 w-full'>
				<TextField
					id='outlined-basic'
					label='Địa chỉ'
					variant='outlined'
					sx={{
						width: "100%",
					}}
					value={user?.address}
				/>
			</div>
		</div>
	);
}
