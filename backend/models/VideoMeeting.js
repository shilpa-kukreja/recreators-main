// ============================================================
// BACKEND — models/VideoMeeting.js
// ============================================================
import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
  {
    socketId: String,
    userId: { type: String, default: null },
    name: { type: String, required: true },
    role: { type: String, enum: ['host', 'guest'], default: 'guest' },
    joinedAt: { type: Date, default: Date.now },
    leftAt: { type: Date, default: null },
  },
  { _id: false }
);

const videoMeetingSchema = new mongoose.Schema(
  {
    meetingId: { type: String, required: true, unique: true, index: true },

    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },

    clientName: { type: String, default: '' },
    clientEmail: { type: String, default: '' },
    clientPhone: { type: String, default: '' },

    // admin/team member who created it
    createdBy: { type: String, default: null },
    hostName: { type: String, default: 'Company Representative' },

    // optional links to existing system
  
    customerId: { type: String, default: null },
    serviceType: { type: String, default: '' },

    internalNotes: { type: String, default: '' },

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    status: {
      type: String,
      enum: ['scheduled', 'waiting', 'active', 'completed', 'cancelled', 'expired'],
      default: 'scheduled',
      index: true,
    },

    locked: { type: Boolean, default: false },
    waitingRoomEnabled: { type: Boolean, default: true },

    participants: { type: [participantSchema], default: [] },

    startedAt: { type: Date, default: null },
    endedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

videoMeetingSchema.index({ startTime: 1, status: 1 });

/** Computed joinability — single source of truth for both API and socket. */
videoMeetingSchema.methods.getJoinState = function (now = new Date()) {
  if (this.status === 'cancelled') {
    return { joinable: false, code: 'CANCELLED', message: 'This meeting has been cancelled.' };
  }
  if (this.status === 'completed' || this.status === 'expired') {
    return { joinable: false, code: 'ENDED', message: 'Sorry, this meeting has ended.' };
  }
  if (now > this.endTime) {
    return { joinable: false, code: 'EXPIRED', message: 'This meeting has expired.' };
  }
  if (this.locked) {
    return { joinable: false, code: 'LOCKED', message: 'This meeting is locked by the host.' };
  }
  if (now < new Date(this.startTime.getTime() - 15 * 60 * 1000)) {
    return {
      joinable: false,
      code: 'NOT_STARTED',
      message: `Meeting starts at ${this.startTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}. You may enter the waiting room 15 minutes before.`,
      canWait: false,
      startTime: this.startTime,
    };
  }
  return { joinable: true, code: 'OK', message: 'OK', canWait: true };
};

export default mongoose.models.VideoMeeting ||
  mongoose.model('VideoMeeting', videoMeetingSchema);