import { eventHandler } from 'h3'

export const billingTransactions = [
  {
    "id": "f9e0865f-743a-48e8-951e-47a5d93a9478",
    "sessionId": null,
    "type": "VisitorPenalty",
    "amount": 461.65,
    "status": "Paid",
    "paymentMethod": "E-Wallet",
    "receiptNumber": "RCPT-P778YHQ5",
    "transactionDate": "2026-06-13T09:01:31.735Z",
    "createdAt": "2026-04-13T00:00:11.479Z",
    "updatedAt": "2026-06-13T10:42:21.112Z"
  },
  {
    "id": "d52690ad-03a3-4956-bf11-eb40d3fd0df5",
    "sessionId": null,
    "type": "VisitorPenalty",
    "amount": 374.5,
    "status": "Paid",
    "paymentMethod": "Card",
    "receiptNumber": "RCPT-UUCNC1P0",
    "transactionDate": "2026-06-13T07:17:51.511Z",
    "createdAt": "2026-05-26T03:32:10.183Z",
    "updatedAt": "2026-06-12T19:52:39.144Z"
  },
  {
    "id": "e202653d-f1ff-4278-bd0b-6c8a1e64dedc",
    "sessionId": null,
    "type": "VisitorPenalty",
    "amount": 1024.09,
    "status": "Unpaid",
    "paymentMethod": null,
    "receiptNumber": null,
    "transactionDate": null,
    "createdAt": "2025-09-26T14:30:01.686Z",
    "updatedAt": "2026-06-13T08:00:07.324Z"
  },
  {
    "id": "ca6bee73-b69d-49b7-a1f0-a31b61615966",
    "sessionId": "67e3ca25-a53c-4ba7-9fa2-95b070696bbd",
    "type": "ResidentCharge",
    "amount": 825.54,
    "status": "Paid",
    "paymentMethod": "Card",
    "receiptNumber": "RCPT-KHC2V9D2",
    "transactionDate": "2026-06-13T12:11:51.528Z",
    "createdAt": "2026-03-15T07:26:56.957Z",
    "updatedAt": "2026-06-13T05:42:41.893Z"
  },
  {
    "id": "959f9e6f-ef19-44df-9253-32d3e0a4580f",
    "sessionId": null,
    "type": "PayParking",
    "amount": 1222.45,
    "status": "Cancelled",
    "paymentMethod": null,
    "receiptNumber": null,
    "transactionDate": null,
    "createdAt": "2025-12-30T02:44:45.657Z",
    "updatedAt": "2026-06-13T00:34:54.037Z"
  },
  {
    "id": "eda21504-6171-45f8-a391-977e3d8648bd",
    "sessionId": null,
    "type": "PayParking",
    "amount": 367.75,
    "status": "Cancelled",
    "paymentMethod": null,
    "receiptNumber": null,
    "transactionDate": null,
    "createdAt": "2025-08-04T16:30:31.181Z",
    "updatedAt": "2026-06-13T04:31:26.697Z"
  },
  {
    "id": "90f3877f-8246-4fd6-abde-ae935613b841",
    "sessionId": null,
    "type": "VisitorPenalty",
    "amount": 270.09,
    "status": "Paid",
    "paymentMethod": "E-Wallet",
    "receiptNumber": "RCPT-PVI0VHI1",
    "transactionDate": "2026-06-12T19:50:26.144Z",
    "createdAt": "2025-07-08T01:44:22.396Z",
    "updatedAt": "2026-06-13T01:59:59.622Z"
  },
  {
    "id": "490765fd-0b41-437d-a8ea-d4f6e8f1467e",
    "sessionId": "fcc8215f-1f25-4ae2-aaf4-6727541a9552",
    "type": "ResidentCharge",
    "amount": 1448.89,
    "status": "Cancelled",
    "paymentMethod": null,
    "receiptNumber": null,
    "transactionDate": null,
    "createdAt": "2025-07-15T18:09:13.456Z",
    "updatedAt": "2026-06-13T08:32:24.184Z"
  }
]

export default eventHandler(() => billingTransactions)
