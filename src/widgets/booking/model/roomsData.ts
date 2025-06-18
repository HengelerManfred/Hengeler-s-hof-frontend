export const roomsData = new Map<string, Room>([
  [
    "room1",
    {
      id: "room1",
      name: "room1_name",
      description: "room1_description",
      price: 45,
      additionalPrice: 10,
      checkIn: "15:00",
      checkOut: "12:00",
      maxGuests: "room1_max_guests",
      size: 18,
      images: [
        { src: "/images/room1/big_room1.jpg" },
        { src: "/images/room1/big_room2.jpg" },
        { src: "/images/room1/big_room3.jpg" },
        { src: "/images/room1/big_room4.jpg" },
        { src: "/images/kitchen/kitchen1.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen2.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen3.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen4.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen5.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen6.jpg", title: "kitchen" },
        { src: "/images/bathroom/bathroom1.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom2.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom3.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom4.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom5.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom6.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom7.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom8.jpg", title: "bathroom" },
      ],
    },
  ],
  [
    "room2",
    {
      id: "room2",
      name: "room2_name",
      description: "room2_description",
      price: 35,
      additionalPrice: 10,
      checkIn: "15:00",
      checkOut: "12:00",
      maxGuests: "room2_max_guests",
      size: 13,
      images: [
        { src: "/images/room2/small_room1.jpg" },
        { src: "/images/room2/small_room2.jpg" },
        { src: "/images/room2/small_room3.jpg" },
        { src: "/images/kitchen/kitchen1.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen2.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen3.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen4.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen5.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen6.jpg", title: "kitchen" },
        { src: "/images/bathroom/bathroom1.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom2.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom3.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom4.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom5.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom6.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom7.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom8.jpg", title: "bathroom" },
      ],
    },
  ],
  [
    "room3",
    {
      id: "room3",
      name: "room3_name",
      description: "room3_description",
      price: 60,
      additionalPrice: 10,
      checkIn: "15:00",
      checkOut: "12:00",
      maxGuests: "room3_max_guests",
      size: 25,
      images: [
        { src: "/images/room3/room1.jpg" },
        { src: "/images/room3/room2.png" },
        { src: "/images/room3/room3.jpg" },
        { src: "/images/room3/room4.jpg" },
        { src: "/images/kitchen/kitchen1.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen2.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen3.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen4.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen5.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen6.jpg", title: "kitchen" },
        { src: "/images/bathroom/bathroom1.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom2.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom3.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom4.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom5.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom6.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom7.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom8.jpg", title: "bathroom" },
      ],
    },
  ],
  [
    "house",
    {
      id: "house",
      name: "house_name",
      description: "house_description",
      price: 150,
      additionalPrice: 50,
      checkIn: "15:00",
      checkOut: "12:00",
      maxGuests: "house_max_guests",
      size: 200,
      images: [
        { src: "/images/house/house1.jpg" },
        { src: "/images/house/house2.jpg" },
        { src: "/images/house/house3.jpg" },
        { src: "/images/house/house4.jpg" },
        { src: "/images/house/house5.jpg" },
        { src: "/images/kitchen/kitchen1.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen2.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen3.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen4.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen5.jpg", title: "kitchen" },
        { src: "/images/kitchen/kitchen6.jpg", title: "kitchen" },
        { src: "/images/bathroom/bathroom1.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom2.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom3.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom4.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom5.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom6.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom7.jpg", title: "bathroom" },
        { src: "/images/bathroom/bathroom8.jpg", title: "bathroom" },
      ],
    },
  ],
]);

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  additionalPrice: number;
  checkIn: string;
  checkOut: string;
  maxGuests: string;
  size: number;
  images: RoomImage[];
}

export interface RoomImage {
  src: string;
  title?: string;
}

export const getRoomData = (roomId: string): Room | undefined => {
  return roomsData.get(roomId);
};
