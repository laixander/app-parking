import { eventHandler } from 'h3'

export const rfidCredentials = [
  {
    "id": "7d25625b-96cf-460c-b473-cb729310dd17",
    "tagNumber": "RFID-GL4TZVHB",
    "vehicleId": "de8e43a5-6e40-49ed-a456-84a7720e9525",
    "status": "Active",
    "assignedDate": "2026-01-06T08:08:07.216Z",
    "lastUsedAt": "2026-06-12T21:02:38.492Z",
    "createdAt": "2026-03-10T18:21:24.834Z",
    "updatedAt": "2026-06-13T09:06:06.393Z"
  },
  {
    "id": "0d04c90f-afa2-4545-b85f-250b2b2e42ee",
    "tagNumber": "RFID-U956NHSC",
    "vehicleId": "82ba63d0-874d-4f2d-b9e0-723ba8f87b9f",
    "status": "Active",
    "assignedDate": "2025-06-18T01:34:43.425Z",
    "lastUsedAt": "2026-06-13T08:31:01.503Z",
    "createdAt": "2025-06-14T12:55:11.378Z",
    "updatedAt": "2026-06-13T03:11:28.698Z"
  },
  {
    "id": "fff6cfc7-e8af-4677-afa2-ad93b87341f9",
    "tagNumber": "RFID-SK6IBSKF",
    "vehicleId": "8efa6637-7dd6-45d8-a809-c02b5bcf60ac",
    "status": "Active",
    "assignedDate": "2025-07-10T16:52:23.951Z",
    "lastUsedAt": "2026-06-13T07:24:03.250Z",
    "createdAt": "2026-01-16T06:27:34.976Z",
    "updatedAt": "2026-06-13T12:29:02.808Z"
  },
  {
    "id": "e4f765a0-4db0-4708-9aac-de3ac317f7c0",
    "tagNumber": "RFID-51H0NHIC",
    "vehicleId": "fbe16f1a-213e-4a3a-bd75-8ad3e8a5be9c",
    "status": "Inactive",
    "assignedDate": "2026-02-20T21:22:15.726Z",
    "lastUsedAt": "2026-06-12T16:55:03.719Z",
    "createdAt": "2025-10-30T18:04:16.667Z",
    "updatedAt": "2026-06-13T00:15:41.205Z"
  },
  {
    "id": "9fa1de45-0987-40e6-aa69-c61714e98722",
    "tagNumber": "RFID-5BABHGMT",
    "vehicleId": "d7148a8d-7399-4c20-af17-0666da956dd7",
    "status": "Active",
    "assignedDate": "2026-02-12T11:45:10.797Z",
    "lastUsedAt": "2026-06-13T02:38:49.890Z",
    "createdAt": "2026-02-05T11:57:01.112Z",
    "updatedAt": "2026-06-13T10:39:09.652Z"
  }
]

export default eventHandler(() => rfidCredentials)
