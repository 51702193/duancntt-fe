import { Carousel } from "antd";
import useFetch from "react-fetch-hook";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

import "./styles.scss";
import useAPI from "../../hooks/useAPI";
import { useEffect } from "react";
import { uid } from "uid";

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

const ViewDetails = () => {
  let { id } = useParams();

  const [{ isLoading, data }, onGetData] = useAPI({
    url: `/du-an?id=${id}`,
  });
  useEffect(() => {
    onGetData();
  }, []);

  if (isLoading) {
    return (
      <div className="view-details-page">
        <section className="loading-screen">
          <Spin size="large" />
        </section>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="view-details-page">
        <section className="left-section">
          <div className="left-section__header">
            <div className="line" />
            <h1 className="ten-du-an">Not Found</h1>
            <div className="line" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="view-details-page">
      <section className="left-section">
        <div className="left-section__header">
          <div className="line" />
          <h1 className="ten-du-an">{data.tenduan}</h1>
          <div className="line" />
        </div>
        <div className="left-section__location-group">
          <a className="location" href="/">
            {data.province.province}
          </a>
          <a className="location" href="/">
            {data.district.district}
          </a>
          <a className="location" href="/">
            {data.ward.ward}
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
      {data?.images?.length > 0 && (
        <section className="right-section">
          <Carousel className="carousel-container" autoplay>
            {data.images.map((i) => (
              <img
                key={uid()}
                alt="img"
                className="image-carousel"
                src={i}
              ></img>
            ))}
          </Carousel>
        </section>
      )}
    </div>
  );
};

export default ViewDetails;
