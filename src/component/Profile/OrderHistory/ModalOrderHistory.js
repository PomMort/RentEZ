import { Modal } from "@mui/material";
import React from "react";
import dayjs from "dayjs";

export default function ModalOrderHistory({ openModal, setOpenModal, order }) {
	return (
		<div>
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				keepMounted
			>
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
							</div>
						))}
					</div>
				</div>
			</Modal>
		</div>
	);
}
