import dog from "../assets/dog.svg";
import "./animate.css";

import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      {/* <!-- Container --> */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {/* <!-- Component --> */}
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-20 md:grid-cols-2">
          {/* <!-- Heading Div --> */}
          <div
            className="max-w-[720px] lg:max-w-[842px] "
            data-aos="fade-up-right"
            data-aos-duration="1500"
          >
            <h1 className="mb-4 text-4xl font-semibold md:text-6xl">
              <span className="title-word title-word-1">Adopt</span>{" "}
             
              <span className="title-word title-word-2">a</span> {" "}
              <span className=" bg-[url('https://i.ibb.co/YXSVt4K/rectangle.png')] bg-cover bg-center px-4 text-white">
                <span className="title-word title-word-3">Friend</span>
              </span>
            </h1>
            <p className="mb-6 max-w-[528px] text-xl text-[#636262] md:mb-10 lg:mb-12">
              Providing a loving and nurturing environment ensures that pets
              have a happy and secure home where they can thrive.
            </p>
            <Link
              to="/about"
              className="mb-6 inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(105,_221,_0)_6px_6px] md:mb-10 lg:mb-12"
            >
              Know more
            </Link>
          </div>
          {/* <!-- Image Div --> */}
          <div className="relative floating left-4 h-full max-h-[562px] w-[85%] overflow-visible md:left-0 md:w-[95%] lg:w-full">
            <img
              src={dog}
              alt=""
              className="mx-auto block h-full w-full max-w-[800px] rounded-2xl object-cover"
              data-aos="flip-up"
              data-aos-duration="1500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
