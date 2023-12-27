export const instruction = {
  login: [
    {
      id: 1,
      text: 'Wchodząc na stronę wybierz jedną z opcji. Zaloguj się, gdy posiadasz już konto, a jeśli jesteś poraz pierwszy kliknij w przycisk "Zarejestruj się".',
      img: null,
      vid: null,
    },
    {
      id: 2,
      text: "W obu przypadkach wypełnij formularz. Jeśli tworzysz konto po wypełnieniu formularza zostaniesz przeniesiony do formularza logowania, który będziesz musiał ponownie wypełnić.",
      img: null,
      vid: null,
    },
  ],
  firstTime: [
    {
      id: 3,
      text: "Jeśli dopiero co utworzyłeś swoje konto po zalogowaniu ujrzysz informację, która po kliknięciu przekieruje Cię na podstronę wyboru języka.",
      img: null,
      vid: null,
    },
    {
      id: 4,
      text: "Na stronie wyboru opcji języka wyświetlą się obecnie dostępne na witrynie języki. Wybierz język, który Cię interesuje i przejdź dalej.",
      img: null,
      vid: null,
    },
    {
      id: 5,
      text: "Na tym etapie musisz określić na jakim poziomie obecnie znasz język w skali CEFR. W skali CEFR wyróżniamy trzy poziomy - początkujący (A), średniozaawansowany (B) i zaawansowany (C). Po wybraniu poziomu przejdź dalej.",
      img: null,
      vid: null,
    },
    {
      id: 6,
      text: "Ostatni etap służy do wybrania tematyk, które Cię interesują. Na ich podstawie będą wyświetlane artykuły. Po wybraniu interesujących Cie tematów zakończ formularz i zapisz swoje wybory.",
      img: null,
      vid: "/instructions/choice.mp4",
    },
  ],
  dashboard: [
    {
      id: 7,
      text: "Gdy masz wybrany chociaż jeden język w głównym panelu użytkownika ujrzysz panel filtrowania artykułów oraz artykuły.",
      img: null,
      vid: null,
    },
    {
      id: 8,
      text: "W panelu filtrowania możesz wybrać jeden z wybranych wcześniej języków lub dodać nowy język oraz zaznaczyć i odznaczyć kategorie wyświetlanych artykułów.",
      img: null,
      vid: null,
    },
    {
      id: 9,
      text: "Pod panelem filtrowania znajdziesz artykuły. Karta artykułu w prawym górnym rogu zawiera baner, którego kolor odzwierciedla poziom trudności artykułu (zielony- łatwy, pomarańczowy- średniej trudności, czerwony- trudny). Każdy baner zawiera również ikonę, która pokazuje do jakiej kategorii artykuł jest zaliczany. Oprócz tego w karte artykułu występuje miniaturka, tytuł i początkowa część artykułu.",
      img: "/instructions/articlecard.jpg",
      imgAlt: "Karta artykułu.",
      vid: null,
    },
  ],
  article: [
    {
      id: 10,
      text: "Gdy wybierzesz interesujący artykuł zobaczysz jego treść oraz tekst.",
      img: null,
      vid: null,
    },
    {
      id: 11,
      text: "Aby przetłumaczyć wybrany fragment tekstu zaznacz pierwsze słowo oraz ostatnie, fragment pomiędzy nimi zostanie przetłumaczony. Maksymalna długość frazy to 5 słów. W celu przetłumaczenia jednego słowa kliknij je dwukrotnie.",
      img: null,
      vid: "/instructions/article.mp4",
    },
    {
      id: 12,
      text: "Po wybraniu interesującej Cię frazy ujrzysz okno dialogowe z tłumaczeniem. Tłumaczenie możesz dodać do bazy wiedzy.",
      img: null,
      vid: null,
    },
  ],
  knowledgeBase: [
    {
      id: 13,
      text: "Gdy przejdziesz na podstronę bazy wiedzy ujrzysz przyciski przełączające pomiędzy dwiema sekcjami.",
      img: null,
      vid: null,
    },
    {
      id: 14,
      text: "Sekcja artykuły to historia wszystkich twoich przeczytanych artykułów. Na karcie artykułu oprócz standardowych elementów znajduje się baner, który przedstawia język z jakiego pochodzi artykuł.",
      img: null,
      vid: null,
    },
    {
      id: 15,
      text: "W sekcji słówka znajdziesz wszystkie zapisane wcześniej słówka. Każda karta słówek zawiera flagę języka z którego fraza pochodzi, oraz dwa guziki. Guzik do ponownego przetłumaczenia słówka oraz guzik oznaczony ikoną kosza na śmieci służący do usunięcia słówka z bazy wiedzy.",
      img: null,
      vid: "/instructions/knowledgebase.mp4",
    },
    {
      id: 16,
      text: "Po kliknięciu przycisku Eksport możesz wyeksportować zapisane słówka. W oknie dialogowym należy wybrać format json lub csv oraz język.",
      img: null,
      vid: "/instructions/export.mp4",
    },
  ],
};
