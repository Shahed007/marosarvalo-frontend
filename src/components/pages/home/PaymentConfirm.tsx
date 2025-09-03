import Image from "next/image";
import paymentIcon from "@/assets/payment-confirm.png";
const PaymentConfirm = () => {
  return (
    <div className="custom-container pt-[200px]">
      <div className=" py-12 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-10">
          Thank you for your order!
        </h1>
        <Image src={paymentIcon} width={300} height={300} alt="payment" />
        <h2 className="text-black text-xl  mt-20">
          Order #123RGR231567Y <span className="text-green-600">Confirmed</span>
        </h2>
      </div>
    </div>
  );
};

export default PaymentConfirm;
