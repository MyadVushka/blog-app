"use client";

import "./QuotesCarousel.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { QuoteStyle } from "@/types/general";

const QuotesCarousel = ({ quotes }: { quotes: QuoteStyle }) => {
  const [opacities, setOpacities] = useState<number[]>([]);
  const [textVisible, setTextVisible] = useState<boolean>(false);

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: quotes.data.length,
      loop: true,
      detailsChanged(s) {
        const new_opacities = s.track.details.slides.map(
          (slide) => slide.portion
        );
        setOpacities(new_opacities);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const handleTextVisible = () => {
    setTextVisible(true);
  };

  const handleTextInvisible = () => {
    setTextVisible(false);
  };

  return (
    <div ref={sliderRef} className="fader">
      {quotes.data.map((quote: QuoteStyle, idx: number) => (
        <div
          key={idx}
          className="fader__slide"
          style={{ opacity: opacities[idx] }}
          onMouseOver={handleTextVisible}
          onMouseOut={handleTextInvisible}
        >
          <div className="fader__content">
            <img
              src={`http://localhost:1337${quote.attributes.quoteImage.data.attributes.url}`}
              alt="img-quote"
            />
            <i className={`fader__info ${textVisible ? "visible" : ""}`}>
              <p className="">«{quote.attributes.quoteContent}»</p>
              <p className="qoute-author">{quote.attributes.quoteAuthor}</p>
            </i>
            <div
              className={`quote-background-shadow ${
                textVisible ? "active" : ""
              }`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuotesCarousel;
