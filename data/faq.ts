
// Please enter the FAQ data in the structure defined by FAQCategory type


import { FAQCategory } from "@/types";

export const FAQ_DATA: FAQCategory[] = [
     {
    id: "title1",
    title: "🧠 Snapshot & Eligibility",
    sideImage: "/assets/IMG [6].png",
    questions: [
      {
        id: "q1",
        question: "When was the snapshot taken and am I eligible?",
        answer:
          "The snapshot was taken on December 12, 2025. Only NFTs held in your wallet at the time of the snapshot are eligible for prizes. Any NFTs purchased after December 12th do not qualify.\n\nImportant: NFTs listed for sale on secondary markets at the time of snapshot are NOT eligible for prizes, even if they're in your wallet."
      }
    ]
  },

  {
    id: "title2",
    title: "🎁 Claiming Your Prize",
    sideImage: "/assets/IMG 2 [R].png",
    questions: [
      {
        id: "q2",
        question: "How do I claim my prize?", // TODO need to update the link
        answer:
          "1. Visit highsunicorn.meme/claim\n2. Connect your wallet (WalletConnect or Phantom)\n3. The system will display any prizes you're eligible to claim\n4. For physical prizes: Complete the shipping form with your name, address, phone, and email\n5. For token prizes: They will be distributed automatically to your wallet\n\nClaim Deadline: January 12, 2026"
      },
      {
        id: "q3",
        question: "I have multiple NFTs with winning traits. Can I ship to different addresses?",
        answer:
          "All prizes associated with NFTs in a single wallet will ship to ONE address provided during the claim process.\n\nIf you want prizes shipped to different addresses, you need to move those NFTs to separate wallets BEFORE the December 12th snapshot. We cannot split shipments from a single wallet claim."
      }
    ]
  },

  {
    id: "title3",
    title: "📦 Personal Info & IRL Prize Requirements",
    sideImage: "/assets/IMG 3 [R].png",
    questions: [
      {
        id: "q4",
        question: "Do I have to provide personal information? What about anonymity?",
        answer:
          "For physical (IRL) prizes, yes – you must provide:\n\n1. Full name\n2. Complete shipping address\n3. Telephone number\n4. Email address\n\nWe understand privacy is important in Web3. However, we cannot ship physical items without this information. If you choose not to provide shipping details, we cannot deliver your IRL prizes.\n\nToken prizes require no personal information beyond wallet connection."
      },
      {
        id: "q5",
        question: "I won a bottle of wine. What do I need to know?",
        answer:
          "During the claim process, you must confirm that:\n\na) You are of legal drinking age in your jurisdiction\nb) You are legally permitted to receive alcohol at your shipping address\n\nSome countries/regions have restrictions on alcohol shipments. If we cannot legally ship wine to your location, we will contact you to discuss alternatives."
      }
    ]
  },

  {
    id: "title4",
    title: "🚚 Shipping & Delivery",
    sideImage: "/assets/IMG 4 [R].png",
    questions: [
      {
        id: "q6",
        question: "When will my prizes be shipped and who pays for shipping?",
        answer:
          "Shipping Timeline:\nAll shipping begins after the claim window closes (after January 12, 2026). Shipments will be completed throughout January 2026.\n\nShipping Costs:\nHigh As Unicorn covers all standard shipping costs worldwide. You will not be charged for delivery.\n\nInternational Shipping:\n We ship to all countries where legally possible. If we encounter issues with your destination, we reserve the right to work with you on alternative shipping solutions."
      }
    ]
  },

  {
    id: "title5",
    title: "🪙 Bitcoin Runes",
    sideImage: "/assets/IMG 5 [R].png",
    questions: [
      {
        id: "q7",
        question: "How do I receive Bitcoin Runes?",
        answer:
          "BTC Runes require a Taproot-compatible Bitcoin address (begins with \"bc1p\").\n\nDuring the claim process, you'll provide your Taproot address. Make sure your wallet supports Taproot/BTC Runes before submitting. Runes will be distributed manually after the claim window closes."
      }
    ]
  },

  {
    id: "title6",
    title: "⚠️ Issues, Changes & Support",
    sideImage: "/assets/IMG [7].png",
    questions: [
      {
        id: "q8",
        question: "What if I need to change my shipping address or have a problem?",
        answer:
          "Before items ship:\n Open a support ticket in our Discord immediately if you need to update information.\n\nTechnical issues: \nIf you experience problems connecting your wallet or claiming:\n a) Try a different browser\nb) Ensure your wallet extension is updated\nc) Clear your browser cache\nd) Open a Discord support ticket with screenshots of any errors"
      },
      {
        id: "q9",
        question: "What happens if I don't claim by January 12, 2026?",
        answer:
          "Unclaimed prizes will be forfeited after the deadline. There are no extensions. Make sure to submit your claim before January 12, 2026."
      },
      {
        id: "q10",
        question: "Where can I get help?",
        answer:
          "Primary Support:\n Open a ticket in our Discord server: https://discord.gg/2a8hz7yrKG\nSocial Media: Message us on X at @highasunicorn\n\nResponse Time: We aim to respond to all support tickets within 48 hours.\n\nWhen opening a ticket, please include:\na) Your wallet address\nb) Description of your issue\nc) Screenshots if applicable"
      }
    ]
  }
];