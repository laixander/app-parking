import { eventHandler } from 'h3'

export const parkingSlots = [
  {
    "id": "4ea23cb7-4599-40c9-b280-a008ced60adc",
    "code": "A-4-29",
    "classification": "Resident",
    "tower": "Tower 3",
    "floor": "Level 2",
    "zone": "South",
    "status": "Occupied",
    "createdAt": "2025-11-11T09:53:20.924Z",
    "updatedAt": "2026-06-12T12:41:50.361Z"
  },
  {
    "id": "ff64fa44-e332-4c3a-9011-d9b543262009",
    "code": "D-4-39",
    "classification": "Resident",
    "tower": "Tower 1",
    "floor": "Level 4",
    "zone": "West",
    "status": "Available",
    "createdAt": "2026-01-03T21:24:24.802Z",
    "updatedAt": "2026-06-12T15:16:51.025Z"
  },
  {
    "id": "fd4e8081-c8fa-4d02-ac7d-ff0aa93541d9",
    "code": "A-5-40",
    "classification": "Resident",
    "tower": "Tower 3",
    "floor": "Level 2",
    "zone": "East",
    "status": "Available",
    "createdAt": "2025-09-02T08:56:56.481Z",
    "updatedAt": "2026-06-12T18:48:30.841Z"
  },
  {
    "id": "8fc8a7cc-5eda-4d5b-a33c-963c05f45f74",
    "code": "A-5-75",
    "classification": "Visitor",
    "tower": "Tower 3",
    "floor": "Level 5",
    "zone": "North",
    "status": "Available",
    "createdAt": "2026-03-04T07:01:44.389Z",
    "updatedAt": "2026-06-12T17:22:53.363Z"
  },
  {
    "id": "f48367c8-d63d-4735-acfd-d8e32f9b930e",
    "code": "A-3-73",
    "classification": "Reserved",
    "tower": "Tower 1",
    "floor": "Level 3",
    "zone": "North",
    "status": "Occupied",
    "createdAt": "2025-08-29T15:21:10.710Z",
    "updatedAt": "2026-06-13T03:14:42.227Z"
  }
]

export default eventHandler(() => parkingSlots)
