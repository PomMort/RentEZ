import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	useMediaQuery,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useSelector } from "react-redux";
  import axios from "axios";
  import axiosIntance from "../../util/axiosInstance";
  import { toast } from "react-toastify";
  
  export default function Profile() {
	const { user } = useSelector((state) => state.productListData);
	const [banks, setBanks] = useState([]);
	const [userInfo, setUserInfo] = useState(null);
	const [bankIdUser, setBankIdUser] = useState("");
	const isMobile = useMediaQuery('(max-width:768px)');
  
	useEffect(() => {
	  axios
		.get("https://api.vietqr.io/v2/banks")
		.then((res) => res.data)
		.then((res) => {
		  setBanks(res?.data);
		});
	}, []);
  
	useEffect(() => {
	  if (user?.id) {
		axiosIntance
		  .get(`/api/users/${user?.id}`)
		  .then((res) => {
			if (res.statusCode === 200) {
			  setUserInfo({
				bankId: res?.data?.bankId + "",
				accountNo: res?.data?.accountNo,
				accountName: res?.data?.accountName,
				id: res?.data?.id,
				userName: res?.data?.userName,
				fullName: res?.data?.fullName,
				address: res?.data?.address,
			  });
			  setBankIdUser(res?.data?.bankId + "");
			}
		  })
		  .catch((err) => {
			console.log(err);
			toast.error(err?.Message);
		  });
	  }
	}, [user]);
  
	const handleUpdateUser = () => {
	  const data = {
		...userInfo,
		bankId: bankIdUser,
	  };
	  axiosIntance
		.put("/api/users", data)
		.then((res) => {
		  if (res.statusCode === 200) {
			toast.success("Cập nhật thành công");
		  }
		})
		.catch((err) => {
		  console.log(err);
		  toast.error(err?.Message);
		  toast.error(err?.errors?.FullName?.[0]);
		});
	};
  
	if (!userInfo) {
	  return <></>;
	}
  
	return (
	  <div className='space-y-6'>
		<p className='text-lg font-bold mb-5'>Thông tin cá nhân</p>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5'>
		  <TextField
			id='outlined-basic'
			label='Username'
			variant='outlined'
			disabled
			value={userInfo?.userName}
			fullWidth
			size={isMobile ? "small" : "medium"}
		  />
		  <TextField
			id='outlined-basic'
			label='Email'
			variant='outlined'
			disabled
			value={user?.email}
			fullWidth
			size={isMobile ? "small" : "medium"}
		  />
  
		  <TextField
			id='outlined-basic'
			label='Họ và tên'
			variant='outlined'
			value={userInfo?.fullName}
			onChange={(e) =>
			  setUserInfo({ ...userInfo, fullName: e.target.value })
			}
			fullWidth
			size={isMobile ? "small" : "medium"}
		  />
		  <TextField
			id='outlined-basic'
			label='Số điện thoại'
			disabled
			variant='outlined'
			value={user?.phoneNumber}
			fullWidth
			size={isMobile ? "small" : "medium"}
		  />
		  <div className='col-span-1 md:col-span-2 w-full'>
			<TextField
			  id='outlined-basic'
			  label='Địa chỉ'
			  variant='outlined'
			  fullWidth
			  value={userInfo?.address}
			  onChange={(e) =>
				setUserInfo({ ...userInfo, address: e.target.value })
			  }
			  size={isMobile ? "small" : "medium"}
			/>
		  </div>
		</div>
  
		<hr className='my-5' />
		<p className='text-lg font-bold mb-5'>Thông tin thẻ</p>
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5'>
		  <FormControl fullWidth size={isMobile ? "small" : "medium"}>
			<InputLabel id='demo-simple-select-label'>
			  Chọn ngân hàng
			</InputLabel>
			<Select
			  labelId='demo-simple-select-label'
			  id='demo-simple-select'
			  value={bankIdUser}
			  label='Chọn ngân hàng'
			  onChange={(e) => {
				setBankIdUser(e.target.value);
			  }}
			>
			  {banks.map((bank) => (
				<MenuItem key={bank?.bin} value={bank?.bin}>
				  <div className='flex items-center gap-3'>
					<img
					  src={bank?.logo}
					  alt={bank?.shortName}
					  className='w-[40px] md:w-[50px] object-cover'
					/>
					<span className='text-sm md:text-base'>{bank?.name}</span>
				  </div>
				</MenuItem>
			  ))}
			</Select>
		  </FormControl>
		  
		  <TextField
			id='outlined-basic'
			label='Số tài khoản'
			variant='outlined'
			value={userInfo?.accountNo}
			type='number'
			onChange={(e) =>
			  setUserInfo({
				...userInfo,
				accountNo: e.target.value,
			  })
			}
			fullWidth
			size={isMobile ? "small" : "medium"}
		  />
  
		  <TextField
			id='outlined-basic'
			label='Tên tài khoản'
			variant='outlined'
			value={userInfo?.accountName}
			onChange={(e) => {
			  const input = e.target.value;
			  const normalizedInput = input
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/[^a-zA-Z0-9\s]/g, "")
				.toUpperCase();
			  setUserInfo({
				...userInfo,
				accountName: normalizedInput,
			  });
			}}
			fullWidth
			size={isMobile ? "small" : "medium"}
		  />
		</div>
		
		<div className='mt-5 flex flex-row-reverse'>
		  <Button 
			variant='contained'
			onClick={handleUpdateUser}
			size={isMobile ? "small" : "medium"}
		  >
			Cập nhật
		  </Button>
		</div>
	  </div>
	);
  }