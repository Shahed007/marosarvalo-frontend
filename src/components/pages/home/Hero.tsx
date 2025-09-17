import { Button, Typography } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import dashboardImg from "@/assets/dashboard.png";

const Hero = () => {
  return (
    <section className="  bg-primary min-h-[700px] flex items-center">
      <div className="custom-container pb-16 lg:flex-row flex-col gap-20 items-center pt-[124px] flex w-full">
        <div className="flex-1 flex flex-col lg:items-start items-center">
          <span className="inline-flex mb-5 font-medium text-white items-center justify-center p-2 rounded-lg w-[204px] border border-accent-2">
            Experts in health
          </span>
          <Title
            level={1}
            className="!text-white lg:!text-start !text-center !pb-5 !text-capitalize !text-[44px] lg:!text-[66.467px] !font-semibold"
          >
            Caring about your future health <br className="lg:block hidden" />{" "}
            today
          </Title>

          <div className="flex flex-col lg:items-start items-center">
            <Typography className="!text-white lg:text-start text-center lg:!w-[60%] pb-4 !text-[18px] !font-normal !leading-7">
              There for you when you need real help, your local practitioner.{" "}
            </Typography>
            <div>
              <Button
                size="large"
                className="hover:!text-white hover:!border-primary hover:!bg-accent"
              >
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-2xl bg-[#D0ECFF]">
          <div className="border-[30px] rounded-2xl  lg:h-[520px]  w-full border-[#D0ECFF]">
            <Image
              className="size-full border-2 border-primary rounded-2xl"
              src={dashboardImg}
              alt="dashboard img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
