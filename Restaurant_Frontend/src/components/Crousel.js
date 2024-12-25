import React from "react";
import "./Crousel.css";

function Crousel() {
  return (
    <div>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://media.istockphoto.com/id/1041080706/photo/100-gluten-free-low-carb-hamburger-and-bun.jpg?s=612x612&w=0&k=20&c=Mmxv9GlDd0DMAuZ0GoHr0gGD_Vw5NFGcYUOhsX_Lm2Q="
              className="d-block w-100 h-80"
              alt="First slide"
            />
            <div className="carousel-caption d-none d-md-block">
            {/* <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form> */}
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1292635321/photo/veg-steam-momo-nepalese-traditional-dish-momo-stuffed-with-vegetables-and-then-cooked-and.jpg?s=612x612&w=0&k=20&c=NyxQvDnBq7Ki09Zi21JEMxpuZ_uVr45ZBSavqXJ2T1s=" // Placeholder image URL, replace with your actual URL
              className="d-block w-100 h-80"
              alt="Second slide"
            />
            <div className="carousel-caption d-none d-md-block">
              
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU=" // Placeholder image URL, replace with your actual URL
              className="d-block w-100 h-80"
              alt="Third slide"
            />
            <div className="carousel-caption d-none d-md-block">
              
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Crousel;
