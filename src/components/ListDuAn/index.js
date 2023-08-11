import React, { useEffect } from "react";
import useAPI from "../../hooks/useAPI";
import { Spin } from "antd";

const ListDuAn = ({ filter }) => {
  const [{ isLoading: isLoadingListDuAn, data: ListDuAn = [] }, onGetListDuAn] =
    useAPI({
      url: "/list-du-an",
    });

  useEffect(() => {
    onGetListDuAn({ data: filter });
  }, [filter]);

  return isLoadingListDuAn ? (
    <Spin />
  ) : ListDuAn.length === 0 ? (
    <div style={{ fontSize: "25px", fontWeight: 600 }}>
      Hiện không có tin tức
    </div>
  ) : (
    ListDuAn?.map((tintuc) => {
      const ViewDetailsUrl = `/duan/${tintuc._id}`;
      return (
        <div className="home-product" key={tintuc._id}>
          <div className="product-thumb">
            <a href={ViewDetailsUrl}>
              <img
                className="ls-is-cached lazyloaded"
                alt="first-img"
                src={tintuc.data.images[0]}
              />
            </a>
          </div>
          <div className="home-product-bound">
            <a href={ViewDetailsUrl} className="product-address">
              {tintuc.data.vitri}
            </a>
            <a href={ViewDetailsUrl} className="product-title">
              {tintuc.data.tenduan}
            </a>

            <div className="product-desc">{tintuc.data.motanhanh}</div>
          </div>
        </div>
      );
    })
  );
};

export default ListDuAn;
