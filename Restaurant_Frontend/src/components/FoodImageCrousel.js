import React, { useState } from 'react';

function DarkVariantExample({ name, address, imageUrl, contact }) {
    const [currentIndex, setCurrentIndex] = useState(0); // State to manage current carousel index

    // Array for carousel items
    const items = [
        {
            image: imageUrl,
            name,
            address,
            contact
        },
        // Uncomment and modify these if you have more items
        // { image: "secondImageUrl", name: "Second Name", address: "Second Address", contact: "Second Contact" },
        // { image: "thirdImageUrl", name: "Third Name", address: "Third Address", contact: "Third Contact" },
    ];

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full max-w-xl mx-auto">
            {/* Carousel item */}
            <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="w-full h-60 flex items-center justify-center bg-black">
                    <img
                        className="object-cover w-3/5 h-60"
                        src={items[currentIndex].image}
                        alt={`Slide ${currentIndex + 1}`}
                    />
                </div>
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center">
                    <h5 className="text-white text-xl font-semibold">{items[currentIndex].name}</h5>
                    <p className="text-white">{items[currentIndex].address}</p>
                    <p className="text-white">{items[currentIndex].contact}</p>
                </div>
            </div>

            {/* Navigation buttons */}
            <button
                onClick={handlePrevious}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-200"
            >
                &#8592;
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-200"
            >
                &#8594;
            </button>
        </div>
    );
}

export default DarkVariantExample;
