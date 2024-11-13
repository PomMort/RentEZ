import React, { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import UsersTable from "./components/UsersTable";
import { Button } from "@mui/material";
import ModalUser from "./components/ModalUser";

export default function ManageUsers() {
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const [reRender, setReRender] = useState(true);

	const [users, setUsers] = useState([]);

	useEffect(() => {
		axiosInstance
			.get("/api/auth/admin/users")
			.then((res) => {
				if (res.statusCode === 200) {
					setUsers(res.data?.items);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reRender]);
	return (
		<div className='mt-5'>
			<Button
				variant='contained'
				color='success'
				onClick={() => setOpenModalAdd(true)}
			>
				Thêm
			</Button>
			<UsersTable users={users} setReRender={setReRender} />

			{/* MODAL ADD */}
			<ModalUser
				openModalAdd={openModalAdd}
				setOpenModalAdd={setOpenModalAdd}
				setReRender={setReRender}
			/>
		</div>
	);
}
