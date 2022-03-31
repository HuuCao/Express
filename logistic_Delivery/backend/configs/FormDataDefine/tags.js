module.exports.initialData = ["tag", "target", "targetType"];

module.exports.descriptorCreateTag = {
  tag: [
    {
      type: "number",
      required: true,
    },
  ],
  target: [
    {
      type: "number",
      required: false,
    },
  ],
  sourceType: [
    {
      type: "enum",
      enum: ["allow", "unallow", "unknown"],
      required: false,
    },
  ],
  allowManual: [
    {
      type: "enum",
      enum: ["allow", "unallow", "unknown"],
      required: false,
    },
  ],
  targetType: [
    {
      type: "enum",
      enum: ["item", "pkl", "pkg"],
      required: true,
    },
  ],
};
