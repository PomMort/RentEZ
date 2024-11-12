import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import axiosInstance from "../../../util/axiosInstance";
import { toast } from "react-toastify";
export default function ModalVoucher({
	openModalAdd,
	setOpenModalAdd,
	setReRender,
	_voucher,
}) {
	const [voucher, setVoucher] = useState({
		// shopId: null,
		code: "",
		name: "",
		value: 0,
		minRentValue: 0,
		maxDiscountValue: 0,
		type: 1,
		valueType: 1,
		startDate: null,
		endDate: null,
		description: "string",
	});

	useEffect(() => {
		if (_voucher) {
			const startDate = dayjs(_voucher?.startDate);
			const endDate = dayjs(_voucher?.endDate);
			const type = _voucher?.type === "Ship" ? 2 : 1;
			const valueType = _voucher?.valueType === "Percent" ? 1 : 2;

			setVoucher({ ..._voucher, startDate, endDate, type, valueType });
		}
	}, [_voucher]);

	const handleSubmit = () => {
		const data = { ...voucher };
		data.startDate = data?.startDate?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
		data.endDate = data?.endDate?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
		data.value = +data.value;
		// EDIT
		if (_voucher) {
			axiosInstance
				.put("/api/vouchers", data)
				.then((res) => {
					if (res.statusCode === 200) {
						toast.success("Cập nhật voucher thành công");
						setReRender((prev) => !prev);
						setOpenModalAdd(false);
					}
				})
				.catch((err) => {
					console.log(err);
					toast.error("Có lỗi xảy ra");
				});
		} else {
			axiosInstance
				.post("/api/vouchers", data)
				.then((res) => {
					if (res.statusCode === 200) {
						toast.success("Thêm voucher thành công");
						setReRender((prev) => !prev);
						setOpenModalAdd(false);
					}
				})
				.catch((err) => {
					console.log(err);
					toast.error("Có lỗi xảy ra");
				});
		}
	};

	return (
		<div>
			<Modal
				open={openModalAdd}
				onClose={() => setOpenModalAdd(false)}
				keepMounted
			>
				<div className='min-w-[800px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
					<div className='mt-5 px-5 text-lg'>Thêm voucher</div>
					<hr />
					<div className='px-5 my-5 grid grid-cols-2 gap-5'>
						<TextField
							id='outlined-basic'
							label='Code'
							variant='outlined'
							size='small'
							sx={{ width: "100%" }}
							value={voucher.code}
							onChange={(e) =>
								setVoucher({ ...voucher, code: e.target.value })
							}
						/>

						<TextField
							id='outlined-basic'
							label='Tên voucher'
							variant='outlined'
							size='small'
							sx={{ width: "100%" }}
							value={voucher.name}
							onChange={(e) =>
								setVoucher({ ...voucher, name: e.target.value })
							}
						/>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>
								Loại voucher
							</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={voucher.type}
								label='Loại voucher'
								size='small'
								onChange={(e) =>
									setVoucher({ ...voucher, type: e.target.value })
								}
							>
								<MenuItem value={1}>Rent</MenuItem>
								<MenuItem value={2}>Ship</MenuItem>
							</Select>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>
								Loại giảm voucher (Amount Or Percent)
							</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={voucher.valueType}
								label='Loại giảm voucher (Amount Or Percent)'
								size='small'
								onChange={(e) =>
									setVoucher({ ...voucher, valueType: e.target.value })
								}
							>
								<MenuItem value={1}>Percent</MenuItem>
								<MenuItem value={2}>Amount</MenuItem>
							</Select>
						</FormControl>
						{/* <TextField
							id='outlined-basic'
							label='Giá trị đơn hàng tối thiểu'
							variant='outlined'
							size='small'
							sx={{ width: "100%" }}
							value={voucher.minRentValue}
							onChange={(e) =>
								setVoucher({ ...voucher, minRentValue: e.target.value })
							}
						/>
						<TextField
							id='outlined-basic'
							label='Giá trị giảm giá tối đa'
							variant='outlined'
							size='small'
							sx={{ width: "100%" }}
							value={voucher.maxDiscountValue}
							onChange={(e) =>
								setVoucher({
									...voucher,
									maxDiscountValue: e.target.value,
								})
							}
						/> */}
						<TextField
							id='outlined-basic'
							label='Giảm'
							variant='outlined'
							size='small'
							sx={{ width: "100%" }}
							value={voucher.value}
							onChange={(e) =>
								setVoucher({
									...voucher,
									value: e.target.value,
								})
							}
						/>
						<TextField
							id='outlined-basic'
							label='Mô tả'
							variant='outlined'
							size='small'
							sx={{ width: "100%" }}
							value={voucher.description}
							onChange={(e) =>
								setVoucher({
									...voucher,
									description: e.target.value,
								})
							}
						/>

						<div className='col-span-2'>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DateRangePicker"]}>
									<DateRangePicker
										value={
											voucher?.startDate && voucher?.endDate
												? [voucher.startDate, voucher.endDate]
												: []
										}
										format='DD/MM/YYYY'
										onChange={(e) =>
											setVoucher({
												...voucher,
												startDate: e[0],
												endDate: e[1],
											})
										}
										localeText={{
											start: "Ngày bắt đầu",
											end: "Ngày kết thúc",
										}}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</div>

						<div className='flex flex-row-reverse col-span-2'>
							<Button variant='contained' onClick={handleSubmit}>
								Thêm
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
