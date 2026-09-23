const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    certificate: {
      type: String,
    },

    prizePool: {
      type: Number,
      required: true,
    },

    entryFee: {
      type: Number,
      required: true,
    },

    maxParticipants: {
      type: Number,
      required: true,
    },

    bookedParticipants: {
      type: Number,
      default: 0,
    },

    registrationDeadline: {
      type: Date,
      required: true,
    },

    submissionStart: {
      type: Date,
      required: true,
    },

    submissionDeadline: {
      type: Date,
      required: true,
    },

    resultDate: {
      type: Date,
      required: true,
    },

    judge: {
      name: String,
      profession: String,
      experience: String,
      image: String,
      introVideo: String,
    },

    about: String,

    judgingParameters: String,

    rules: String,

    winners: [
      {
        name: String,
        position: String,
        image: String,
      },
    ],

    rewards: [
      {
        position: String,
        amount: Number,
        icon: String,
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Competition",
  competitionSchema
);