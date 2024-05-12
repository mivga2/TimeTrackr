Michelle Gavlák
final_version


TimeTrackr

https://github.com/mivga2/TimeTrackr
Tag: final_version

https://timetrackr.onrender.com

Stačí navštíviť stránku. Je to prepojené cez github, tak na render.com stačí spustiť deploy.


implementované:
prihlasovanie užívateľov
menežment priateľstiev
zobrazovanie priateľov
vytváranie kalendárov, udalostí, úloh
upravovanie udalostí a úloh
zobrazenie zoznamu udalostí a úloh
zobrazenie mesačného pohľadu kalendára aj s udalosťami
zdieľanie kalendárov a ich zobrazenie

rozpracované:
zobrazenie týždenného pohľadu kalendára

vôbec:
kategórie udalostí a úloh
zobrazenie úloh v kalendári
rozkliknutie udalosti z kalendára
filtre v zoznamoch položiek


Problémy:
reaktivita premenných a ich asynchronnosť, kedy sú dostupne aké hodnoty
hooks, kedy sa čo vykoná
rozdielné správanie na localhoste a hostingu
nepochopený session, namiesto toho autorizácia pomocou jwt tokenov
nepodporovaný bcrypt na frontende, aj ked na backende funguje
pochopenie vzťahu FE - BE, čo sa cez api posiela a kde to je, hlavne errors


Čo inak, ak znovu:
vyskúšala by som env variable, lebo som zabúdala prepínať url na server
viac času venovať pochopeniu session
použila by som viac knižníc, napr. na kalendár. Chcela som si to vyskúšať sama spraviť, ale existujú už riešenia, čo dobre fungujú
