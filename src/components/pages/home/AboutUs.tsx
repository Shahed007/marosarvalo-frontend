import React from "react";
import image1 from "@/assets/about/about-2.png";
import image2 from "@/assets/about/about-1.png";
import Image from "next/image";
import Title from "antd/es/typography/Title";
import { Card, Typography } from "antd";
import avatarImage from "@/assets/icons/avatar-2.png";
import avatarIcon from "@/assets/icons/glow.png";

const AboutUs = () => {
  return (
    <section className="mt-[100px] lg:mt-[185px]">
      <div className="custom-container md:flex-row flex-col-reverse flex gap-10 lg:gap-20">
        <div className="flex-1 flex flex-col gap-8">
          <div className="h-[260px] overflow-hidden">
            <Image
              className=" size-full object-cover  rounded-3xl"
              src={image1}
              alt="Image 1"
            />
          </div>
          <div className="rounded-2xl h-[260px] overflow-hidden">
            <Image
              className="size-full object-cover rounded-2xl"
              src={image2}
              alt="Image 1"
            />
          </div>
        </div>
        <div className="flex-1">
          <span
            style={{
              borderRadius: "18.087px 18.087px 0 18.087px",
            }}
            className="bg-[#0B121B] inline-block mb-8 border-accent-2 text-white py-[10.852px] px-[22.609px]"
          >
            ABOUT US
          </span>
          <Title className="!text-primary !text-3xl sm:!text-[44px] !font-bold">
            We Are Always Ensure Best Medical Treatment
          </Title>
          <Typography className="!text-[#CCC] !text-lg mt-[18px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            hendrerit metus ex, id ullamcorper massa accumsan volutpat. Etiam
            viverra pharetra dui, nec aliquet nisi consequat sit amet. 
          </Typography>
          <Card
            style={{
              marginTop: 50,
              position: "relative",
              borderRadius: "0 18.087px 18.087px 18.087px",
            }}
          >
            <Image
              className="absolute -top-7 -left-1"
              src={avatarImage}
              alt="avatar image"
            />
            <Typography className="!text-[#CCC] !text-base mt-[18px] !pt-3">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              hendrerit metus ex, id ullamcorper massa accumsan volutpat. Etiam
              viverra pharetra dui, nec aliquet nisi consequat sit amet.”
            </Typography>
            <div className="flex items-center gap-4">
              <Image src={avatarIcon} alt="Avatar icon" />
              <Typography className="!text-primary !text-base !mt-7">
                Vice Director of Wellness <br /> Hospital
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
