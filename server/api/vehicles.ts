import { eventHandler } from 'h3'

export const vehicles = [
  {
    "id": "c78249c5-8ce8-48f1-ac57-7a2ae80d2a59",
    "unitOwnerId": "b0e0c41c-7a4a-412f-8e62-d50c7fcd8b83",
    "plateNumber": "VKI-9205",
    "make": "Mercedes Benz",
    "model": "Escalade",
    "color": "lime",
    "registrationType": "Primary",
    "status": "Approved",
    "documentUrls": [
      "https://picsum.photos/seed/YFdWNUvnJ/3786/2162"
    ],
    "createdAt": "2026-05-10T18:22:56.707Z",
    "updatedAt": "2026-06-13T07:53:28.432Z"
  },
  {
    "id": "57cf597f-859d-4df4-a024-29aeaf59ec0e",
    "unitOwnerId": "6992126e-791e-48a8-aea2-42ab552e4298",
    "plateNumber": "WGY-9698",
    "make": "Peugeot",
    "model": "Taurus",
    "color": "plum",
    "registrationType": "Primary",
    "status": "Inactive",
    "documentUrls": [
      "https://picsum.photos/seed/2gVqv6WM/1045/501"
    ],
    "createdAt": "2025-11-16T20:13:42.780Z",
    "updatedAt": "2026-06-13T09:58:17.516Z"
  },
  {
    "id": "1b728edc-7c7e-4ab8-81c1-d1016841f200",
    "unitOwnerId": "601d94af-a8d8-4e00-b810-9672d53777ef",
    "plateNumber": "PTW-4265",
    "make": "Mercedes Benz",
    "model": "PT Cruiser",
    "color": "fuchsia",
    "registrationType": "Secondary",
    "status": "Inactive",
    "documentUrls": [
      "https://picsum.photos/seed/Zpppsn17u/3873/641"
    ],
    "createdAt": "2025-08-09T12:51:16.103Z",
    "updatedAt": "2026-06-13T10:27:28.960Z"
  },
  {
    "id": "40fc0fdd-0f03-4e04-85de-c69ca18395be",
    "unitOwnerId": "f4f17e10-1e14-47c5-b368-ded206c03d4c",
    "plateNumber": "IFP-4833",
    "make": "Bentley",
    "model": "Camry",
    "color": "olive",
    "registrationType": "Primary",
    "status": "Approved",
    "documentUrls": [
      "https://picsum.photos/seed/H1O4bOhcG/1045/1828"
    ],
    "createdAt": "2025-12-12T05:50:04.174Z",
    "updatedAt": "2026-06-12T22:59:31.078Z"
  },
  {
    "id": "879935d2-895b-43af-a1e8-b608733758ab",
    "unitOwnerId": "4a3b1ce2-507d-43a6-8db9-5f4094c3b564",
    "plateNumber": "MUX-2781",
    "make": "Subaru",
    "model": "Grand Caravan",
    "color": "white",
    "registrationType": "Secondary",
    "status": "Inactive",
    "documentUrls": [
      "https://picsum.photos/seed/NeZNW/1743/1789"
    ],
    "createdAt": "2025-06-17T19:04:19.448Z",
    "updatedAt": "2026-06-13T04:29:38.682Z"
  }
]

export default eventHandler(() => vehicles)
