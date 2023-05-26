import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { useLocation } from "react-router-dom";
import "./page.css";

//categories。
// 这就是懒省事，直接在 navb里面 fetch 一下category，admin products会用到，但是如果user login了就会报错，因为没有权限
/* import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../redux/actions/categoryActions"; */

const Navb = () => {
  // DO NOT REMOVE OR COMMENT THE CATEGORIES PART, IT WILL USED IN OTHER FILES
  //categories
  /*   const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getCategories());
    }, [dispatch]); */

  /* ************** Brands ************* */
  var BRANDS = [
    {
      label: "Paramount Safety",
      type: 1,
      link: "/product-list?brandName=PARAMOUNT-SAFETY",
      Brand_Logo: "/images/Brands/PARAMOUNT.jpg",
    },
    {
      label: "IP-ENCLOSURES",
      type: 1,
      link: "/product-list?brandName=IP-ENCLOSURES",
      Brand_Logo: "/images/Brands/IP-ENCLOSURES.png",
    },
    {
      label: "SWARTS TOOLS",
      type: 1,
      link: "/product-list?brandName=SWARTS-TOOLS",
      Brand_Logo: "/images/Brands/SWARTS-logo.jpg",
    },
    {
      label: "HOBSON",
      type: 1,
      link: "/product-list?brandName=HOBSON",
      Brand_Logo: "/images/Brands/Hobson.png",
    },
    {
      label: "MASTER LOCK",
      type: 1,
      link: "/product-list?brandName=MASTER-LOCK",
      Brand_Logo: "/images/Brands/master-lock-vector.png",
    },
    {
      label: "MINETECH TOOLS",
      type: 1,
      link: "/product-list?brandName=MINETECH-TOOLS",
      Brand_Logo: "/images/Brands/MINTECH.jpg",
    },
    {
      label: "INTEGRATED POWER",
      type: 1,
      link: "/product-list?brandName=INTEGRATED-POWER",
      Brand_Logo: "/images/Brands/integrated-power.jpg",
    },
  ];

  /* ************** Categories ************* */
  var nav_color = {
    2: "subCat",
    3: "childCat",
    4: "fourCat",
  };

  /* PPE */
  var PPE = "/product-list?categoryName=PPE";
  // #region
  var PPE_HEADWEAR = PPE + "&subCategoryName=PROTECTIVE-HEADWEAR";
  var PPE_HEADWEAR3 = [
    { label: "PROTECTIVE HEADWEAR", type: 2, link: PPE_HEADWEAR },
    {
      label: "HARD HATS",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HATS",
    },
    {
      label: "HARD HAT ACCESSORIES",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HAT-ACCESSORIES",
    },
    {
      label: "HARD HATS WITH LAMP BRACKETS",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HAT-WITH-LAMP-BRACKETS",
    },
  ];

  var PPE_FACE = PPE + "&subCategoryName=FACE-PROTECTION";
  var PPE_FACE3 = [
    { label: "FACE PROTECTION", type: 2, link: PPE_FACE },
    {
      label: "BROWGUARD/ VISOR COMBO",
      type: 3,
      link: PPE_FACE + "&childCategoryName=BROWGUARD-VISOR-COMBO",
    },
    {
      label: "FACE ACCESSORIES",
      type: 3,
      link: PPE_FACE + "&childCategoryName=FACE-ACCESSORIES",
    },
  ];

  var PPE_HEARING = PPE + "&subCategoryName=HEARING-PROTECTION";
  var PPE_HEARING3 = [
    { label: "HEARING PROTECTION", type: 2, link: PPE_HEARING },
    {
      label: "DISPOSABLE EARPLUGS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=DISPOSABLE-EARPLUGS",
    },
    {
      label: "REUSABLE EARPLUGS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=REUSABLE-EARPLUGS",
    },
    {
      label: "EARMUFFS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=EARMUFFS",
    },
    {
      label: "HEARING ACCESSORIES",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=HEARING-ACCESSORIES",
    },
  ];

  var PPE_EYE = PPE + "&subCategoryName=EYE-PROTECTION";
  var PPE_EYE3 = [
    { label: "EYE PROTECTION", type: 2, link: PPE_EYE },
    {
      label: "SAFETY GLASSES",
      type: 3,
      link: PPE_EYE + "&childCategoryName=SAFETY-GLASSES",
    },
    {
      label: "EYE ACCESSORIES",
      type: 3,
      link: PPE_EYE + "&childCategoryName=EYE-ACCESSORIES",
    },
  ];

  var PPE_RESPIRATORY = PPE + "&subCategoryName=RESPIRATORY-GEAR";
  var PPE_RESPIRATORY3 = [
    { label: "RESPIRATORY GEAR", type: 2, link: PPE_RESPIRATORY },
    {
      label: "HALF MASKS & ACCESSORIES",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=HALF-MASKS-ACCESSORIES",
    },
    {
      label: "PROMESH",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=PROMESH",
    },
    {
      label: "DISPOSABLE RESPIRATORY",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=DISPOSABLE-RESPIRATORY",
    },
    {
      label: "REUSABLE RESPIRATORY",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=REUSABLE-RESPIRATORY",
    },
  ];

  var PPE_HAND = PPE + "&subCategoryName=HAND-PROTECTION";
  var PPE_HAND3 = [
    { label: "HAND PROTECTION", type: 2, link: PPE_HAND },
    {
      label: "CUT RESISTANT RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=CUT-RESISTANT-RANGE",
    },
    {
      label: "LEATHER RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=LEATHER-RANGE",
    },
    {
      label: "DISPOSABLE RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=DISPOSABLE-RANGE",
    },
    {
      label: "WELDING RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=WELDING-RANGE",
    },
    {
      label: "HAND ACCESSORIES",
      type: 3,
      link: PPE_HAND + "&childCategoryName=HAND-ACCESSORIES",
    },
    {
      label: "VEND READY GLOVE RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=VEND-READY-GLOVE-RANGE",
    },
    {
      label: "GENERAL PURPOSE GLOVES",
      type: 3,
      link: PPE_HAND + "&childCategoryName=GENERAL-PURPOSE",
    },
  ];

  var PPE_WORKWEAR = PPE + "&subCategoryName=PROTECTIVE-WORKWEAR";
  var PPE_WORKWEAR3 = [
    { label: "PROTECTIVE WORKWEAR", type: 2, link: PPE_WORKWEAR },
    {
      label: "WELDING PROTECTION",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=WELDING-PROTECTION",
    },
    {
      label: "KNEE PADS",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=KNEE-PADS",
    },
    {
      label: "APRONS",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=APRONS",
    },
    {
      label: "PROTECTIVE HEADWEAR",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=PROTECTIVE-HEADWEAR",
    },
    {
      label: "PROTECTIVE FOOTWEAR",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=PROTECTIVE-FOOTWEAR",
    },
  ];

  var PPE_DISPOSABLE = PPE + "&subCategoryName=DISPOSABLE-PROTECTION";
  var PPE_DISPOSABLE3 = [
    { label: "DISPOSABLE PROTECTION", type: 2, link: PPE_DISPOSABLE },
    {
      label: "BODY PROTECTION",
      type: 3,
      link: PPE_DISPOSABLE + "&childCategoryName=BODY-PROTECTION",
    },
  ];

  var PPE_SUN = PPE + "&subCategoryName=SUN-PROTECTION";
  var PPE_SUN3 = [
    { label: "SUN PROTECTION", type: 2, link: PPE_SUN },
    {
      label: "SUNSCREEN",
      type: 3,
      link: PPE_SUN + "&childCategoryName=SUNSCREEN",
    },
    {
      label: "LIP BALM",
      type: 3,
      link: PPE_SUN + "&childCategoryName=LIP-BALM",
    },
    {
      label: "SUN PROTECTION ACCESSORIES",
      type: 3,
      link: PPE_SUN + "&childCategoryName=SUN-PROTECTION-ACCESSORIES",
    },
  ];

  var PPE_HYDRATION = PPE + "&subCategoryName=HYDRATION";
  var PPE_HYDRATION3 = [
    { label: "HYDRATION", type: 2, link: PPE_HYDRATION },
    {
      label: "HYDRATION CONCENTRATES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=HYDRATION-CONCENTRATES",
    },
    {
      label: "COOLERS & DRINK BOTTLES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=COOLERS-DRINK-BOTTLES",
    },
    {
      label: "COOLING APPAREL",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=COOLING-APPAREL",
    },
    {
      label: "ICY POLES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=ICY-POLES",
    },
    {
      label: "HYDRATION BACKPACK",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=HYDRATION-BACKPACK",
    },
  ];
  // #endregion

  /* SITE_SAFETY */
  var SITE_SAFETY = "/product-list?categoryName=SITE-SAFETY";
  // #region
  var SS_DG_CABINETS = SITE_SAFETY + "&subCategoryName=DG-CABINETS";
  var SS_DG_CABINETS3 = [
    { label: "DANGEROUS GOODS CABINETS", type: 2, link: SS_DG_CABINETS },
  ];

  var SS_SHORES_EYEWASH =
    SITE_SAFETY + "&subCategoryName=EMERGENCY-SHOWERS-EYEWASH";
  var SS_SHORES_EYEWASH3 = [
    { label: "EMERGENCY SHOWERS & EYEWASH", type: 2, link: SS_SHORES_EYEWASH },
    {
      label: "COMBINATION UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=COMBINATION-UNITS",
    },
    {
      label: "FIXED WALL MOUNTED EYE WASH UNITS",
      type: 3,
      link:
        SS_SHORES_EYEWASH +
        "&childCategoryName=FIXED-WALL-MOUNTED-EYE-WASH-UNITS",
    },
    {
      label: "FIXED PEDESTAL MOUNTED EYE WASH UNITS",
      type: 3,
      link:
        SS_SHORES_EYEWASH +
        "&childCategoryName=FIXED-PEDESTAL-MOUNTED-EYE-WASH-UNITS",
    },
    {
      label: "LABORATORY UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=LABORATORY-UNITS",
    },
    {
      label: "PORTABLE EYE WASH UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=PORTABLE-EYE-WASH-UNITS",
    },
    {
      label: "SHOWER SPARE PARTS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SHOWER-SPARE-PARTS",
    },
    {
      label: "SHOWER ACCESSORIES",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SHOWER-ACCESSORIES",
    },
    {
      label: "SIGNS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SIGNS",
    },
  ];

  var SS_SPILL_KITS = SITE_SAFETY + "&subCategoryName=SPILL-KITS";
  var SS_SPILL_KITS_3 = [
    { label: "SPILL KITS", type: 2, link: SS_SPILL_KITS },
    {
      label: "GENERAL PURPOSE SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=GENERAL-PURPOSE-SPILL-KITS",
    },
    {
      label: "HAZCHEM SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=HAZCHEM-SPILL-KITS",
    },
    {
      label: "OIL & FUEL SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=OIL-FUEL-SPILL-KITS",
    },
    {
      label: "LIGHT VEHICLE SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=LIGHT-VEHICLE-SPILL-KITS",
    },
    {
      label: "REFILLS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=REFILLS",
    },
    {
      label: "ACCESSORIES",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=ACCESSORIES",
    },
  ];

  var SS_SPILL_CONTAINMENT = SITE_SAFETY + "&subCategoryName=SPILL-CONTAINMENT";
  var SS_SPILL_CONTAINMENT3 = [
    { label: "SPILL CONTAINMENT", type: 2, link: SS_SPILL_CONTAINMENT },
    {
      label: "SPILL PALLET",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=SPILL-PALLET",
    },
    {
      label: "LOW PROFILE SPILL DECKS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=LOW-PROFILE-SPILL-DECKS",
    },
    {
      label: "IBC SPILL PALLETS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=IBC-SPILL-PALLETS",
    },
    {
      label: "SPILL TRAYS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=SPILL-TRAYS",
    },
    {
      label: "OVERPACK DRUMS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=OVERPACK-DRUMS",
    },
    {
      label: "SMOKE STOP CIGARETTE BUTT CANS",
      type: 3,
      link:
        SS_SPILL_CONTAINMENT +
        "&childCategoryName=SMOKE-STOP-CIGARETTE-BUTT-CANS",
    },
  ];

  var SS_FIRST_AID = SITE_SAFETY + "&subCategoryName=FIRST-AID";
  var SS_FIRST_AID3 = [
    { label: "FIRST AID", type: 2, link: SS_FIRST_AID },
    {
      label: "RESPONSE KITS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=RESPONSE-KITS",
    },
    {
      label: "REFILLS & REPLACEMENTS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=REFILLS-REPLACEMENTS",
    },
    {
      label: "EYEWASH",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=EYEWASH",
    },
    {
      label: "HYGIENE",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=HYGIENE",
    },
    {
      label: "DEFIBRILLATORS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=DEFIBRILLATORS",
    },
    {
      label: "INCIDENT READY KIT",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=INCIDENT-READY-KIT",
    },
    {
      label: "MOTORIST",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=MOTORIST",
    },
  ];

  var SS_ACCESSORIES = SITE_SAFETY + "&subCategoryName=ACCESSORIES";
  var SS_ACCESSORIES3 = [
    { label: "ACCESSORIES", type: 2, link: SS_ACCESSORIES },
    {
      label: "BARRIERS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BARRIERS",
    },
    {
      label: "BUNTING",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BUNTING",
    },
    {
      label: "PLASTIC CHAIN",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=PLASTIC-CHAIN",
    },
    {
      label: "SAFETY TAGS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=SAFETY-TAGS",
    },
    {
      label: "BARRICADE/HAZARD TAPES",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BARRICADE-HAZARD-TAPES",
    },
    {
      label: "BOLLARDS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BOLLARDS",
    },
    {
      label: "TRAFFIC CONES",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=TRAFFIC-CONES",
    },
  ];
  //#endregion

  /* HAND TOOLS */
  var FASTENERS = "/product-list?categoryName=FASTENERS";
  // #region
  var FT_BOLTS = FASTENERS + "&subCategoryName=BOLTS";
  var FT_BOLTS_3 = [
    {
      label: "BOLTS",
      type: 2,
      link: FT_BOLTS,
    },
    {
      label: "PLAIN",
      type: 3,
      link: FT_BOLTS + "&childCategoryName=PLAIN",
    },
    {
      label: "ZINC PLATED",
      type: 3,
      link: FT_BOLTS + "&childCategoryName=ZINC-PLATED",
    },
    {
      label: "ZINC YELLOW PASSIVATE",
      type: 3,
      link: FT_BOLTS + "&childCategoryName=ZINC-YELLOW-PASSIVATE",
    },
    {
      label: "STAINLESS STEEL",
      type: 3,
      link: FT_BOLTS + "&childCategoryName=STAINLESS-STEEL",
    },
    {
      label: "HOT DIP GALVANISED",
      type: 3,
      link: FT_BOLTS + "&childCategoryName=HOT-DIP-GALVANISED",
    },
    {
      label: "MECHANICAL GALVANISED",
      type: 3,
      link: FT_BOLTS + "&childCategoryName=MECHANICAL-GALVANISED",
    },
  ];
  var FT_NUTS = FASTENERS + "&subCategoryName=NUTS";
  var FT_NUTS_3 = [
    {
      label: "NUTS",
      type: 2,
      link: FT_NUTS,
    },
    {
      label: "PLAIN",
      type: 3,
      link: FT_NUTS + "&childCategoryName=PLAIN",
    },
    {
      label: "ZINC PLATED",
      type: 3,
      link: FT_NUTS + "&childCategoryName=ZINC-PLATED",
    },
    {
      label: "STAINLESS STEEL",
      type: 3,
      link: FT_NUTS + "&childCategoryName=STAINLESS-STEEL",
    },
    {
      label: "MOLY(1PX1)",
      type: 3,
      link: FT_NUTS + "&childCategoryName=MOLY",
    },
  ];
  var FT_SCREWS = FASTENERS + "&subCategoryName=SCREWS";
  var FT_SCREWS_3 = [
    {
      label: "SCREWS",
      type: 2,
      link: FT_SCREWS,
    },
    {
      label: "PLAIN",
      type: 3,
      link: FT_SCREWS + "&childCategoryName=PLAIN",
    },
    {
      label: "ZINC PLATED",
      type: 3,
      link: FT_SCREWS + "&childCategoryName=ZINC-PLATED",
    },
    {
      label: "ZINC YELLOW PASSIVATE",
      type: 3,
      link: FT_SCREWS + "&childCategoryName=ZINC-YELLOW-PASSIVATE",
    },
    {
      label: "STAINLESS STEEL",
      type: 3,
      link: FT_SCREWS + "&childCategoryName=STAINLESS-STEEL",
    },
    {
      label: "BASALT CL4",
      type: 3,
      link: FT_SCREWS + "&childCategoryName=BASALT-CL4",
    },
  ];
  var FT_WASHER_FLAT = FASTENERS + "&subCategoryName=WASHER-FLAT";
  var FT_WASHER_FLAT_3 = [
    {
      label: "WASHER FLAT",
      type: 2,
      link: FT_WASHER_FLAT,
    },
    {
      label: "PLAIN",
      type: 3,
      link: FT_WASHER_FLAT + "&childCategoryName=PLAIN",
    },
    {
      label: "ZINC PLATED",
      type: 3,
      link: FT_WASHER_FLAT + "&childCategoryName=ZINC-PLATED",
    },
    {
      label: "STAINLESS STEEL",
      type: 3,
      link: FT_WASHER_FLAT + "&childCategoryName=STAINLESS-STEEL",
    },
    {
      label: "BASALT CL4",
      type: 3,
      link: FT_BOLTS + "&childCategoryName=BASALT-CL4",
    },
  ];
  var FT_WASHER_SPRING = FASTENERS + "&subCategoryName=WASHER-SPRING";
  var FT_WASHER_SPRING_3 = [
    {
      label: "WASHER SPRING",
      type: 2,
      link: FT_WASHER_SPRING,
    },
    {
      label: "ZINC PLATED",
      type: 3,
      link: FT_WASHER_SPRING + "&childCategoryName=ZINC-PLATED",
    },
    {
      label: "STAINLESS STEEL",
      type: 3,
      link: FT_WASHER_SPRING + "&childCategoryName=STAINLESS-STEEL",
    },
  ];
  var FT_ROD = FASTENERS + "&subCategoryName=ROD-THREADED";
  var FT_ROD_3 = [
    {
      label: "ROD",
      type: 2,
      link: FT_ROD,
    },
    {
      label: "PLAIN",
      type: 3,
      link: FT_ROD + "&childCategoryName=PLAIN",
    },
  ];
  var FT_STUD_CHEMSET = FASTENERS + "&subCategoryName=STUD-CHEMSET";
  var FT_STUD_CHEMSET_3 = [
    {
      label: "STUD CHEMSET",
      type: 2,
      link: FT_STUD_CHEMSET,
    },
    {
      label: "ZINC YELLOW PASSIVATE",
      type: 3,
      link: FT_STUD_CHEMSET + "&childCategoryName=ZINC-YELLOW-PASSIVATE",
    },
  ];
  var FT_HARDWARE = FASTENERS + "&subCategoryName=HARDWARE";
  var FT_HARDWARE_3 = [
    {
      label: "HARDWARE",
      type: 2,
      link: FT_HARDWARE,
    },
    {
      label: "ANCHORS",
      type: 3,
      link: FT_HARDWARE + "&childCategoryName=ANCHORS",
    },
    {
      label: "TURN BUCKLE",
      type: 3,
      link: FT_HARDWARE + "&childCategoryName=TURN-BUCKLE",
    },
  ];
  //#endregion

  /* HAND TOOLS */
  var HAND_TOOLS = "/product-list?categoryName=HAND-TOOLS";
  // #region
  var HAND_TOOLS_1 = [
    {
      label: "FASTENING KITS",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=FASTENING-KITS",
    },
    {
      label: "SOFT STORAGE",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=SOFT-STORAGE",
    },
    {
      label: "HARD STORAGE",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=HARD-STORAGE",
    },
    {
      label: "MEASURING",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=MEASURING",
    },
    {
      label: "LAYOUT",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=LAYOUT",
    },
    {
      label: "PIPE TOOLS WRENCHES",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=PIPE-TOOLS-WRENCHES",
    },
    {
      label: "CUTTING TOOLS",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=CUTTING-TOOLS",
    },
  ];

  var HAND_TOOLS_2 = [
    {
      label: "STRIKING DEMOLITION",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=STRIKING-DEMOLITION",
    },
    {
      label: "CABLE FEEDING",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=CABLE-FEEDING",
    },
    {
      label: "HAND TOOLS KIT",
      type: 3,
      link: HAND_TOOLS + "&subCategoryName=HAND-TOOLS-KIT",
    },
  ];
  var HAND_TOOLS_FASTENING = HAND_TOOLS + "&subCategoryName=FASTENING";
  var HAND_TOOLS_FASTENING_3 = [
    { label: "FASTENING", type: 2, link: HAND_TOOLS_FASTENING },
    {
      label: "SPANNERS",
      type: 3,
      link: HAND_TOOLS_FASTENING + "&childCategoryName=SPANNERS",
    },
    {
      label: "SCREW DRIVERS",
      type: 3,
      link: HAND_TOOLS_FASTENING + "&childCategoryName=SCREW-DRIVERS",
    },
  ];
  var HAND_TOOLS_PLIERS = HAND_TOOLS + "&subCategoryName=PLIERS";
  var HAND_TOOLS_PLIERS_3 = [
    { label: "PLIERS", type: 2, link: HAND_TOOLS_PLIERS },
    {
      label: "LONG NOSE PLIER",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=LONG-NOSE-PLIER",
    },
    {
      label: "PLIERS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=PLIERS",
    },
    {
      label: "SIDE CUTTERS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=SIDE-CUTTERS",
    },
    {
      label: "STRIPPING TOOLS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=STRIPPING-TOOLS",
    },
  ];

  var HAND_TOOLS_KNIVES = HAND_TOOLS + "&subCategoryName=KNIVES";
  var HAND_TOOLS_KNIVES_3 = [
    { label: "KNIVES", type: 2, link: HAND_TOOLS_KNIVES },
    {
      label: "SAFETY KNIVES",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=SAFETY-KNIVES",
    },
    {
      label: "UTILITY KNIVES",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=UTILITY-KNIVES",
    },
    {
      label: "BLADE REPLACEMENT",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=BLADE-REPLACEMENT",
    },
  ];
  // #endregion

  /* ELECTRICAL */
  var ELECTRICAL = "/product-list?categoryName=ELECTRICAL";
  // #region
  var ELECTRICAL_LIGHTING = {
    label: "LIGHTING",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=LIGHTING",
  };
  var ELECTRICAL_MOTORS = {
    label: "MOTORS",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=MOTORS",
  };
  var ELECTRICAL_WIRING_ACCESSORIES = {
    label: "WIRING ACCESSORIES",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=WIRING-ACCESSORIES",
  };
  var EC_PVC_CONDUIT = {
    label: "PVC CONDUIT FITTINGS",
    type: 3,
    link: ELECTRICAL_WIRING_ACCESSORIES.link + "&childCategoryName=PVC-CONDUIT-FITTINGS",
  };
  var EC_CORRUGATED_CONDUIT = {
    label: "CORRUGATED CONDUIT",
    type: 3,
    link: ELECTRICAL_WIRING_ACCESSORIES.link + "&childCategoryName=CORRUGATED-CONDUIT",
  };
  var ELECTRICAL_CHARGERS = {
    label: "CHARGERS",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=CHARGERS",
  };
  var ELECTRICAL_CABLES = {
    label: "CABLES",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=CABLES",
  };
  var EC_CONSTRUCTION_CABLES = {
    label: "CONSTRUCTION CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=CONSTRUCTION-CABLES",
  };
  var EC_CC_4 = [
    {
      label: "SINGLE CORE",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=SINGLE-CORE",
    },
    {
      label: "SDI 16MM",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=SDI-16MM",
    },
    {
      label: "FLAT",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=FLAT",
    },
    {
      label: "FLAT 3 CORES",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=FLAT-3-CORES",
    },
    {
      label: "ORANGE CIRCULAR POWER",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=ORANGE-CIRCULAR-POWER",
    },
    {
      label: "XLPE SINGLE CORE, COPPERCONDUCTOR(CU)",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link +
        "&fourCategoryName=XLPE-SINGLE-CORE-COPPERCONDUCTOR",
    },
    {
      label: "XLPE MULTI CORE COPPER",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link +
        "&fourCategoryName=XLPE-MULTI-CORE-COPPER",
    },
  ];

  var EC_INDUSTRIAL_CABLES = {
    label: "INDUSTRIAL CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=INDUSTRIAL-CABLES",
  };
  var EC_IC_4 = [
    {
      label: "FLEXIBLE CABLES",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=FLEXIBLE-CABLES",
    },
    {
      label: "WSD CABLES",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=WSD-CABLES",
    },
    {
      label: "STEEL WIRE AMOURED",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=STEEL-WIRE-AMOURED",
    },
  ];

  var EC_MINING_CABLES = {
    label: "MINING CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=MINING-CABLES",
  };
  var EC_MC_4 = [
    {
      label: "DETONATOR CABLES",
      type: 4,
      link: EC_MINING_CABLES.link + "&fourCategoryName=DETONATOR-CABLES",
    },
  ];

  var EC_SPECIALITY_CABLES = {
    label: "SPECIALITY CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=SPECIALITY-CABLES",
  };
  var EC_SC_4 = [
    {
      label: "SOLAR CABLE - SINGLE OR TWINCORES",
      type: 4,
      link:
        EC_SPECIALITY_CABLES.link +
        "&fourCategoryName=SOLAR-CABLE-SINGLE-OR-TWINCORES",
    },
  ];

  var ELECTRICAL_ENCLOSURES = {
    label: "ENCLOSURES",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=ENCLOSURES",
  };
  var EE_WALL_MOUNTED = {
    label: "WALL MOUNTED",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=WALL-MOUNTED",
  };
  var EE_WM_4 = [
    {
      label: "STEEL",
      type: 4,
      link: ELECTRICAL_ENCLOSURES.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: ELECTRICAL_ENCLOSURES.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "ALUMINIUM",
      type: 4,
      link: ELECTRICAL_ENCLOSURES.link + "&fourCategoryName=ALUMINIUM",
    },
    {
      label: "GRP",
      type: 4,
      link: ELECTRICAL_ENCLOSURES.link + "&fourCategoryName=GRP",
    },
    {
      label: "ACCESSORIES",
      type: 4,
      link: ELECTRICAL_ENCLOSURES.link + "&fourCategoryName=ACCESSORIES",
    },
  ];

  var EE_SLOPING_ROOF = {
    label: "SLOPING ROOF",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=SLOPING-ROOF",
  };
  var EE_SR_4 = [
    {
      label: "STEEL",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "STEELHD",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEELHD",
    },
    {
      label: "STAINLESS STEELHD",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STAINLESS-STEELHD",
    },
    {
      label: "STEEL WITH SUN SHIELDS",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEEL-WITH-SUN-SHIELDS",
    },
  ];

  var EE_FLOOR_STANDING = {
    label: "FLOOR STANDING",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=FLOOR-STANDING",
  };
  var EE_FS_4 = [
    {
      label: "STEEL",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "ACCESSORIES",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=ACCESSORIES",
    },
  ];

  var EE_PVC_ADAPTABLE_BOXES = {
    label: "PVC ADAPTABLE BOXES",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=PVC-ADAPTABLE-BOXES",
  };

  // var EE_BATTERY_CABINET = {
  //   label: "BATTERY CABINET",
  //   type: 3,
  //   link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=BATTERY-CABINET",
  // };
  //#endregion

  /* REAGENTS */
  var REAGENTS = "/product-list?categoryName=REAGENTS";
  // #region
  var REAGENTS_1 = [
    {
      label: "LIME",
      type: 3,
      link: REAGENTS + "&subCategoryName=LIME",
    },
    {
      label: "HYDROCHLORIC ACID",
      type: 3,
      link: REAGENTS + "&subCategoryName=HYDROCHLORIC-ACID",
    },
    {
      label: "GOLD STANDARDS",
      type: 3,
      link: REAGENTS + "&subCategoryName=GOLD-STANDARDS",
    },
    {
      label: "SILVER NITRATE",
      type: 3,
      link: REAGENTS + "&subCategoryName=SILVER-NITRATE",
    },
  ];
  var REAGENTS_2 = [
    {
      label: "CAUSTIC",
      type: 3,
      link: REAGENTS + "&subCategoryName=CAUSTIC",
    },
    {
      label: "DIBK",
      type: 3,
      link: REAGENTS + "&subCategoryName=DIBK",
    },
    {
      label: "SODA",
      type: 3,
      link: REAGENTS + "&subCategoryName=SODA",
    },
    {
      label: "ANTISCALANT",
      type: 3,
      link: REAGENTS + "&subCategoryName=ANTISCALANT",
    },
  ];
  var REAGENTS_3 = [
    {
      label: "BORAX",
      type: 3,
      link: REAGENTS + "&subCategoryName=BORAX",
    },
    {
      label: "SILICA",
      type: 3,
      link: REAGENTS + "&subCategoryName=SILICA",
    },
    {
      label: "CARBON",
      type: 3,
      link: REAGENTS + "&subCategoryName=CARBON",
    },
    {
      label: "LEACH AID",
      type: 3,
      link: REAGENTS + "&subCategoryName=LEACH-AID",
    },
  ];
  // var REAGENTS_3 = [
  //   {
  //     label: "REAGENTS ONE",
  //     type: 3,
  //     link: REAGENTS + "&subCategoryName=REAGENTS ONE",
  //   },
  //   {
  //     label: "REAGENTS TWO",
  //     type: 3,
  //     link: REAGENTS + "&subCategoryName=REAGENTS TWO",
  //   },
  // ];
  //#endregion

  /* LABORATORY */
  var LABORATORY = "/product-list?categoryName=LABORATORY";
  // #region
  var LABORATORY_1 = [
    {
      label: "LAB EQUIPMENT",
      type: 2,
      link: REAGENTS + "&subCategoryName=LAB-EQUIPMENT",
    },
  ];
  var LABORATORY_2 = [
    {
      label: "LAB CHEMICALS",
      type: 2,
      link: REAGENTS + "&subCategoryName=LAB-CHEMICALS",
    },
  ];

  //#endregion

  /* INDUSTRIAL */
  var INDUSTRIAL = "/product-list?categoryName=INDUSTRIAL";
  // #region
  var INDUSTRIAL_ABRASIVES_CUTTING =
    INDUSTRIAL + "&subCategoryName=ABRASIVES-CUTTING";
  var INDUSTRIAL_1 = [
    {
      label: "ABRASIVES & CUTTING",
      type: 2,
      link: INDUSTRIAL_ABRASIVES_CUTTING,
    },
    {
      label: "BELTS",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BELTS",
    },
    {
      label: "DISCS",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=DISCS",
    },
    {
      label: "BONDED",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BONDED",
    },
    {
      label: "BRUSHES",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BRUSHES",
    },
    {
      label: "POLISHING & FINISHING",
      type: 3,
      link:
        INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=POLISHING-FINISHING",
    },
    {
      label: "SANDING",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=SANDING",
    },
    {
      label: "SURFACE CONDITIONING",
      type: 3,
      link:
        INDUSTRIAL_ABRASIVES_CUTTING +
        "&childCategoryName=SURFACE-CONDITIONING",
    },
  ];
  var INDUSTRIAL_DRILLING = INDUSTRIAL + "&subCategoryName=DRILLING";
  var INDUSTRIAL_2 = [
    { label: "DRILLING", type: 2, link: INDUSTRIAL_DRILLING },
    {
      label: "DRILL BITS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=DRILL-BITS",
    },
    {
      label: "DRILL SETS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=DRILL-SETS",
    },
    {
      label: "TCT HOLESAWS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=TCT-HOLESAWS",
    },
    {
      label: "TCT HOLE CUTTER",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=TCT-HOLE-CUTTER",
    },
    {
      label: "ARBORS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=ARBORS",
    },
    {
      label: "HSS HOLESAWS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=HSS-HOLESAWS",
    },
    {
      label: "HSS BROACH CUTTERS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=HSS-BROACH-CUTTERS",
    },
  ];
  var INDUSTRIAL_LUBRICATION_EQUIPMENT =
    INDUSTRIAL + "&subCategoryName=LUBRICATION-EQUIPMENT";
  var INDUSTRIAL_3 = [
    {
      label: "LUBRICATION & EQUIPMENT",
      type: 2,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT,
    },
    {
      label: "GENERAL",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=GENERAL",
    },
    {
      label: "ANTI-SIEZE",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=ANTI-SIEZE",
    },
    {
      label: "CLEANERS & DISPERSANTS",
      type: 3,
      link:
        INDUSTRIAL_LUBRICATION_EQUIPMENT +
        "&childCategoryName=CLEANERS-DISPERSANTS",
    },
    {
      label: "CUTTING FLUIDS",
      type: 3,
      link:
        INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=CUTTING-FLUIDS",
    },
    {
      label: "GREASES",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=GREASES",
    },
  ];
  var INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES =
    INDUSTRIAL + "&subCategoryName=PAINT-EQUIPMENT-SUPPLIES";
  var INDUSTRIAL_4 = [
    {
      label: "PAINT,EQUIPMENT & SUPPLIES",
      type: 2,
      link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES,
    },
    {
      label: "MARKING PAINT",
      type: 3,
      link:
        INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES +
        "&childCategoryName=MARKING-PAINT",
    },
    {
      label: "PAINT",
      type: 3,
      link:
        INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES + "&childCategoryName=PAINT",
    },
    {
      label: "AEROSOLS",
      type: 3,
      link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES + "&childCategoryName=AEROSOLS",
    },
  ];
  var INDUSTRIAL_PUMPS_VALVES_PARTS =
    INDUSTRIAL + "&subCategoryName=PUMPS-VALVES-PARTS";
  var INDUSTRIAL_5 = [
    {
      label: "PUMPS,VALVES & PARTS",
      type: 2,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS,
    },
    {
      label: "FITTINGS & PARTS",
      type: 3,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS + "&childCategoryName=FITTINGS-PARTS",
    },
    {
      label: "VALVES",
      type: 3,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS + "&childCategoryName=VALVES",
    },
  ];
  var INDUSTRIAL_HOSES_FITTINGS =
    INDUSTRIAL + "&subCategoryName=HOSES-FITTINGS";
  var INDUSTRIAL_6 = [
    { label: "HOSES & FITTINGS", type: 2, link: INDUSTRIAL_HOSES_FITTINGS },
    {
      label: "AIR & WATER HOSE",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=AIR-WATER-HOSE",
    },
    {
      label: "AIR LINE FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=AIR-LINE-FITTINGS",
    },
    {
      label: "HOSE CLAMPS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-CLAMPS",
    },
    {
      label: "HOSE FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-FITTINGS",
    },
    {
      label: "HOSE REELS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-REELS",
    },
    {
      label: "VALVES",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=VALVES",
    },
    {
      label: "THREADED FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=THREADED-FITTINGS",
    },
  ];
  var INDUSTRIAL_PIPE_REPAIR =
    INDUSTRIAL + "&subCategoryName=PIPE-REPAIR";
  var INDUSTRIAL_7 = [
    { label: "PIPE REPAIR", type: 2, link: INDUSTRIAL_PIPE_REPAIR },

  ];
  //#endregion

  // console.log(EC_CONSTRUCTION_CABLES);

  return (
    <Navbar collapseOnSelect className="nav_bgc w-100" expand="lg">
      <Container className="w-100 navb" fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          {/* ************   Mega Menu  ***************  */}
          <Nav className="w3c_nav">
            {/* home icon              
            <Nav.Link className="nav_c home_ic" href="/">
              <i className="bi bi-house-fill"></i>
            </Nav.Link> */}

            {/* BRANDS */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href="/product-list">BRANDS</a>
              </div>
              <div className="dropdown-content-brand">
                {BRANDS.map((item) => {
                  return (
                    <div className="img_hvf">
                      <a key={item.link} href={item.link}>
                        <img
                          className="brand_img"
                          src={item.Brand_Logo}
                          alt=""
                        />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PPE */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={PPE}>PPE</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {PPE_HEADWEAR3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {PPE_HEARING3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_HYDRATION3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {PPE_EYE3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_RESPIRATORY3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_HAND3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {PPE_WORKWEAR3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_SUN3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_FACE3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_DISPOSABLE3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* SITE SAFETY */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={SITE_SAFETY}>SITE SAFETY</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {SS_SPILL_KITS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {SS_FIRST_AID3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {SS_SPILL_CONTAINMENT3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {SS_ACCESSORIES3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {SS_SHORES_EYEWASH3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {SS_DG_CABINETS3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>



            {/* FASTENERS */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={FASTENERS}>FASTENERS</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {FT_BOLTS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {FT_NUTS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {FT_SCREWS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {FT_WASHER_FLAT_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {FT_WASHER_SPRING_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {FT_ROD_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {FT_STUD_CHEMSET_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {FT_HARDWARE_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* HAND TOOLS */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={HAND_TOOLS}>HAND TOOLS</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {HAND_TOOLS_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {HAND_TOOLS_2.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {HAND_TOOLS_FASTENING_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {HAND_TOOLS_PLIERS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {HAND_TOOLS_KNIVES_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={INDUSTRIAL}>INDUSTRIAL</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {INDUSTRIAL_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {INDUSTRIAL_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {INDUSTRIAL_2.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {INDUSTRIAL_4.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {INDUSTRIAL_5.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {INDUSTRIAL_6.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {INDUSTRIAL_7.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* ELECTRICAL */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={ELECTRICAL}>ELECTRICAL</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {/* CABLES */}
                    <li className="subCat">
                      <a href={ELECTRICAL_CABLES.link}>
                        {ELECTRICAL_CABLES.label}
                      </a>
                    </li>
                    <li className="parent childCat">
                      <a className="parentA" href={EC_CONSTRUCTION_CABLES.link}>
                        {EC_CONSTRUCTION_CABLES.label}
                        <span className="expand ms-1"> »</span>
                      </a>
                      <ul className="child">
                        {EC_CC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EC_INDUSTRIAL_CABLES.link}>
                        {EC_INDUSTRIAL_CABLES.label}
                        <span className="expand ms-1">»</span>
                      </a>
                      <ul className="child">
                        {EC_IC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EC_MINING_CABLES.link}>
                        {EC_MINING_CABLES.label}
                        <span className="expand ms-1">»</span>
                      </a>
                      <ul className="child">
                        {EC_MC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EC_SPECIALITY_CABLES.link}>
                        {EC_SPECIALITY_CABLES.label}
                        <span className="expand ms-1">»</span>
                      </a>
                      <ul className="child">
                        {EC_SC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>

                  <ul className="column">
                    {/* ENCLOSURES */}
                    <li className="subCat">
                      <a href={ELECTRICAL_ENCLOSURES.link}>
                        {ELECTRICAL_ENCLOSURES.label}
                      </a>
                    </li>
                    <li>
                      <a className="parentA" href={EE_PVC_ADAPTABLE_BOXES.link}>
                        {EE_PVC_ADAPTABLE_BOXES.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EE_WALL_MOUNTED.link}>
                        {EE_WALL_MOUNTED.label}
                        <span className="expand ms-1"> »</span>
                      </a>
                      <ul className="child">
                        {EE_WM_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EE_SLOPING_ROOF.link}>
                        {EE_SLOPING_ROOF.label}
                        <span className="expand ms-1">»</span>
                      </a>
                      <ul className="child">
                        {EE_SR_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EE_FLOOR_STANDING.link}>
                        {EE_FLOOR_STANDING.label}
                        <span className="expand ms-1">»</span>
                      </a>
                      <ul className="child">
                        {EE_FS_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>

                  <ul className="column">
                    <li className="subCat">
                      <a className="parentA" href={ELECTRICAL_LIGHTING.link}>
                        {ELECTRICAL_LIGHTING.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>
                    <li className="subCat">
                      <a className="parentA" href={ELECTRICAL_MOTORS.link}>
                        {ELECTRICAL_MOTORS.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>
                    <li className="subCat">
                      <a className="parentA" href={ELECTRICAL_WIRING_ACCESSORIES.link}>
                        {ELECTRICAL_WIRING_ACCESSORIES.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>
                    <li>
                      <a className="parentA" href={EC_PVC_CONDUIT.link}>
                        {EC_PVC_CONDUIT.label}
                      </a>
                    </li>
                    <li>
                      <a className="parentA" href={EC_CORRUGATED_CONDUIT.link}>
                        {EC_CORRUGATED_CONDUIT.label}
                      </a>
                    </li>

                    <li className="subCat">
                      <a
                        className="parentA"
                        href={ELECTRICAL_CHARGERS.link}
                      >
                        {ELECTRICAL_CHARGERS.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* REAGENTS */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={REAGENTS}>REAGENTS</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {REAGENTS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {REAGENTS_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {REAGENTS_2.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* LABORATORY */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={LABORATORY}>LABORATORY</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {LABORATORY_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {LABORATORY_2.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {/* {LABORATORY_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })} */}
                  </ul>
                </div>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navb;
