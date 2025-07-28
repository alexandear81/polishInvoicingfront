/**
 * This file contains TypeScript type definitions based on the KSeF XSD schema.
 * These types can be used for validating invoice data.
 *
 * Based on: schemat.xsd
 */

import type {
  TKodKraju,
  TData,
  TDataCzas,
  TNrNIP,
  TAdresEmail,
  TWybor1,
  TNrIdentyfikacjiPodatkowej,
  TZnakowy,
  TZnakowy512,
  TNrVatUE,
  TNIPIdWew,
  TNrRB,
  SWIFT_Type,
  TProcentowy,
  TNumerTelefonu,
  TGLN,
} from "../elementaryTypes";

import type {
  TKodyKrajowUE,
  TKodFormularza,
  TKodWaluty,
  TRachunekWlasnyBanku,
  TStatusInfoPodatnika,
  TRolaPodmiotuUpowaznionego,
  TRolaPodmiotu3,
  TJST,
  TGV,
} from "./enums";

/**
 * @description Nagłówek
 */
export interface TNaglowek {
  KodFormularza: {
    value: TKodFormularza;
    kodSystemowy: string;
    wersjaSchemy: string;
  };
  WariantFormularza: 3;
  DataWytworzeniaFa: TDataCzas;
  SystemInfo?: TZnakowy;
}

/**
 * @description Informacje opisujące adres
 */
export interface TAdres {
  KodKraju: TKodKraju;
  AdresL1: TZnakowy512;
  AdresL2?: TZnakowy512;
  GLN?: TGLN;
}

/**
 * @description Wartość numeryczna 18 znaków max, w tym 2 znaki po przecinku
 */
// export type TKwotowy = number;

/**
 * @description Informacje o rachunku
 */
export interface TRachunekBankowy {
  NrRB: TNrRB;
  SWIFT?: SWIFT_Type;
  RachunekWlasnyBanku?: TRachunekWlasnyBanku;
  NazwaBanku?: TZnakowy;
  OpisRachunku?: TZnakowy;
}

/**
 * @description Zestaw danych identyfikacyjnych oraz danych adresowych podatnika
 */
export interface TPodmiot1 {
  NIP: TNrNIP;
  Nazwa: TZnakowy512;
}

/**
 * @description Zestaw danych identyfikacyjnych oraz danych adresowych nabywcy
 */
export interface TPodmiot2 {
  NIP?: TNrNIP;
  KodUE?: TKodyKrajowUE;
  NrVatUE?: TNrVatUE;
  KodKraju?: TKodKraju;
  NrID?: TNrIdentyfikacjiPodatkowej;
  BrakID?: TWybor1;
  Nazwa?: TZnakowy512;
}

/**
 * @description Zestaw danych identyfikacyjnych oraz danych adresowych podmiotów trzecich
 */
export interface TPodmiot3 {
  NIP?: TNrNIP;
  IDWew?: TNIPIdWew;
  KodUE?: TKodyKrajowUE;
  NrVatUE?: TNrVatUE;
  KodKraju?: TKodKraju;
  NrID?: TNrIdentyfikacjiPodatkowej;
  BrakID?: TWybor1;
  Nazwa?: TZnakowy512;
}


/**
 * @description Faktura VAT
 */
export interface Faktura {
  Naglowek: TNaglowek;
  Podmiot1: {
    PrefiksPodatnika?: TKodyKrajowUE;
    NrEORI?: TZnakowy;
    DaneIdentyfikacyjne: TPodmiot1;
    Adres: TAdres;
    AdresKoresp?: TAdres;
    DaneKontaktowe?: {
      Email?: TAdresEmail;
      Telefon?: TNumerTelefonu;
    }[];
    StatusInfoPodatnika?: TStatusInfoPodatnika;
  };
  Podmiot2: {
    NrEORI?: TZnakowy;
    DaneIdentyfikacyjne: TPodmiot2;
    Adres?: TAdres;
    AdresKoresp?: TAdres;
    DaneKontaktowe?: {
      Email?: TAdresEmail;
      Telefon?: TNumerTelefonu;
    }[];
    NrKlienta?: TZnakowy;
    IDNabywcy?: string;
    JST: TJST;
    GV: TGV;
  };
  Podmiot3?: {
    IDNabywcy?: string;
    NrEORI?: TZnakowy;
    DaneIdentyfikacyjne: TPodmiot3;
    Adres?: TAdres;
    AdresKoresp?: TAdres;
    DaneKontaktowe?: {
      Email?: TAdresEmail;
      Telefon?: TNumerTelefonu;
    }[];
    Rola?: TRolaPodmiotu3;
    RolaInna?: TWybor1;
    OpisRoli?: TZnakowy;
    Udzial?: TProcentowy;
    NrKlienta?: TZnakowy;
  }[];
  PodmiotUpowazniony?: {
    NrEORI?: TZnakowy;
    DaneIdentyfikacyjne: TPodmiot1;
    Adres: TAdres;
    AdresKoresp?: TAdres;
    DaneKontaktowe?: {
      EmailPU?: TAdresEmail;
      TelefonPU?: TNumerTelefonu;
    }[];
    RolaPU: TRolaPodmiotuUpowaznionego;
  };
  Fa: {
    KodWaluty: TKodWaluty;
    P_1: TData;
    P_6?: TData;
  };
}
