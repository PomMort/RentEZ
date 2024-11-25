import { Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../util/axiosInstance";

export default function ModalUser({
	openModalAdd,
	setOpenModalAdd,
	setReRender,
}) {
	const [user, setUser] = useState({
		userName: "",
		fullName: "",
		email: "",
		phoneNumber: "",
		password: "",
		confirmPassword: "",
	});
	const handleSubmit = () => {
		if (
			!user?.userName ||
			!user?.fullName ||
			!user?.email ||
			!user?.phoneNumber ||
			!user?.password
		) {
			toast.info("Cần nhập đầy đủ các trường");
			return;
		}

		if (user?.password !== user?.confirmPassword) {
			toast.info("Mật khẩu không trùng khớp");
			return;
		}

		axiosInstance
			.post("/api/auth/admin/register?role=1", user)
			.then((res) => {
				if (res.statusCode === 200) {
					toast.success("Thêm mới thành công");
					setReRender((prev) => !prev);
					setOpenModalAdd(false);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.errors?.FullName?.[0]);
				toast.error(err?.errors?.Email?.[0]);
				toast.error(err?.errors?.PhoneNumber?.[0]);
			});
	};

	return (
		<div>
			<Modal
				open={openModalAdd}
				onClose={() => setOpenModalAdd(false)}
				keepMounted
			>
				<div className='min-w-[700px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
					<div className='mt-5 px-5 text-lg'>Thêm Admin</div>
					<hr />
					<div className='px-5 my-5 grid grid-cols-2 gap-5'>
						<TextField
							id='outlined-basic'
							label='Username'
							variant='outlined'
							sx={{ width: "100%" }}
							value={user?.userName}
							onChange={(e) =>
								setUser({ ...user, userName: e.target.value })
							}
						/>
						<TextField
							id='outlined-basic'
							label='Họ và tên'
							variant='outlined'
							sx={{ width: "100%" }}
							value={user?.fullName}
							onChange={(e) =>
								setUser({ ...user, fullName: e.target.value })
							}
						/>
						<TextField
							id='outlined-basic'
							label='Email'
							variant='outlined'
							sx={{ width: "100%" }}
							value={user?.email}
							onChange={(e) =>
								setUser({ ...user, email: e.target.value })
							}
						/>
						<TextField
							id='outlined-basic'
							label='Số điện thoại'
							variant='outlined'
							sx={{ width: "100%" }}
							value={user?.phoneNumber}
							onChange={(e) =>
								setUser({ ...user, phoneNumber: e.target.value })
							}
						/>
						<TextField
							id='outlined-basic'
							label='Mật khẩu'
							variant='outlined'
							sx={{ width: "100%" }}
							value={user?.password}
							type='password'
							onChange={(e) =>
								setUser({ ...user, password: e.target.value })
							}
						/>
						<TextField
							id='outlined-basic'
							label='Xác nhận mật khẩu'
							variant='outlined'
							sx={{ width: "100%" }}
							type='password'
							value={user?.confirmPassword}
							onChange={(e) =>
								setUser({ ...user, confirmPassword: e.target.value })
							}
						/>
						<Button variant='contained' onClick={handleSubmit}>
							Thêm
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
