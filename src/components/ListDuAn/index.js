import React, { useEffect } from "react";
import useAPI from "../../hooks/useAPI";
import { Button, Spin } from "antd";

import "./styles.scss";
import useTinTuc from "../../hooks/useTinTuc";
import { TINTUC_STATUS } from "../../constants";

const ListDuAn = ({ filter, isAdmin }) => {
  const [{ isLoading: isLoadingListDuAn, data: ListDuAn = [] }, onGetListDuAn] =
    useAPI({
      url: "/list-du-an",
    });
  const { updateTinTuc, isLoadingUpdateTinTuc } = useTinTuc();

  useEffect(() => {
    onGetListDuAn({
      data: {
        ...filter,
        status: isAdmin ? TINTUC_STATUS.SUBMITTED : TINTUC_STATUS.APPROVED,
      },
    });
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
            {isAdmin && (
              <div className="button-group">
                <Button
                  type="primary"
                  disabled={
                    isLoadingUpdateTinTuc ||
                    tintuc.data.status === TINTUC_STATUS.APPROVED
                  }
                  onClick={() =>
                    updateTinTuc({
                      status: TINTUC_STATUS.APPROVED,
                      id: tintuc._id,
                    })
                  }
                >
                  Approve
                </Button>
                <Button
                  type="primary"
                  danger
                  disabled={
                    isLoadingUpdateTinTuc ||
                    tintuc.data.status === TINTUC_STATUS.REJECTED
                  }
                  onClick={() =>
                    updateTinTuc({
                      status: TINTUC_STATUS.REJECTED,
                      id: tintuc._id,
                    })
                  }
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      );
    })
  );
};

export default ListDuAn;
