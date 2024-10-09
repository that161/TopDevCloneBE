function fillNullValue(fields, data) {
  if (!data) {
    return null;
  }
  const isArray = Array.isArray(data);
  if (!isArray) {
    data = [data];
  }
  for (const item of data) {
    for (const field of fields) {
      if (!(field in item)) {
        item[field] = null;
      }
    }
  }
  return isArray ? data : data[0];
}

module.exports = { fillNullValue };
