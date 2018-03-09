
const common = {
  formatSelect,
};
export default common;

function formatSelect(data, fields) {
  let result = [];
  data.map((item) => {
    console.log(item);
    const obj = {
      label: data[fields.label],
      value: data[fields.value],
    };
    result = [...result, obj];
    console.log(result);
  });
  return result;
}
