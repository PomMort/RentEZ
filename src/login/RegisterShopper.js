import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Logo.png";
import { Button, TextField } from "@mui/material";
import axiosInstace from "../util/axiosInstance";
import { toast } from "react-toastify";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

const RegisterShopper = () => {

    const navigate = useNavigate();
    const [info, setInfo] = useState({
        userName: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        address: "",
        birthDate: {
            year: "",
            month: "",
            day: "",
            dayOfWeek: "",
        }
    });

    const handleSubmit = () => {
        console.log(info);
        axiosInstace
            .post("/api/auth/register/shopkeeper", info)
            .then((res) => {
                if (res.statusCode === 200) {
                    toast.success(
                        "Đăng ký thành công! Hãy kiểm tra email để kích hoạt"
                    );
                    setInfo({
                        userName: "",
                        fullName: "",
                        email: "",
                        phoneNumber: "",
                        password: "",
                        confirmPassword: "",
                        address: "",
                        birthDate: {
                            year: "",
                            month: "",
                            day: "",
                            dayOfWeek: "",
                        }
                    });


                    navigate(`/active-account/${info.email}/${info.userName}`)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <div className='flex-col justify-items-center'>
                    <h1>Welcome To</h1>
                    <img src={logo} alt='Logo' className='logo size-20 ' />
                    <h2 style={{ fontFamily: "cursive", fontWeight: "bold" }}>
                        RentEZ Shopper
                    </h2>
                </div>

                <div className='grid grid-cols-2 gap-5'>
                    <TextField
                        id='outlined-basic'
                        label='Username'
                        variant='outlined'
                        size='small'
                        value={info.userName}
                        onChange={(e) =>
                            setInfo({ ...info, userName: e.target.value })
                        }
                    />
                    <TextField
                        id='outlined-basic'
                        label='Full Name'
                        variant='outlined'
                        size='small'
                        value={info.fullName}
                        onChange={(e) =>
                            setInfo({ ...info, fullName: e.target.value })
                        }
                    />
                    <TextField
                        id='outlined-basic'
                        label='Email'
                        variant='outlined'
                        size='small'
                        value={info.email}
                        onChange={(e) => setInfo({ ...info, email: e.target.value })}
                    />
                    <TextField
                        id='outlined-basic'
                        label='Phone number'
                        variant='outlined'
                        size='small'
                        value={info.phoneNumber}
                        onChange={(e) =>
                            setInfo({ ...info, phoneNumber: e.target.value })
                        }
                    />
                    <TextField
                        id='outlined-basic'
                        label='Password'
                        variant='outlined'
                        size='small'
                        type='password'
                        value={info.password}
                        onChange={(e) =>
                            setInfo({ ...info, password: e.target.value })
                        }
                    />
                    <TextField
                        id='outlined-basic'
                        label='Confirm password'
                        variant='outlined'
                        size='small'
                        type='password'
                        value={info.confirmPassword}
                        onChange={(e) =>
                            setInfo({ ...info, confirmPassword: e.target.value })
                        }
                    />
                    <div className='col-span-2'>
                        <TextField
                            id='outlined-basic'
                            label='Address'
                            variant='outlined'
                            size='small'
                            value={info.address}
                            onChange={(e) =>
                                setInfo({ ...info, address: e.target.value })
                            }
                            sx={{ width: "100%" }}
                        />
                    </div>
                    <div className='col-span-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label='Date of Birth'
                                sx={{ width: '100%'}}
                                value={
                                    info.birthDate.year && info.birthDate.month && info.birthDate.day
                                        ? dayjs()
                                            .year(info.birthDate.year)
                                            .month(info.birthDate.month - 1)  // Month is 0-indexed
                                            .date(info.birthDate.day)
                                        : null
                                }
                                onChange={(date) => {
                                    if (date) {
                                        const localDate = dayjs(date).tz("Asia/Ho_Chi_Minh");
                                        setInfo({
                                            ...info,
                                            birthDate: {
                                                year: localDate.year(),
                                                month: localDate.month() + 1,  // Month should be 1-indexed
                                                day: localDate.date(),
                                                dayOfWeek: localDate.day(),
                                            },
                                        });
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='mt-8'>
                    <Button variant='contained' onClick={handleSubmit}>
                        Đăng ký
                    </Button>
                </div>

                <div className='signup-container'>
                    <span style={{ color: "black" }}>Already have an account?</span>
                    <Link to='/Login' className='signup-link'>
                        Sign In Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterShopper;
