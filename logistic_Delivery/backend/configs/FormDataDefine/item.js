module.exports.initialItemNew = [
  "janCode",
  "name",
  "jaName",
  "viName",
  "price",
  "countryCode",
  "description",
  "links",
  "enDescription",
  "viDescription",
];
module.exports.descriptorItemNew = {
  janCode: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
  },
  jaName: {
    type: "string",
    required: true,
  },
  price: {
    required: true,
  },
  countryCode: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  links: {
    required: true,
  },
  viName: {
    type: "string",
    required: false,
  },
  enDescription: {
    type: "string",
    required: false,
  },
  viDescription: {
    type: "string",
    required: false,
  },
};
