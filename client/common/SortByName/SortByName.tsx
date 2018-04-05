/* eslint comma-dangle: ["error", "never"] */
import * as React from 'react';
import { sortCollection } from '../../helpers/common';
import { SORT_TYPE } from '../../helpers/constants';

interface SortByNameProps {
  results: any[],
  ascending: boolean,
  descending: boolean
}

function SortByName(Wrapped: any, typeSort: string) {
  return (props: SortByNameProps) => {
    const { results } = props;
    let sorted = [];
    /** Default sort ascending */
    if (typeSort === SORT_TYPE.ASCENDING) {
      sorted = sortCollection({
        array: results,
        fields: ['name']
      });
    }
    
    /** IF sort descending then revert the ascending array */
    if (typeSort === SORT_TYPE.DESCENDING) {
      sorted = sortCollection({
        array: results,
        fields: ['name']
      }).reverse();
    }

    /** Override origin array  Or Render the old one */
    return sorted.length ? <Wrapped {...props} results={sorted} /> : <Wrapped {...props} />;
  };
}

export default SortByName;
