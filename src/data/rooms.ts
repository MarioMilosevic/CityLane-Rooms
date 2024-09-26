export const rooms = [
  {
    capacity: 1,
    description:
      "A cozy single room, perfect for solo travelers. Features a comfortable bed, a work desk, and all the essentials for a pleasant stay.",
    discount: 10,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Standard Single Room",
    regularPrice: 75,
  },

  {
    capacity: 2,

    description:
      "A comfortable double room with a queen-size bed, ideal for couples or friends. Enjoy a relaxing atmosphere with modern amenities.",
    discount: 5,

    image:
      "https://images.unsplash.com/photo-1576354302919-96748cb8299e?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Standard Double Room",
    regularPrice: 95,
  },
  {
    capacity: 2,
    description:
      "A spacious double room with elegant decor and upgraded amenities. Perfect for those seeking a little extra comfort during their stay.",
    discount: 0,
    image:
      "https://plus.unsplash.com/premium_photo-1676823553593-ac587b35a018?q=80&w=2747&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Deluxe Double Room",
    regularPrice: 125,
  },
  {
    capacity: 4,

    description:
      "Designed for families, this room includes a queen bed and a bunk bed. Plenty of space and a kid-friendly environment.",
    discount: 15,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Family Room",
    regularPrice: 150,
  },

  {
    capacity: 4,

    description:
      "A luxurious suite with a separate living area, offering ample space and premium furnishings. Ideal for guests who want a more indulgent experience.",
    discount: 0,

    image:
      "https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Suite",
    regularPrice: 200,
  },
  {
    capacity: 6,

    description:
      "A budget-friendly dormitory room with multiple bunk beds, ideal for backpackers and group travelers looking for a social environment.",
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1549856625-824ce09aefc8?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dormitory Room",
    regularPrice: 35,
  },
  {
    capacity: 2,
    description:
      "A room designed with accessibility in mind, featuring a spacious layout, easy-to-use amenities, and a roll-in shower.",
    discount: 10,

    image:
      "https://images.unsplash.com/photo-1656646523588-e5e2575e2ec3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Accessible Room",
    regularPrice: 110,
  },
  {
    capacity: 6,
    description:
      "The ultimate in luxury, this penthouse suite offers stunning views, top-of-the-line amenities, and a private terrace for an unforgettable stay.",
    discount: 10,
    image:
      "https://images.unsplash.com/photo-1565623833408-d77e39b88af6?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Penthouse Suite",
    regularPrice: 350,
  },
];

export type RoomsDataType = typeof rooms;
