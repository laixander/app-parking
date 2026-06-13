import { eventHandler } from 'h3'

export const parkingSessions = [
  {
    "id": "e26e26af-eabf-463e-84cb-2349d9c7155f",
    "type": "Resident",
    "plateNumber": "QYU-3673",
    "referenceId": null,
    "slotId": null,
    "entryTime": "2026-06-11T19:42:16.495Z",
    "exitTime": "2026-06-12T15:22:40.654Z",
    "status": "Completed",
    "validatedBy": "b99254fd-319a-4f46-a254-a390121bd001",
    "createdAt": "2026-05-28T20:42:57.845Z",
    "updatedAt": "2026-06-13T08:49:41.329Z"
  },
  {
    "id": "c9a70e37-29ec-4cbc-a688-d9eee467526a",
    "type": "Resident",
    "plateNumber": "DPR-3494",
    "referenceId": "7e4f53e4-df9c-4132-9872-dee33c3813b0",
    "slotId": "b9d3dbfc-d661-4ca8-b067-f369189312d2",
    "entryTime": "2026-06-13T11:40:41.896Z",
    "exitTime": "2026-06-12T17:32:16.013Z",
    "status": "Completed",
    "validatedBy": "f5a0c9a3-1283-4113-bb37-0d2a7e00dd14",
    "createdAt": "2025-09-13T05:13:32.327Z",
    "updatedAt": "2026-06-13T00:13:14.142Z"
  },
  {
    "id": "e9d8eda1-b5c7-4e92-b5d6-7eb578441c8f",
    "type": "Visitor",
    "plateNumber": "GEU-0432",
    "referenceId": null,
    "slotId": "50ed186f-0638-4d0d-b052-58b4dd36a179",
    "entryTime": "2026-06-12T12:44:48.412Z",
    "exitTime": null,
    "status": "Active",
    "validatedBy": "d11edfb6-ea40-4842-a572-b4a330cf0c93",
    "createdAt": "2025-12-20T06:45:21.479Z",
    "updatedAt": "2026-06-13T08:28:46.608Z"
  },
  {
    "id": "a2c0c340-200c-4867-8fea-69aefc05da2f",
    "type": "Visitor",
    "plateNumber": "GRB-9267",
    "referenceId": null,
    "slotId": "0f6f256a-be55-4f7e-9294-5ef43c6fc3d1",
    "entryTime": "2026-06-13T05:43:57.819Z",
    "exitTime": null,
    "status": "Active",
    "validatedBy": "d1a8754c-2600-48c1-88da-6be760128191",
    "createdAt": "2026-05-07T14:17:30.303Z",
    "updatedAt": "2026-06-12T15:45:32.594Z"
  },
  {
    "id": "9bed0384-7724-4bb8-a57b-be15782a4fc1",
    "type": "Visitor",
    "plateNumber": "IRN-4526",
    "referenceId": "311fe641-bc6d-4f2f-b667-24aebea1eda6",
    "slotId": null,
    "entryTime": "2026-06-11T14:21:44.900Z",
    "exitTime": "2026-06-13T11:30:15.009Z",
    "status": "Completed",
    "validatedBy": "1103b8ff-6f82-432d-b656-0e3efb05ee22",
    "createdAt": "2026-01-18T16:20:01.058Z",
    "updatedAt": "2026-06-12T21:55:24.798Z"
  },
  {
    "id": "a02aa1c5-224c-43cd-b830-92e68a350135",
    "type": "Resident",
    "plateNumber": "OGN-5068",
    "referenceId": "404643db-15a2-4889-8136-6d3853067abd",
    "slotId": "fd8d3b0d-41dc-4f35-9b8d-bb324c9ace4e",
    "entryTime": "2026-06-11T20:51:13.284Z",
    "exitTime": "2026-06-13T01:38:24.614Z",
    "status": "Completed",
    "validatedBy": "cc67c8cc-c94d-4f9d-a119-08f45050d481",
    "createdAt": "2026-06-01T17:54:10.905Z",
    "updatedAt": "2026-06-12T18:10:14.742Z"
  },
  {
    "id": "a6a65cad-f3bf-4858-b7ef-5f6d867eadf9",
    "type": "Walk-in",
    "plateNumber": "QPU-6133",
    "referenceId": "38971e51-dff0-4fd3-9257-95ac76865f30",
    "slotId": "fb3a2528-b8f5-4f3d-a218-117b6dcbb7ba",
    "entryTime": "2026-06-13T06:01:52.000Z",
    "exitTime": "2026-06-13T04:38:54.181Z",
    "status": "Completed",
    "validatedBy": "f16cbed6-66a3-4f01-b47b-a1ed11e214be",
    "createdAt": "2026-02-19T04:33:05.157Z",
    "updatedAt": "2026-06-13T09:21:23.960Z"
  },
  {
    "id": "ffc30cc4-54d0-4176-80a7-f8cb94bc20e2",
    "type": "Visitor",
    "plateNumber": "NGQ-7649",
    "referenceId": null,
    "slotId": null,
    "entryTime": "2026-06-13T09:57:38.016Z",
    "exitTime": null,
    "status": "Active",
    "validatedBy": "a163b6c2-51f4-44f6-99b7-f795a99b3ae8",
    "createdAt": "2026-05-14T10:29:32.828Z",
    "updatedAt": "2026-06-13T03:29:24.725Z"
  }
]

export default eventHandler(() => parkingSessions)
