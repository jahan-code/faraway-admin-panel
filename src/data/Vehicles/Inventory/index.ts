import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { IconType } from "react-icons";

export interface DetailItem {
  id: number;
  image: string[];
  feature?: string;
  arrayft: {
    id?: number;
    img?: string;
    icon?: IconType;
    label?: string;
  }[];
  label: string;
  arrays: {
    id?: number;
    imgstar: string;
  }[];
  per: string;
  review: string;
  arraysk: {
    id?: number;
    img?: string;
    label?: string;
  }[];
  arrayv: {
    id?: number;
    img?: string;
  }[];
  icon: IconType;
  location: string;
  luxury: string;
  from: string;
  price: string;
  day: string;
  btn: string;
}

export const DetailData: DetailItem[] = [
  {
    id: 1,
    image: [
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
    ],
    feature: "Featured",
    arrayft: [
      {
        id: 1,
        img: "/images/Home/featured-ft.svg",
        label: "75 ft.",
      },
      {
        id: 2,
        img: "/images/Home/featured-guest.svg",
        label: "10 guests",
      },
      {
        id: 3,
        icon: CiCalendar,
        label: "2016",
      },
    ],
    label: "Ocean Serenity 75",
    arrays: [
      { id: 1, imgstar: "/images/Explore/star-four.svg" },
      { id: 2, imgstar: "/images/Explore/star-four.svg" },
      { id: 3, imgstar: "/images/Explore/star-four.svg" },
      { id: 4, imgstar: "/images/Explore/star-four.svg" },
      { id: 5, imgstar: "/images/Explore/star-four.svg" },
    ],
    per: "(4.9)",
    review: "50 reviews",
    arraysk: [
      {
        id: 1,
        img: "/images/Home/featured-cap.svg",
        label: "With skipper",
      },
      {
        id: 2,
        img: "/images/Home/featured-cabin.svg",
        label: "2 Cabins",
      },
      {
        id: 3,
        img: "/images/Home/featured-berth.svg",
        label: "2 Berths",
      },
      {
        id: 4,
        img: "/images/Explore/wifi.svg",
        label: "Wi-Fi",
      },
      {
        id: 5,
        label: "+5",
      },
    ],
    icon: CiLocationOn,
    location: "Monaco, French Riviera",
    luxury: "Luxury on the Waves!",
    from: "Starting from",
    price: "$2,500",
    day: "Per day",
    btn: "Detail",
    arrayv: [
      { id: 1, img: "/images/Explore/img-one.svg" },
      { id: 2, img: "/images/Explore/img-two.svg" },
      { id: 3, img: "/images/Explore/img-three.svg" },
      { id: 4, img: "/images/Explore/img-four.svg" },
      { id: 5, img: "/images/Explore/img-five.svg" },
      { id: 6, img: "/images/Explore/img-six.svg" },
      { id: 7, img: "/images/Explore/img-seven.svg" },
    ],
  },
  {
    id: 2,
    image: [
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
    ],
    arrayft: [
      {
        id: 1,
        img: "/images/Home/featured-ft.svg",
        label: "75 ft.",
      },
      {
        id: 2,
        img: "/images/Home/featured-guest.svg",
        label: "10 guests",
      },
      {
        id: 3,
        icon: CiCalendar,
        label: "2016",
      },
    ],
    label: "Ocean Serenity 75",
    arrays: [
      { id: 1, imgstar: "/images/Explore/star-four.svg" },
      { id: 2, imgstar: "/images/Explore/star-four.svg" },
      { id: 3, imgstar: "/images/Explore/star-four.svg" },
      { id: 4, imgstar: "/images/Explore/star-four.svg" },
      { id: 5, imgstar: "/images/Explore/star-four.svg" },
    ],
    per: "(4.9)",
    review: "50 reviews",
    arraysk: [
      {
        id: 1,
        img: "/images/Home/featured-cap.svg",
        label: "With skipper",
      },
      {
        id: 2,
        img: "/images/Home/featured-cabin.svg",
        label: "2 Cabins",
      },
      {
        id: 3,
        img: "/images/Home/featured-berth.svg",
        label: "2 Berths",
      },
      {
        id: 4,
        img: "/images/Explore/wifi.svg",
        label: "Wi-Fi",
      },
      {
        id: 5,
        label: "+5",
      },
    ],
    icon: CiLocationOn,
    location: "Monaco, French Riviera",
    luxury: "Luxury on the Waves!",
    from: "Starting from",
    price: "$2,500",
    day: "Per day",
    btn: "Detail",
    arrayv: [
      { id: 1, img: "/images/Explore/img-one.svg" },
      { id: 2, img: "/images/Explore/img-two.svg" },
      { id: 3, img: "/images/Explore/img-three.svg" },
      { id: 4, img: "/images/Explore/img-four.svg" },
      { id: 5, img: "/images/Explore/img-five.svg" },
      { id: 6, img: "/images/Explore/img-six.svg" },
      { id: 7, img: "/images/Explore/img-seven.svg" },
    ],
  },
  {
    id: 3,
    image: [
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
    ],
    arrayft: [
      {
        id: 1,
        img: "/images/Home/featured-ft.svg",
        label: "75 ft.",
      },
      {
        id: 2,
        img: "/images/Home/featured-guest.svg",
        label: "10 guests",
      },
      {
        id: 3,
        icon: CiCalendar,
        label: "2016",
      },
    ],
    label: "Ocean Serenity 75",
    arrays: [
      { id: 1, imgstar: "/images/Explore/star-four.svg" },
      { id: 2, imgstar: "/images/Explore/star-four.svg" },
      { id: 3, imgstar: "/images/Explore/star-four.svg" },
      { id: 4, imgstar: "/images/Explore/star-four.svg" },
      { id: 5, imgstar: "/images/Explore/star-four.svg" },
    ],
    per: "(4.9)",
    review: "50 reviews",
    arraysk: [
      {
        id: 1,
        img: "/images/Home/featured-cap.svg",
        label: "With skipper",
      },
      {
        id: 2,
        img: "/images/Home/featured-cabin.svg",
        label: "2 Cabins",
      },
      {
        id: 3,
        img: "/images/Home/featured-berth.svg",
        label: "2 Berths",
      },
      {
        id: 4,
        img: "/images/Explore/wifi.svg",
        label: "Wi-Fi",
      },
      {
        id: 5,
        label: "+5",
      },
    ],
    icon: CiLocationOn,
    location: "Monaco, French Riviera",
    luxury: "Luxury on the Waves!",
    from: "Starting from",
    price: "$2,500",
    day: "Per day",
    btn: "Detail",
    arrayv: [
      { id: 1, img: "/images/Explore/img-one.svg" },
      { id: 2, img: "/images/Explore/img-two.svg" },
      { id: 3, img: "/images/Explore/img-three.svg" },
      { id: 4, img: "/images/Explore/img-four.svg" },
      { id: 5, img: "/images/Explore/img-five.svg" },
      { id: 6, img: "/images/Explore/img-six.svg" },
      { id: 7, img: "/images/Explore/img-seven.svg" },
    ],
  },
  {
    id: 4,
    image: [
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
    ],
    arrayft: [
      {
        id: 1,
        img: "/images/Home/featured-ft.svg",
        label: "75 ft.",
      },
      {
        id: 2,
        img: "/images/Home/featured-guest.svg",
        label: "10 guests",
      },
      {
        id: 3,
        icon: CiCalendar,
        label: "2016",
      },
    ],
    label: "Ocean Serenity 75",
    arrays: [
      { id: 1, imgstar: "/images/Explore/star-four.svg" },
      { id: 2, imgstar: "/images/Explore/star-four.svg" },
      { id: 3, imgstar: "/images/Explore/star-four.svg" },
      { id: 4, imgstar: "/images/Explore/star-four.svg" },
      { id: 5, imgstar: "/images/Explore/star-four.svg" },
    ],
    per: "(4.9)",
    review: "50 reviews",
    arraysk: [
      {
        id: 1,
        img: "/images/Home/featured-cap.svg",
        label: "With skipper",
      },
      {
        id: 2,
        img: "/images/Home/featured-cabin.svg",
        label: "2 Cabins",
      },
      {
        id: 3,
        img: "/images/Home/featured-berth.svg",
        label: "2 Berths",
      },
      {
        id: 4,
        img: "/images/Explore/wifi.svg",
        label: "Wi-Fi",
      },
      {
        id: 5,
        label: "+5",
      },
    ],
    icon: CiLocationOn,
    location: "Monaco, French Riviera",
    luxury: "Luxury on the Waves!",
    from: "Starting from",
    price: "$2,500",
    day: "Per day",
    btn: "Detail",
    arrayv: [
      { id: 1, img: "/images/Explore/img-one.svg" },
      { id: 2, img: "/images/Explore/img-two.svg" },
      { id: 3, img: "/images/Explore/img-three.svg" },
      { id: 4, img: "/images/Explore/img-four.svg" },
      { id: 5, img: "/images/Explore/img-five.svg" },
      { id: 6, img: "/images/Explore/img-six.svg" },
      { id: 7, img: "/images/Explore/img-seven.svg" },
    ],
  },
  {
    id: 5,
    image: [
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
    ],
    arrayft: [
      {
        id: 1,
        img: "/images/Home/featured-ft.svg",
        label: "75 ft.",
      },
      {
        id: 2,
        img: "/images/Home/featured-guest.svg",
        label: "10 guests",
      },
      {
        id: 3,
        icon: CiCalendar,
        label: "2016",
      },
    ],
    label: "Ocean Serenity 75",
    arrays: [
      { id: 1, imgstar: "/images/Explore/star-four.svg" },
      { id: 2, imgstar: "/images/Explore/star-four.svg" },
      { id: 3, imgstar: "/images/Explore/star-four.svg" },
      { id: 4, imgstar: "/images/Explore/star-four.svg" },
      { id: 5, imgstar: "/images/Explore/star-four.svg" },
    ],
    per: "(4.9)",
    review: "50 reviews",
    arraysk: [
      {
        id: 1,
        img: "/images/Home/featured-cap.svg",
        label: "With skipper",
      },
      {
        id: 2,
        img: "/images/Home/featured-cabin.svg",
        label: "2 Cabins",
      },
      {
        id: 3,
        img: "/images/Home/featured-berth.svg",
        label: "2 Berths",
      },
      {
        id: 4,
        img: "/images/Explore/wifi.svg",
        label: "Wi-Fi",
      },
      {
        id: 5,
        label: "+5",
      },
    ],
    icon: CiLocationOn,
    location: "Monaco, French Riviera",
    luxury: "Luxury on the Waves!",
    from: "Starting from",
    price: "$2,500",
    day: "Per day",
    btn: "Detail",
    arrayv: [
      { id: 1, img: "/images/Explore/img-one.svg" },
      { id: 2, img: "/images/Explore/img-two.svg" },
      { id: 3, img: "/images/Explore/img-three.svg" },
      { id: 4, img: "/images/Explore/img-four.svg" },
      { id: 5, img: "/images/Explore/img-five.svg" },
      { id: 6, img: "/images/Explore/img-six.svg" },
      { id: 7, img: "/images/Explore/img-seven.svg" },
    ],
  },
  {
    id: 6,
    image: [
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
      "/images/Explore/list.svg",
    ],
    arrayft: [
      {
        id: 1,
        img: "/images/Home/featured-ft.svg",
        label: "75 ft.",
      },
      {
        id: 2,
        img: "/images/Home/featured-guest.svg",
        label: "10 guests",
      },
      {
        id: 3,
        icon: CiCalendar,
        label: "2016",
      },
    ],
    label: "Ocean Serenity 75",
    arrays: [
      { id: 1, imgstar: "/images/Explore/star-four.svg" },
      { id: 2, imgstar: "/images/Explore/star-four.svg" },
      { id: 3, imgstar: "/images/Explore/star-four.svg" },
      { id: 4, imgstar: "/images/Explore/star-four.svg" },
      { id: 5, imgstar: "/images/Explore/star-four.svg" },
    ],
    per: "(4.9)",
    review: "50 reviews",
    arraysk: [
      {
        id: 1,
        img: "/images/Home/featured-cap.svg",
        label: "With skipper",
      },
      {
        id: 2,
        img: "/images/Home/featured-cabin.svg",
        label: "2 Cabins",
      },
      {
        id: 3,
        img: "/images/Home/featured-berth.svg",
        label: "2 Berths",
      },
      {
        id: 4,
        img: "/images/Explore/wifi.svg",
        label: "Wi-Fi",
      },
      {
        id: 5,
        label: "+5",
      },
    ],
    icon: CiLocationOn,
    location: "Monaco, French Riviera",
    luxury: "Luxury on the Waves!",
    from: "Starting from",
    price: "$2,500",
    day: "Per day",
    btn: "Detail",
    arrayv: [
      { id: 1, img: "/images/Explore/img-one.svg" },
      { id: 2, img: "/images/Explore/img-two.svg" },
      { id: 3, img: "/images/Explore/img-three.svg" },
      { id: 4, img: "/images/Explore/img-four.svg" },
      { id: 5, img: "/images/Explore/img-five.svg" },
      { id: 6, img: "/images/Explore/img-six.svg" },
      { id: 7, img: "/images/Explore/img-seven.svg" },
    ],
  },

];

interface NewYachtsFormField {
  label: string;
  required?: string;
  placeholder?: string;
  type?: "dropdown" | "number" | "text" | "checkbox";
  options?: string[];
  icon?: IconType;
  iconone?: IconType;
}

interface NewYachtsFormSection {
  section: string;
  fields: NewYachtsFormField[];
  btn?: string;
  btnone?: string;
}

export const NewYachtsData: NewYachtsFormSection[] = [
  {
    section: "General",
    fields: [
      {
        label: "Boat Type",
        placeholder: "e.g,. Power",
        type: "dropdown",
        options: [
          "Power",
          "Sailing",
        ],
      },
      {
        label: "Price",
        placeholder: "e.g,. Budget",
        type: "dropdown",
        options: [
          "Budget",
          "Midrange",
          "Luxury",
        ],
      },
      {
        label: "Capacity",
        placeholder: "e.g,. Day Charter",
        type: "dropdown",
        options: [
          "Day Charter",
          "Overnight Charter",
          "Day & Overnight Charter",
        ],
      },
      { label: "Length", placeholder: "e.g,. 35sq" },
    ],
  },
  {
    section: "Length Range",
    fields: [
      { label: "< 40 ft", type: "checkbox" },
      { label: "40 To 60 ft", type: "checkbox" },
      { label: "60 To 80 ft", type: "checkbox" },
      { label: "> 80 ft", type: "checkbox" },
      { label: "Cabins", placeholder: "e.g,. 1" },
      { label: "Bathrooms", placeholder: "e.g,. 2" },
      { label: "Passenger Day Trip", placeholder: "e.g,. 1" },
      { label: "Passenger Overnight", placeholder: "e.g,. 1" },
      { label: "Guests", placeholder: "e.g,. 1" },
      {
        label: "Guests Range",
        required: "*",
        placeholder: "e.g,. ≤6",
        type: "dropdown",
        options: [
          "≤6",
          ">6",
          ">12",
          ">20",
          ">40"
        ],
      },
      { label: "Day Trip Price", placeholder: "e.g,. 30,000 DTP" },
      { label: "Overnight Price", placeholder: "e.g,. 30,000 OP" },
      { label: "Daytrip Price (Euro)", placeholder: "e.g,. 800 EUR" },
      { label: "Daytrip Price (THB)", placeholder: "e.g,. 800 THB" },
      { label: "Daytrip Price (USD)", placeholder: "e.g,. 800 USD" },
      { label: "Primary Image", placeholder: "" },
    ],
  },
];

export const RichTextEditorSections = [
  {
    id: "price",
    label: "Price",
    content: "",
  },
  {
    id: "tripDetails",
    label: "Trip Details",
    content: "",
  },
  {
    id: "dayCharter",
    label: "Day Charter",
    content: "",
  },
  {
    id: "overnightCharter",
    label: "Overnight Charter",
    content: "",
  },
  {
    id: "aboutthisBoat",
    label: "About this Boat",
    content: "",
  },
  {
    id: "specifications",
    label: "Specifications",
    content: "",
  },
  {
    id: "boatLayout",
    label: "Boat Layout",
    content: "",
  },
];

export const YachtsData: NewYachtsFormSection[] = [
  {
    section: "",
    fields: [
      {
        label: "Video Link",
        placeholder: "e.g,. http://www.youtube.com",
      },
      {
        label: "Video Link 2",
        placeholder: "e.g,. http://www.youtube.com",
      },
      {
        label: "Video Link 3",
        placeholder: "e.g,. http://www.youtube.com",
      },
      { label: "Badge", placeholder: "" },
    ],
  },
  {
    section: "Yacht Specifications",
    fields: [
      { label: "Design", placeholder: "" },
      { label: "Built", placeholder: "" },
      { label: "Cruising Speed", placeholder: "" },
      { label: "Length Overall", placeholder: "" },
      { label: "Fuel Capacity", placeholder: "" },
      { label: "Water Capacity", placeholder: "" },
      { label: "Code", placeholder: "" },
    ],
  },
];