# WeltWagen-final-examination-project

1. Projekt áttekintése

WeltWagen egy digitális autóaukciós és logisztikai platform, amely egyszerűvé és átláthatóvá
teszi a járműimportot az USA-ból, Japánból, Dubajból és Európából.

1.1. Probléma, amit megoldunk

Az import autó piac jelenleg széttagolt:
- Több tucat aukciós oldal (Copart, IAAI, Manheim, USS, TAA, ENCAR, Dubizzle stb.)
- Eltérő nyelvek, valuták, licitálási szabályok
- Átláthatatlan teljes költség (aukciós díj + szállítás + vám + ÁFA + regisztráció)
- Nehezen összehasonlítható ajánlatok
- Bizalmatlanság a kereskedőkkel szemben

1.2. Megoldás

A WeltWagen egyetlen platformba gyűjti a különböző import oldalak élő licitjeit és hirdetéseit,
egységesíti az adatokat, és teljes átláthatóságot biztosít a teljes import folyamat során.

1.3. Célcsoport

- Magánszemélyek, akik külföldről importálnak autót
- Kis- és közepes autókereskedők
- Flottakezelők, szervizek, karosszériás műhelyek

2. Fő funkcionális modulok

2.1. Aggregátor motor (Adatgyűjtés)

Cél: Az összes releváns import oldal ajánlatainak egy helyen történő megjelenítése.

Funkciók:
- Aukciós és hirdetési oldalak rendszeres (15–60 percenkénti) szkennelése

- USA: Copart, IAAI, Manheim, eBay Motors
- Japán: USS, TAA, JU, ENCAR
- Dubaj: Dubizzle Motors, Emirates Auction
- Európa: Mobile.de, AutoScout24, Otomoto
- Web scraping + hivatalos API-k kombinációja
- Duplikátum-szűrés (ugyanaz a jármű több oldalon)
- Adatok normalizálása egységes sémába
- VIN-alapú járműazonosítás és előzmény-ellenőrzés
- Képek, videók, dokumentumok letöltése és tárolása

Normalizált adatmezők:
- VIN / alvázszám
- Márka, modell, évjárat, futásteljesítmény
- Üzemanyag, sebességváltó, hajtás
- Kárkategória, sérülés leírása
- Aukció típusa (nyílt / zárt), licit kezdete, zárása
- Jelenlegi licit / kikiáltási ár
- Valuta, becsült teljes költség HUF-ban
- Helyszín, szállítási opciók
- Eladó értékelése, előzményei

Funkciók:
- Regisztráció e-maillel, Google-fiókkal
- Szerepkörök: vásárló, kereskedő, adminisztrátor
- Profil: értesítési beállítások, kedvenc márkák, preferált országok
- Keresési előzmények, mentett keresések
- Figyelőlista (watchlist)
- Értesítések: e-mail, push, SMS

---

2.3. Kereső és szűrő rendszer

Funkciók:
- Teljes szöveges keresés (márka, modell, kulcsszó)

- Speciális szűrők:
- Ország, aukcióház
- Ár (licit és teljes költség szerint)
- Évjárat, futásteljesítmény
- Üzemanyag, sebességváltó
- Kárkategória (clean, salvage, rebuilt)
- Aukció zárásának ideje
- Rendezés: ár, zárási idő, frissesség, teljes költség
- Összehasonlító nézet (2–4 jármű egymás mellett)
- "Teljes költség kalkulátor" minden ajánlatnál

---

2.4. Licitálási és ajánlattételi modul

Funkciók:
- Élő licitkövetés (valós idejű frissítés WebSocketen)
- Közvetlen licitálás a platformon keresztül (partner aukcióházakon keresztül)
- Automatikus licit (max. összeg megadása)
- Licit előtti költségbecslés (aukciós díj, szállítás, vám, ÁFA)
- Licitnapló és visszaigazolás
- Ügyfélmegbízás (proxy bidding) opció
- Figyelmeztetések: "5 perc van hátra", "Túllicitáltak"

---

2.5. Teljes költség kalkulátor

Cél: A teljes importköltség átlátható megjelenítése még licitálás előtt.

Kalkulált tételek:
| Tétel | Leírás |
|---|---|
| Aukciós ár | Jelenlegi vagy becsült nyertes licit |
| Aukciós díj | Aukcióház díja |

| Export dokumentáció | USA/Japán/Dubaj export okmányok |
| Szállítás kikötőig | Belföldi szállítás |
| Tengeri szállítás | Konténeres vagy Ro-Ro |
| Vám | Magyarországi vámérték alapján |
| ÁFA | 27% (vagy fordított adózás kereskedőknek) |
| Regisztrációs díj | Forgalomba helyezés |
| Ügynökségi díj | WeltWagen szolgáltatási díja |
| Egyéb | Tisztítás, javítás, tárolás |

Funkciók:
- Valutaátváltás élő árfolyamon
- Költségbecslés mentése, megosztása
- PDF export

---

2.6. Logisztikai modul

Funkciók:
- Szállítási ajánlatok kérése (fuvarozók hálózata)
- Szállítási státusz követése (dashboard)
- Konténer/Ro-Ro választás
- Dokumentumkezelés (B/L, CMR, számlák)
- Vámkezelési támogatás
- Érkezési értesítés, átvételi időpont egyeztetés

---

2.7. Fizetési modul

Funkciók:
- Banki átutalás (nemzetközi)
- Kártyás fizetés (Stripe)
- Escrow (letéti) szolgáltatás
- Részletfizetés (partneri konstrukcióban)

Á

- Számlázás, ÁFA-kezelés
- Tranzakciós előzmények

---

2.8. Értesítési rendszer

Csatornák:
- E-mail
- Push értesítés (mobil)
- SMS (kritikus események)
- In-app értesítés

Események:
- Új ajánlat a mentett keresésre
- Licit zárás előtt 24h / 1h / 5min
- Túllicitáltak
- Nyertes licit
- Szállítási státusz változás
- Fizetési emlékeztető

---

2.9. Adminisztrációs felület

Funkciók:
- Felhasználókezelés, jogosultságok
- Aukcióház-partnerek kezelése
- Adatforrások monitorozása (scraper állapot)
- Ajánlatok moderálása
- Riportok, statisztikák
- Árfolyamok, díjak beállítása
- Hibajegyek kezelése

---

2.10. Mobilalkalmazás (későbbi fázis)

- iOS és Android natív app
- Push értesítés
- Licitálás mobilon
- Kamerás VIN-szkennelés
- Offline watchlist

---

3. Felhasználói folyamatok (User Flow)

3.1. Regisztráció → első licit
1. Regisztráció (e-mail / Google)
2. Szerepkör kiválasztása (magán / kereskedő)
3. Preferenciák megadása (márkák, országok, büdzsé)
4. Keresés vagy ajánlott ajánlatok böngészése
5. Jármű kiválasztása → teljes költség kalkulátor
6. Watchlistre helyezés vagy azonnali licit
7. Licit megerősítése, értesítések beállítása
8. Licit nyerése → fizetés → logisztika indítása

3.2. Kereskedői folyamat
1. Nagykereskedelmi fiók igénylése
2. API-hozzáférés kérése
3. Tömeges licitálás / megbízás
4. Számlázás, fordított ÁFA
5. Rendszeres szállítási partnerség

---

4. Rendszerarchitektúra (funkcionális nézet)

```

[Adatforrások] → [Scraper/API réteg] → [Normalizáló motor] → [Adatbázis]

↓

[Felhasználói felület] ← [API Gateway] ← [Üzleti logika] ← [Kereső motor]
↓ ↓ ↓
[Web/Mobil] [Értesítések] [Kalkulátor]
↓
[Fizetés] [Logisztika] [Admin]
```

Fő komponensek:
- Adatgyűjtő szolgáltatás (scraper farm, ütemező)
- Normalizáló és deduplikáló motor
- Kereső index (Elasticsearch)
- API Gateway (REST + WebSocket)
- Felhasználói frontend (React/Next.js)
- Admin panel
- Értesítési szolgáltatás
- Fizetési integráció
- Logisztikai partnerintegráció

---

5. Adatmodell (fő entitások)

- User – felhasználó (szerepkör, preferenciák, fizetési adatok)
- Vehicle – normalizált jármű (VIN, adatok, képek)
- Listing – konkrét ajánlat (forrás, ár, licit állapot)
- Auction – aukció metaadatok (kezdet, zárás, szabályok)
- Bid – licit (felhasználó, összeg, időpont, státusz)
- Watchlist – figyelt járművek
- CostEstimate – költségbecslés
- Shipment – szállítás (státusz, dokumentumok)
- Payment – tranzakció
- Notification – értesítés
- Partner – aukcióház, fuvarozó, vámügynök

---

6. Nem funkcionális követelmények

| Szempont | Követelmény |
|---|---|
| Teljesítmény | Keresés < 500 ms, licit frissítés < 2 s |
| Skálázhatóság | 100 000+ aktív ajánlat, 10 000+ párhuzamos felhasználó |
| Elérhetőség | 99,5% uptime |
| Biztonság | GDPR, SSL, 2FA, audit log |
| Nyelv | Magyar, angol (később német, román) |
| Valuta | HUF, EUR, USD, JPY, AED |
| Eszközök | Reszponzív web + mobil app |

---

7. Fejlesztési fázisok (roadmap)

Fázis 1 – MVP (0–3 hónap)
- Aggregátor motor 4-5 kiemelt forrással
- Webes kereső és szűrő
- Teljes költség kalkulátor
- Regisztráció, watchlist, értesítések
- Admin alapfunkciók

Fázis 2 – Bővítés (3–6 hónap)
- Közvetlen licitálás partnereken keresztül
- Fizetési modul
- Logisztikai követés
- Kereskedői fiók, API

Fázis 3 – Skálázás (6–12 hónap)
- Mesterséges intelligencia alapú ajánlás
- Automatikus kárfelmérés képekből

- Nemzetközi terjeszkedés

---

8. Kulcs teljesítménymutatók (KPI)

- Regisztrált felhasználók száma
- Aktív licitek száma / hó
- Sikeres importok száma
- Átlagos ügynökségi bevétel / tranzakció
- Felhasználói elégedettség (NPS)
- Adatforrások lefedettsége
- Licitálási konverzió (megtekintés → licit)

---

9. Kockázatok és kezelésük

| Kockázat | Kezelés |
|---|---|
| Aukciós oldalak blokkolják a scrapinget | Hivatalos API-partnerségek, proxy hálózat |
| Jogszabályi változások (vám, ÁFA) | Jogi tanácsadó, rugalmas kalkulátor |
| Adatpontatlanság | Több forrás kereszt-ellenőrzése |
| Bizalmatlanság | Escrow fizetés, átlátható díjak, értékelések |
| Verseny | Egyedi UX, teljes költség átláthatóság, logisztikai integráció |

---

10. Összefoglalás

A WeltWagen funkcionális terve egy aggregátor + tranzakciós + logisztikai platformot ír le,
amelynek központi értéke az átláthatóság és a teljes költség egy helyen történő
megjelenítése . A rendszer moduláris felépítésű, így fokozatosan fejleszthető az MVP-től a
nemzetközi skálázásig.

---

Készült: WeltWagen projekt – Funkcionális terv v1.0
