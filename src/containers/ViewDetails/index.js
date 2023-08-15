import { Button, Carousel } from "antd";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

import "./styles.scss";
import useAPI from "../../hooks/useAPI";
import { useEffect } from "react";
import { uid } from "uid";
import { TINTUC_STATUS } from "../../constants";
import useTinTuc from "../../hooks/useTinTuc";

const ViewDetails = ({ isAdmin }) => {
  const { id } = useParams();
  const { isLoadingUpdateTinTuc, updateTinTuc } = useTinTuc();

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
        {isAdmin && (
          <div className="left-section__button-group">
            <Button
              type="primary"
              disabled={
                isLoadingUpdateTinTuc || data.status === TINTUC_STATUS.APPROVED
              }
              onClick={() =>
                updateTinTuc({
                  status: TINTUC_STATUS.APPROVED,
                  id: id,
                })
              }
            >
              Approve
            </Button>
            <Button
              type="primary"
              danger
              disabled={
                isLoadingUpdateTinTuc || data.status === TINTUC_STATUS.REJECTED
              }
              onClick={() =>
                updateTinTuc({
                  status: TINTUC_STATUS.REJECTED,
                  id: id,
                })
              }
            >
              Reject
            </Button>
          </div>
        )}
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
