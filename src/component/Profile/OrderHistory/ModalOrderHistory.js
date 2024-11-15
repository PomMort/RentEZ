import { Modal } from "@mui/material";
import React from "react";

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
						{order?.orderShops?.map((o) => (
							<div key={o?.id}>
								<p className='font-bold'>Tên cửa hàng: {o?.shopName}</p>
								{o?.orderDetails?.map((p, index) => (
									<div key={index}>
										<hr className='my-2' />
										<div className='flex gap-3 mt-2'>
											<img
												src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUiVIR-JA8539wkylRyy3CSblhm12Ewtzxg&s'
												alt=''
												className='size-20 rounded-lg border'
											/>
											<div className='flex flex-col justify-between text-sm'>
												<span>Số lượng: 0</span>
												<span>
													Giá thuê:{" "}
													{(p?.subTotalRentPrice).toLocaleString()}
												</span>
												<span>
													Tiền cọc:{" "}
													{(p?.subTotalDeposit).toLocaleString()}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</Modal>
		</div>
	);
}
