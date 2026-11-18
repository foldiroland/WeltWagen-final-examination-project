# WeltWagen


Importálj okosabban. Láss mindent egy
helyen.

A **WeltWagen** egy digitális autóaukciós és logisztikai platform
koncepciója, amely egyetlen felületen gyűjti össze a különböző országok
aukciós és hirdetési oldalain elérhető járműajánlatokat. A cél, hogy a
felhasználó ne csak az autó aktuális árát lássa, hanem a vásárlás és az
import várható teljes költségét, a licit állapotát és a szállítás
folyamatát is.

> **Projekt:** vizsgaremek\
> **Készítő:** Földi Roland - Bakos Dominik\
> **Dokumentumverzió:** 1.2\
> **Dátum:** 2026. november 13.

------------------------------------------------------------------------

## Tartalomjegyzék

-   [A projektről](#a-projektről)
-   [A megoldandó probléma](#a-megoldandó-probléma)
-   [Célcsoport](#célcsoport)
-   [Fő funkciók](#fő-funkciók)
-   [MVP és fejlesztési hatókör](#mvp-és-fejlesztési-hatókör)
-   [Tervezett technológiai háttér](#tervezett-technológiai-háttér)
-   [Rendszerfelépítés](#rendszerfelépítés)
-   [Felhasználói szerepkörök](#felhasználói-szerepkörök)
-   [Adatmodell](#adatmodell)
-   [API -- fő végpontok](#api--fő-végpontok)
-   [Fejlesztési ütemterv](#fejlesztési-ütemterv)
-   [Tesztelés](#tesztelés)
-   [Biztonság és adatkezelés](#biztonság-és-adatkezelés)
-   [A projekt jelenlegi korlátai](#a-projekt-jelenlegi-korlátai)

------------------------------------------------------------------------

## A projektről

A nemzetközi autóimport sokszor nehezen átlátható folyamat. Az ajánlatok
különböző oldalakon jelennek meg, eltérő pénznemekkel, nyelvekkel és
licitálási szabályokkal. A vételár önmagában nem mutatja meg, mennyibe
kerül végül a jármű magyarországi forgalomba helyezése.

A WeltWagen ezt a folyamatot szeretné egyszerűbbé tenni:

-   több forrás járműajánlatainak egységes megjelenítésével;
-   keresési, szűrési és összehasonlítási lehetőségekkel;
-   részletes importköltség-becsléssel;
-   platformon belüli licitálással és licitkövetéssel;
-   a vásárláshoz kapcsolódó fizetési és logisztikai információk
    összefogásával.

**A központi érték az átláthatóság:** az ajánlat, a várható teljes
költség, a licit állapota és a szállítási folyamat egy helyen követhető.

## A megoldandó probléma

-   Az autóimport piaca széttagolt, az ajánlatok sok különböző aukciós
    és hirdetési oldalon találhatók.
-   Az oldalak eltérő nyelveket, valutákat és licitálási szabályokat
    használnak.
-   A teljes importköltség -- például az aukciós díj, a szállítás, a
    vám, az ÁFA és a regisztráció -- nehezen becsülhető meg.
-   A különböző források ajánlatai nehezen hasonlíthatók össze.
-   A folyamat átláthatatlansága bizalmatlanságot okozhat a vásárlókban.

## Célcsoport

-   Külföldről autót importáló magánszemélyek.
-   Kis- és közepes autókereskedések.
-   Flottakezelők.
-   Szervizek és karosszériás műhelyek.

## Fő funkciók

### 1. Járműajánlatok összegyűjtése

A tervezett adatforrások többek között:

  Régió    Tervezett források
  -------- ------------------------------------
  USA      Copart, IAAI, Manheim, eBay Motors
  Japán    USS, TAA, JU, ENCAR
  Dubaj    Dubizzle Motors, Emirates Auction
  Európa   Mobile.de, AutoScout24, Otomoto

A rendszer egységes jármű- és ajánlatstruktúrába rendezi a különböző
források adatait. A VIN/alvázszám alapján kiszűrhetők az ismétlődő
járművek, miközben egy járműhöz több különböző ajánlat is kapcsolódhat.

### 2. Keresés, szűrés és összehasonlítás

-   Keresés márka, modell és kulcsszó alapján.
-   Szűrés ország, aukcióház, ár, évjárat, futásteljesítmény, üzemanyag,
    váltó és kárkategória szerint.
-   Rendezés ár, aukciózárás, frissesség és becsült teljes költség
    alapján.
-   Két--négy jármű összehasonlítása.
-   Lapozás és megosztható, URL-ben tárolt keresési feltételek.

### 3. Teljes költség kalkulátor

A kalkulátor célja, hogy a felhasználó már licitálás előtt becslést
kapjon a jármű várható importköltségéről.

A tervezett tételek:

-   aukciós ár és aukciós díj;
-   exportdokumentáció;
-   származási országon belüli szállítás;
-   tengeri szállítás;
-   vám és ÁFA;
-   regisztrációs és ügynökségi díjak;
-   egyéb költségek, például tisztítás, javítás vagy tárolás.

Tervezett pénznemek: **HUF, EUR, USD, JPY és AED**. A kalkuláció
menthető, megosztható és PDF-formátumban exportálható.

A vám- és adóterhek pontos számítása jogszabályfüggő. A díjak és
adókulcsok ezért a terv szerint adminisztrálható konfigurációból
származnak, nem közvetlenül a programkódba vannak beégetve.

### 4. Licitálás

-   Élő licitkövetés WebSocket-kapcsolaton keresztül.
-   Licit leadása és a minimális licitlépcső ellenőrzése.
-   Automatikus licitálás a felhasználó által megadott maximális
    összegig.
-   Licitnapló és visszaigazolás.
-   Értesítés túllicitáláskor, illetve az aukció zárása előtt.

Licitálni csak bejelentkezett vásárló vagy kereskedő jogosult. Lezárt
aukcióra nem adható le licit.

### 5. Felhasználókezelés és figyelőlista

-   E-mailes regisztráció és bejelentkezés.
-   Kijelentkezés és jelszó-visszaállítás.
-   Felhasználói profil és preferenciák.
-   Mentett keresések és keresési előzmények.
-   Figyelőlista (watchlist).
-   Szerepköralapú jogosultságkezelés.

### 6. Logisztika és fizetés

A tervezett logisztikai modul dashboardon követi a jármű szállítási
állapotát, például:

`Megvásárolva → Kikötőben → Úton → Vámkezelés → Megérkezett → Átvéve`

A dokumentumkezeléshez többek között fuvarlevelek (B/L, CMR) és számlák
tartozhatnak. A fizetési modul terve Stripe tesztmódot vagy szimulált
fizetést, banki átutalás rögzítését és tranzakciós előzményeket
tartalmaz.

### 7. Értesítések és adminisztráció

A tervezett értesítési csatornák az alkalmazáson belüli értesítések és
az e-mail. Fontos esemény lehet például az új ajánlat, a túllicitálás, a
nyertes licit vagy a szállítási státusz változása.

Az adminisztrációs felület feladata többek között a felhasználók,
jogosultságok, ajánlatok, árfolyamok, díjak és adatimportok kezelése,
valamint a statisztikák és naplóbejegyzések megjelenítése.

------------------------------------------------------------------------

## MVP és fejlesztési hatókör

A teljes WeltWagen-koncepció hosszabb távú, több modulból álló rendszer.
A vizsgaremek az alapvető, bemutatható és tesztelhető működésre
koncentrál.

  -----------------------------------------------------------------------
  Modul                   Vizsgaremek (MVP)       Későbbi fejlesztés
  ----------------------- ----------------------- -----------------------
  Adatgyűjtés             Szimulált JSON/CSV      Valódi API-k és
                          adatforrások,           partneri
                          normalizálás, VIN-alapú adatkapcsolatok
                          duplikációszűrés        

  Felhasználók            Regisztráció,           Google-belépés, 2FA
                          bejelentkezés,          
                          szerepkörök, profil     

  Keresés                 Keresés, szűrés,        Elasticsearch
                          rendezés,               
                          összehasonlítás         

  Licitálás               Platformon belüli       Partner aukcióházakon
                          licitkövetés és         keresztüli licit
                          licitálás               

  Kalkulátor              Költségbecslés, mentés, Élő jogszabály- és
                          PDF-export              díjfrissítés

  Watchlist               Figyelőlista és         Push- és
                          alkalmazáson            SMS-értesítések
                          belüli/e-mail értesítés 

  Logisztika              Státuszkövető           Fuvarozói hálózat és
                          dashboard,              vámügyintézés
                          dokumentumlista         

  Fizetés                 Stripe tesztmód vagy    Escrow és
                          szimulált fizetés       részletfizetés

  Admin                   Felhasználók,           Részletes monitorozás
                          ajánlatok, díjak és     és riportok
                          árfolyamok kezelése     
  -----------------------------------------------------------------------

**Fontos:** a vizsgaremek adatimportja előre elkészített, különböző
formátumú JSON/CSV fájlokkal szimulálja a külső aukciós oldalakat. Ez
lehetővé teszi a teljes importálási és normalizálási folyamat
bemutatását valódi scraping vagy külső partnerkapcsolat nélkül.

## Tervezett technológiai háttér

  Réteg                      Technológia
  -------------------------- -----------------------------------------
  Frontend                   React, HTML, CSS
  Backend                    Node.js, Express
  API                        REST API
  Valós idejű kommunikáció   WebSocket (például Socket.IO vagy `ws`)
  Adatbázis                  Helyi adatbázis (localhost)
  Hitelesítés                JWT, jelszóhash
  Fejlesztői eszközök        ESLint, nodemon, Git

A későbbi bővítési lehetőségek között szerepel az Elasticsearch, a
Next.js, a push/SMS szolgáltatók és a natív mobilalkalmazás.

> A fenti technológiák a funkcionális tervben meghatározott
> céltechnológiák. A konkrét adatbázis-motor, telepítési környezet és
> projektstruktúra nincs ebben a dokumentumban rögzítve.

## Rendszerfelépítés

A tervezett adatfeldolgozási folyamat:

``` text
Külső adatforrások
       |
       v
Import / scraper réteg
       |
       v
Normalizáló és deduplikáló motor
       |
       v
Adatbázis
       |
       v
Üzleti logika
       |
       +------ Kereső és szűrő
       +------ Költségkalkulátor
       +------ Licitálás
       +------ Értesítések
       +------ Fizetés és logisztika
       +------ Adminisztráció
       |
       v
REST API + WebSocket (Express)
       |
       v
React frontend
```

## Felhasználói szerepkörök

  -----------------------------------------------------------------------
  Szerepkör                           Jogosultságok
  ----------------------------------- -----------------------------------
  Vendég                              Ajánlatok böngészése és keresése,
                                      költségkalkulátor használata mentés
                                      nélkül

  Vásárló                             Vendégfunkciók, licitálás,
                                      watchlist, mentett keresések és
                                      költségbecslések, rendelés- és
                                      szállításkövetés

  Kereskedő                           Vásárlói funkciók, fordított ÁFA,
                                      tömeges megbízás és számlázás;
                                      később API-hozzáférés

  Adminisztrátor                      Felhasználók, jogosultságok,
                                      ajánlatok, díjak és árfolyamok
                                      kezelése, statisztikák
  -----------------------------------------------------------------------

A jogosultságokat a backend ellenőrzi JWT-alapú hitelesítéssel és
szerepkör-middleware-rel. A frontend feladata nem helyettesíti a
szerveroldali jogosultság-ellenőrzést.

## Adatmodell

A tervezett fő entitások:

  Entitás          Szerep
  ---------------- ------------------------------------------------------------
  `User`           Felhasználói adatok, jelszóhash, szerepkör és preferenciák
  `Vehicle`        Normalizált járműadatok, VIN, műszaki adatok és képek
  `Listing`        Egy konkrét forrásból származó ajánlat
  `Auction`        Aukció típusa, kezdete, zárása és licitlépcső
  `Bid`            Felhasználói licit, összeg, időpont és státusz
  `Watchlist`      Figyelt ajánlatok
  `SavedSearch`    Mentett keresési feltételek
  `CostEstimate`   Mentett költségbecslés és annak tételei
  `Shipment`       Szállítási státusz, mód és dokumentumok
  `Payment`        Fizetési tranzakció
  `Notification`   Felhasználói értesítés
  `Partner`        Aukcióház, fuvarozó vagy vámügynök

Fő kapcsolatok:

-   Egy `Vehicle` több `Listing` rekordhoz kapcsolódhat.
-   Egy `Listing` egy `Auction` rekordhoz kapcsolódik.
-   Egy `Auction` több `Bid` rekordot tartalmazhat.
-   Egy `User` több licittel, figyelőlistás elemmel, költségbecsléssel,
    fizetéssel és értesítéssel rendelkezhet.
-   Egy `Listing` egy szállítási rekordhoz kapcsolódhat.

## API -- fő végpontok

A tervezett REST API főbb végpontjai:

  -------------------------------------------------------------------------------
  Metódus                 Végpont                         Leírás
  ----------------------- ------------------------------- -----------------------
  `POST`                  `/api/auth/register`            Regisztráció

  `POST`                  `/api/auth/login`               Bejelentkezés

  `GET`                   `/api/users/me`                 Saját profil lekérése

  `PUT`                   `/api/users/me`                 Profil és preferenciák
                                                          módosítása

  `GET`                   `/api/listings`                 Ajánlatok keresése,
                                                          szűrése és lapozása

  `GET`                   `/api/listings/:id`             Ajánlat részletei

  `GET`                   `/api/listings/compare?ids=`    Járművek
                                                          összehasonlítása

  `POST`                  `/api/cost-estimates`           Költségbecslés
                                                          számítása

  `GET`                   `/api/cost-estimates/:id/pdf`   Költségbecslés
                                                          PDF-exportja

  `GET`                   `/api/auctions/:id/bids`        Licitnapló

  `POST`                  `/api/auctions/:id/bids`        Licit leadása

  `PUT`                   `/api/auctions/:id/auto-bid`    Automatikus licit
                                                          beállítása

  `GET / POST / DELETE`   `/api/watchlist`                Figyelőlista kezelése

  `GET / POST / DELETE`   `/api/saved-searches`           Mentett keresések
                                                          kezelése

  `GET`                   `/api/notifications`            Értesítések listázása

  `GET`                   `/api/shipments/:id`            Szállítási státusz
                                                          lekérése

  `POST`                  `/api/payments`                 Fizetés indítása

  `GET / PUT`             `/api/admin/settings`           Díjak, árfolyamok és
                                                          adókulcsok kezelése

  `GET / PUT`             `/api/admin/users`              Felhasználók kezelése

  `POST`                  `/api/admin/import`             Adatimport indítása
  -------------------------------------------------------------------------------

Tervezett WebSocket-események:

-   `bid:new`
-   `bid:outbid`
-   `auction:closing`
-   `auction:closed`
-   `shipment:status`

## Fejlesztési ütemterv

### 1. fázis -- MVP / vizsgaremek

-   Normalizáló és importmotor szimulált adatforrásokkal.
-   Webes kereső, szűrő és összehasonlító nézet.
-   Teljes költség kalkulátor.
-   Regisztráció, bejelentkezés, watchlist és alkalmazáson belüli
    értesítések.
-   Platformon belüli élő licitálás.
-   Alapvető adminisztrációs funkciók.

### 2. fázis -- Bővítés 

-   Közvetlen licitálás partner aukcióházakon keresztül.
-   Teljes fizetési modul.
-   Logisztikai követés fuvarozói integrációval.
-   Kereskedői fiók és API.

### 3. fázis -- Skálázás

-   Mesterséges intelligencia alapú ajánlások.
-   Automatikus kárfelmérés képek alapján.
-   Mobilalkalmazás.
-   Nemzetközi terjeszkedés.

## Tesztelés

A tervezett tesztelési folyamat fő elemei:

-   **Egységtesztek:** költségkalkulátor, licitszabályok és normalizáló
    függvények.
-   **API-tesztek:** hitelesítés, jogosultságok, licitálás és hibás
    bemenetek kezelése.
-   **Kézi tesztek:** a vásárlói és kereskedői folyamatok végigjátszása.
-   **Valós idejű tesztek:** párhuzamos licitálás két böngészőablakból,
    frissítési késleltetés ellenőrzése.
-   **Statikus ellenőrzés:** ESLint-hibamentesség a beadás előtt.

A funkcionális tervben szereplő célértékek: helyi környezetben 500 ms
alatti keresési válaszidő és 2 másodpercen belüli licitfrissítés.

## Biztonság és adatkezelés

A tervezett alapelvek:

-   JWT-alapú hitelesítés.
-   Jelszavak biztonságos hash-elése; jelszó nem tárolható olvasható
    formában.
-   Szerveroldali szerepkör- és jogosultság-ellenőrzés.
-   Bemenetek validálása.
-   HTTPS/SSL használata az éles környezetben.
-   Kritikus műveletek naplózása (audit log).
-   GDPR-követelmények figyelembevétele.
-   Későbbi fejlesztésként kétlépcsős hitelesítés (2FA).

## A projekt jelenlegi korlátai

Ez a README a **WeltWagen funkcionális tervét** foglalja össze, nem a
tényleges forráskód és a kész alkalmazás állapotjelentése.

-   A külső aukciós adatforrások integrációját az MVP szimulált JSON/CSV
    fájlokkal mutatja be.
-   A valódi aukcióházi API-k és scraping-integrációk későbbi
    fejlesztési feladatok.
-   A fizetési folyamat tesztmódú vagy szimulált lehet.
-   A logisztikai és partneri integrációk a későbbi fejlesztési fázis
    részei.
-   A vám- és adóterhek becslése konfigurálható díjakra épül; a pontos
    értékek jogszabály- és körülményfüggők.
-   A konkrét telepítési parancsok, környezeti változók és
    könyvtárstruktúra a tényleges kódbázis ismeretében egészíthetők ki.

------------------------------------------------------------------------

**WeltWagen -- Átláthatóbb út a külföldi autóajánlattól a magyarországi
átvételig.**
