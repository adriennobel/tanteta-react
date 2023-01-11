import '../styles/ImageSliderStyles.css'
import { useState, useEffect } from "react";

const ImageSliderComp = ({ shootingDetail }) => {

    let [count, setCount] = useState(0);
    let [width, setWidth] = useState(0);
    let imgArr = [];

    useEffect(() => {
        imgArr = document.querySelectorAll('.image-slide');
        // console.log("init width to: " + width);
    });

    function nextSlide() {

        if (count >= 0 && count < imgArr.length - 1) {
            width = width + imgArr[count].offsetWidth;
            setWidth(width);

            document.querySelector(".image-slides").style.transform = `translateX(-${width}px)`;

            count = count + 1;
            setCount(count);
        }

        console.log(count);
        console.log(width);
        console.log(imgArr[count]);
    }

    function prevSlide() {

        if (count > 0) {
            width = width - imgArr[count - 1].offsetWidth;
            setWidth(width);

            document.querySelector(".image-slides").style.transform = `translateX(-${width}px)`;

            count = count - 1;
            setCount(count);
        }

        console.log(count);
        console.log(width);
        console.log(imgArr[count]);
    }

    return (
        <div className="image-slider-component">
            <div className="image-slider-container">
                <div className="image-slides-box">
                    <div className="image-slides">
                        {shootingDetail.images ?
                            shootingDetail.images.map((image, i) => (
                                <div key={i} className={`image-slide slide-${i}`} id={`slide-${i}`}>
                                    <img className="image" src={image.src} alt={image.alt} width="auto" height="300" />
                                </div>
                            ))
                            :
                            <div className={`image-slide slide-1`} id={`slide-1`}>
                                <img src="/Image_Coming_Soon.png" alt="coming soon image placeholder" width="auto" height="300" />
                            </div>
                        }
                    </div>
                </div>
                <div className="slides-btn-box">
                    <button onClick={prevSlide}>Prev</button>
                    <button onClick={nextSlide}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default ImageSliderComp;

// {shootingDetail.pricepack1 ? <p>{shootingDetail.pricepack1.price} XAF: {shootingDetail.pricepack1.pricedesc}</p> : <p>No Price Pack</p>}

// {shootingDetail.pricepack1 && <p>{shootingDetail.pricepack1.price} XAF: {shootingDetail.pricepack1.pricedesc}</p>}