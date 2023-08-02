import { Carousel } from "antd";
import useFetch from "react-fetch-hook";
import { useParams } from "react-router-dom";

import "./styles.scss";

const data = {
  id: "letrock!",
  tenduan: "asdnkjasd",
  province: "02",
  district: "002",
  ward: "00004",
  motanhanh: "sadasdasd",
  baiviet:
    '<p class="editor-paragraph" dir="ltr"><span>asdjasndhjkasd</span></p>',
  images: [],
};

const ViewDetails = ({ BE_API_DEFAULT_ROUTE }) => {
  let { id } = useParams();
  // const { isLoading, data } = useFetch(`${BE_API_DEFAULT_ROUTE}/tintuc/${id}`);

  // if (isLoading) {
  //   return <>Loading</>;
  // }
  // if (!data) {
  //   return <>Not Found</>;
  // }

  return (
    <div className="view-details-page">
      {/* <Carousel className="carousel-container" autoplay>
        {data.images.split(",").map((i) => (
          <img
            key={i}
            alt="img"
            className="image-carousel"
            src={`${BE_API_DEFAULT_ROUTE}/file/download/${i}`}
          ></img>
        ))}
      </Carousel> */}
      <section className="left-section">
        <div className="left-section__header">
          <div className="line" />
          <h1 className="ten-du-an">{data.tenduan}</h1>
          <div className="line" />
        </div>
        <div className="left-section__location-group">
          <a className="location" href="/">
            {data.province}
          </a>
          <a className="location" href="/">
            {data.district}
          </a>
          <a className="location" href="/">
            {data.ward}
          </a>
        </div>
        <div className="left-section__informations">
          <span className="motanhanh">{data.motanhanh}</span>
          <div
            className="baiviet"
            dangerouslySetInnerHTML={{ __html: data.baiviet }}
          />
        </div>
      </section>
    </div>
  );
};

export default ViewDetails;
