export const domainFE = "http://localhost:3000";
export const domainBE = "https://localhost:7085";
// export const domainBE = "https://rentezapi-latest.onrender.com";

export const ORDER_STATUS = [
	{
		status_vi: "Chờ thanh toán",
		status: "WaitForPayment",
	},
	{
		status_vi: "Đang xử lý",
		status: "Pending",
	},
	{
		status_vi: "Đã phê duyệt",
		status: "Approved",
	},
	{
		status_vi: "Đang vận chuyển",
		status: "Shipping",
	},
	{
		status_vi: "Đã nhận hàng",
		status: "Received",
	},
	{
		status_vi: "Đang trả hàng",
		status: "Returning",
	},
	{
		status_vi: "Đã trả hàng",
		status: "Returned",
	},
	{
		status_vi: "Trả lại có thiệt hại",
		status: "ReturnedWithDamage",
	},
	{
		status_vi: "Chờ hoàn tiền cọc",
		status: "WaitingForRefund",
	},
	{
		status_vi: "Hoàn thành",
		status: "Completed",
	},
	{
		status_vi: "Từ chối",
		status: "Rejected",
	},
	{
		status_vi: "Huỷ bỏ",
		status: "Cancelled",
	},
];
