/**
 * This file contains TypeScript enum-like definitions based on the KSeF XSD schema.
 * Based on: schemat.xsd
 */

/**
 * @description Kody krajów członkowskich Unii Europejskiej, w tym kod dla obszaru Irlandii Północnej
 */
export const KodyKrajowUE = {
  AT: "AUSTRIA",
  BE: "BELGIA",
  BG: "BUŁGARIA",
  CY: "CYPR",
  CZ: "CZECHY",
  DK: "DANIA",
  EE: "ESTONIA",
  FI: "FINLANDIA",
  FR: "FRANCJA",
  DE: "NIEMCY",
  EL: "GRECJA",
  HR: "CHORWACJA",
  HU: "WĘGRY",
  IE: "IRLANDIA",
  IT: "WŁOCHY",
  LV: "ŁOTWA",
  LT: "LITWA",
  LU: "LUKSEMBURG",
  MT: "MALTA",
  NL: "HOLANDIA",
  PL: "POLSKA",
  PT: "PORTUGALIA",
  RO: "RUMUNIA",
  SK: "SŁOWACJA",
  SI: "SŁOWENIA",
  ES: "HISZPANIA",
  SE: "SZWECJA",
  XI: "IRLANDIA PÓŁNOCNA",
} as const;
export type TKodyKrajowUE = keyof typeof KodyKrajowUE;

/**
 * @description Słownik kodów walut
 */
export const KodWaluty = {
  AED: "DIRHAM ZEA",
  AFN: "AFGANI",
  ALL: "LEK",
  AMD: "DRAM",
  ANG: "GULDEN ANTYLI HOLENDERSKICH",
  AOA: "KWANZA",
  ARS: "PESO ARGENTYŃSKIE",
  AUD: "DOLAR AUSTRALIJSKI",
  AWG: "GULDEN ARUBAŃSKI",
  AZN: "MANAT AZERBEJDŻAŃSKI",
  BAM: "MARKA ZAMIENNA",
  BBD: "DOLAR BARBADOSKI",
  BDT: "TAKA",
  BGN: "LEW",
  BHD: "DINAR BAHRAJSKI",
  BIF: "FRANK BURUNDYJSKI",
  BMD: "DOLAR BERMUDZKI",
  BND: "DOLAR BRUNEJSKI",
  BOB: "BOLIWIANO",
  BOV: "BOLIWIANO MVDOL",
  BRL: "REAL",
  BSD: "DOLAR BAHAMSKI",
  BTN: "NGULTRUM",
  BWP: "PULA",
  BYN: "RUBEL BIAŁORUSKI",
  BZD: "DOLAR BELIZEŃSKI",
  CAD: "DOLAR KANADYJSKI",
  CDF: "FRANK KONGIJSKI",
  CHE: "FRANK SZWAJCARSKI VIR EURO",
  CHF: "FRANK SZWAJCARSKI",
  CHW: "FRANK SZWAJCARSKI VIR FRANK",
  CLF: "JEDNOSTKA ROZLICZENIOWA CHILIJSKA",
  CLP: "PESO CHILIJSKIE",
  CNY: "YUAN RENMINBI",
  COP: "PESO KOLUMBIJSKIE",
  COU: "UNIDAD DE VALOR REAL KOLUMBILSKIE",
  CRC: "COLON KOSTARYKAŃSKI",
  CUC: "PESO WYMIENIALNE",
  CUP: "PESO KUBAŃSKIE",
  CVE: "ESCUDO REPUBLIKI ZIELONEGO PRZYLĄDKA",
  CZK: "KORONA CZESKA",
  DJF: "FRANK DŻIBUTI",
  DKK: "KORONA DUŃSKA",
  DOP: "PESO DOMINIKAŃSKIE",
  DZD: "DINAR ALGIERSKI",
  EGP: "FUNT EGIPSKI",
  ERN: "NAKFA",
  ETB: "BIRR",
  EUR: "EURO",
  FJD: "DOLAR FIDŻI",
  FKP: "FUNT FALKLANDZKI",
  GBP: "FUNT SZTERLING",
  GEL: "LARI",
  GGP: "FUNT GUERNSEY",
  GHS: "GHANA CEDI",
  GIP: "FUNT GIBRALTARSKI",
  GMD: "DALASI",
  GNF: "FRANK GWINEJSKI",
  GTQ: "QUETZAL",
  GYD: "DOLAR GUJAŃSKI",
  HKD: "DOLAR HONGKONGU",
  HNL: "LEMPIRA",
  HRK: "KUNA",
  HTG: "GOURDE",
  HUF: "FORINT",
  IDR: "RUPIA INDONEZYJSKA",
  ILS: "SZEKEL",
  IMP: "FUNT MANX",
  INR: "RUPIA INDYJSKA",
  IQD: "DINAR IRACKI",
  IRR: "RIAL IRAŃSKI",
  ISK: "KORONA ISLANDZKA",
  JEP: "FUNT JERSEY",
  JMD: "DOLAR JAMAJSKI",
  JOD: "DINAR JORDAŃSKI",
  JPY: "JEN",
  KES: "SZYLING KENIJSKI",
  KGS: "SOM",
  KHR: "RIEL",
  KMF: "FRANK KOMORÓW",
  KPW: "WON PÓŁNOCNO­KOREAŃSKI",
  KRW: "WON POŁUDNIOWO­KOREAŃSKI",
  KWD: "DINAR KUWEJCKI",
  KYD: "DOLAR KAJMAŃSKI",
  KZT: "TENGE",
  LAK: "KIP",
  LBP: "FUNT LIBAŃSKI",
  LKR: "RUPIA LANKIJSKA",
  LRD: "DOLAR LIBERYJSKI",
  LSL: "LOTI",
  LYD: "DINAR LIBIJSKI",
  MAD: "DIRHAM MAROKAŃSKI",
  MDL: "LEJ MOŁDAWII",
  MGA: "ARIARY",
  MKD: "DENAR",
  MMK: "KYAT",
  MNT: "TUGRIK",
  MOP: "PATACA",
  MRU: "OUGUIYA",
  MUR: "RUPIA MAURITIUSU",
  MVR: "RUPIA MALEDIWSKA",
  MWK: "KWACHA MALAWIJSKA",
  MXN: "PESO MEKSYKAŃSKIE",
  MXV: "UNIDAD DE INVERSION (UDI) MEKSYKAŃSKIE",
  MYR: "RINGGIT",
  MZN: "METICAL",
  NAD: "DOLAR NAMIBIJSKI",
  NGN: "NAIRA",
  NIO: "CORDOBA ORO",
  NOK: "KORONA NORWESKA",
  NPR: "RUPIA NEPALSKA",
  NZD: "DOLAR NOWOZELANDZKI",
  OMR: "RIAL OMAŃSKI",
  PAB: "BALBOA",
  PEN: "SOL",
  PGK: "KINA",
  PHP: "PESO FILIPIŃSKIE",
  PKR: "RUPIA PAKISTAŃSKA",
  PLN: "ZŁOTY",
  PYG: "GUARANI",
  QAR: "RIAL KATARSKI",
  RON: "LEJ RUMUŃSKI",
  RSD: "DINAR SERBSKI",
  RUB: "RUBEL ROSYJSKI",
  RWF: "FRANK RWANDYJSKI",
  SAR: "RIAL SAUDYJSKI",
  SBD: "DOLAR WYSP SALOMONA",
  SCR: "RUPIA SESZELSKA",
  SDG: "FUNT SUDAŃSKI",
  SEK: "KORONA SZWEDZKA",
  SGD: "DOLAR SINGAPURSKI",
  SHP: "FUNT ŚWIĘTEJ HELENY (ŚWIĘTA HELENA I WYSPA WNIEBOWSTĄPIENIA)",
  SLL: "LEONE",
  SOS: "SZYLING SOMALIJSKI",
  SRD: "DOLAR SURINAMSKI",
  SSP: "FUNT POŁUDNIOWOSUDAŃSKI",
  STN: "DOBRA",
  SVC: "COLON SALWADORSKI (SV1)",
  SYP: "FUNT SYRYJSKI",
  SZL: "LILANGENI",
  THB: "BAT",
  TJS: "SOMONI",
  TMT: "MANAT TURKMEŃSKI",
  TND: "DINAR TUNEZYJSKI",
  TOP: "PAANGA",
  TRY: "LIRA TURECKA",
  TTD: "DOLAR TRYNIDADU I TOBAGO",
  TWD: "NOWY DOLAR TAJWAŃSKI",
  TZS: "SZYLING TANZAŃSKI",
  UAH: "HRYWNA",
  UGX: "SZYLING UGANDYJSKI",
  USD: "DOLAR AMERYKAŃSKI",
  USN: "DOLAR AMERYKAŃSKI (NEXT DAY)",
  UYI: "PESO EN UNIDADES INDEXADAS URUGWAJSKIE",
  UYU: "PESO URUGWAJSKIE",
  UYW: "PESO EN UNIDADES INDEXADAS URUGWAJSKIE",
  UZS: "SUM",
  VES: "BOLIWAR SOBERANO",
  VND: "DONG",
  VUV: "VATU",
  WST: "TALA",
  XAF: "FRANK CFA (BEAC)",
  XAG: "SREBRO",
  XAU: "ZŁOTO",
  XBA: "BOND MARKETS UNIT EUROPEAN COMPOSITE UNIT (EURCO)",
  XBB: "BOND MARKETS UNIT EUROPEAN MONETARY UNIT (E.M.U.-6)",
  XBC: "BOND MARKETS UNIT EUROPEAN UNIT OF ACCOUNT 9 (E.U.A.-9)",
  XBD: "BOND MARKETS UNIT EUROPEAN UNIT OF ACCOUNT 17 (E.U.A.-17)",
  XCD: "DOLAR WSCHODNIO­KARAIBSKI",
  XCG: "GULDEN KARAIBSKI",
  XDR: "SDR MIĘDZYNARODOWY FUNDUSZ WALUTOWY",
  XOF: "FRANK CFA (BCEAO)",
  XPD: "PALLAD",
  XPF: "FRANK CFP",
  XPT: "PLATYNA",
  XSU: "SUCRE SISTEMA UNITARIO DE COMPENSACION REGIONAL DE PAGOS SUCRE",
  XUA: "ADB UNIT OF ACCOUNT MEMBER COUNTRIES OF THE AFRICAN DEVELOPMENT BANK GROUP",
  XXX: "BRAK WALUTY",
  YER: "RIAL JEMEŃSKI",
  ZAR: "RAND",
  ZMW: "KWACHA ZAMBIJSKA",
  ZWL: "DOLAR ZIMBABWE",
} as const;
export type TKodWaluty = keyof typeof KodWaluty;

/**
 * @description Symbol wzoru formularza
 */
export const KodFormularza = {
  FA: "FA",
} as const;
export type TKodFormularza = keyof typeof KodFormularza;

/**
 * @description Typy form płatności
 */
export const FormaPlatnosci = {
  1: "Gotówka",
  2: "Karta",
  3: "Bon",
  4: "Czek",
  5: "Kredyt",
  6: "Przelew",
  7: "Mobilna",
} as const;
export type TFormaPlatnosci = keyof typeof FormaPlatnosci;

/**
 * @description Typy ładunków
 */
export const Ladunek = {
  1: "Bańka",
  2: "Beczka",
  3: "Butla",
  4: "Karton",
  5: "Kanister",
  6: "Klatka",
  7: "Kontener",
  8: "Kosz/koszyk",
  9: "Łubianka",
  10: "Opakowanie zbiorcze",
  11: "Paczka",
  12: "Pakiet",
  13: "Paleta",
  14: "Pojemnik",
  15: "Pojemnik do ładunków masowych stałych",
  16: "Pojemnik do ładunków masowych w postaci płynnej",
  17: "Pudełko",
  18: "Puszka",
  19: "Skrzynia",
  20: "Worek",
} as const;
export type TLadunek = keyof typeof Ladunek;

/**
 * @description Typy rachunków własnych
 */
export const RachunekWlasnyBanku = {
  1: "Rachunek banku lub rachunek spółdzielczej kasy oszczędnościowo-kredytowej służący do dokonywania rozliczeń z tytułu nabywanych przez ten bank lub tę kasę wierzytelności pieniężnych",
  2: "Rachunek banku lub rachunek spółdzielczej kasy oszczędnościowo-kredytowej wykorzystywany przez ten bank lub tę kasę do pobrania należności od nabywcy towarów lub usług za dostawę towarów lub świadczenie usług, potwierdzone fakturą, i przekazania jej w całości albo części dostawcy towarów lub usługodawcy",
  3: "Rachunek banku lub rachunek spółdzielczej kasy oszczędnościowo-kredytowej prowadzony przez ten bank lub tę kasę w ramach gospodarki własnej, niebędący rachunkiem rozliczeniowym",
} as const;
export type TRachunekWlasnyBanku = keyof typeof RachunekWlasnyBanku;

/**
 * @description Status podatnika
 */
export const StatusInfoPodatnika = {
  1: "Podatnik znajdujący się w stanie likwidacji",
  2: "Podatnik, który jest w trakcie postępowania restrukturyzacyjnego",
  3: "Podatnik znajdujący się w stanie upadłości",
  4: "Przedsiębiorstwo w spadku",
} as const;
export type TStatusInfoPodatnika = keyof typeof StatusInfoPodatnika;

/**
 * @description Rola podmiotu upoważnionego
 */
export const RolaPodmiotuUpowaznionego = {
  1: "Organ egzekucyjny - w przypadku, o którym mowa w art. 106c pkt 1 ustawy",
  2: "Komornik sądowy - w przypadku, o którym mowa w art. 106c pkt 2 ustawy",
  3: "Przedstawiciel podatkowy - w przypadku gdy na fakturze występują dane przedstawiciela podatkowego, o którym mowa w art. 18a - 18d ustawy",
} as const;
export type TRolaPodmiotuUpowaznionego = keyof typeof RolaPodmiotuUpowaznionego;

/**
 * @description Rola podmiotu trzeciego
 */
export const RolaPodmiotu3 = {
  1: "Faktor - w przypadku gdy na fakturze występują dane faktora",
  2: "Odbiorca - w przypadku gdy na fakturze występują dane jednostek wewnętrznych, oddziałów, wyodrębnionych w ramach nabywcy, które same nie stanowią nabywcy w rozumieniu ustawy",
  3: "Podmiot pierwotny - w przypadku gdy na fakturze występują dane podmiotu będącego w stosunku do podatnika podmiotem przejętym lub przekształconym, który dokonywał dostawy lub świadczył usługę. Z wyłączeniem przypadków, o których mowa w art. 106j ust.2 pkt 3 ustawy, gdy dane te wykazywane są w części Podmiot1K",
  4: "Dodatkowy nabywca - w przypadku gdy na fakturze występują dane kolejnych (innych niż wymieniony w części Podmiot2) nabywców",
  5: "Wystawca faktury - w przypadku gdy na fakturze występują dane podmiotu wystawiającego fakturę w imieniu podatnika. Nie dotyczy przypadku, gdy wystawcą faktury jest nabywca",
  6: "Dokonujący płatności - w przypadku gdy na fakturze występują dane podmiotu regulującego zobowiązanie w miejsce nabywcy",
  7: "Jednostka samorządu terytorialnego - wystawca",
  8: "Jednostka samorządu terytorialnego - odbiorca",
  9: "Członek grupy VAT - wystawca",
  10: "Członek grupy VAT - odbiorca",
  11: "Pracownik",
} as const;
export type TRolaPodmiotu3 = keyof typeof RolaPodmiotu3;

/**
 * @description Rodzaj faktury
 */
export const RodzajFaktury = {
  VAT: "Faktura podstawowa",
  KOR: "Faktura korygująca",
  ZAL: "Faktura dokumentująca otrzymanie zapłaty lub jej części przed dokonaniem czynności oraz faktura wystawiona w związku z art. 106f ust. 4 ustawy (faktura zaliczkowa)",
  ROZ: "Faktura wystawiona w związku z art. 106f ust. 3 ustawy",
  UPR: "Faktura, o której mowa w art. 106e ust. 5 pkt 3 ustawy",
  KOR_ZAL: "Faktura korygująca fakturę dokumentującą otrzymanie zapłaty lub jej części przed dokonaniem czynności oraz fakturę wystawioną w związku z art. 106f ust. 4 ustawy (faktura korygująca fakturę zaliczkową)",
  KOR_ROZ: "Faktura korygująca fakturę wystawioną w związku z art. 106f ust. 3 ustawy",
} as const;
export type TRodzajFaktury = keyof typeof RodzajFaktury;

/**
 * @description Typ skutku korekty w ewidencji dla podatku od towarów i usług
 */
export const TypKorekty = {
  1: "Korekta skutkująca w dacie ujęcia faktury pierwotnej",
  2: "Korekta skutkująca w dacie wystawienia faktury korygującej",
  3: "Korekta skutkująca w dacie innej, w tym gdy dla różnych pozycji faktury korygującej daty te są różne",
} as const;
export type TTypKorekty = keyof typeof TypKorekty;

/**
 * @description Stawka podatku
 */
export const StawkaPodatku = {
  "23": "23",
  "22": "22",
  "8": "8",
  "7": "7",
  "5": "5",
  "4": "4",
  "3": "3",
  "0 KR": "Stawka 0% w przypadku sprzedaży towarów i świadczenia usług na terytorium kraju (z wyłączeniem WDT i eksportu)",
  "0 WDT": "Stawka 0% w przypadku wewnątrzwspólnotowej dostawy towarów (WDT)",
  "0 EX": "Stawka 0% w przypadku eksportu towarów",
  zw: "zwolnione od podatku",
  oo: "odwrotne obciążenie",
  "np I": "niepodlegające opodatkowaniu- dostawy towarów oraz świadczenia usług poza terytorium kraju, z wyłączeniem transakcji, o których mowa w art. 100 ust. 1 pkt 4 ustawy oraz OSS",
  "np II": "niepodlegajace opodatkowaniu na terytorium kraju, świadczenie usług o których mowa w art. 100 ust. 1 pkt 4 ustawy",
} as const;
export type TStawkaPodatku = keyof typeof StawkaPodatku;

/**
 * @description Oznaczenia dotyczące procedur dla faktur
 */
export const OznaczenieProcedury = {
  WSTO_EE: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 2a rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  IED: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 2b rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  TT_D: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 5 rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  I_42: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 8 rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  I_63: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 9 rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  B_SPV: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 10 rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  B_SPV_DOSTAWA: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 11 rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  B_MPV_PROWIZJA: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 12 rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
} as const;
export type TOznaczenieProcedury = keyof typeof OznaczenieProcedury;

/**
 * @description Oznaczenia dotyczące procedur dla zamówień
 */
export const OznaczenieProceduryZ = {
  WSTO_EE: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 2a rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  IED: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 2b rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  TT_D: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 5 rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  B_SPV: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 10 rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  B_SPV_DOSTAWA: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 11 rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  B_MPV_PROWIZJA: "Oznaczenie dotyczące procedury, o której mowa w § 10 ust. 4 pkt 12 rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
} as const;
export type TOznaczenieProceduryZ = keyof typeof OznaczenieProceduryZ;

/**
 * @description Oznaczenie dotyczące dostawy towarów i świadczenia usług
 */
export const GTU = {
  GTU_01: "Dostawa towarów, o których mowa w § 10 ust. 3 pkt 1 lit. a rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_02: "Dostawa towarów, o których mowa w § 10 ust. 3 pkt 1 lit. b rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_03: "Dostawa towarów, o których mowa w § 10 ust. 3 pkt 1 lit. c rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_04: "Dostawa towarów, o których mowa w § 10 ust. 3 pkt 1 lit. d rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_05: "Dostawa towarów, o których mowa w § 10 ust. 3 pkt 1 lit. e rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_06: "Dostawa towarów, o których mowa w § 10 ust. 3 pkt 1 lit. f rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_07: "Dostawa towarów, o których mowa w § 10 ust. 3 pkt 1 lit. g rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_08: "Dostawa towarów, o których mowa w § 10 ust. 3 pkt 1 lit. h rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_09: "Dostawa towarów, o których mowa w § 10 ust. 3 pkt 1 lit. i rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_10: "Dostawa towarów, o których mowa w § 10 ust. 3 pkt 1 lit. j rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_11: "Świadczenie usług, o których mowa w § 10 ust. 3 pkt 2 lit. a rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_12: "Świadczenie usług, o których mowa w § 10 ust. 3 pkt 2 lit. b rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
  GTU_13: "Świadczenie usług, o których mowa w § 10 ust. 3 pkt 2 lit. c rozporządzenia w sprawie szczegółowego zakresu danych zawartych w deklaracjach podatkowych i w ewidencji w zakresie podatku od towarów i usług",
} as const;
export type TGTU = keyof typeof GTU;

/**
 * @description Rodzaj transportu
 */
export const RodzajTransportu = {
  1: "Transport morski",
  2: "Transport kolejowy",
  3: "Transport drogowy",
  4: "Transport lotniczy",
  5: "Przesyłka pocztowa",
  7: "Stałe instalacje przesyłowe",
  8: "Żegluga śródlądowa",
} as const;
export type TRodzajTransportu = keyof typeof RodzajTransportu;

/**
 * @description Znacznik jednostki podrzędnej JST
 */
export const JST = {
    1: "Tak",
    2: "Nie",
} as const;
export type TJST = keyof typeof JST;

/**
 * @description Znacznik członka grupy VAT
 */
export const GV = {
    1: "Tak",
    2: "Nie",
} as const;
export type TGV = keyof typeof GV;
