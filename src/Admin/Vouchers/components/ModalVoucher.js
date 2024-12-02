import {
	FormControl,
	InputAdornment,
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
import LoadingButton from "@mui/lab/LoadingButton";

const initVoucher = {
	code: "",
	name: "",
	value: "",
	minRentValue: "",
	maxDiscountValue: "",
	limit: "",
	type: 1,
	valueType: 1,
	startDate: null,
	endDate: null,
	description: "",
};

export default function ModalVoucher({
	openModalAdd,
	setOpenModalAdd,
	setReRender,
	_voucher,
}) {
	const [voucher, setVoucher] = useState(initVoucher);
	const [loading, setLoading] = useState(false);

	// GET VOUCHER
	useEffect(() => {
		setVoucher(initVoucher);
		if (_voucher) {
			const startDate = dayjs(_voucher?.startDate).isValid()
				? dayjs(_voucher?.startDate)
				: null;
			const endDate = dayjs(_voucher?.endDate).isValid()
				? dayjs(_voucher?.endDate)
				: null;
			const type = _voucher?.type === "Ship" ? 2 : 1;
			const valueType = _voucher?.valueType === "Percent" ? 1 : 2;
			const value =
				_voucher?.valueType === "Percent"
					? _voucher?.value * 100
					: _voucher?.value;

			setVoucher({
				...initVoucher,
				..._voucher,
				startDate,
				endDate,
				type,
				valueType,
				value,
				minRentValue: _voucher?.minRentValue ?? "",
				maxDiscountValue: _voucher?.maxDiscountValue ?? "",
				limit: _voucher?.limit ?? "",
			});
		}
	}, [_voucher]);

	const handleSubmit = () => {
		setLoading(true);
		const data = {
			...voucher,
			minRentValue: +voucher?.minRentValue,
			maxDiscountValue: +voucher?.maxDiscountValue,
			limit: +voucher?.limit,
		};
		data.startDate = data?.startDate?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
		data.endDate = data?.endDate?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
		// eslint-disable-next-line eqeqeq
		data.value = data?.valueType == 1 ? +data?.value / 100 : data?.value;
		// EDIT
		if (_voucher) {
			axiosInstance
				.put("/api/vouchers", data)
				.then((res) => {
					if (res.statusCode === 200) {
						toast.success("Cập nhật voucher thành công");
						setReRender((prev) => !prev);
						setOpenModalAdd(false);
						setVoucher(initVoucher);
						setLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
					toast.error("Có lỗi xảy ra");
					toast.error(err?.Message);
					toast.error(err?.errors?.Name?.[0]);
				});
		} else {
			axiosInstance
				.post("/api/vouchers", data)
				.then((res) => {
					if (res.statusCode === 200) {
						toast.success("Thêm voucher thành công");
						setReRender((prev) => !prev);
						setOpenModalAdd(false);
						setVoucher(initVoucher);
						setLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
					toast.error("Có lỗi xảy ra");
					toast.error(err?.Message);
					toast.error(err?.errors?.Name?.[0]);
					setLoading(false);
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
							value={voucher?.code}
							onChange={(e) => {
								const input = e.target.value;
								const normalizedInput = input
									.normalize("NFD") // Tách dấu từ ký tự
									.replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
									.replace(/[^a-zA-Z0-9]/g, "") // Loại bỏ các ký tự không hợp lệ (bao gồm khoảng cách)
									.toUpperCase(); // Viết hoa toàn bộ
								setVoucher({ ...voucher, code: normalizedInput });
							}}
						/>

						<TextField
							id='outlined-basic'
							label='Tên voucher'
							variant='outlined'
							size='small'
							sx={{ width: "100%" }}
							value={voucher?.name}
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
								value={voucher?.type}
								label='Loại voucher'
								size='small'
								onChange={(e) =>
									setVoucher({ ...voucher, type: e.target.value })
								}
							>
								<MenuItem value={1}>Thuê</MenuItem>
								<MenuItem value={2}>Vận chuyển</MenuItem>
							</Select>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>
								Loại giảm voucher (Amount Or Percent)
							</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={voucher?.valueType}
								label='Loại giảm voucher (Amount Or Percent)'
								size='small'
								onChange={(e) =>
									setVoucher({ ...voucher, valueType: e.target.value })
								}
							>
								<MenuItem value={1}>Phần trăm (%)</MenuItem>
								<MenuItem value={2}>Giá (VNĐ)</MenuItem>
							</Select>
						</FormControl>
						<div className='col-span-2 grid grid-cols-3 gap-3'>
							<TextField
								id='outlined-basic'
								label='Giá trị đơn hàng tối thiểu'
								variant='outlined'
								size='small'
								sx={{ width: "100%" }}
								value={voucher?.minRentValue ?? ""}
								onInput={(e) => {
									const value = e.target.value;
									if (!/^\d*$/.test(value)) {
										e.target.value = value.replace(/\D/g, "");
									}
								}}
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position='end'>
												VNĐ
											</InputAdornment>
										),
									},
								}}
								onChange={(e) =>
									setVoucher({
										...voucher,
										minRentValue: e.target.value,
									})
								}
							/>
							<TextField
								id='outlined-basic'
								label='Giá trị giảm giá tối đa'
								variant='outlined'
								size='small'
								sx={{ width: "100%" }}
								value={voucher?.maxDiscountValue ?? ""}
								onInput={(e) => {
									const value = e.target.value;
									if (!/^\d*$/.test(value)) {
										e.target.value = value.replace(/\D/g, "");
									}
								}}
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position='end'>
												VNĐ
											</InputAdornment>
										),
									},
								}}
								onChange={(e) =>
									setVoucher({
										...voucher,
										maxDiscountValue: e.target.value,
									})
								}
							/>
							<TextField
								id='outlined-basic'
								label='Giới hạn (Lượt sử dụng)'
								variant='outlined'
								size='small'
								sx={{ width: "100%" }}
								value={voucher?.limit ?? ""}
								onInput={(e) => {
									const value = e.target.value;
									if (!/^\d*$/.test(value)) {
										e.target.value = value.replace(/\D/g, "");
									}
								}}
								onChange={(e) =>
									setVoucher({
										...voucher,
										limit: e.target.value,
									})
								}
							/>
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Giá trị voucher (Giảm)'
								variant='outlined'
								size='small'
								sx={{ width: "100%" }}
								value={voucher?.value}
								onChange={(e) =>
									setVoucher({
										...voucher,
										value: e.target.value,
									})
								}
								onInput={(e) => {
									const value = e.target.value;
									if (!/^\d*$/.test(value)) {
										e.target.value = value.replace(/\D/g, "");
									}
								}}
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position='end'>
												{voucher?.valueType === 1 ? "%" : "VNĐ"}
											</InputAdornment>
										),
									},
								}}
							/>
							<div className='text-xs text-gray-500 italic font-bold flex flex-col gap-1 mt-2 ml-3'>
								<p>Nếu loại voucher là (%). Đầu vào: 50</p>
								<p>Nếu loại voucher là (VNĐ). Đầu vào: 50000</p>
							</div>
						</div>
						<TextField
							id='outlined-basic'
							label='Mô tả'
							variant='outlined'
							size='small'
							sx={{ width: "100%" }}
							value={voucher?.description}
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
												? [voucher?.startDate, voucher?.endDate]
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
							<LoadingButton
								variant='contained'
								loading={loading}
								onClick={handleSubmit}
							>
								{!_voucher ? "Thêm" : "Cập nhật"}
							</LoadingButton>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
