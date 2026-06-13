import { eventHandler } from 'h3'

export const visitorReservations = [
  {
    "id": "12b63ba6-82fb-4d55-ae97-a4fe6b10bf12",
    "residentId": "40ee0add-ec54-4a09-8588-0b39612d90fb",
    "visitorName": "Mr. Steve Sporer",
    "plateNumber": "XZK-8187",
    "expectedArrival": "2026-06-14T11:39:52.354Z",
    "expectedDeparture": "2026-06-14T07:10:03.896Z",
    "qrCodeRef": "QR-FGUEVP2BRT",
    "status": "Expired",
    "createdAt": "2025-06-18T11:14:57.666Z",
    "updatedAt": "2026-06-13T11:53:26.327Z"
  },
  {
    "id": "1a59eea3-9842-40a5-b2f7-fb0d7375542a",
    "residentId": "f4e6281f-db6b-4873-a81d-045c43515738",
    "visitorName": "Arjun Sporer",
    "plateNumber": "MJJ-9317",
    "expectedArrival": "2026-06-13T17:59:04.154Z",
    "expectedDeparture": "2026-06-13T21:30:58.597Z",
    "qrCodeRef": "QR-YMDFCP5Y5H",
    "status": "Expired",
    "createdAt": "2025-07-09T19:41:55.140Z",
    "updatedAt": "2026-06-13T08:49:20.531Z"
  },
  {
    "id": "94abad3d-023a-439e-b7c2-e1a3728b00a7",
    "residentId": "3a0956fd-995c-4c4d-ad5e-9a520c375f3c",
    "visitorName": "Ms. Kristina Marquardt",
    "plateNumber": "PLB-1377",
    "expectedArrival": "2026-06-13T19:21:10.774Z",
    "expectedDeparture": "2026-06-14T04:33:29.810Z",
    "qrCodeRef": "QR-ZQU1QMYTB5",
    "status": "Pending",
    "createdAt": "2026-03-19T22:47:10.806Z",
    "updatedAt": "2026-06-13T11:20:27.555Z"
  },
  {
    "id": "18d5936d-9769-4c4c-aaee-a8773dd05ff2",
    "residentId": "b38e300d-9937-4a05-9058-7c38c461c356",
    "visitorName": "Meghan Veum",
    "plateNumber": "NYL-1886",
    "expectedArrival": "2026-06-14T01:47:05.667Z",
    "expectedDeparture": "2026-06-13T23:33:32.619Z",
    "qrCodeRef": "QR-W6G6TRFMPY",
    "status": "Expired",
    "createdAt": "2025-07-07T08:48:15.315Z",
    "updatedAt": "2026-06-13T11:41:24.716Z"
  },
  {
    "id": "f5e0ac70-621e-44f4-8119-1f40ea67d7d6",
    "residentId": "1a6842e4-896f-48d3-bd60-6f14af01b8a1",
    "visitorName": "Mrs. Beth Cummings",
    "plateNumber": "DEB-4518",
    "expectedArrival": "2026-06-14T05:44:31.531Z",
    "expectedDeparture": "2026-06-14T08:55:11.756Z",
    "qrCodeRef": "QR-BBDG658ZCR",
    "status": "No-Show",
    "createdAt": "2025-09-08T01:43:09.554Z",
    "updatedAt": "2026-06-13T00:41:13.979Z"
  }
]

export default eventHandler(() => visitorReservations)
