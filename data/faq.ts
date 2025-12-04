
// Please enter the FAQ data in the structure defined by FAQCategory type


import { FAQCategory } from "@/types";

export const FAQ_DATA: FAQCategory[] = [
    {
    id: "title1",
    title: "🧠 General",
    sideImage: "/assets/IMG [6].png", 
    questions: [
      {
        id: "q1",
        question: "What is the 12/12 Snapshot?",
        answer: "The snapshot on December 12th records all current HAUWEE NFT holders. Your NFT traits at the moment of the snapshot will determine eligibility for rewards — so make sure your NFT is in your wallet before the snapshot happens.",
      },
      {
        id: "q2",
        question: "Do I need to do anything before the snapshot?",
        answer: "No action is required — just ensure your NFT is in your wallet and not listed or transferring during the snapshot.",
      },
    ],
  },
  {
    id: "title2",
    title: "🎁 Prize Eligibility",
    sideImage: "/assets/IMG 2 [R].png",
    questions: [
      { id: "q4", question: "Who qualifies for prizes?", answer: "Only holders with NFTs that contain specific winning traits are eligible. These traits will be revealed during or after the snapshot." },
      { id: "q5", question: "What types of prizes are available?", answer: "There are two categories: IRL prizes (physical items shipped to winners) and Digital prizes (including tokens rune rewards requiring a BTC Taproot address)" },
      { id: "q6", question: "How will I know if I won?", answer: "If your reward is a token or digital prize, it will be sent to you automatically after the snapshot.For IRL prizes, please check the winning traits list and then connect your wallet on the website to verify and claim." },
    ],
  },

   {
    id: "title3",
    title: "🧾Claiming Your Prize",
    sideImage: "/assets/IMG 3 [R].png",
    questions: [
      { id: "q7", question: "How do I claim an IRL prize?", answer: "Winners must claim their prize through the official website by submitting shipping details after verification." },
      { id: "q8", question: "What if I already won a previous IRL reward?", answer: "You can still claim based on the traits you currently hold. If you have multiple NFTs with IRL-winning traits — congrats, you win them all! 🎉 Just connect your wallet on the website and claim each one." },
      { id: "q9", question: "📌 What do Rune winners need to submit?", answer: "Rune prize winners must provide a Taproot (BTC) address to receive their digital reward." },
    ],
  },

  // Add more categories here...
];