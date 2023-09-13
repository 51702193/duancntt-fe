import React, { useEffect, useMemo } from "react";
import useAPI from "../../hooks/useAPI";
import { Badge, Button, Spin } from "antd";

import "./styles.scss";
import useTinTuc from "../../hooks/useTinTuc";
import { TINTUC_STATUS } from "../../constants";

const ListDuAn = ({ filter, isAdmin, isOwnerView }) => {
  const [{ isLoading: isLoadingListDuAn, data: ListDuAn = [] }, onGetListDuAn] =
    useAPI({
      url: "/list-du-an",
    });
  const { updateTinTuc, isLoadingUpdateTinTuc, getRibbon } = useTinTuc();

  useEffect(() => {
    onGetListDuAn({
      data: filter,
    });
  }, [filter]);

  return isLoadingListDuAn ? (
    <Spin />
  ) : (ListDuAn || []).length === 0 ? (
    <div style={{ fontSize: "25px", fontWeight: 600 }}>
      Hiện không có tin tức
    </div>
  ) : (
    ListDuAn?.map((tintuc) => {
      const ViewDetailsUrl = `/duan/${tintuc._id}`;
      const ribbon = getRibbon(tintuc.data.status);

      return (
        <Badge.Ribbon
          style={isOwnerView || isAdmin ? {} : { display: "none" }}
          text={ribbon.text}
          color={ribbon.color}
          key={tintuc._id}
        >
          <div className="home-product">
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
        </Badge.Ribbon>
      );
    })
  );
};

export default ListDuAn;
