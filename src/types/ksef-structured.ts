/**
 * This file contains TypeScript type definitions for the complex data structures
 * based on the KSeF XSD schema (StrukturyDanych_v10-0E.xsd).
 *
 * These types import from and depend on `elementaryTypes.ts`.
 */

import type {
  TData,
  TImie,
  TJednAdmin,
  TKodKraju,
  TKodPocztowy,
  TMiejscowosc,
  TNazwisko,
  TNrBudynku,
  TNrLokalu,
  TNrNIP,
  TNrPESEL,
  TNrREGON,
  TUlica,
} from "./elementaryTypes";

// ==================================
// Adresy (Addresses)
// ==================================

/**
 * @description Informacje opisujące adres polski
 */
export interface TAdresPolski {
  KodKraju: "PL";
  Wojewodztwo: TJednAdmin;
  Powiat: TJednAdmin;
  Gmina: TJednAdmin;
  Ulica?: TUlica;
  NrDomu: TNrBudynku;
  NrLokalu?: TNrLokalu;
  Miejscowosc: TMiejscowosc;
  KodPocztowy: TKodPocztowy;
  Poczta: TMiejscowosc;
}

/**
 * @description Informacje opisujące adres polski - bez elementu Poczta
 */
export interface TAdresPolski1 {
  KodKraju: "PL";
  Wojewodztwo: TJednAdmin;
  Powiat: TJednAdmin;
  Gmina: TJednAdmin;
  Ulica?: TUlica;
  NrDomu: TNrBudynku;
  NrLokalu?: TNrLokalu;
  Miejscowosc: TMiejscowosc;
  KodPocztowy: TKodPocztowy;
}

/**
 * @description Informacje opisujące adres zagraniczny
 */
export interface TAdresZagraniczny {
  KodKraju: TKodKraju;
  KodPocztowy?: TKodPocztowy;
  Miejscowosc: TMiejscowosc;
  Ulica?: TUlica;
  NrDomu?: TNrBudynku;
  NrLokalu?: TNrLokalu;
}

/**
 * @description Dane określające adres
 */
export type TAdres = { AdresPol: TAdresPolski } | { AdresZagr: TAdresZagraniczny };

/**
 * @description Dane określające adres - bez elementu Poczta w adresie polskim
 */
export type TAdres1 = { AdresPol: TAdresPolski1 } | { AdresZagr: TAdresZagraniczny };

// ==================================
// Identyfikatory (Identifiers)
// ==================================

/**
 * @description Podstawowy zestaw danych identyfikacyjnych o osobie fizycznej
 */
export interface TIdentyfikatorOsobyFizycznej {
  NIP: TNrNIP;
  ImiePierwsze: TImie;
  Nazwisko: TNazwisko;
  DataUrodzenia: TData;
  PESEL?: TNrPESEL;
}

/**
 * @description Podstawowy zestaw danych identyfikacyjnych o osobie fizycznej z identyfikatorem NIP albo PESEL
 */
export interface TIdentyfikatorOsobyFizycznej1 {
  NIP?: TNrNIP;
  PESEL?: TNrPESEL;
  ImiePierwsze: TImie;
  Nazwisko: TNazwisko;
  DataUrodzenia: TData;
}

/**
 * @description Podstawowy zestaw danych identyfikacyjnych o osobie niefizycznej
 */
export interface TIdentyfikatorOsobyNiefizycznej {
  NIP: TNrNIP;
  PelnaNazwa: string; // maxLength: 240
  REGON?: TNrREGON;
}

/**
 * @description Podstawowy zestaw danych identyfikacyjnych o osobie niefizycznej - bez elementu Numer REGON
 */
export interface TIdentyfikatorOsobyNiefizycznej1 {
  NIP: TNrNIP;
  PelnaNazwa: string; // maxLength: 240
}

// ==================================
// Podmioty (Entities)
// ==================================

/**
 * @description Skrócony zestaw danych o osobie fizycznej lub niefizycznej
 */
export type TPodmiotDowolnyBezAdresu =
  | { OsobaFizyczna: TIdentyfikatorOsobyFizycznej }
  | { OsobaNiefizyczna: TIdentyfikatorOsobyNiefizycznej };

/**
 * @description Podstawowy zestaw danych o osobie fizycznej
 */
export interface TOsobaFizyczna {
  OsobaFizyczna: TIdentyfikatorOsobyFizycznej;
  AdresZamieszkania: TAdres & { rodzajAdresu: "RAD" };
}

/**
 * @description Podstawowy zestaw danych o osobie niefizycznej
 */
export interface TOsobaNiefizyczna {
  OsobaNiefizyczna: TIdentyfikatorOsobyNiefizycznej;
  AdresSiedziby: TAdres & { rodzajAdresu: "RAD" };
}

/**
 * @description Podstawowy zestaw danych o osobie fizycznej lub niefizycznej
 */
export type TPodmiotDowolny = (
  | { OsobaFizyczna: TIdentyfikatorOsobyFizycznej }
  | { OsobaNiefizyczna: TIdentyfikatorOsobyNiefizycznej }
) & {
  AdresZamieszkaniaSiedziby: TAdres & { rodzajAdresu: "RAD" };
};
