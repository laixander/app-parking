import { eventHandler } from 'h3'

export const dashboard = {
  "overview": {
    "totalRevenue": 0,
    "unpaidInvoices": 0,
    "activeSessions": 0,
    "occupancyRate": 0
  },
  "recentActivity": [
    {
      "id": "2cc80a81-8250-4a49-bd9b-7df2210babcf",
      "type": "Entry",
      "description": "Resident parking fee paid",
      "timestamp": "2026-06-13T12:21:02.848Z"
    },
    {
      "id": "82f784b9-6ad0-49ee-aa53-6ef63b81d177",
      "type": "Entry",
      "description": "Vehicle exited from Basement 2",
      "timestamp": "2026-06-13T09:55:55.112Z"
    },
    {
      "id": "f8415aa0-3f0b-4924-b358-46f1864cbb73",
      "type": "Entry",
      "description": "Visitor penalty charge applied",
      "timestamp": "2026-06-13T09:00:29.899Z"
    },
    {
      "id": "f67bb921-8885-4206-8085-76a3ad258f38",
      "type": "Entry",
      "description": "Overstay detected",
      "timestamp": "2026-06-13T07:47:45.336Z"
    },
    {
      "id": "22649ee4-d496-4462-8600-039fe4446553",
      "type": "Exit",
      "description": "Vehicle entry scanned at Main Gate",
      "timestamp": "2026-06-13T06:54:40.882Z"
    },
    {
      "id": "910c057f-1ae4-435f-928c-4a2b3cb78b07",
      "type": "Entry",
      "description": "Visitor penalty charge applied",
      "timestamp": "2026-06-13T04:53:16.335Z"
    },
    {
      "id": "ede505e6-a127-4ca4-b960-82b969277899",
      "type": "Payment",
      "description": "Vehicle exited from Basement 2",
      "timestamp": "2026-06-13T03:02:48.461Z"
    },
    {
      "id": "191ff5de-e90e-451c-aed9-b4aa42db44de",
      "type": "Entry",
      "description": "Resident parking fee paid",
      "timestamp": "2026-06-13T00:47:23.827Z"
    },
    {
      "id": "072735cd-f049-4f49-9c8d-f13453fea04b",
      "type": "Exit",
      "description": "Resident parking fee paid",
      "timestamp": "2026-06-12T19:49:29.819Z"
    },
    {
      "id": "0f9de9d3-b46c-4015-93ae-2897313264c6",
      "type": "Exit",
      "description": "Resident parking fee paid",
      "timestamp": "2026-06-12T19:31:31.618Z"
    },
    {
      "id": "451b1e21-7350-456e-af2c-a919bc1779c8",
      "type": "Payment",
      "description": "Visitor penalty charge applied",
      "timestamp": "2026-06-12T18:57:09.851Z"
    },
    {
      "id": "11e653f7-e938-4f54-9bab-887fd7cc1fef",
      "type": "Entry",
      "description": "Vehicle entry scanned at Main Gate",
      "timestamp": "2026-06-12T18:07:11.401Z"
    },
    {
      "id": "30b09002-4920-46ab-aed7-84c11d028d36",
      "type": "Payment",
      "description": "Overstay detected",
      "timestamp": "2026-06-12T15:55:52.524Z"
    },
    {
      "id": "92dad6f5-85df-4d01-8a6d-dcd785ae3c59",
      "type": "Exit",
      "description": "Overstay detected",
      "timestamp": "2026-06-12T15:48:12.465Z"
    },
    {
      "id": "d8f88dcb-0082-40ae-b42b-8a91ab3d76f1",
      "type": "Entry",
      "description": "Vehicle exited from Basement 2",
      "timestamp": "2026-06-12T14:59:27.177Z"
    }
  ],
  "revenueChart": [
    {
      "date": "2026-06-07",
      "amount": 4897.85
    },
    {
      "date": "2026-06-08",
      "amount": 2878.25
    },
    {
      "date": "2026-06-09",
      "amount": 1254.39
    },
    {
      "date": "2026-06-10",
      "amount": 3455.1
    },
    {
      "date": "2026-06-11",
      "amount": 2767.89
    },
    {
      "date": "2026-06-12",
      "amount": 3801.29
    },
    {
      "date": "2026-06-13",
      "amount": 1454.75
    }
  ]
}

export default eventHandler(() => dashboard)
