import React from "react";

type Props = {};

const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-300 pt-10">
      <div className="container mx-auto text-center">
        <p className="my-7 text-base">
          &copy; {new Date().getFullYear()} Kualify. All rights reserved.{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
