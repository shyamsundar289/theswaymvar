import { assets } from "../assets/asset-manifest";
export type WeddingStory = {
  id: string;
  couple: string;
  location: string;
  type: string;
  image: string;
  video?: string;
  poster?: string;
};

export type YearArchive = {
  year: string;
  weddings: WeddingStory[];
};

export const weddingArchiveData: YearArchive[] = [
  {
    year: "2020",
    weddings: [
      {
        id: "2020-01",
        couple: "Priya & Arjun",
        location: "Udaipur, Rajasthan",
        type: "Heritage Wedding",
        image:
          "https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=2070&auto=format&fit=crop",
        video: assets.videos.background.wedding,
        poster:
          "https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "2020-02",
        couple: "Nisha & Rohan",
        location: "Goa, India",
        type: "Beachfront Wedding",
        image:
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
        video: assets.videos.background.celebration,
        poster:
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "2020-03",
        couple: "Simran & Kabir",
        location: "Jaipur, Rajasthan",
        type: "Palace Wedding",
        image:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
        video: assets.videos.background.rituals,
        poster:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
      },
    ],
  },
  {
    year: "2021",
    weddings: [
      {
        id: "2021-01",
        couple: "Meera & Kunal",
        location: "Kerala, India",
        type: "Backwater Wedding",
        image:
          "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070&auto=format&fit=crop",
        video: assets.videos.background.portraits,
        poster:
          "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "2021-02",
        couple: "Ananya & Rahul",
        location: "Jodhpur, Rajasthan",
        type: "Desert Heritage",
        image:
          "https://images.unsplash.com/photo-1532712938736-98c541101569?q=80&w=2070&auto=format&fit=crop",
        video: assets.videos.background.prewedding,
        poster:
          "https://images.unsplash.com/photo-1532712938736-98c541101569?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
  {
    year: "2022",
    weddings: [
      {
        id: "2022-01",
        couple: "Ishita & Vikram",
        location: "Lake Como, Italy",
        type: "Destination Wedding",
        image:
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
        video: assets.videos.background.videoseen,
        poster:
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "2022-02",
        couple: "Riya & Dev",
        location: "Mussoorie, India",
        type: "Hill Station Wedding",
        image:
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
        video: assets.videos.background.wedding,
        poster:
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
];
