import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
function Rating(props) {
  const { t } = useTranslation(["common"]);
  const { rating, numReviews, caption } = props;
  return (
    <div
      className="rating h5 d-flex align-items-center"
      style={{ color: "#ffc000" }}
    >
      <div className="me-1">
        <span>
          {rating >= 1 ? (
            <FaStar />
          ) : rating >= 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span>
          {rating >= 2 ? (
            <FaStar />
          ) : rating >= 1.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span>
          {rating >= 3 ? (
            <FaStar />
          ) : rating >= 2.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span>
          {rating >= 4 ? (
            <FaStar />
          ) : rating >= 3.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span>
          {rating >= 5 ? (
            <FaStar />
          ) : rating >= 4.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      </div>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{" " + numReviews + ` ${t("product.reviews")}`}</span>
      )}
    </div>
  );
}

export default Rating;
