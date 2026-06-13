import { eventHandler } from 'h3'

export const users = [
  {
    "id": "61f1cefb-12c1-4032-a07d-d241519246bf",
    "name": "Mireille Murazik",
    "email": "Reanna_Thiel@gmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Kameron%20Buckridge%20Jr.",
    "role": "Admin",
    "status": "Inactive"
  },
  {
    "id": "f521b3a9-3f7e-4f76-9587-ff3a0e0ac9e9",
    "name": "Jessyca Harvey Jr.",
    "email": "Isaias_Roberts@yahoo.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Garrett%20Hamill",
    "role": "Staff",
    "status": "Active"
  },
  {
    "id": "e96c9b60-2a0d-44ec-8a12-5301c9ab6798",
    "name": "Lamont Koss",
    "email": "Shelia.Ortiz67@hotmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Dale%20Raynor",
    "role": "Staff",
    "status": "Inactive"
  },
  {
    "id": "a3536469-777c-4d90-b723-09bd7a06d68e",
    "name": "Dr. Delilah Leffler",
    "email": "Carli_Gottlieb16@yahoo.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Ms.%20Hank%20Koepp",
    "role": "Staff",
    "status": "Active"
  },
  {
    "id": "7db23c31-80df-41eb-8af9-37a0f16457d2",
    "name": "Franklin Schumm",
    "email": "Theresa_Schroeder21@hotmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Jerome%20Dicki%20V",
    "role": "Staff",
    "status": "Active"
  }
]

export default eventHandler(() => users)
