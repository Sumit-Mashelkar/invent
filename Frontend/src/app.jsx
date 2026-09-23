import { useEffect, useState } from "react";

import Header from "./components/Header";
import CompetitionHero from "./components/CompetitionHero";
import JudgeCard from "./components/JudgeCard";
import Countdown from "./components/Countdown";
import ImportantDates from "./components/ImportantDates";
import PreviousWinners from "./components/PreviousWinners";
import CompetitionTabs from "./components/CompetitionTabs";
import Rewards from "./components/Rewards";
import Disclaimer from "./components/Disclaimer";
import PaymentInfo from "./components/PaymentInfo";
import ReferralCard from "./components/ReferralCard";
import ReviewsCard from "./components/ReviewsCard";
import BottomNavigation from "./components/BottomNavigation";

const competition = {
  title: "Feedants Classical Dance",

  category: "Dance",

  type: "Multi-Win",

  certificate: "Winners get certificate",

  prizePool: 1500,

  entryFee: 99,

  maxParticipants: 20,

  bookedParticipants: 1,

  registered: true,

  registrationDeadline: new Date("2026-08-10T23:50:00"),

  dates: {
    registerBefore: {
      date: "10 Aug 26",
      time: "11:50 PM",
    },

    submissionStarts: {
      date: "6 Aug 26",
      time: "04:00 AM",
    },

    submissionEnds: {
      date: "30 Aug 26",
      time: "11:55 PM",
    },

    resultDate: {
      date: "1 Sept 26",
      time: "11:50 PM",
    },
  },

  judge: {
    name: "Manju Dubey",
    profession: "Professional Kathak Dancer",
    experience: "12+ Years of Experience",
  },

  about:
    "This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.",

  judgingParameters:
    "Technique, expressions, creativity, presentation and overall performance.",

  rules:
    "Participants must submit an original performance before the submission deadline.",

  winners: [
    {
      name: "Riya Shah",
      position: "1st Winner",
      image: "💃",
    },
    {
      name: "Aarav Mehta",
      position: "1st Winner",
      image: "🕺",
    },
    {
      name: "Neha Verma",
      position: "2nd Winner",
      image: "💃",
    },
    {
      name: "Ishita Choudhary",
      position: "3rd Winner",
      image: "💃",
    },
  ],

  rewards: [
    { position: "1st Winner", amount: 550, icon: "🏆" },
    { position: "2nd Winner", amount: 300, icon: "🥈" },
    { position: "3rd Winner", amount: 240, icon: "🥉" },
    { position: "4th Winner", amount: 200, icon: "☆" },
    { position: "5th Winner", amount: 130, icon: "☆" },
    { position: "6th Winner", amount: 80, icon: "☆" },
  ],
};

function App() {
  const [registered, setRegistered] = useState(competition.registered);

  const [booked, setBooked] = useState(
    competition.bookedParticipants
  );

  const [activeTab, setActiveTab] = useState("about");

  const [timeLeft, setTimeLeft] = useState("");

  const spotsLeft =
    competition.maxParticipants - booked;

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference =
        competition.registrationDeadline - now;

      if (difference <= 0) {
        setTimeLeft("Registration closed");
        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft(
        `${String(days).padStart(2, "0")}d : ` +
          `${String(hours).padStart(2, "0")}h : ` +
          `${String(minutes).padStart(2, "0")}m : ` +
          `${String(seconds).padStart(2, "0")}s`
      );
    };

    calculateTime();

    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRegister = () => {
    if (registered) return;

    if (booked >= competition.maxParticipants) {
      alert("Competition is full");
      return;
    }

    setRegistered(true);
    setBooked((previous) => previous + 1);
  };

  return (
    <div className="app">
      <Header />

      <main className="page">

        <CompetitionHero
          competition={competition}
          registered={registered}
          spotsLeft={
            competition.maxParticipants - booked
          }
        />

        <JudgeCard judge={competition.judge} />

        <Countdown timeLeft={timeLeft} />

        <ImportantDates dates={competition.dates} />

        <PreviousWinners
          winners={competition.winners}
        />

        <CompetitionTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          competition={competition}
        />

        <Rewards rewards={competition.rewards} />

        <Disclaimer />

        <PaymentInfo />

        <ReferralCard />

        <ReviewsCard />

        <button
          className={`main-action ${
            registered ? "registered-action" : ""
          }`}
          onClick={handleRegister}
          disabled={
            registered ||
            booked >= competition.maxParticipants
          }
        >
          {registered
            ? "Upload Submission"
            : booked >= competition.maxParticipants
            ? "Competition Full"
            : "Register Now"}

          {registered && (
            <span>Registered</span>
          )}
        </button>

      </main>

      <BottomNavigation />
    </div>
  );
}

export default App;