import React, { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import UsersTable from "./components/UsersTable";

export default function ManageUsers() {
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
			<UsersTable users={users} setReRender={setReRender} />
		</div>
	);
}
