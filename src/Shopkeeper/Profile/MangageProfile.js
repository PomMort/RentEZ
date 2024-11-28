import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react'
import { MdOutlineFileUpload } from 'react-icons/md';
import LoadingButton from "@mui/lab/LoadingButton";
import logo from "../../Logo.png";



export default function MangageProfile() {






    return (
        <div className='container px-24'>
            <div className='flex justify-center items-center mb-10'>
                <p style={{ fontFamily: "cursive", fontWeight: "bolder", fontSize: '50px', color: "#a6a6a6" }}>Thông tin cửa hàng</p>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                <div>
                    <TextField
                        id='outlined-basic'
                        label='Email cửa hàng'
                        variant='outlined'
                        size='small'
                        required
                        type='email'
                        sx={{ width: "100%" }}

                    />

                </div>
                <div>
                    <TextField
                        id='outlined-basic'
                        label='Tên cửa hàng'
                        variant='outlined'
                        size='small'
                        sx={{ width: "100%" }}
                        required
                    />

                </div>
                <div>
                    <TextField
                        id='outlined-basic'
                        label='Địa chỉ cửa hàng'
                        variant='outlined'
                        size='small'
                        sx={{ width: "100%" }}
                        required

                    />

                </div>
                <div>
                    <TextField
                        id='outlined-basic'
                        label='Số điện thoại cửa hàng'
                        variant='outlined'
                        size='small'
                        sx={{ width: "100%" }}
                        required
                    />

                </div>
                <div className='col-span-2'>
                    <div className='flex items-center gap-10'>
                        <p className='text-lg font-bold'>Ảnh shop:</p>
                        <Button
                            component='label'
                            role={undefined}
                            variant='contained'
                            tabIndex={-1}
                            startIcon={<MdOutlineFileUpload />}
                        >
                            Upload files
                            {/* <VisuallyHiddenInput
                                type='file'
                                accept='image/*'
                                onChange={(event) => onChangeFileAvatar(event)}
                            /> */}
                        </Button>
                        <img
                            // src={info?.shopAvatar || ""}
                            src=''
                            alt=''
                            className='size-20 rounded-md object-cover'
                            onError={(e) => {
                                e.target.src =
                                    "https://lh4.googleusercontent.com/proxy/0rCwwypfFxmFEtvRQoQ83lwTs1T_Y9qsJSp7sMKQ5LXHi89tYhAiRXbHOyoqljagJCmsvpHx7wmLGHS2rhJzPxpN6Wu00Mtk9POTrz0QysbBkdX9FJsk";
                            }}
                        />
                    </div>

                </div>
                <div className='col-span-2'>
                    <FormControl fullWidth size='small'>
                        <InputLabel id='demo-simple-select-label'>
                            Chọn ngân hàng
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            // value={info?.bankId}
                            size='small'
                            label='Chọn ngân hàng'
                            required
                        // onChange={(e) =>
                        //     setInfo({
                        //         ...info,
                        //         bankId: e.target.value,
                        //     })
                        // }
                        >
                            {/* {banks.map((bank) => (
                                <MenuItem key={bank?.bin} value={bank?.bin}>
                                    <div className='flex items-center gap-3'>
                                        <img
                                            src={bank?.logo}
                                            alt={bank?.shortName}
                                            className='w-[50px] object-cover'
                                        />
                                        <span>{bank?.name}</span>
                                    </div>
                                </MenuItem>
                            ))} */}
                        </Select>
                    </FormControl>
                    {/* {errorsField?.["BankId"] && (
                        <p className='text-sm text-red-700'>
                            {errorsField?.["BankId"][0]}
                        </p>
                    )} */}
                </div>
                <div>
                    <TextField
                        id='outlined-basic'
                        label='Số tài khoản'
                        variant='outlined'
                        // value={info?.accountNo}
                        size='small'
                        sx={{ width: "100%" }}
                        required
                        type='number'
                    // onChange={(e) =>
                    //     setInfo({
                    //         ...info,
                    //         accountNo: e.target.value,
                    //     })
                    // }
                    />
                    {/* {errorsField?.["AccountNo"] && (
                        <p className='text-sm text-red-700'>
                            {errorsField?.["AccountNo"][0]}
                        </p>
                    )} */}
                </div>
                <div>
                    <TextField
                        id='outlined-basic'
                        label='Tên tài khoản'
                        variant='outlined'
                        // value={info?.accountName}
                        size='small'
                        sx={{ width: "100%" }}
                        required
                        onChange={(e) => {
                            const input = e.target.value;
                            const normalizedInput = input
                                .normalize("NFD") // Tách dấu từ ký tự
                                .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
                                .replace(/[^a-zA-Z0-9\s]/g, "") // Loại bỏ các ký tự không hợp lệ
                                .toUpperCase(); // Viết hoa toàn bộ
                            // setInfo({
                            //     ...info,
                            //     accountName: normalizedInput,
                            // });
                        }}
                    />
                    {/* {errorsField?.["AccountName"] && (
                        <p className='text-sm text-red-700'>
                            {errorsField?.["AccountName"][0]}
                        </p>
                    )} */}
                </div>
            </div>

            <div className='mt-8 flex flex-row-reverse'>
                <LoadingButton
                    variant='contained'
                    type='submit'
                    // loading={loading}
                >
                    Cập nhật
                </LoadingButton>
            </div>
        </div>
    )
}
