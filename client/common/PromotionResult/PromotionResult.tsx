import PromotionsItem from "../PromotionItem/PromotionItem";
import * as React from 'react';

interface PromotionResultProps {
  results: any[]
}

const PromotionResult: React.SFC<PromotionResultProps> = (props) => {
  const { results = []} = props;
  return (
    <div className="result-block">
      {
        results.length && results.map((item, index) => {
          // if (!item.isHide) {
          //   return (
          //     <PromotionsItem
          //       key={item.id}
          //       value={item}
          //     />
          //   );
          // }
          return (
            <PromotionsItem
              key={item.id}
              value={item}
            />
          );
        })
      }
      {
        results.length === 0 &&
        <div>No results</div>
      }
    </div>
  );
};

export default PromotionResult;
