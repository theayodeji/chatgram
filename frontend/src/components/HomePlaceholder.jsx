import React, { useEffect } from "react";
import Logo from "./Logo";

const HomePlaceholder = () => {
  useEffect(() => {
    setTimeout(() => {
      const logo = document.querySelector(".logo");
      if (logo) {
        logo.classList.add("hithere");
      }
    }, 1000); // Short delay before the animation starts (500ms)
  });


  return (
    <div className="flex flex-col items-center gap-3 h-full justify-center w-full">
      <div className="logo">
        <Logo />
      </div>
      {/* <h1 className='text-primary text-3xl font-bold'>Welcome to the GRAM!!!</h1> */}
      <p className="text-neutral-content/60 text-xl text-center">
        Select a conversation and start chatting
      </p>
    </div>
  );
};

export default HomePlaceholder;
