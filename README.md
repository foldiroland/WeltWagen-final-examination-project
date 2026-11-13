WeltWagen – Funkcionalitási terv
W eltW agen – Funkcionalitási terv
Földi Roland - Bakos Dominik · Vizsgaremek · 2026. november 13.
· 1.0 verzió
1. Projekt áttekintése
A WeltWagen digitális autóaukciós és logisztikai platform, amely egyszerűvé és
átláthatóvá teszi a járműimportot az USA-ból, Japánból, Dubajból és Európából. Egyetlen
felületen gyűjti össze a különböző aukciós és hirdetési oldalak ajánlatait, egységesíti az
adatokat, és a licit előtt megmutatja az import teljes költségét.
1.1. A megoldott probléma
Az import autó piac széttagolt: több tucat aukciós oldal (Copart, IAAI, Manheim, USS,
T AA, ENCAR, Dubizzle stb.).
Eltérő nyelvek, valuták és licitálási szabályok.
Átláthatatlan teljes költség: aukciós díj + szállítás + vám + ÁF A + regisztráció.
Az ajánlatok nehezen hasonlíthatók össze.
A felhasználók bizalmatlanok a kereskedőkkel szemben.
1.2. Célcsoport
Magánszemélyek, akik külföldről importálnak autót.
Kis- és közepes autókereskedők.
Flottakezelők, szervizek, karosszériás műhelyek.
1.3. Központi érték
Átláthatóság: egy helyen látszik az ajánlat, a pontos költség, a licit állapota és a szállítás
útja.
2. Hatókör: vizsgaremek és teljes vízió
A teljes vízió egy hosszabb vállalkozás méretű rendszer . A vizsgaremekben azt a magot
valósítom meg, amely működő, bemutatható és tesztelhető. A többi modul a roadmap
része marad.
Page 1 of 13
WeltWagen – Funkcionalitási terv
Modul Vizsgaremek (MVP) Későbbi f ázis
Adatgyűjtés Normalizált, szimulált
adatforrások (seed adat,
JSON/CSV import), duplikátum-
szűrés VIN alapján
Felhasználókezelés Regisztráció, bejelentkezés,
szerepkörök, profil
Kereső és szűrő Szöveges keresés, szűrők,
rendezés, összehasonlítás
Licitálás V alós idejű licitkövetés
W ebSocketen, licitnapló,
automatikus licit a platformon
belül
Költségkalkulátor T eljes funkció, mentés, PDF
export
W atchlist,
értesítések
W atchlist, in-app és e-mail
értesítés
Logisztika Szállítási státusz követése
(dashboard), dokumentumlista
Fizetés Stripe tesztmód vagy szimulált
fizetés, tranzakciós előzmények
Admin Felhasználók, ajánlatok, díjak és
árfolyamok kezelése
V alódi scraper/API
partnerségek, 15–60 perces
ütemezés
Google-fiók, 2F A
Elasticsearch index
Közvetlen licit partner
aukcióházakon át, proxy bidding
Élő jogszabály- és díjfrissítés
Push, SMS
Fuvarozói hálózat,
vámügyintézés
Escrow , részletfizetés
Scraper-monitorozás, riportok,
hibajegyek
Mobilapp – iOS/Android, VIN-szkennelés
3. Szerepkörök és jogosultságok
Szerepkör Jogosultságok
V endég Ajánlatok böngészése és keresése,
költségkalkulátor használata (mentés nélkül)
V ásárló (magánszemély) V endég jogai + licitálás, watchlist, mentett
keresések, költségbecslések mentése, rendelés-
és szállításkövetés
Page 2 of 13
WeltWagen – Funkcionalitási terv
Szerepkör Jogosultságok
Kereskedő Adminisztrátor V ásárlói jogok + fordított ÁF A, tömeges megbízás,
számlázás, később API-hozzáférés
Felhasználók és jogosultságok kezelése, ajánlatok
moderálása, díjak és árfolyamok beállítása,
statisztikák
A jogosultságokat a backend minden végponton ellenőrzi (JWT + szerepkör-middleware).
A frontend csak elrejti a nem elérhető elemeket.
4. Funkcionális modulok
4.1. Aggregátor motor (adatgyűjtés)
Cél: az import oldalak ajánlatainak egy helyen történő megjelenítése.
T ervezett források:
USA: Copart, IAAI, Manheim, eBay Motors
Japán: USS, T AA, JU, ENCAR
Dubaj: Dubizzle Motors, Emirates Auction
Európa: Mobile.de, AutoScout24, Otomoto
Funkciók:
Rendszeres lekérdezés 15–60 percenként, hivatalos API-k és scraping
kombinációjával.
Duplikátum-szűrés: ugyanaz a jármű több oldalon, VIN alapján.
Adatok normalizálása egységes sémába.
VIN-alapú azonosítás és előzmény-ellenőrzés.
Képek, videók és dokumentumok letöltése és tárolása.
Normalizált adatmezők:
VIN / alvázszám
Márka, modell, évjárat, futásteljesítmény
Üzemanyag, sebességváltó, hajtás
Kárkategória és sérülés leírása
Aukció típusa (nyílt / zárt), licit kezdete és zárása
Jelenlegi licit / kikiáltási ár , valuta
Becsült teljes költség HUF-ban
Page 3 of 13
WeltWagen – Funkcionalitási terv
Helyszín, szállítási opciók
Eladó értékelése és előzményei
Vizsgaremek-megoldás: a forrásoldalak adatait egy import szolgáltatás szimulálja (előre
elkészített JSON/CSV f ájlok oldalanként eltérő formátumban). A normalizáló réteg ezeket
alakítja át egységes sémára. Így a teljes feldolgozási lánc bemutatható anélkül, hogy a
valós oldalak használati feltételeit sértenénk.
Elfogadási kritérium: a különböző formátumú forrásf ájlok importja után a rendszerben
egységes Vehicle és Listing rekordok jelennek meg, a duplikált VIN-ek egy járműhöz
kapcsolódnak.
4.2. Felhasználókezelés
Regisztráció e-maillel (később Google-fiókkal).
Bejelentkezés, kijelentkezés, jelszó-visszaállítás.
Szerepkör kiválasztása regisztrációkor (magánszemély / kereskedő).
Profil: értesítési beállítások, kedvenc márkák, preferált országok.
Keresési előzmények és mentett keresések.
Figyelőlista (watchlist).
Elfogadási kritérium: jelszó csak hashelve tárolódik; védett végpontok token nélkül 401-et
adnak, jogosulatlan szerepkörnek 403-at.
4.3. Kereső és szűrő rendszer
T eljes szöveges keresés (márka, modell, kulcsszó).
Szűrők: ország és aukcióház, ár (licit és teljes költség szerint), évjárat,
futásteljesítmény , üzemanyag, sebességváltó, kárkategória (clean, salvage, rebuilt),
aukció zárásának ideje.
Rendezés: ár , zárási idő, frissesség, teljes költség.
Összehasonlító nézet: 2–4 jármű egymás mellett.
T eljes költség kalkulátor minden ajánlatnál.
Lapozás, a szűrők állapota az URL -ben (megosztható keresés).
Elfogadási kritérium: a találati lista szűrés és rendezés után a szerver oldalon számolt
eredményt mutatja, a válaszidő helyi környezetben 500 ms alatt marad.
4.4. Licitálási és ajánlattételi modul
Élő licitkövetés W ebSocketen, 2 másodpercen belüli frissítéssel.
Licit leadása a platformon, minimum licitlépcső ellenőrzésével.
Page 4 of 13
WeltWagen – Funkcionalitási terv
Automatikus licit: a felhasználó maximum összeget ad meg, a rendszer a lépcsők
szerint licitál helyette.
Licit előtti költségbecslés (aukciós díj, szállítás, vám, ÁF A).
Licitnapló és visszaigazolás.
Figyelmeztetések: „5 perc van hátra ”
, „T úllicitáltak”
.
Később: közvetlen licitálás partner aukcióházakon át (proxy bidding /
ügyfélmegbízás).
Üzleti szabályok:
Csak bejelentkezett vásárló vagy kereskedő licitálhat.
Lezárt aukcióra nem lehet licitálni.
Az új licit mindig magasabb az aktuálisnál legalább a licitlépcsővel.
Az aukció a zárás pillanatában nyertest hirdet, és értesítést küld.
4.5. T eljes költség kalkulátor
Cél: az importköltség átlátható megjelenítése licit előtt.
T étel Leírás
Aukciós ár Jelenlegi vagy becsült nyertes licit
Aukciós díj Az aukcióház díja
Export dokumentáció USA / Japán / Dubaj export okmányok
Szállítás kikötőig Belföldi szállítás a származási országban
T engeri szállítás Konténeres vagy Ro-Ro
V ám Magyarországi vámérték alapján
ÁF A 27% (vagy fordított adózás kereskedőknek)
Regisztrációs díj Forgalomba helyezés
Ügynökségi díj A W eltW agen szolgáltatási díja
Egyéb Tisztítás, javítás, tárolás
Számítási modell (egyszerűsített):
Page 5 of 13
WeltWagen – Funkcionalitási terv
vámérték = aukciós ár + aukciós díj + export dok. + szállítás kikötőig +
tengeri szállítás
ÁFA-alap = vámérték + vám
ÁFA = ÁFA-alap × 27% (kereskedő, fordított adózás: 0 a számlán)
teljes költség = vámérték + vám + ÁFA + regisztráció + ügynökségi díj + egyéb
A vám és az ÁF A pontos számítása jogszabályfüggő. A kalkulátor ezért a díjtételeket és
kulcsokat az admin felületen szerkeszthető konfigurációból olvassa, nem a kódból.
Funkciók:
V alutaátváltás (HUF , EUR, USD , JPY , AED) árfolyamtáblából.
Költségbecslés mentése és megosztása linkkel.
PDF export.
Elfogadási kritérium: ugyanarra a bemenetre a kalkulátor mindig ugyanazt az összeget
adja, és a tételes bontás összege megegyezik a végösszeggel.
4.6. Logisztikai modul
Szállítási státusz követése dashboardon (pl. megvásárolva → kikötőben → úton →
vámkezelés → megérkezett → átvéve).
Konténeres vagy Ro-Ro választás.
Dokumentumkezelés: B/L, CMR, számlák.
Érkezési értesítés, átvételi időpont egyeztetése.
Később: szállítási ajánlatkérés a fuvarozói hálózattól, vámkezelési támogatás.
4.7. Fizetési modul
Kártyás fizetés (Stripe, tesztmódban).
Banki átutalás (nemzetközi) rögzítése.
Számlázás, ÁF A-kezelés, tranzakciós előzmények.
Később: escrow (letéti) szolgáltatás, részletfizetés partneri konstrukcióban.
4.8. Értesítési rendszer
Csatornák: in-app, e-mail (később push és SMS a kritikus eseményekre).
Események:
Új ajánlat a mentett keresésre
Licitzárás előtt 24 óra / 1 óra / 5 perc
T úllicitálás
Page 6 of 13
WeltWagen – Funkcionalitási terv
Nyertes licit
Szállítási státusz változás
Fizetési emlékeztető
A felhasználó a profiljában eseményenként és csatornánként kapcsolhatja ki-be az
értesítéseket.
4.9. Adminisztrációs felület
Felhasználókezelés és jogosultságok.
Aukcióház-partnerek kezelése.
Ajánlatok moderálása.
Árfolyamok, díjak és adókulcsok beállítása.
Adatforrások monitorozása (importok állapota, hibái).
Riportok, statisztikák.
Hibajegyek kezelése.
Audit log a kritikus műveletekről.
4.10. Mobilalkalmazás (későbbi fázis)
iOS és Android natív app: push értesítés, licitálás mobilon, kamerás VIN-szkennelés,
offline watchlist.
5. Felhasználói folyamatok
5.1. Regisztráció → első licit
1. Regisztráció (e-mail / Google).
2. Szerepkör kiválasztása (magán / kereskedő).
3. Preferenciák megadása (márkák, országok, büdzsé).
4. Keresés vagy ajánlott ajánlatok böngészése.
5. Jármű kiválasztása → teljes költség kalkulátor .
6. W atchlistre helyezés vagy azonnali licit.
7. Licit megerősítése, értesítések beállítása.
8. Licit nyerése → fizetés → logisztika indítása.
5.2. Kereskedői folyamat
1. Nagykereskedelmi fiók igénylése.
2. API-hozzáférés kérése.
Page 7 of 13
WeltWagen – Funkcionalitási terv
3. T ömeges licitálás / megbízás.
4. Számlázás, fordított ÁF A.
5. Rendszeres szállítási partnerség.
6. Rendszerarchitektúra
[Adatforrások] → [Import / Scraper réteg] → [Normalizáló és deduplikáló
motor] → [Adatbázis]
↑
[React frontend] ⇄ [REST API + WebSocket (Express)] ⇄ [Üzleti logika] ⇄
[Kereső / szűrő]
│ │ │
[Értesítések] [Kalkulátor] [Fizetés · Logisztika · Admin]
Réteg T echnológia
Frontend React, HTML, CSS, ESLint
Backend Node.js, Express, REST API
V alós idejű kommunikáció W ebSocket (pl. Socket.IO vagy ws)
Adatbázis Helyi adatbázis (localhost)
Hitelesítés JWT , jelszóhash
Fejlesztői eszközök nodemon, ESLint, Git
Későbbi bővítés Elasticsearch, Next.js, push/SMS szolgáltató, natív
mobilapp
7. Adatmodell
Entitás Leírás Fő mezők
User Felhasználó id, e-mail, jelszóhash, szerepkör ,
preferenciák
V ehicle Normalizált jármű VIN, márka, modell, évjárat, futás,
üzemanyag, váltó, hajtás, kárkategória,
képek
Page 8 of 13
WeltWagen – Funkcionalitási terv
Entitás Leírás Fő mezők
Listing Konkrét ajánlat id, vehicleId, forrás, ár , valuta, státusz,
helyszín
Auction Aukció metaadatok id, listingId, típus, kezdet, zárás, licitlépcső
Bid Licit id, auctionId, userId, összeg, időpont,
státusz, automatikus-e
W atchlist Figyelt járművek userId, listingId
SavedSearch Mentett keresés userId, szűrők, értesítés be/ki
CostEstimate Költségbecslés id, userId, listingId, tételek, végösszeg,
árfolyam
Shipment Szállítás id, listingId, státusz, módja, dokumentumok
P ayment T ranzakció id, userId, összeg, státusz, mód
Notification Értesítés id, userId, típus, tartalom, olvasott
P artner Aukcióház, fuvarozó,
vámügynök
id, típus, név , elérhetőség
Fő kapcsolatok: V ehicle 1–N Listing · Listing 1–1 Auction · Auction 1–N Bid · User 1–N Bid /
W atchlist / CostEstimate / P ayment / Notification · Listing 1–1 Shipment.
8. REST API vázlat
Módszer V égpont Leírás Hozzáférés
POST /api/auth/register Regisztráció V endég
POST /api/auth/login Bejelentkezés, token V endég
GET /api/users/me Saját profil Bejelentkezett
PUT /api/users/me Profil, preferenciák
módosítása
Bejelentkezett
GET /api/listings Keresés, szűrés,
rendezés, lapozás
V endég
GET /api/listings/:id Ajánlat részletei V endég
GET /api/listings/compare?
ids=
Összehasonlítás (2–4
jármű)
V endég
Page 9 of 13
WeltWagen – Funkcionalitási terv
Módszer V égpont Leírás Hozzáférés
POST /api/cost-estimates Költségbecslés számítása V endég
GET /api/cost-
estimates/:id/pdf
PDF export Bejelentkezett
GET /api/auctions/:id/bids Licitnapló Bejelentkezett
POST /api/auctions/:id/bids Licit leadása V ásárló,
kereskedő
PUT /api/auctions/:id/auto-
bid
Automatikus licit
beállítása
V ásárló,
kereskedő
/api/watchlist Figyelőlista kezelése Bejelentkezett
GET / POST /
DELETE
GET / POST /
DELETE
/api/saved-searches Mentett keresések Bejelentkezett
GET /api/notifications Értesítések listája Bejelentkezett
GET /api/shipments/:id Szállítás státusza T ulajdonos,
admin
POST /api/payments Fizetés indítása Bejelentkezett
GET / PUT /api/admin/settings Díjak, árfolyamok,
adókulcsok
Admin
GET / PUT /api/admin/users Felhasználók kezelése Admin
POST /api/admin/import Adatimport indítása Admin
WebSocket események: bid:new, bid:outbid, auction:closing (5 perc),
auction:closed, shipment:status.
9. Nem funkcionális követelmények
Szempont Követelmény
T eljesítmény Skálázhatóság (cél) Keresés < 500 ms, licitfrissítés < 2 s
100 000+ aktív ajánlat, 10 000+ párhuzamos
felhasználó
Elérhetőség (cél) 99,5% uptime
Page 10 of 13
WeltWagen – Funkcionalitási terv
Szempont Követelmény
Biztonság GDPR, SSL, jelszóhash, bemenet-validáció,
szerepkör-ellenőrzés, audit log, később 2F A
Nyelv Magyar és angol, később német és román
V aluta HUF , EUR, USD , JPY , AED
Eszközök Reszponzív web, később mobilapp
Kódminőség ESLint, egységes kódstílus, verziókezelés Gitben
A skálázhatósági és elérhetőségi értékek a teljes rendszer céljai. A vizsgaremekben a
teljesítménykövetelmények helyi környezetben igazolhatók.
10. Fejlesztési ütemterv
Fázis 1 – MVP (vizsgaremek)
Normalizáló és import motor szimulált forrásokkal
W ebes kereső és szűrő, összehasonlító nézet
T eljes költség kalkulátor
Regisztráció, bejelentkezés, watchlist, in-app értesítések
Élő licitálás a platformon belül
Admin alapfunkciók
Fázis 2 – Bővítés (3–6 hónap)
Közvetlen licitálás partnereken keresztül
T eljes fizetési modul
Logisztikai követés fuvarozói integrációval
Kereskedői fiók és API
Fázis 3 – Skálázás (6–12 hónap)
Mesterséges intelligencia alapú ajánlás
Automatikus kárfelmérés képekből
Mobilalkalmazás
Nemzetközi terjeszkedés
11. T eszt- és minőségbiztosítási terv
Egységtesztek: költségkalkulátor , licitszabályok, normalizáló függvények.
Page 11 of 13
WeltWagen – Funkcionalitási terv
API-tesztek: hitelesítés, jogosultságok, licit leadása, hibás bemenetek.
Kézi tesztforgatókönyvek: a két felhasználói folyamat (5.1 és 5.2) végigjátszása.
Valós idejű teszt: két böngészőablakból egyszerre licitálás, a frissítés késésének
mérése.
Statikus ellenőrzés: ESLint hibamentesség a beadás előtt.
12. Kulcs teljesítménymutatók (KPI)
Regisztrált felhasználók száma
Aktív licitek száma havonta
Sikeres importok száma
Átlagos ügynökségi bevétel tranzakciónként
Felhasználói elégedettség (NPS)
Adatforrások lefedettsége
Licitálási konverzió (megtekintés → licit)
13. Kockázatok és kezelésük
Kockázat Kezelés
Az aukciós oldalak blokkolják a scrapinget,
vagy a használati feltételek tiltják
Jogszabályi változások (vám, ÁF A) Adatpontatlanság Bizalmatlanság V erseny T úl nagy hatókör a vizsgaremekhez Hivatalos API-partnerségek, proxy hálózat; a
vizsgaremekben szimulált adatforrások
Jogi tanácsadó, szerkeszthető díj- és
adókonfiguráció
T öbb forrás kereszt-ellenőrzése, VIN-
validáció
Escrow fizetés, átlátható díjak, értékelések
Egyedi UX, teljes költség átláthatósága,
logisztikai integráció
Az MVP-modulok előre rögzítése (2. fejezet),
a többi roadmap
Page 12 of 13
WeltWagen – Funkcionalitási terv
1 4. Összefoglalás
A W eltW agen aggregátor , tranzakciós és logisztikai platform, amelynek központi értéke az
átláthatóság és a teljes költség egy helyen történő megjelenítése. A rendszer moduláris,
így az MVP-től a nemzetközi skálázásig fokozatosan fejleszthető. A vizsgaremek a működő
magot valósítja meg: normalizált adatok, kereső, költségkalkulátor , felhasználókezelés és
élő licitálás.
Page 13 of 13
