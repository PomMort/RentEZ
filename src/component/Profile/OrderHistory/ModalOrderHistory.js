import { Button, Modal, Rating, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import axiosInstance from "../../../util/axiosInstance";

export default function ModalOrderHistory({
	openModal,
	setOpenModal,
	order,
	setReRender,
}) {
	const [openModalFeedback, setOpenModalFeedback] = useState(false);
	const [feedback, setFeedback] = useState(null);
	const [productSelected, setProductSelected] = useState(""); // Chủ yếu để hiện tên sp

	const onClickBtnFeedback = (p) => {
		setOpenModalFeedback(true);
		setFeedback({ ...feedback, id: p?.id });
		setProductSelected(p?.product?.productName);
	};

	const handleSubmit = () => {
		if (!feedback?.rating || !feedback?.reviewContent) {
			toast.error("Vui lòng nhập đủ các trường");
			return;
		}

		axiosInstance
			.post("/api/feedbacks", feedback)
			.then((res) => {
				if (res.statusCode === 200) {
					toast.success("Đã đánh giá thành công");
					setReRender((prev) => !prev);
					setOpenModalFeedback(false);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.Message);
			});
	};

	useEffect(() => {
		setFeedback({ ...feedback, rating: 0, reviewContent: "" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openModalFeedback]);

	return (
		<div>
			<Modal open={openModal} onClose={() => setOpenModal(false)}>
				<div className='min-w-[500px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl'>
					<div className='mt-5 px-5 text-lg flex justify-between items-center'>
						Chi tiết đơn hàng{" "}
						<span className='text-2xl font-bold'>#{order?.id}</span>
					</div>
					<div className='p-5 flex flex-col gap-3'>
						{order?.orderDetails?.map((p, index) => (
							<div key={index}>
								<hr className='my-2' />
								<div className='flex gap-3 mt-2'>
									<img
										src={
											p?.product?.productImage
												? p?.product?.productImage
												: "https://png.pngtree.com/png-clipart/20211116/original/pngtree-minimal-loading-icon-graphic-png-image_6944732.png"
										}
										alt=''
										className='size-20 rounded-lg border object-cover'
									/>
									<div className='flex flex-col gap-1 text-sm'>
										<p className='font-bold text-lg'>
											{p?.product?.productName}
										</p>
										<div className='flex gap-2'>
											<span>Số lượng: {p?.rentQuantity}</span>
											<span>|</span>
											<span>
												Giá thuê:{" "}
												{(p?.subTotalRentPrice).toLocaleString()}
											</span>
											<span>|</span>
											<span>
												Tiền cọc:{" "}
												{(p?.subTotalDeposit).toLocaleString()}
											</span>
										</div>
										<div className='flex gap-2'>
											<span>
												Ngày thuê:{" "}
												{dayjs(p?.rentDateTime).format(
													"DD/MM/YYYY"
												)}
											</span>
											<span>|</span>
											<span>
												Ngày trả:{" "}
												{dayjs(p?.returnDateTime).format(
													"DD/MM/YYYY"
												)}
											</span>
										</div>
									</div>
								</div>
								{order?.status === "Completed" && (
									<div className='flex flex-row-reverse mt-2'>
										<Button
											variant='contained'
											className='small'
											disabled={p?.isRated}
											onClick={() => onClickBtnFeedback(p)}
										>
											{p?.isRated ? "Đã đánh giá" : "Đánh giá"}
										</Button>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</Modal>
			{/* MODAL FEEDBACK */}
			<Modal
				open={openModalFeedback}
				onClose={() => setOpenModalFeedback(false)}
			>
				<div className='min-w-[500px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl'>
					<div className='p-5 text-lg flex flex-col'>
						<p className='text-left w-full mb-3'>
							Đánh giá sản phẩm: <strong>{productSelected}</strong>
						</p>
						<div>
							<Rating
								name='simple-controlled'
								value={feedback?.rating || 0}
								onChange={(event, newValue) => {
									setFeedback({ ...feedback, rating: newValue });
								}}
							/>
						</div>
						<TextareaAutosize
							className='w-full border border-gray-400 rounded-sm p-2'
							aria-label='minimum height'
							minRows={3}
							maxRows={3}
							placeholder='Nội dung đánh giá'
							required
							value={feedback?.reviewContent}
							onChange={(e) =>
								setFeedback({
									...feedback,
									reviewContent: e.target.value,
								})
							}
						/>
						<div className='mt-3'>
							<Button
								variant='contained'
								onClick={handleSubmit}
								className='w-full'
							>
								Đánh giá
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
