import { eventHandler } from 'h3'

export const parkingAllocations = [
  {
    "id": "fbe8f98e-df80-419a-9057-33e2529e2696",
    "vehicleId": "c29c596d-92bd-4832-be6b-f2f7001b56a9",
    "slotId": "a047df8c-4a19-4d59-85c4-d2cd9428acb3",
    "allocationType": "Shared",
    "startDate": "2025-08-20T04:53:22.882Z",
    "endDate": null,
    "status": "Active",
    "createdAt": "2025-09-13T07:09:43.070Z",
    "updatedAt": "2026-06-12T19:45:41.347Z"
  },
  {
    "id": "c292d069-4f7c-4461-a15c-683d2fe90003",
    "vehicleId": "5cfc21c4-9979-4364-888f-141dc5e2d972",
    "slotId": "c50d69e1-0b4d-442d-87c3-114fcb64ceb4",
    "allocationType": "Dedicated",
    "startDate": "2025-08-08T17:59:59.636Z",
    "endDate": null,
    "status": "Transferred",
    "createdAt": "2026-01-21T18:24:51.426Z",
    "updatedAt": "2026-06-12T21:22:20.088Z"
  },
  {
    "id": "836c9dbf-f90d-4021-8e80-01f3bb9b074d",
    "vehicleId": "12916523-1844-46a0-8a6c-1353258bcea5",
    "slotId": "61ef15dc-7136-44b8-9057-c3ecc4dbc452",
    "allocationType": "Shared",
    "startDate": "2026-06-07T10:45:55.559Z",
    "endDate": null,
    "status": "Active",
    "createdAt": "2025-12-21T13:45:59.100Z",
    "updatedAt": "2026-06-13T06:42:30.019Z"
  },
  {
    "id": "52a6ac4b-6a7f-46bc-aa39-d0925fbef2c2",
    "vehicleId": "32a629fb-d4cc-488c-b9eb-40e988333538",
    "slotId": "84975a8d-7180-4ad9-b8f8-f24092d19f30",
    "allocationType": "Shared",
    "startDate": "2025-10-03T06:17:15.323Z",
    "endDate": "2026-06-13T08:25:14.909Z",
    "status": "Expired",
    "createdAt": "2025-11-26T12:02:44.678Z",
    "updatedAt": "2026-06-13T00:52:04.877Z"
  },
  {
    "id": "ed7a6a1a-8503-4e10-aa6b-b46c609657d8",
    "vehicleId": "151b25a8-b421-49eb-87c0-450aec220cd0",
    "slotId": "bb151a9f-0245-47bb-92c7-3a3528efdc20",
    "allocationType": "Temporary",
    "startDate": "2026-04-18T03:21:42.049Z",
    "endDate": null,
    "status": "Transferred",
    "createdAt": "2026-06-03T13:03:01.400Z",
    "updatedAt": "2026-06-12T16:21:45.139Z"
  }
]

export default eventHandler(() => parkingAllocations)
