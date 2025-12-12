import { Prize } from "@/types";

export type StepId = "basic" | "shipping" | "prizeSelection" | "prize" | "confirm";

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "select"
  | "checkbox"
  | "country"
  | "city";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  show?: (prize: any) => boolean;
  rowGroup?: string; // Group fields to display in same row
}

export interface StepConfig {
  id: StepId;
  title: string;
  subtitle?: string;
  fields: FieldConfig[];
}

export const steps: StepConfig[] = [
  {
    id: "basic",
    title: "Basic Info",
    subtitle:
      "Fill in your details so we can deliver your goodies — make sure everything's accurate, this is the address your loot will ship to!",
    fields: [
      { name: "firstName", label: "First Name", type: "text", required: true, placeholder: "Enter name here" },
      { name: "lastName", label: "Last Name", type: "text", required: true, placeholder: "Enter name here" },
      { name: "email", label: "Email Address", type: "email", required: true, placeholder: "Enter email address here" },
      { name: "phoneCountry", label: "", type: "select", required: true, rowGroup: "phone", placeholder: "+91" },
      { name: "phone", label: "Phone", type: "tel", required: true, rowGroup: "phone", placeholder: "Enter phone number here" },
    ],
  },
  {
    id: "shipping",
    title: "Shipping Address",
    subtitle:
      "Fill in your details so we can deliver your goodies — make sure everything's accurate, this is the address your loot will ship to!",
    fields: [
      { name: "address1", label: "Address Line 1", type: "text", required: true },
      { name: "address2", label: "Address Line 2", type: "text", required: false },
      { name: "country", label: "Country", type: "country", required: true },
      { name: "city", label: "City", type: "city", required: true },
      { name: "postalCode", label: "Postal Code", type: "text", required: true },
    ],
  },
  {
    id: "prizeSelection",
    title: "Select Your Prizes",
    subtitle:
      "Choose which prizes you're claiming. You can select multiple prizes.",
    fields: [],
  },
  {
    id: "prize",
    title: "Prize Claim Details",
    subtitle:
      "Fill in your details so we can deliver your goodies — make sure everything's accurate, this is the address your loot will ship to!",
    fields: [
      {
        name: "size",
        label: "What's your T-shirt size?",
        type: "select",
        options: ["XS", "S", "M", "L", "XL", "XXL"],
        required: true,
        show: (prize) => prize.hasAnyPrizeType(["shirt", "cap", "visor"]),
      },
      {
        name: "age",
        label: "Age",
        type: "select",
        options: Array.from({ length: 63 }, (_, i) => String(i + 18)),
        required: true,
        show: (prize) => prize.hasAnyPrizeType(["wine"]),
      },
      {
        name: "btcTaproot",
        label: "BTC Taproot Address",
        type: "text",
        required: true,
        placeholder: "Enter BTC taproot address here",
        show: (prize) => prize.hasPrizeType("rune"),
      },
      {
        name: "xHandle",
        label: "X Handle Link",
        type: "text",
        required: true,
        placeholder: "Enter X handle link here",
      },
    ],
  },
  {
    id: "confirm",
    title: "Final Confirmation",
    subtitle:
      "Fill in your details so we can deliver your goodies — make sure everything's accurate, this is the address your loot will ship to!",
    fields: [
      {
        name: "confirmAccurate",
        label:
          "I confirm that all the details I've entered are accurate and final, and I understand that these will be used for shipping and verification.",
        type: "checkbox",
        required: true,
      },
      {
        name: "confirmDelivery",
        label:
          "I understand incorrect information may result in delayed or undeliverable prizes.",
        type: "checkbox",
        required: true,
      },
    ],
  },
];
