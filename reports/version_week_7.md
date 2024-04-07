Michelle Gavlák
7.týždeň: 1.4.2024 - 7.4.2024
version_week_7


TimeTrackr


Tag: version_week_7


Plán:
Začať databázu a backend, api, pre udalosti a úlohy, popri tom upravovať aj frontend


Realita:
-- no commit -- created database on render.com, with test data
-- no commit -- published site at https://timetrackr.onrender.com
71ef8bd add test of connecting to database and calling api

Prečo sa nerobilo podľa plánu:
Navyše sa publishla stránka na render.com, keď sa už spojaznila databáza, tak rovno aj publish som skúsila


Ďalší týždeň:
Kalendár, prepojenie všetkého aby to fungovalo
Zamerať sa na konkrétne obrazovky, aby plne fungovali end-to-end

Zmeny oproti špecifikácii:
Pridané technológie "pg", "dotenv", "cors" na prepojenie databázy a Node.js, a "axios" na volanie api:
"pg": "^8.11.5"
"dotenv": "^16.4.5"
"cors": "^2.8.5"
"axios": "^1.6.8"

Iné pomenovania tabuliek a stĺpcov v databáze:
Mená tabuliek v databáze sú v pluráli
V databáze sú premenované stĺpce typu {atr}_date na date_{atr}