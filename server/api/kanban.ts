import { eventHandler } from 'h3'

export const kanban = {
  "backlog": [
    {
      "id": "e0328750-c840-49ca-ab57-8c3d717c0af3",
      "title": "Extended mission-critical knowledge user",
      "description": "Degusto denique nisi compello ab comedo vorago capillus timidus. Degusto capillus acies alius demergo adstringo sopor. Suppono turpis vicissitudo arto sollicito somnus bene quas ter.",
      "priority": "critical",
      "tags": [
        "Design",
        "Docs",
        "Backend"
      ],
      "locked": false,
      "createdAt": "2026-05-30T12:24:42.281Z"
    },
    {
      "id": "4aa892fe-9458-4a1d-8d17-e9ec06726420",
      "title": "User-centric value-added support",
      "description": "Timidus aliquam vester decimus vita voro inflammatio magni. Tremo voluptas creber derelinquo pauper curis. Nesciunt aptus cariosus combibo.",
      "priority": "medium",
      "tags": [
        "UI"
      ],
      "locked": true,
      "createdAt": "2026-05-21T11:07:11.296Z"
    },
    {
      "id": "ad20189c-d163-4fa1-a634-c1865bae5d00",
      "title": "Virtual intangible capability",
      "priority": "low",
      "tags": [
        "Design",
        "Research"
      ],
      "locked": false,
      "createdAt": "2026-05-30T11:39:39.954Z"
    },
    {
      "id": "b3358522-2810-4185-b5e3-84596baaa512",
      "title": "Persevering contextually-based capacity",
      "description": "Terebro cetera custodia cado solus decimus comparo super crebro considero. Dapifer contego debilito bardus suscipio clarus thermae. Textus decet demergo beatae derideo ademptio.",
      "priority": "medium",
      "tags": [
        "Backend",
        "UI"
      ],
      "locked": false,
      "createdAt": "2026-05-30T18:25:48.095Z"
    },
    {
      "id": "188f214a-1830-41e5-a1f5-5c59cefa9e74",
      "title": "Progressive 24/7 local area network",
      "description": "Absque curiositas appono cavus. Uter deficio volo utrum debilito audacia territo minus adulescens. Venia cruentus urbanus talus tredecim.",
      "priority": "low",
      "tags": [
        "Feature",
        "UI"
      ],
      "locked": false,
      "createdAt": "2026-05-16T10:14:36.152Z"
    }
  ],
  "todo": [
    {
      "id": "b8454848-73a8-4f4b-b901-d42766bf2a82",
      "title": "Secured zero trust complexity",
      "description": "Possimus callide aufero cernuus sublime. Exercitationem vestrum vociferor totidem tredecim super cerno. Utroque cribro adipiscor deorsum bonus beneficium somniculosus uredo.",
      "priority": "high",
      "tags": [
        "Feature",
        "UI"
      ],
      "locked": false,
      "createdAt": "2026-06-03T21:35:39.770Z"
    },
    {
      "id": "bb9e2504-a313-4909-a5ed-5951ae747cd8",
      "title": "Networked human-resource model",
      "description": "Delibero volva vix. Molestias uberrime totus spiritus auctus repellendus censura taedium alioqui. Crebro tempora vestrum undique.",
      "priority": "medium",
      "tags": [
        "Docs",
        "Feature"
      ],
      "locked": false,
      "createdAt": "2026-05-18T10:30:26.332Z"
    },
    {
      "id": "0a5b852a-c02c-4c9e-a69f-559e56ccf442",
      "title": "Organized user-facing generative AI",
      "description": "Arcesso curtus aperte. Vulnero talio repudiandae animi arcus strues demulceo blanditiis. Crux fugit delectatio aequitas tremo absorbeo.",
      "priority": "medium",
      "tags": [
        "Backend",
        "UI",
        "Planning"
      ],
      "locked": false,
      "createdAt": "2026-05-20T16:41:23.763Z"
    },
    {
      "id": "90b28bc0-f7f5-4737-a1eb-200674324d08",
      "title": "Networked well-modulated project",
      "description": "Decens stella vulgivagus tenuis nemo adicio dignissimos thema adeptio. Ea id deludo brevis ea argumentum. Supra curo conforto tempore neque degero charisma vomer hic.",
      "priority": "medium",
      "tags": [
        "UI",
        "Design",
        "Backend"
      ],
      "locked": true,
      "createdAt": "2026-05-19T04:10:34.677Z"
    },
    {
      "id": "fccb3f32-092a-4090-82d1-635101c856ec",
      "title": "Secured tertiary interface",
      "description": "Id toties voluntarius synagoga ulterius cibus absens texo. Admoneo volva suggero cohaero. Tempore volubilis summa apto conservo.",
      "priority": "low",
      "tags": [
        "Docs",
        "Backend"
      ],
      "locked": false,
      "createdAt": "2026-06-09T10:46:26.087Z"
    },
    {
      "id": "0e8f5940-a656-4ff1-a291-8a47df9a3fa3",
      "title": "Open-source clear-thinking generative AI",
      "description": "Ipsam subiungo clam tamisium condico viriliter conatus. Sed synagoga alii adflicto nesciunt ubi vehemens vicissitudo crur abscido. Comburo deserunt summopere tumultus natus pecco alienus vilicus.",
      "priority": "critical",
      "tags": [
        "Research",
        "Design"
      ],
      "locked": false,
      "createdAt": "2026-06-12T18:23:51.924Z"
    },
    {
      "id": "80ebe17d-abfc-43c8-8f9c-8015ed930ad8",
      "title": "User-centric uniform capacity",
      "priority": "critical",
      "tags": [],
      "locked": false,
      "createdAt": "2026-06-13T01:27:41.241Z"
    }
  ],
  "inProgress": [
    {
      "id": "6c9a6d37-f048-4ca0-b948-9c5550d63a45",
      "title": "Implemented cohesive encryption",
      "priority": "medium",
      "tags": [
        "Docs",
        "Bug"
      ],
      "locked": false,
      "createdAt": "2026-05-23T04:00:13.593Z"
    },
    {
      "id": "94252970-0eed-4a0c-877a-b86e2d23e946",
      "title": "Innovative resilient interface",
      "description": "Exercitationem adduco urbanus peccatus subito perspiciatis depulso a quod. Cubo celo truculenter fuga. Desipio auctus est strenuus tergiversatio undique decipio dolore.",
      "priority": "high",
      "tags": [
        "UI",
        "Feature"
      ],
      "locked": false,
      "createdAt": "2026-05-15T04:00:56.530Z"
    },
    {
      "id": "e236b9ae-c450-4460-886a-7ff50e4c8626",
      "title": "Balanced holistic software",
      "description": "Brevis video aurum confero iusto benigne. Volo natus speciosus facilis tergiversatio decerno comitatus adipiscor cibus deripio. Bis dolorem carbo stips patior.",
      "priority": "medium",
      "tags": [],
      "locked": false,
      "createdAt": "2026-06-04T03:26:26.043Z"
    }
  ],
  "review": [
    {
      "id": "9b1d0881-d110-4a4e-b647-e1888eb5a5a6",
      "title": "Customer-focused full-range framework",
      "description": "Pecco caecus voluptas dedecor circumvenio comis derelinquo titulus. Curso celebrer suggero asperiores sulum abundans conforto tactus. Vespillo calculus uxor amiculum nesciunt abscido suscipit sufficio.",
      "priority": "low",
      "tags": [],
      "locked": false,
      "createdAt": "2026-05-19T12:46:30.722Z"
    },
    {
      "id": "283e7cd2-a946-4c0c-a72e-ae7e7eaaf8d0",
      "title": "Programmable human-resource neural-net",
      "description": "Coadunatio textor vorago. Aqua asperiores bonus. Thorax voluptas cernuus tres solum.",
      "priority": "medium",
      "tags": [
        "Feature",
        "Docs"
      ],
      "locked": false,
      "createdAt": "2026-06-13T11:37:25.444Z"
    },
    {
      "id": "4f58468e-2baa-4366-858d-28143cb3a41a",
      "title": "Digitized sustainable product",
      "description": "Peccatus adulatio delectatio fugiat arcus. Cunabula corrumpo admitto confero adflicto. Tepesco validus confero reiciendis teres audentia voveo.",
      "priority": "high",
      "tags": [
        "Bug",
        "Feature"
      ],
      "locked": false,
      "createdAt": "2026-05-29T09:50:35.191Z"
    },
    {
      "id": "307db284-9f43-4100-8e0a-006946dbca39",
      "title": "Compatible zero defect leverage",
      "description": "Velit abutor allatus nesciunt dolorem. Deprecator aqua crux. Censura tenuis accommodo testimonium modi utrum atrocitas dignissimos.",
      "priority": "low",
      "tags": [
        "Backend"
      ],
      "locked": false,
      "createdAt": "2026-06-07T09:18:16.227Z"
    }
  ],
  "done": [
    {
      "id": "f4ac1829-ca87-45f6-8cca-20c121a6bcbf",
      "title": "Proactive transitional hardware",
      "priority": "critical",
      "tags": [
        "Planning"
      ],
      "locked": false,
      "createdAt": "2026-05-29T02:27:22.159Z"
    },
    {
      "id": "37ff3a90-908d-4b53-98f2-35fcbfaa0b52",
      "title": "Integrated zero defect access",
      "description": "Texo conforto sint deleo considero traho tam nostrum copiose exercitationem. Pecto tabula appositus acidus alveus spargo delectus degusto. Dignissimos adinventitias deripio angulus tabernus cuppedia.",
      "priority": "high",
      "tags": [
        "Planning",
        "Bug"
      ],
      "locked": false,
      "createdAt": "2026-06-05T00:13:02.164Z"
    },
    {
      "id": "f02e15a7-e137-4d13-ba58-389fa9ce93b3",
      "title": "Reverse-engineered motivating process improvement",
      "priority": "critical",
      "tags": [
        "Design",
        "UI"
      ],
      "locked": false,
      "createdAt": "2026-06-02T08:04:30.801Z"
    },
    {
      "id": "bedfa5a3-3274-41ef-baf2-6d2fad6ce88b",
      "title": "Managed sustainable utilisation",
      "priority": "high",
      "tags": [],
      "locked": false,
      "createdAt": "2026-05-30T22:55:37.583Z"
    },
    {
      "id": "8a3cc2c7-475c-432b-aac0-b4a5ef02b6e8",
      "title": "Advanced composite capacity",
      "description": "Tolero carus audeo necessitatibus. Beatae ratione acies vaco inventore. Despecto peccatus curso vulgus corrupti deludo viridis thymum.",
      "priority": "medium",
      "tags": [
        "Design"
      ],
      "locked": false,
      "createdAt": "2026-06-07T11:40:54.397Z"
    },
    {
      "id": "f14b7174-2131-4bb6-8877-8f51fd1a22e8",
      "title": "User-friendly asynchronous paradigm",
      "description": "Tamen terga ventito patior nesciunt appello. Angulus concido tollo. Unde abstergo argumentum accusamus ter vetus.",
      "priority": "critical",
      "tags": [
        "Docs",
        "Planning"
      ],
      "locked": false,
      "createdAt": "2026-06-13T09:18:55.263Z"
    },
    {
      "id": "88ea0175-0489-4e1d-9735-08c7be19dfc9",
      "title": "Horizontal optimal access",
      "description": "Demo aestus viriliter benigne atrocitas veritas curto perferendis vinculum temeritas. Degero subito inflammatio vulnus subiungo coniuratio. Suscipit demo solvo addo absum cunae.",
      "priority": "medium",
      "tags": [
        "Bug",
        "UI"
      ],
      "locked": false,
      "createdAt": "2026-05-16T22:57:52.447Z"
    },
    {
      "id": "65df4697-ca60-4108-9742-671406052f1d",
      "title": "AI-driven user-facing encoding",
      "description": "Tondeo somniculosus patruus paens temptatio videlicet summopere adflicto. Acquiro subnecto ab desidero vinum. Commodi textus cura utrum tyrannus trepide.",
      "priority": "high",
      "tags": [
        "Design",
        "Docs",
        "UI"
      ],
      "locked": false,
      "createdAt": "2026-06-01T09:16:28.621Z"
    },
    {
      "id": "9b59f560-73db-479d-ad6b-4ce197d18822",
      "title": "Profit-focused fault-tolerant neural-net",
      "description": "Arbustum reiciendis textus caritas adfero torrens. Demo supplanto casso campana infit creptio adipisci compono absens. Contabesco brevis assumenda atqui.",
      "priority": "high",
      "tags": [],
      "locked": false,
      "createdAt": "2026-06-03T17:59:56.476Z"
    },
    {
      "id": "1255a9db-a05f-402c-b54a-598404833c98",
      "title": "Ergonomic scalable process improvement",
      "description": "Tametsi copia vomer amiculum nobis consequatur. Verus decretum magnam usque depraedor cedo conventus coma acsi ut. Utor asper auctor bene tabella vero.",
      "priority": "medium",
      "tags": [
        "UI"
      ],
      "locked": false,
      "createdAt": "2026-06-03T17:32:39.248Z"
    },
    {
      "id": "c211212c-e58a-4a60-ab2f-237734392719",
      "title": "Proactive data-driven conglomeration",
      "description": "Culpa decretum ultio. Quia artificiose antepono verbum ambulo. Venio quas conscendo arguo tremo.",
      "priority": "low",
      "tags": [
        "Planning",
        "Docs"
      ],
      "locked": false,
      "createdAt": "2026-05-24T17:36:29.675Z"
    },
    {
      "id": "62bec06f-ba42-44fc-90b6-3eaa901d704a",
      "title": "Grass-roots radical protocol",
      "description": "Attero carpo apto uxor pariatur comburo adinventitias. Degenero canis laboriosam termes. Repellendus odio triumphus aufero facilis contigo adipiscor aliqua.",
      "priority": "high",
      "tags": [
        "Feature",
        "Bug"
      ],
      "locked": false,
      "createdAt": "2026-05-17T01:41:39.583Z"
    }
  ]
}

export default eventHandler(() => kanban)
