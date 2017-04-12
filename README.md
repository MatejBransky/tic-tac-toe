1. nastavení
  - člověk vs člověk / člověk vs PC -> publish('type', PC: false/true)
  - výběr X/O -> publish('marks', )
2. status
  - stats: vstupní parametry: skóre ([hráč1, hráč2]) -> subscribe('score', [skóre hráče 1, skóre hráče 2])
3. hra
  - vstupní parametry: X/O, PC: false/true
  - render políček (Handlebars)
  - event listener -> #board -> delegace na jednotlivá políčka (.fields)
    - aktualizace pole se stavem políček (null -> X/O (player[0/1].mark))
    - publish('boardChanged', array)

1. načtu stránku
2. vyberu typ hry: a) hráč vs hráč / b) hráč vs PC
3. vyberu si značku X / O
4. načte se hra: nulové skóre, prázdná hrací plocha s políčky
5. kliknu na políčko a označí se mojí značkou
6a. další hráč může označit políčko
6b. PC označí nejvýhodnější políčko
7. v případě remízy se zobrazí remíza
7a. v případě výhry se zobrazí vítězná zpráva s vítěznou značkou
7b. v případě výhry hráče se zobrazí vítězná zpráva a v případě výhry PC se zobrazí prohra pro hráče
8. změní se skóre
9. načte se nová hra

1.  HTML pro nastavení typu hry a inicializuje se stav skóre [0, 0]
    setScore(winner: player 0/1)
    events.subscribe('winEnd', setScore)
2.  po výběru typu hry se to uloží do nastavení a změní se HTML pro výběr značky
3.  po výběru značky se uloží značky do nastavení a změní se HTML pro hru (game(nastavení))
4.  HTML: načte se blok se skórem, značkami pro hráče, kdo je první na řadě
    HTML: načte se prázdná hrací plocha a přiřadí se eventlistener(click) k hrací ploše
5.  po kliknutí na políčko se označí znakem aktivního hráče a uloží se do pole (fields), 
    ověří se, jestli to není vítězný tah a pokud ano, tak vrátí vítěznou/é řadu/y, pokud ne, tak se změní aktivní hráč
6a. hraje stejně jako předchozí a opět se ověří vítězný tah
6b. spustí se funkce pro vyhodnocení nejlepšího tahu a poté označí toto políčko
7.  pokud není vítězný tah a všechna pole jsou plná, tak vyskočí okno - remíza
7a. pokud funkce pro vítězný tah vrátí vítěznou řadu, tak se označí a vyskočí okno - vítěz s danou značkou
7b. -||- 
8.  po určité době se anuluje pole v JS i v HTML a náhodně se vybere začínající hráč, a uloží se nový stav skóre

General recommendation => HOC