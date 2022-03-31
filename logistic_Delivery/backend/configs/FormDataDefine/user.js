module.exports.initialDataLogin = ["tel", "password", "role_id", "email", "address", "name"];

module.exports.descriptorLogin = {
  tel: {
    type: "text",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  role_id: {
    type: "number",
    required: true,
  },
  email: {
    type: "text",
    required: true,
  },
  address: {
    type: "text",
    required: true,
  },
  name: {
    type: "text",
    required: true,
  }
};

module.exports.verifyVal = ["email", "codeOTP"];