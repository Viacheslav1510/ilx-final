const myListings = [
  {
    id: 1,
    title: "Nice tree",
    listing_type: "Apartment",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Inner London",
    borough: "Camden",
    property_status: "Rent",
    price: 410000,
    rental_frequency: "Day",
    rooms: 4,
    furnished: false,
    pool: false,
    elevator: true,
    cctv: true,
    parking: true,
    location: {
      type: "Point",
      coordinates: [51.541078280085614, -0.15871891189601836],
    },
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
  },
  {
    id: 2,
    title: "Moto",
    listing_type: "House",
    description:
      "Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    division: "Inner London",
    borough: "Islington",
    property_status: "Sale",
    price: 35000,
    rental_frequency: null,
    rooms: 4,
    furnished: true,
    pool: true,
    elevator: false,
    cctv: true,
    parking: true,
    location: {
      type: "Point",
      coordinates: [51.53796304347224, -0.10189113898462315],
    },
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75",
  },
];

export default myListings;
