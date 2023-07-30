import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export function Slider() {
  const slides = [
    {
      url: "https://gateway.pinata.cloud/ipfs/QmVDdt38mZ2QGZPLPAGP37MJNSn4HZok8PkGRWyrupL97u",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/Qme6mikiZDmor1TrgPniYXVWG1SsGrQqegnWqacNkPSqsG",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmQT29pjz41tuVuAMvUq9bxeV84NeVVoPpVHvNWvoy3fKV",
    },

    {
      url: "https://gateway.pinata.cloud/ipfs/QmTxNQpp4gd7c8d3jBkFEK5ZCwsnpPPVsLkP7VdoHmpoD1",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmTiWyoX2QiddPSkmwLL53xw1MNYqfchVHMFY3v76Xzt86",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[700px] h-[600px] w-full m-auto py-16 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}
