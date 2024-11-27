import React, { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import { useSelector } from "react-redux";
import FeedbackTable from "./components/FeedbackTable";

export default function ManageFeedbacks() {
	const { user } = useSelector((state) => state.productListData);
	const [reRender, setReRender] = useState(true);
	const [feedbacks, setFeedbacks] = useState([]);

	useEffect(() => {
		axiosInstance
			.get(
				`/api/feedbacks?ShopId=${user?.shopId}&PageNumber=1&PageSize=1000`
			)
			.then((res) => {
				if (res.statusCode === 200) {
					setFeedbacks(res.data?.items);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reRender, user?.shopId]);
	return (
		<div className='mt-5'>
			<FeedbackTable feedbacks={feedbacks} setReRender={setReRender} />
		</div>
	);
}
