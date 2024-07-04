const data = [
    {
        "__typename": "Sport",
        "slug": "football",
        "name": "Football",
        "countries": [
            {
                "__typename": "Country",
                "slug": "international-tournaments",
                "name": "International Tournaments",
                "turnover": "26492856019",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "uefa-euro",
                        "name": "UEFA - EURO",
                        "turnover": "13683836009",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "467210020",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593444779",
                                "gameId": "1593444779",
                                "title": "Netherlands - Turkey",
                                "startsAt": "1720292400",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "uefa-euro",
                                    "name": "UEFA - EURO",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593444779/Netherlands.png",
                                        "name": "Netherlands"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593444779/Turkey.png",
                                        "name": "Turkey"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "conmebol-copa-america",
                        "name": "CONMEBOL - Copa America",
                        "turnover": "12415750010",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "11500000",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593454094",
                                "gameId": "1593454094",
                                "title": "Colombia - Panama",
                                "startsAt": "1720303200",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "conmebol-copa-america",
                                    "name": "CONMEBOL - Copa America",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593454094/Colombia.png",
                                        "name": "Colombia"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593454094/Panama.png",
                                        "name": "Panama"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "usa-major-league-soccer",
                        "name": "USA - Major League Soccer",
                        "turnover": "393270000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1592793634",
                                "gameId": "1592793634",
                                "title": "FC Cincinnati - Inter Miami",
                                "startsAt": "1720308600",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "usa-major-league-soccer",
                                    "name": "USA - Major League Soccer",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592793634/FC Cincinnati.png",
                                        "name": "FC Cincinnati"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592793634/Inter Miami.png",
                                        "name": "Inter Miami"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "usa-usl-championship",
                        "name": "USA - USL Championship",
                        "turnover": "0",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593329934",
                                "gameId": "1593329934",
                                "title": "Colorado Springs Switchbacks - FC Tulsa",
                                "startsAt": "1720141200",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "usa-usl-championship",
                                    "name": "USA - USL Championship",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593329934/Colorado Springs Switchbacks.png",
                                        "name": "Colorado Springs Switchbacks"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593329934/FC Tulsa.png",
                                        "name": "FC Tulsa"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "brazil",
                "name": "Brazil",
                "turnover": "1293150000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "serie-a",
                        "name": "Serie A",
                        "turnover": "1293150000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1592794587",
                                "gameId": "1592794587",
                                "title": "Sao Paulo - Bragantino",
                                "startsAt": "1720310400",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "serie-a",
                                    "name": "Serie A",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "brazil",
                                        "name": "Brazil"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592794587/Sao Paulo.png",
                                        "name": "Sao Paulo"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592794587/Bragantino.png",
                                        "name": "Bragantino"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "ireland",
                "name": "Ireland",
                "turnover": "287650000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "premier",
                        "name": "Premier",
                        "turnover": "287650000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "10000000",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593298243",
                                "gameId": "1593298243",
                                "title": "Shamrock Rovers - Dundalk",
                                "startsAt": "1720119600",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "premier",
                                    "name": "Premier",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "ireland",
                                        "name": "Ireland"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593298243/Shamrock Rovers.png",
                                        "name": "Shamrock Rovers"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593298243/Dundalk.png",
                                        "name": "Dundalk"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "china",
                "name": "China",
                "turnover": "123090000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "super-league",
                        "name": "Super League",
                        "turnover": "123090000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593346088",
                                "gameId": "1593346088",
                                "title": "Tianjin Jinmen Tiger - Changchun Yatai",
                                "startsAt": "1720263600",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "super-league",
                                    "name": "Super League",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "china",
                                        "name": "China"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593346088/Tianjin Jinmen Tiger.png",
                                        "name": "Tianjin Jinmen Tiger"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593346088/Changchun Yatai.png",
                                        "name": "Changchun Yatai"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "iceland",
                "name": "Iceland",
                "turnover": "105640000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "premier-league",
                        "name": "Premier League",
                        "turnover": "105640000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593348041",
                                "gameId": "1593348041",
                                "title": "IF Vestri - Breidablik",
                                "startsAt": "1720274400",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "premier-league",
                                    "name": "Premier League",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "iceland",
                                        "name": "Iceland"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593348041/IF Vestri.png",
                                        "name": "IF Vestri"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593348041/Breidablik.png",
                                        "name": "Breidablik"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "korea-republic",
                "name": "Korea Republic",
                "turnover": "65510000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "k-league-1",
                        "name": "K League 1",
                        "turnover": "65510000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1592797183",
                                "gameId": "1592797183",
                                "title": "Jeju United - FC Seoul",
                                "startsAt": "1720260000",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "k-league-1",
                                    "name": "K League 1",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "korea-republic",
                                        "name": "Korea Republic"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592797183/Jeju United.png",
                                        "name": "Jeju United"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592797183/FC Seoul.png",
                                        "name": "FC Seoul"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "japan",
                "name": "Japan",
                "turnover": "10000000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "j-league",
                        "name": "J League",
                        "turnover": "10000000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1592797178",
                                "gameId": "1592797178",
                                "title": "Machida Zelvia - Nagoya Grampus",
                                "startsAt": "1720256400",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "j-league",
                                    "name": "J League",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "japan",
                                        "name": "Japan"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592797178/Machida Zelvia.png",
                                        "name": "Machida Zelvia"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592797178/Nagoya Grampus.png",
                                        "name": "Nagoya Grampus"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "uruguay",
                "name": "Uruguay",
                "turnover": "0",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "primera-division",
                        "name": "Primera Division",
                        "turnover": "0",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593347936",
                                "gameId": "1593347936",
                                "title": "Cerro Largo - Liverpool Montevideo",
                                "startsAt": "1720270800",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "primera-division",
                                    "name": "Primera Division",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "uruguay",
                                        "name": "Uruguay"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593347936/Cerro Largo.png",
                                        "name": "Cerro Largo"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593347936/Liverpool Montevideo.png",
                                        "name": "Liverpool Montevideo"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "sweden",
                "name": "Sweden",
                "turnover": "0",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "allsvenskan",
                        "name": "Allsvenskan",
                        "turnover": "0",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1592740466",
                                "gameId": "1592740466",
                                "title": "AIK Solna - Kalmar FF",
                                "startsAt": "1720353600",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "allsvenskan",
                                    "name": "Allsvenskan",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "sweden",
                                        "name": "Sweden"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592740466/AIK Solna.png",
                                        "name": "AIK Solna"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592740466/Kalmar FF.png",
                                        "name": "Kalmar FF"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "norway",
                "name": "Norway",
                "turnover": "0",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "eliteserien",
                        "name": "Eliteserien",
                        "turnover": "0",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1592740449",
                                "gameId": "1592740449",
                                "title": "KFUM Oslo - Viking",
                                "startsAt": "1720364400",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "eliteserien",
                                    "name": "Eliteserien",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "norway",
                                        "name": "Norway"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592740449/KFUM Oslo.png",
                                        "name": "KFUM Oslo"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592740449/Viking.png",
                                        "name": "Viking"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "mexico",
                "name": "Mexico",
                "turnover": "0",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "primera-division",
                        "name": "Primera Division",
                        "turnover": "0",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1592893569",
                                "gameId": "1592893569",
                                "title": "Puebla - Santos Laguna",
                                "startsAt": "1720219500",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "primera-division",
                                    "name": "Primera Division",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "mexico",
                                        "name": "Mexico"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592893569/Puebla.png",
                                        "name": "Puebla"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1592893569/Santos Laguna.png",
                                        "name": "Santos Laguna"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "latvia",
                "name": "Latvia",
                "turnover": "0",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "virsliga",
                        "name": "Virsliga",
                        "turnover": "0",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593397894",
                                "gameId": "1593397894",
                                "title": "RFS - FS Jelgava",
                                "startsAt": "1720198800",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "33",
                                    "slug": "football",
                                    "name": "Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "virsliga",
                                    "name": "Virsliga",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "latvia",
                                        "name": "Latvia"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593397894/RFS.png",
                                        "name": "RFS"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/33/1593397894/FS Jelgava.png",
                                        "name": "FS Jelgava"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "turnover": 28377896019
    },
    {
        "__typename": "Sport",
        "slug": "tennis",
        "name": "Tennis",
        "countries": [
            {
                "__typename": "Country",
                "slug": "international-tournaments",
                "name": "International Tournaments",
                "turnover": "4616238560",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "atp-wimbledon",
                        "name": "ATP Wimbledon",
                        "turnover": "2088028030",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593443525",
                                "gameId": "1593443525",
                                "title": "Holger Rune - Thiago Seyboth Wild",
                                "startsAt": "1720103400",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "45",
                                    "slug": "tennis",
                                    "name": "Tennis"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "atp-wimbledon",
                                    "name": "ATP Wimbledon",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593443525/Holger Rune.png",
                                        "name": "Holger Rune"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593443525/Thiago Seyboth Wild.png",
                                        "name": "Thiago Seyboth Wild"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "wta-wimbledon-doubles",
                        "name": "WTA Wimbledon - Doubles",
                        "turnover": "2015560530",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593431210",
                                "gameId": "1593431210",
                                "title": "Bucsa C / Hibino N - Maria T / Rus A",
                                "startsAt": "1720103400",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "45",
                                    "slug": "tennis",
                                    "name": "Tennis"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "wta-wimbledon-doubles",
                                    "name": "WTA Wimbledon - Doubles",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593431210/Bucsa C / Hibino N.png",
                                        "name": "Bucsa C / Hibino N"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593431210/Maria T / Rus A.png",
                                        "name": "Maria T / Rus A"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "wta-wimbledon",
                        "name": "WTA Wimbledon",
                        "turnover": "375650000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593439905",
                                "gameId": "1593439905",
                                "title": "Elena Rybakina - Laura Siegemund",
                                "startsAt": "1720103400",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "45",
                                    "slug": "tennis",
                                    "name": "Tennis"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "wta-wimbledon",
                                    "name": "WTA Wimbledon",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593439905/Elena Rybakina.png",
                                        "name": "Elena Rybakina"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593439905/Laura Siegemund.png",
                                        "name": "Laura Siegemund"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "atp-challenger-karlsruhe",
                        "name": "ATP Challenger Karlsruhe",
                        "turnover": "73000000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593466059",
                                "gameId": "1593466059",
                                "title": "Michael Vrbensky - Edas Butvilas",
                                "startsAt": "1720096200",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "45",
                                    "slug": "tennis",
                                    "name": "Tennis"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "atp-challenger-karlsruhe",
                                    "name": "ATP Challenger Karlsruhe",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593466059/Michael Vrbensky.png",
                                        "name": "Michael Vrbensky"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593466059/Edas Butvilas.png",
                                        "name": "Edas Butvilas"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "atp-wimbledon-doubles",
                        "name": "ATP Wimbledon - Doubles",
                        "turnover": "35000000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593431037",
                                "gameId": "1593431037",
                                "title": "Baez S / Brown D - Nys H / Zielinski J",
                                "startsAt": "1720173600",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "45",
                                    "slug": "tennis",
                                    "name": "Tennis"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "atp-wimbledon-doubles",
                                    "name": "ATP Wimbledon - Doubles",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593431037/Baez S / Brown D.png",
                                        "name": "Baez S / Brown D"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593431037/Nys H / Zielinski J.png",
                                        "name": "Nys H / Zielinski J"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "atp-challenger-bloomfield-hills",
                        "name": "ATP Challenger Bloomfield Hills",
                        "turnover": "12000000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593442266",
                                "gameId": "1593442266",
                                "title": "Antoine Bellier - Nishesh Basavareddy",
                                "startsAt": "1720105200",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "45",
                                    "slug": "tennis",
                                    "name": "Tennis"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "atp-challenger-bloomfield-hills",
                                    "name": "ATP Challenger Bloomfield Hills",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593442266/Antoine Bellier.png",
                                        "name": "Antoine Bellier"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593442266/Nishesh Basavareddy.png",
                                        "name": "Nishesh Basavareddy"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "atp-challenger-troyes",
                        "name": "ATP Challenger Troyes",
                        "turnover": "3000000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593439080",
                                "gameId": "1593439080",
                                "title": "Olaf Pieczkowski - Jonas Forejtek",
                                "startsAt": "1720098000",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "45",
                                    "slug": "tennis",
                                    "name": "Tennis"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "atp-challenger-troyes",
                                    "name": "ATP Challenger Troyes",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593439080/Olaf Pieczkowski.png",
                                        "name": "Olaf Pieczkowski"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593439080/Jonas Forejtek.png",
                                        "name": "Jonas Forejtek"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "atp-challenger-mode",
                        "name": "ATP Challenger Mode",
                        "turnover": "0",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593473248",
                                "gameId": "1593473248",
                                "title": "Juan Pablo Varillas - Andrea Collarini",
                                "startsAt": "1720098000",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "45",
                                    "slug": "tennis",
                                    "name": "Tennis"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "atp-challenger-mode",
                                    "name": "ATP Challenger Mode",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593473248/Juan Pablo Varillas.png",
                                        "name": "Juan Pablo Varillas"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/45/1593473248/Andrea Collarini.png",
                                        "name": "Andrea Collarini"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "turnover": 4616238560
    },
    {
        "__typename": "Sport",
        "slug": "baseball",
        "name": "Baseball",
        "countries": [
            {
                "__typename": "Country",
                "slug": "international-tournaments",
                "name": "International Tournaments",
                "turnover": "687000040",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "mlb",
                        "name": "MLB",
                        "turnover": "40",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593417944",
                                "gameId": "1593417944",
                                "title": "New York Mets - Washington Nationals",
                                "startsAt": "1720105500",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "28",
                                    "slug": "baseball",
                                    "name": "Baseball"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "mlb",
                                    "name": "MLB",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/28/1593417944/New York Mets.png",
                                        "name": "New York Mets"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/28/1593417944/Washington Nationals.png",
                                        "name": "Washington Nationals"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "turnover": 687000040
    },
    {
        "__typename": "Sport",
        "slug": "rugby-league",
        "name": "Rugby League",
        "countries": [
            {
                "__typename": "Country",
                "slug": "international-tournaments",
                "name": "International Tournaments",
                "turnover": "480000000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "super-league",
                        "name": "Super League",
                        "turnover": "450000000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "2000000",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593355437",
                                "gameId": "1593355437",
                                "title": "St. Helens - Castleford Tigers",
                                "startsAt": "1720206000",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "58",
                                    "slug": "rugby-league",
                                    "name": "Rugby League"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "super-league",
                                    "name": "Super League",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/58/1593355437/St. Helens.png",
                                        "name": "St. Helens"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/58/1593355437/Castleford Tigers.png",
                                        "name": "Castleford Tigers"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "nrl",
                        "name": "NRL",
                        "turnover": "30000000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593397313",
                                "gameId": "1593397313",
                                "title": "Canberra Raiders - Newcastle Knights",
                                "startsAt": "1720332300",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "58",
                                    "slug": "rugby-league",
                                    "name": "Rugby League"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "nrl",
                                    "name": "NRL",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/58/1593397313/Canberra Raiders.png",
                                        "name": "Canberra Raiders"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/58/1593397313/Newcastle Knights.png",
                                        "name": "Newcastle Knights"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "turnover": 480000000
    },
    {
        "__typename": "Sport",
        "slug": "american-football",
        "name": "American Football",
        "countries": [
            {
                "__typename": "Country",
                "slug": "international-tournaments",
                "name": "International Tournaments",
                "turnover": "199820000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "nfl",
                        "name": "NFL",
                        "turnover": "199820000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "199820000",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1590433731",
                                "gameId": "1590433731",
                                "title": "Green Bay Packers - Philadelphia Eagles",
                                "startsAt": "1725668100",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "44",
                                    "slug": "american-football",
                                    "name": "American Football"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "nfl",
                                    "name": "NFL",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/44/1590433731/Green Bay Packers.png",
                                        "name": "Green Bay Packers"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/44/1590433731/Philadelphia Eagles.png",
                                        "name": "Philadelphia Eagles"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "turnover": 199820000
    },
    {
        "__typename": "Sport",
        "slug": "basketball",
        "name": "Basketball",
        "countries": [
            {
                "__typename": "Country",
                "slug": "international-tournaments",
                "name": "International Tournaments",
                "turnover": "46000000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "olympic-qualification",
                        "name": "Olympic Qualification",
                        "turnover": "46000000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593417719",
                                "gameId": "1593417719",
                                "title": "New Zealand - Slovenia",
                                "startsAt": "1720103400",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "31",
                                    "slug": "basketball",
                                    "name": "Basketball"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "olympic-qualification",
                                    "name": "Olympic Qualification",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/31/1593417719/New Zealand.png",
                                        "name": "New Zealand"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/31/1593417719/Slovenia.png",
                                        "name": "Slovenia"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "__typename": "Country",
                "slug": "australia",
                "name": "Australia",
                "turnover": "41800000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "nbl1",
                        "name": "NBL1",
                        "turnover": "41800000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593437484",
                                "gameId": "1593437484",
                                "title": "Ballarat Miners - Sandringham Sabres",
                                "startsAt": "1720173600",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "31",
                                    "slug": "basketball",
                                    "name": "Basketball"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "nbl1",
                                    "name": "NBL1",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "australia",
                                        "name": "Australia"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/31/1593437484/Ballarat Miners.png",
                                        "name": "Ballarat Miners"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/31/1593437484/Sandringham Sabres.png",
                                        "name": "Sandringham Sabres"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "turnover": 87800000
    },
    {
        "__typename": "Sport",
        "slug": "lol",
        "name": "League of Legends",
        "countries": [
            {
                "__typename": "Country",
                "slug": "international-tournaments",
                "name": "International Tournaments",
                "turnover": "66000000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "lvp-superliga",
                        "name": "LVP SuperLiga",
                        "turnover": "66000000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593334971",
                                "gameId": "1593334971",
                                "title": "LUA - Rebels",
                                "startsAt": "1720198800",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "1002",
                                    "slug": "lol",
                                    "name": "League of Legends"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "lvp-superliga",
                                    "name": "LVP SuperLiga",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/1002/1593334971/LUA.png",
                                        "name": "LUA"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/1002/1593334971/Rebels.png",
                                        "name": "Rebels"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "__typename": "League",
                        "slug": "lpl",
                        "name": "LPL",
                        "turnover": "0",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593466022",
                                "gameId": "1593466022",
                                "title": "Royal Never Give Up - EDward Gaming",
                                "startsAt": "1720170000",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "1002",
                                    "slug": "lol",
                                    "name": "League of Legends"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "lpl",
                                    "name": "LPL",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/1002/1593466022/Royal Never Give Up.png",
                                        "name": "Royal Never Give Up"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/1002/1593466022/EDward Gaming.png",
                                        "name": "EDward Gaming"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "turnover": 66000000
    },
    {
        "__typename": "Sport",
        "slug": "boxing",
        "name": "Boxing",
        "countries": [
            {
                "__typename": "Country",
                "slug": "international-tournaments",
                "name": "International Tournaments",
                "turnover": "44000000",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "boxing-matches",
                        "name": "Boxing Matches",
                        "turnover": "44000000",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1592556311",
                                "gameId": "1592556311",
                                "title": "Robson Conceicao - O'Shaquie Foster",
                                "startsAt": "1720314000",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "29",
                                    "slug": "boxing",
                                    "name": "Boxing"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "boxing-matches",
                                    "name": "Boxing Matches",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/29/1592556311/Robson Conceicao.png",
                                        "name": "Robson Conceicao"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/29/1592556311/O'Shaquie Foster.png",
                                        "name": "O'Shaquie Foster"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "turnover": 44000000
    },
    {
        "__typename": "Sport",
        "slug": "cs2",
        "name": "Counter-Strike 2",
        "countries": [
            {
                "__typename": "Country",
                "slug": "international-tournaments",
                "name": "International Tournaments",
                "turnover": "0",
                "leagues": [
                    {
                        "__typename": "League",
                        "slug": "esports-battle",
                        "name": "ESPORTS BATTLE",
                        "turnover": "0",
                        "games": [
                            {
                                "__typename": "Game",
                                "turnover": "0",
                                "id": "0x7043e4e1c4045424858ecbced80989feafc11b36_1593475315",
                                "gameId": "1593475315",
                                "title": "NightRaid - Seight",
                                "startsAt": "1720094400",
                                "status": "Created",
                                "sport": {
                                    "__typename": "Sport",
                                    "sportId": "1061",
                                    "slug": "cs2",
                                    "name": "Counter-Strike 2"
                                },
                                "league": {
                                    "__typename": "League",
                                    "slug": "esports-battle",
                                    "name": "ESPORTS BATTLE",
                                    "country": {
                                        "__typename": "Country",
                                        "slug": "international-tournaments",
                                        "name": "International Tournaments"
                                    }
                                },
                                "participants": [
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/1061/1593475315/NightRaid.png",
                                        "name": "NightRaid"
                                    },
                                    {
                                        "__typename": "Participant",
                                        "image": "https://avatars.azuro.org/images/1061/1593475315/Seight.png",
                                        "name": "Seight"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "turnover": 0
    }
];
console.log(data);