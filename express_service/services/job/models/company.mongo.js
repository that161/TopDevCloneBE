const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    logo: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      default: null,
    },
    nationality: {
      type: [String],
      default: null,
    },
    companySize: {
      type: String,
      default: null,
    },
    industry: {
      type: [String],
      default: null,
    },
    techStack: {
      type: [String],
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    socialMedia: {
      type: {
        facebook: { type: String, default: null },
        linkedin: { type: String, default: null },
        youtube: { type: String, default: null },
        additional: { type: String, default: null },
      },
      default: null,
    },
    addresses: {
      type: [
        {
          city: { type: String, default: null },
          addressDetail: { type: String, default: null },
        },
      ],
      default: null,
    },
    benefits: {
      type: [String],
      default: null,
    },
    coverPhoto: {
      type: String,
      default: null,
    },
    galleries: {
      type: [String],
      default: null,
    },
    topConcerns: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      default: null,
    },
    products: {
      type: [
        {
          productPhoto: { type: String, default: null },
          productName: { type: String, required: true },
          link: { type: String, default: null },
          description: { type: String, required: true },
        },
      ],
      default: null,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    followedCount: {
      type: Number,
      required: true,
      default: 0,
    },
    applicationCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Company = mongoose.model('company', companySchema, 'company');
module.exports = Company;
