import type { CoupleMedia } from "@/components/site/CouplePhotoGrid";

// Helper to create media object
const createMedia = (
  src: string,
  orientation: "portrait" | "landscape" | "square" = "portrait",
): CoupleMedia => ({
  id: src,
  src,
  type: "image",
  orientation,
});

export const varshaShivamImages = [
  createMedia("/Varsha & Shivam/01/DSCF2797 copy.jpg", "landscape"),
  createMedia("/Varsha & Shivam/01/DSCF2824 copy.jpg", "portrait"),
  createMedia("/Varsha & Shivam/01/DSCF3369 copy.jpg", "portrait"),
  createMedia("/Varsha & Shivam/01/DSCF3412 copy.jpg", "landscape"),
  createMedia("/Varsha & Shivam/02/DSCF4446 copy.jpg", "portrait"),
  createMedia("/Varsha & Shivam/02/DSCF4523 copy.jpg", "portrait"),
  createMedia("/Varsha & Shivam/02/DSCF4961 copy.jpg", "landscape"),
  createMedia("/Varsha & Shivam/02/DSCF4990 copy.jpg", "portrait"),
  createMedia("/Varsha & Shivam/02/DSCF5020 copy.jpg", "landscape"),
  createMedia("/Varsha & Shivam/01/DSCF2876 copy.jpg", "portrait"),
];

export const poojaSuryaprakashImages = [
  createMedia("/Pooja & Suryaprakash/01/DSC09134 copy.jpg", "landscape"),
  createMedia("/Pooja & Suryaprakash/01/DSC09174 copy.jpg", "portrait"),
  createMedia("/Pooja & Suryaprakash/01/DSC09200 copy.jpg", "portrait"),
  createMedia("/Pooja & Suryaprakash/01/DSC09372 copy.jpg", "landscape"),
  createMedia("/Pooja & Suryaprakash/02/DSC00001 copy.jpg", "portrait"),
  createMedia("/Pooja & Suryaprakash/02/DSC00048 copy.jpg", "portrait"),
  createMedia("/Pooja & Suryaprakash/02/DSC00075.jpg", "landscape"),
  createMedia("/Pooja & Suryaprakash/02/DSC00104 copy.jpg", "portrait"),
  createMedia("/Pooja & Suryaprakash/02/DSC09890 copy.jpg", "landscape"),
  createMedia("/Pooja & Suryaprakash/02/DSC09937 copy.jpg", "portrait"),
  createMedia("/Pooja & Suryaprakash/02/DSC09965 copy.jpg", "portrait"),
];

export const khushbooJayImages = [
  createMedia("/Khushboo & Jay/01/SK_02119 copy.jpg", "landscape"),
  createMedia("/Khushboo & Jay/01/SK_02124 copy.jpg", "portrait"),
  createMedia("/Khushboo & Jay/01/SK_02142 copy.jpg", "portrait"),
  createMedia("/Khushboo & Jay/01/SK_02264 copy.jpg", "landscape"),
  createMedia("/Khushboo & Jay/01/SK_02656 copy.jpg", "portrait"),
  createMedia("/Khushboo & Jay/02/SK_02971 copy.jpg", "portrait"),
  createMedia("/Khushboo & Jay/02/SK_03787 copy.jpg", "landscape"),
  createMedia("/Khushboo & Jay/02/SK_04812 copy.jpg", "portrait"),
  createMedia("/Khushboo & Jay/03/SK_04031 copy.jpg", "landscape"),
  createMedia("/Khushboo & Jay/03/SK_04051 copy.jpg", "portrait"),
  createMedia("/Khushboo & Jay/03/SK_04669.jpg", "portrait"),
  createMedia("/Khushboo & Jay/03/SK_04812 copy.jpg", "landscape"),
];

export const bhawnaAbhishekImages = [
  createMedia("/Bhawna & Abhishek/01/AK205960 copy.jpg", "landscape"),
  createMedia("/Bhawna & Abhishek/01/AK206169 copy.jpg", "portrait"),
  createMedia("/Bhawna & Abhishek/01/AK206443 copy.jpg", "portrait"),
  createMedia("/Bhawna & Abhishek/02/AK206738 - Copy copy.jpg", "landscape"),
  createMedia("/Bhawna & Abhishek/02/AK206809 copy.jpg", "portrait"),
  createMedia("/Bhawna & Abhishek/02/AK207897 copy.jpg", "portrait"),
  createMedia("/Bhawna & Abhishek/02/AK208157 copy.jpg", "landscape"),
  createMedia("/Bhawna & Abhishek/03/AK208403 copy.jpg", "portrait"),
  createMedia("/Bhawna & Abhishek/03/AK208467 copy.jpg", "landscape"),
  createMedia("/Bhawna & Abhishek/03/AK208582 copy.jpg", "portrait"),
  createMedia("/Bhawna & Abhishek/04/AK209315 copy.jpg", "portrait"),
  createMedia("/Bhawna & Abhishek/04/AK209402 copy.jpg", "landscape"),
];

export const heroImages = [
  // Varsha & Shivam
  "/Varsha & Shivam/01/DSCF2800 copy.jpg",
  "/Varsha & Shivam/02/DSCF4424 copy.jpg",
  "/Varsha & Shivam/01/DSCF3478 copy.jpg",

  // Pooja & Suryaprakash
  "/Pooja & Suryaprakash/01/DSC09187 copy.jpg",
  "/Pooja & Suryaprakash/02/DSC00161 copy.jpg",

  // Khushboo & Jay
  "/Khushboo & Jay/01/SK_02693 copy.jpg",
  "/Khushboo & Jay/03/SK_04096 copy.jpg",

  // Bhawna & Abhishek
  "/Bhawna & Abhishek/02/AK207280.jpg",
  "/Bhawna & Abhishek/04/AK208386 copy.jpg",
  "/Bhawna & Abhishek/04/DSCF1388 copy.jpg",
];
