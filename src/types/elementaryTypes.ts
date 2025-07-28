/**
 * This file contains TypeScript type definitions based on the KSeF XSD schema.
 * These types can be used for validating invoice data.
 *
 * Based on: ElementarneTypyDanych_v10-0E.xsd
 */

/**
 * @description Typ znakowy ograniczony do jednej linii
 * @minLength 1
 * @maxLength 240
 */
export type TZnakowy = string;

/**
 * @description Typ znakowy ograniczony do 3500 znaków
 * @minLength 1
 * @maxLength 3500
 */
export type TTekstowy = string;

/**
 * @description Wartość procentowa z dokładnością do 2 miejsc po przecinku
 * @totalDigits 5
 * @fractionDigits 2
 * @minInclusive 0
 * @maxInclusive 100
 */
export type TProcentowy = number;

/**
 * @description Liczby naturalne
 * @totalDigits 14
 */
export type TCalkowity = number;

/**
 * @description Liczby naturalne
 * @totalDigits 14
 */
export type TNaturalny = number;

/**
 * @description Wartość kwotowa wykazana w zł i gr
 * @totalDigits 16
 * @fractionDigits 2
 */
export type TKwota2 = number;

/**
 * @description Wartość kwotowa wykazana w zł
 * @totalDigits 14
 */
export type TKwotaC = number;

/**
 * @description Wartość kwotowa nieujemna wykazana w zł i gr
 */
export type TKwota2Nieujemna = TKwota2;

/**
 * @description Wartość kwotowa nieujemna wykazana w zł
 */
export type TKwotaCNieujemna = TKwotaC;

/**
 * @description Typ daty
 * @minInclusive 1900-01-01
 * @maxInclusive 2050-12-31
 * @pattern ((\d{4})-(\d{2})-(\d{2}))
 */
export type TData = string;

/**
 * @description Typ daty i godziny
 */
export type TDataCzas = string;

/**
 * @description Adres e-mail
 * @minLength 3
 * @maxLength 255
 * @pattern (.)+@(.)+
 */
export type TAdresEmail = string;

/**
 * @description Identyfikator podatkowy NIP
 * @pattern [1-9]((\d[1-9])|([1-9]\d))\d{7}
 */
export type TNrNIP = string;

/**
 * @description Identyfikator podatkowy numer PESEL
 * @pattern \d{11}
 */
export type TNrPESEL = string;

/**
 * @description Numer REGON
 * @pattern \d{9} | \d{14}
 */
export type TNrREGON = string;

/**
 * @description Określa, czy to jest złożenie, czy korekta dokumentu
 * 1 - złożenie po raz pierwszy deklaracji za dany okres
 * 2 - korekta deklaracji za dany okres
 */
export type TCelZlozenia = 1 | 2;

/**
 * @description Pojedyncze pole wyboru
 */
export type TWybor1 = 1;

/**
 * @description Podwójne pole wyboru
 */
export type TWybor1_2 = 1 | 2;

/**
 * @description Potrójne pole wyboru
 */
export type TWybor1_3 = 1 | 2 | 3;

/**
 * @description Pierwsze imię
 * @minLength 1
 * @maxLength 30
 */
export type TImie = string;

/**
 * @description Typ określający nazwę miejscowości
 * @minLength 1
 * @maxLength 56
 */
export type TMiejscowosc = string;

/**
 * @description Nazwisko
 * @minLength 1
 * @maxLength 81
 */
export type TNazwisko = string;

/**
 * @description Typ określający nazwę województwa, nazwę powiatu lub nazwę gminy
 * @minLength 1
 * @maxLength 36
 */
export type TJednAdmin = string;

/**
 * @description Nazwa ulicy
 * @maxLength 65
 */
export type TUlica = TZnakowy;

/**
 * @description Numer budynku
 * @maxLength 9
 */
export type TNrBudynku = TZnakowy;

/**
 * @description Numer lokalu
 * @maxLength 10
 */
export type TNrLokalu = TZnakowy;

/**
 * @description Kod pocztowy
 * @maxLength 8
 */
export type TKodPocztowy = TZnakowy;

/**
 * @description Kod kraju
 * @pattern [A-Z]{2}
 */
export type TKodKraju = string;

/**
 * @description Numer identyfikacji podatkowej
 * @minLength 1
 * @maxLength 50
 */
export type TNrIdentyfikacjiPodatkowej = string;

/**
 * @description Wartość numeryczna 18 znaków max, w tym 2 znaki po przecinku
 */
export type TKwotowy = number;

/**
 * @description Wartość numeryczna 22 znaki max, w tym 8 znaków po przecinku
 */
export type TKwotowy2 = number;

/**
 * @description Typ znakowy ograniczony do 256 znaków
 */
export type TZnakowy256 = string;

/**
 * @description Typ znakowy ograniczony do 256 znaków, może być pusty
 */
export type TZnakowy256p = string;

/**
 * @description Typ znakowy ograniczony do 20 znaków
 */
export type TZnakowy20 = string;

/**
 * @description Typ znakowy ograniczony do 50 znaków
 */
export type TZnakowy50 = string;

/**
 * @description Typ znakowy ograniczony do 512 znaków
 */
export type TZnakowy512 = string;

/**
 * @description Numer identyfikujący fakturę w Krajowym Systemie e-Faktur (KSeF)
 */
export type TNumerKSeF = string;

/**
 * @description Typ wykorzystywany do określenia ilości. Wartość numeryczna 22 znaki max, w tym 6 po przecinku
 */
export type TIlosci = number;

/**
 * @description Numer Identyfikacyjny VAT kontrahenta UE
 */
export type TNrVatUE = string;

/**
 * @description Identyfikator wewnętrzny
 */
export type TNIPIdWew = string;

/**
 * @description Numer rachunku
 */
export type TNrRB = string;

/**
 * @description Kod SWIFT
 */
export type SWIFT_Type = string;

/**
 * @description Wartość procentowa z dokładnością do 6 miejsc po przecinku
 */
export type TProcentowy6 = number;

/**
 * @description Numer telefonu
 */
export type TNumerTelefonu = string;

/**
 * @description Typ Globalnego Numeru Lokalizacyjnego
 */
export type TGLN = string;
