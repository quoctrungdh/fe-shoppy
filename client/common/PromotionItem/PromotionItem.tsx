

import * as React from 'react';

interface Promotion {
  name: string,
  date: Date,
  img: string,
  des: string,
  type: number,
  dateFormated: string
}

interface PromotionsItemProps {
  value: Promotion
}

const PromotionsItem: React.SFC<PromotionsItemProps> = (props) => {
  const { value } = props;
  return (
    <div className="promotion-item">
      <div className="promotion-item__img" dangerouslySetInnerHTML={{__html: value.img }}></div>
      <div className="promotion-item__content">
        <strong className="promotion-item__content__name"> { value.name }</strong>
        <div className="promotion-item__content__date"> { value.dateFormated }</div>
        <div className="promotion-item__content__des"> { value.des }</div>
        {/* <div className="promotion-item__content__type"> { value.type }</div> */}
      </div>
    </div>
  );
};

export default PromotionsItem;
