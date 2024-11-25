import { Button, TextField, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../util/axiosInstance";
import { useSelector } from "react-redux";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const isMobile = useMediaQuery('(max-width:768px)');

  const { user } = useSelector((state) => state.productListData);

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.info("Vui lòng nhập đầy đủ các trường");
      return;
    }
    if (!(newPassword.length >= 8)) {
      toast.info("Mật khẩu phải ít nhất 8 ký tự");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.info("Mật khẩu không giống nhau");
      return;
    }

    const data = {
      userName: user?.userName,
      password: newPassword,
      confirmPassword: confirmNewPassword,
      oldPassword,
    };

    axiosInstance
      .post("/api/auth/password/change", data)
      .then((res) => {
        if (res.statusCode === 200) {
          toast.success("Đổi mật khẩu thành công");
          setOldPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        }
      })
      .catch((err) => {
        toast.error(err.Code);
        console.log(err);
      });
  };

  return (
    <div className="px-4 md:px-0">
      <div className={`w-full md:w-[600px] mx-auto grid grid-cols-1 mt-5 gap-4 md:gap-5`}>
        <TextField
          id="outlined-basic"
          label="Mật khẩu cũ"
          variant="outlined"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          size={isMobile ? "small" : "medium"}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: isMobile ? '14px' : '16px',
            },
            '& .MuiInputLabel-root': {
              fontSize: isMobile ? '14px' : '16px',
            }
          }}
        />
        <TextField
          id="outlined-basic"
          label="Mật khẩu mới"
          variant="outlined"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          size={isMobile ? "small" : "medium"}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: isMobile ? '14px' : '16px',
            },
            '& .MuiInputLabel-root': {
              fontSize: isMobile ? '14px' : '16px',
            }
          }}
        />
        <TextField
          id="outlined-basic"
          label="Nhập lại mật khẩu mới"
          variant="outlined"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          size={isMobile ? "small" : "medium"}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: isMobile ? '14px' : '16px',
            },
            '& .MuiInputLabel-root': {
              fontSize: isMobile ? '14px' : '16px',
            }
          }}
        />
        <div className="flex flex-row-reverse">
          <Button 
            variant="contained" 
            onClick={handleChangePassword}
            size={isMobile ? "small" : "medium"}
            sx={{
              fontSize: isMobile ? '14px' : '16px',
              padding: isMobile ? '6px 16px' : '8px 22px'
            }}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </div>
  );
}