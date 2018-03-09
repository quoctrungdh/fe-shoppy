
/** DECLARATIONS */
const common = {
  formatDataSSelect,
};
export { common };


/** DEFINITIONS */

interface SelectFields {
  label: string,
  value: any
}
export function formatDataSSelect(data: any, fields: SelectFields) {
  let result: Array<any> = [];
  if (!data.length || !fields) {
    return [];
  }

  data.map((item: any) => {
    const obj = {
      label: item[fields.label],
      value: item[fields.value],
      ...item
    };
    result = [...result, obj];
  });
  return result;
}


