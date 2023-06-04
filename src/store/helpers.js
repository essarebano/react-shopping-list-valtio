export const getResourceIds = (arrObj) => arrObj?.map((data) => data.id);
export const getResourceById = (arrObj) =>
  arrObj?.reduce((accumulator, data) => {
    const dataId = data.id;
    accumulator[dataId] = data;
    return accumulator;
  }, {});
