import { useState } from "react";

export function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderStyles = {
    position: "relative",
    width: "350px",
    height: "350px",
    overflow: "hidden",
    borderRadius: "10px",
  }
  const slideStyles = {
    width: "100%", height: "100%", borderRadius: "10px", backgroundPosition: "center", backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].url})`
  }
  const leftArrowStyles = {
    position: "absolute", top: "50%", transform: "translate(0, -50%)", left: "12px", fontSize: "45px", color: "#fff", zIndex: 1, cursor: "pointer"
  }
  const rightArrowStyles = {
    position: "absolute", top: "50%", transform: "translate(0, -50%)", right: "12px", fontSize: "45px", color: "#fff", zIndex: 1, cursor: "pointer"
  }
  const dotsContainerStyles = {
    display: "flex",
    position: "absolute", bottom: "1%", left: "35%"
  }
  const dotStyles = {
    margin: "0 1px",
    cursor: "pointer",
    fontSize: "12px",
    color: "#fff"
  }
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex)
  }
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex)
  }
  return (
    <div style={sliderStyles}>
      <div style={leftArrowStyles} onClick={goToPrevious} >{"❮"}</div>
      <div style={rightArrowStyles} onClick={goToNext}>{"❯"}</div>
      <div style={slideStyles}></div>
      <div style={dotsContainerStyles} >
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} style={dotStyles} onClick={() => { setCurrentIndex(slideIndex) }}>⚪</div>
        ))}
      </div>
    </div>


  )
}