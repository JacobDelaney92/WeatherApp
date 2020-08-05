/****************Global Variables****************/
let cityName;
let API_KEY = "bc058670a30398242386d2bae3b83c7a";
var Unsplash_API_kEY = "HG9buRgEMEJyhqFnMbvRy1RngUIKVVpAPDTOeuAeOhQ";
const search = document.querySelector(".main__search");
const searchForm = document.querySelector(".weather-app__main__search__form");
const searchInput = document.querySelector(
  ".weather-app--navigation__input .auto input"
);
var randNumber = Math.floor(Math.random() * 100) + 1;
let active = false;
/****************Global Variables****************/

/****************SEARCH INPUT********************/
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let citySearch = document.querySelector("#myInput").value;
    weatherAsk(citySearch);
  }
});
/**************SEARCH INPUT**********************/

/**************GET BACKGROUND IMAGES*************/
function imageAsk(weatherType) {
  var unsplashurl = `https://api.unsplash.com/search/photos?page=${randNumber}&per_page=20&client_id=${Unsplash_API_kEY}`;
  var searchTerm = weatherType;
  var imageApi = `${unsplashurl}&query=${searchTerm}`;
  fetch(imageApi)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      let image = data.results[0].urls.regular;
      document.querySelector(".weather-app__main").style.backgroundImage =
        "linear-gradient(180deg, rgba(49,49,49,1) 15%, rgba(49,49,49,0) 100%), url(" +
        image +
        ")";
    })
    .catch((error) => {
      console.log(error);
    });
}
/**************GET BACKGROUND IMAGES*************/

/****************CONTAINERS***********************/
let cityCon = document.querySelector(".weather-app__main__city");
let weatherCon = document.querySelector(
  ".weather-app__main__temp-type__weather-con"
);
let tempCon = document.querySelector(
  ".weather-app__main__temp-type__weather-temp"
);
let windSpeedCon = document.querySelector(
  ".weather-app__footer__grid__content__wind-speed"
);
let humCon = document.querySelector(
  ".weather-app__footer__grid__content__humidity"
);
let pressCon = document.querySelector(
  ".weather-app__footer__grid__content__pressure"
);
let latlonCon = document.querySelector(
  ".weather-app__footer__grid__content__long-lat"
);
let minMaxCon = document.querySelector(".weather-app__main__min-max-temp__max");
let sunCon = document.querySelector(".weather-app__footer__grid__content__sun");
/****************CONTAINERS***********************/

/****************FETCH API***********************/
function weatherAsk(cityName) {
  console.log(cityName);
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric`;
  fetch(api)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      /*DATA*/
      console.log(data);
      let city = data.name;
      let weatherType = data.weather[0].main;
      let windSpeed = data.wind.speed;
      let humidity = data.main.humidity;
      let pressure = data.main.pressure;
      let temp = data.main.temp;
      let tempMin = data.main.temp_min;
      let tempMax = data.main.temp_max;
      let longitude = data.coord.lon;
      let latitude = data.coord.lat;
      let sunrise = new Date(data.sys.sunrise * 1000)
        .toLocaleTimeString("en-GB")
        .slice(0, 8);
      let sunset = new Date(data.sys.sunset * 1000)
        .toLocaleTimeString("en-GB")
        .slice(0, 8);
      let country = data.sys.country;
      /*DATA*/

      cityCon.innerHTML = `${city}, ${country}`;
      weatherCon.innerHTML = `${weatherType}`;
      tempCon.innerHTML = `${temp}<span>&#8451;</span>`;
      windSpeedCon.innerHTML = `Windspeed: ${windSpeed}`;
      humCon.innerHTML = `Humidity: ${humidity}`;
      pressCon.innerHTML = `Pressure: ${pressure}`;
      latlonCon.innerHTML = `Latitude: ${latitude} <br> Longitude: ${longitude}`;
      minMaxCon.innerHTML = `Min: ${tempMin} <br> Max: ${tempMax}`;
      sunCon.innerHTML = `Sunrise: ${sunrise} <br> Sunset: ${sunset}`;

      imageAsk(weatherType);
    })
    .catch((error) => {
      console.log(error);
    });
}
/****************FETCH API****************/

/****************GEO LOCATION****************/
navigator.geolocation.getCurrentPosition(success, error);
function success(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  const lonLat = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`;
  fetch(lonLat)
    .then((response) => {
      return response.json();
    })
    .then((location) => {
      city = location.name;
      weatherAsk(city);
    });
}
function error(err) {
  console.log(err);
  let cityName = "London";
  weatherAsk(cityName);
}
/****************GEO LOCATION****************/

/****************MORE INFO****************/
document
  .querySelector(".weather-app--info")
  .addEventListener("click", moreInfo);
function moreInfo(val) {
  document.querySelector(".circle").classList.toggle("slide");
  document.querySelector(".weather-app__menu").classList.toggle("show");
  document.querySelector(".weather-app--info svg").classList.toggle("rotate");
}
/****************MORE INFO****************/

/****************PREDICTIVE SEARCH****************/
var countries = [
  "Coru",
  "Aachen",
  "Aarhus",
  "Abbeville",
  "Aberdeen",
  "Abu",
  "Dhabi",
  "Acapulco",
  "Adelaide",
  "Adelboden",
  "Agadir",
  "Agde",
  "Agen",
  "Agios",
  "Nikolaos",
  "Agrigento",
  "Agropoli",
  "Aigues",
  "Mortes",
  "Aix",
  "Provence",
  "Aix",
  "Bains",
  "Ajaccio",
  "Ajman",
  "Akron",
  "Alanya",
  "Albacete",
  "Albany",
  "Albenga",
  "Albi",
  "Albufeira",
  "Albuquerque",
  "Alcudia",
  "Alessandria",
  "lesund",
  "Alexandria",
  "Algeciras",
  "Alghero",
  "Alicante",
  "Alkmaar",
  "Alpe",
  "Huez",
  "Alta",
  "Badia",
  "Altea",
  "Amalfi",
  "Amarillo",
  "Amersfoort",
  "Amiens",
  "Amsterdam",
  "Anaheim",
  "Anchorage",
  "Ancona",
  "Andalo",
  "Andermatt",
  "Andria",
  "Angers",
  "Ankara",
  "Arbor",
  "Annapolis",
  "Annecy",
  "Antalya",
  "Antibes",
  "Antwerp",
  "Anzio",
  "Nang",
  "Aosta",
  "Appleton",
  "Aracaju",
  "Arcachon",
  "Arenzano",
  "Arezzo",
  "Argostoli",
  "Arica",
  "Arles",
  "Arlington",
  "Virginia",
  "Arlington",
  "Texas",
  "Armagh",
  "Arnhem",
  "Arosa",
  "Arras",
  "Arrecife",
  "Art",
  "Ascoli",
  "Piceno",
  "Ashdod",
  "Ashkelon",
  "Aspen",
  "Asti",
  "Athens",
  "Athlone",
  "Atlanta",
  "Atlantic",

  "Auckland",
  "Augsburg",
  "Augusta",
  "Georgia",
  "Augusta",
  "Maine",
  "Aurora",
  "Colorado",
  "Aurora",
  "Illinois",
  "Austin",
  "Auxerre",
  "Aveiro",
  "Avellino",
  "Avignon",
  "Avoriaz",
  "Axamer",
  "Lizum",
  "Ayia",
  "Napa",

  "Gastein",

  "Hofgastein",
  "Baden",
  "Baiona",
  "Bakersfield",
  "Baltimore",
  "Bandar",
  "Seri",
  "Begawan",
  "Bandol",
  "Bangkok",
  "Bangor",
  "Barcelona",
  "Bari",
  "Barletta",
  "Barstow",
  "Basel",
  "Bastia",
  "Bath",
  "Baton",
  "Rouge",
  "Batumi",
  "Bayonne",
  "Beaulieu",
  "Beersheba",
  "Beijing",
  "Belfast",
  "Belfort",
  "Belgrade",
  "Belize",

  "Belluno",
  "Belmopan",
  "Belo",
  "Horizonte",
  "Bemidji",
  "Benalmadena",
  "Bendigo",
  "Benevento",
  "Benic",
  "ssim",
  "Benidorm",
  "Bergamo",
  "Bergen",
  "Bergerac",
  "Berkeley",
  "Berlin",
  "Bern",
  "Besan",
  "Beverly",
  "Hills",
  "ziers",
  "Biarritz",
  "Biel",
  "Bienne",
  "Bielefeld",
  "Biella",
  "Bilbao",
  "Billings",
  "Birmingham",
  "Birmingham",
  "Bismarck",
  "Blanes",
  "Bled",
  "Blois",
  "Blumenau",
  "Boca",
  "Chica",
  "Boca",
  "Raton",
  "Bochum",
  "Bodrum",
  "Boise",
  "Bologna",
  "Bolzano",
  "Bonifacio",
  "Bonn",
  "Bordeaux",
  "Bordighera",
  "Bormio",
  "Boston",
  "Boulder",
  "Boulogne",

  "Bourges",
  "Boynton",
  "Beach",
  "Bradenton",
  "Bradford",
  "Braga",
  "Brampton",
  "Brasilia",
  "Bratislava",
  "Braunschweig",
  "Breda",
  "Bregenz",
  "Brela",
  "Bremen",
  "Bremerhaven",
  "Brescia",
  "Brest",
  "Brighton",
  "Brindisi",
  "Brisbane",
  "Bristol",
  "Brixen",
  "Brixental",
  "Brno",
  "Brownsville",
  "Bruges",
  "Brussels",
  "Bucharest",
  "Budapest",
  "Budva",
  "Buenos",
  "Aires",
  "Buffalo",
  "Burgas",
  "Cabo",
  "San",
  "Lucas",
  "diz",
  "Caen",
  "Cagliari",
  "Cagnes",

  "Cairns",

  "Bona",

  "Or",

  "Millor",

  "Ratjada",
  "Calais",
  "Calella",
  "Calgary",
  "Caloundra",
  "Calp",
  "Caltanissetta",
  "Calvi",
  "Cambridge",
  "Cambrils",
  "Campinas",
  "Campobasso",
  "Can",
  "Picafort",
  "Canazei",
  "Canberra",
  "Cancun",
  "Cannes",
  "Canterbury",
  "Canyamel",
  "Capdepera",
  "Cape",
  "Canaveral",
  "Cape",
  "Coral",
  "Cape",
  "May",
  "Cape",
  "Town",
  "Carbonia",
  "Carcassonne",
  "Cardiff",
  "Carlisle",
  "Carlsbad",
  "Carpi",
  "Carpinteria",
  "Carrara",
  "Carson",

  "Cartagena",
  "Casablanca",
  "Caserta",
  "Casper",
  "Cassis",
  "Castelrotto",
  "Catania",
  "Catanzaro",
  "Caxias",
  "do",
  "Sul",
  "Cervinia",
  "Cesena",
  "esk",
  "Krumlov",

  "me",
  "Chamonix",
  "Chandler",
  "Chania",
  "Charleroi",
  "Charleston",

  "Virginia",
  "Charleston",
  "South",
  "Carolina",
  "Charlotte",
  "Charlottetown",
  "Chartres",
  "Chattanooga",
  "Chelmsford",
  "Chemnitz",
  "Cherbourg",
  "Chesapeake",
  "Chester",
  "Cheyenne",
  "Chiang",
  "Mai",
  "Chiang",
  "Rai",
  "Chiavari",
  "Chicago",
  "Chichester",
  "Chieti",
  "Chioggia",
  "Chios",
  "Chonburi",
  "Christchurch",
  "Chula",
  "Vista",
  "Chur",
  "Cincinnati",
  "Ciutadella",

  "Menorca",
  "Civitavecchia",
  "Clearwater",
  "Clermont",
  "Ferrand",
  "Cleveland",
  "Cocoa",
  "Beach",
  "Coconut",
  "Creek",
  "Coimbra",
  "Collioure",
  "Colmar",
  "Cologne",
  "Colorado",
  "Springs",
  "Columbia",
  "Columbus",
  "Como",
  "Concepci",

  "Concord",
  "Conil",

  "Frontera",
  "Copenhagen",
  "Coral",
  "Springs",
  "rdoba",
  "Argentina",
  "rdoba",
  "Spain",
  "Corfu",
  "Corinth",
  "Cork",
  "Corpus",
  "Christi",
  "Corralejo",
  "Cortina",
  "Ampezzo",
  "Cosenza",
  "Costa",
  "Adeje",
  "Courchevel",
  "Courmayeur",
  "Coventry",
  "Coyhaique",
  "Cozumel",
  "Crans",
  "Montana",
  "Cremona",
  "Crotone",
  "Cuneo",

  "Nang",
  "Dallas",
  "Dana",
  "Point",
  "Darmstadt",
  "Darwin",
  "Daugavpils",
  "Davos",
  "Daytona",
  "Beach",
  "Deerfield",
  "Beach",
  "Del",

  "Delft",
  "Delray",
  "Beach",
  "Denia",
  "Denver",
  "Derby",
  "Derry",
  "Des",
  "Moines",
  "Detroit",
  "Didim",
  "Dieppe",
  "Dijon",
  "Doha",
  "Dolomiti",
  "Superski",
  "Dorfgastein",
  "Dortmund",
  "Dover",
  "Dresden",
  "Dubai",
  "Dublin",
  "Dubrovnik",
  "Duisburg",
  "Duluth",
  "Dundalk",
  "Dundee",
  "Dunedin",
  "Dunkirk",
  "Durham",
  "Durham",
  "sseldorf",
  "Eastbourne",
  "Eau",
  "Claire",
  "Edinburgh",
  "Edmonton",
  "Eilat",
  "Eindhoven",

  "Paso",
  "Elche",
  "Ellmau",
  "Elm",
  "Empuriabrava",
  "Encinitas",
  "Engelberg",
  "Enna",
  "Enschede",
  "Erfurt",
  "Erie",
  "Erlangen",
  "Esbjerg",
  "Espace",
  "Killy",
  "Essaouira",
  "Essen",
  "Estepona",
  "Eugene",
  "Exeter",
  "Faenza",
  "Falmouth",
  "Famagusta",
  "Fano",
  "Fargo",
  "Faro",
  "Fayetteville",
  "Fermo",
  "Fernandina",
  "Beach",
  "Ferrara",
  "Fethiye",
  "Fez",
  "Fieberbrunn",
  "Filzmoos",
  "Finale",
  "Ligure",
  "Fiumicino",
  "Flagstaff",
  "Flaine",
  "Florence",
  "Foggia",
  "Folgarida",
  "Fontana",
  "Forl",
  "Fort",
  "Collins",
  "Fort",
  "Lauderdale",
  "Fort",
  "Myers",
  "Fort",
  "Wayne",
  "Fort",
  "Worth",
  "Forte",
  "dei",
  "Marmi",
  "Foz",
  "do",
  "Igua",

  "Frankfort",
  "Frankfurt",
  "am",
  "Main",
  "Fredericton",
  "Freeport",
  "Freiburg",
  "Fremont",
  "Fresno",
  "Fribourg",
  "Frosinone",
  "Fuengirola",
  "Fujairah",
  "Fukuoka",
  "Funchal",
  "Gainesville",
  "Galt",

  "Galway",
  "Garden",
  "Grove",
  "Garland",
  "Gatineau",
  "Gdansk",
  "Gdynia",
  "Geelong",
  "Gelsenkirchen",
  "Geneva",
  "Genoa",
  "George",
  "Town",
  "Ghent",
  "Gij",

  "Gilbert",
  "Girona",
  "Glasgow",
  "Glendale",
  "Arizona",
  "Glendale",
  "California",
  "Gloucester",
  "Gold",
  "Coast",
  "Gorizia",
  "Dachstein",

  "Gothenburg",
  "G",
  "ttingen",
  "Granada",
  "Grand",
  "Prairie",
  "Grand",
  "Rapids",
  "Granville",
  "Grasse",
  "Graz",
  "Great",
  "Falls",
  "Green",
  "Bay",
  "Greensboro",
  "Grenoble",
  "Grindelwald",
  "Groningen",
  "Grossarl",
  "Grosseto",
  "Gstaad",
  "Guadalajara",
  "Guangzhou",
  "Guimar",
  "es",
  "Haarlem",
  "Haifa",
  "Halifax",
  "Halle",
  "Hamburg",
  "Hamilton",
  "Canada",
  "Hamilton",
  "Hampton",
  "Hangzhou",
  "Hannover",
  "Hanoi",
  "Harrisburg",
  "Hartford",
  "Hasselt",
  "Hastings",
  "Hat",
  "Yai",
  "Havana",
  "Heidelberg",
  "Heilbronn",
  "Heiligenblut",
  "Helena",
  "Helsinki",
  "Henderson",
  "Heraklion",
  "Herceg",
  "Novi",
  "Hereford",
  "Hermosa",
  "Beach",
  "Hervey",
  "Bay",
  "Hialeah",
  "Hinterglemm",
  "Hinterstoder",
  "Hiroshima",
  "Hoi",
  "An",
  "Hobart",
  "Ho",
  "Chi",
  "Minh",

  "Hollywood",
  "Florida",
  "Hong",
  "Kong",
  "Honolulu",
  "Horsens",
  "Houston",
  "Hua",
  "Hin",
  "Hue",
  "Huntington",
  "Beach",
  "Huntsville",
  "Hvar",
  "Hy",
  "res",
  "Ibiza",
  "Town",
  "Imola",
  "Imperia",
  "Inca",
  "Indianapolis",
  "Ingolstadt",
  "Innsbruck",
  "Interlaken",
  "Inverness",
  "Ioannina",
  "Irvine",
  "Irving",
  "Ischgl",
  "Isernia",
  "Islamorada",
  "Istanbul",
  "zmir",
  "Izola",
  "Jackson",
  "Jacksonville",
  "Jefferson",

  "Jena",
  "Jerez",

  "Frontera",
  "Jersey",

  "Jerusalem",
  "Johannesburg",
  "Joinville",
  "Juan",
  "les",
  "Pins",
  "Juiz",

  "Fora",
  "Juneau",
  "Jungfrau",
  "Jupiter",
  "J",
  "rmala",
  "Kalamata",
  "Kanchanaburi",
  "Kansas",

  "Kansas",

  "Kansas",
  "Kappl",
  "Kaprun",
  "Karlovy",
  "Vary",
  "Karlsruhe",
  "Kassel",
  "Kastoria",
  "Kaunas",
  "Kavala",
  "Kemer",
  "Key",
  "Largo",
  "Key",

  "Khao",
  "Lak",
  "Kiel",
  "Kilkenny",
  "Kingston",
  "Kingston",
  "upon",
  "Hull",
  "Kissimmee",
  "Kitzb",
  "hel",
  "Klagenfurt",
  "Klaip",

  "Knoxville",
  "Kobe",
  "Koblenz",
  "Kolding",
  "Komotini",
  "Koper",
  "Kos",
  "Ko",
  "ice",
  "Kotor",
  "Krabi",
  "Krakow",
  "Krefeld",
  "Kuah",
  "Kuala",
  "Lumpur",
  "Ku",
  "adas",
  "Kutn",
  "Hora",
  "Kyoto",
  "Kyrenia",

  "Ciotat",

  "Clusaz",

  "Laguna",

  "Maddalena",

  "Manga",

  "Plagne",

  "Plata",

  "Rochelle",

  "Romana",

  "Serena",

  "Spezia",

  "Thuile",
  "Laax",
  "Lagos",
  "Laguna",
  "Beach",
  "Lakeland",
  "Lamezia",
  "Terme",
  "Lancaster",
  "Lancaster",

  "Lansing",

  "Aquila",
  "Laredo",
  "Largo",
  "Larnaca",
  "Las",
  "Palmas",
  "Las",
  "Vegas",
  "Latina",
  "Lausanne",
  "Laval",
  "Le",
  "Havre",
  "Le",
  "Lavandou",
  "Le",
  "Mans",
  "Lecce",
  "Lecco",
  "Lech",
  "Leeds",
  "Legnano",
  "Leicester",
  "Leiden",
  "Leipzig",
  "Leogang",
  "Les",
  "Arcs",
  "Les",
  "Deux",
  "Alpes",
  "Les",
  "Gets",
  "Les",
  "Houches",
  "Les",
  "Menuires",
  "Leuven",
  "Lexington",
  "Liberec",
  "Lichfield",
  "Li",
  "ge",
  "Lienz",
  "Liep",
  "ja",
  "Lille",
  "Limassol",
  "Limerick",
  "Limoges",
  "Lincoln",
  "Lincoln",
  "Lindos",
  "Linz",
  "Lisbon",
  "Lisburn",
  "Little",
  "Rock",
  "Liverpool",
  "Livigno",
  "Livorno",
  "Ljubljana",
  "Lloret",

  "Loano",
  "Locarno",
  "Lodi",
  "Lodz",
  "Logro",

  "London",
  "Canada",
  "London",
  
  "Londrina",
  "Long",
  "Beach",
  "Los",
  "Angeles",
  "Los",
  "Cabos",
  "Los",
  "Cristianos",
  "Louisville",
  "Lourdes",
  "Loutraki",
  "Louvain",

  "Neuve",
  "Lubbock",

  "beck",
  "Lublin",
  "Lucca",
  "Lucerne",
  "Lugano",
  "Lund",
  "Lyon",
  "Maastricht",
  "Macerata",
  "Madison",
  "Madonna",
  "di",
  "Campiglio",
  "Madrid",
  "Magaluf",
  "Magdeburg",
  "Mah",

  "Mainz",
  "Makarska",
  "Malaga",
  "Malia",
  "Malibu",
  "Malm",
  "Manacor",
  "Manchester",
  "Manhattan",
  "Beach",
  "Mannheim",
  "Manosque",
  "Mantua",

  "del",
  "Plata",
  "Marathon",
  "Marbella",
  "Maria",
  "Alm",
  "Maribor",
  "Markham",
  "Marmaris",
  "Maroochydore",
  "Marrakesh",
  "Marsala",
  "Marseille",
  "Maspalomas",
  "Massa",
  "Matera",
  "Mayrhofen",
  "Mazara",
  "del",
  "Vallo",
  "Mechelen",
  "Meg",
  "ve",
  "Melbourne",
  "Australia",
  "Melbourne",

  "Memphis",
  "Menton",
  "Merano",
  "Meribel",

  "rida",
  "Mesa",
  "Messina",
  "Mestre",
  "Metz",
  "Mexico",

  "Miami",
  "Middelburg",
  "Midland",
  "Mijas",
  "Milan",
  "Millau",
  "Milwaukee",
  "Minneapolis",
  "Miramar",
  "Mississauga",
  "Moab",
  "Mobile",
  "Modena",
  "Modesto",
  "Modica",
  "Moena",
  "Mogi",
  "das",
  "Cruzes",
  "Mons",
  "Monte",
  "Rosa",
  "Montego",
  "Bay",
  "Montepulciano",
  "Monterey",
  "Montgomery",
  "Montpelier",
  "Montpellier",
  "Montreal",
  "Montreux",
  "Monza",
  "Moraira",
  "Moreno",
  "Valley",
  "Morzine",
  "Moscow",
  "Mountain",
  "View",
  "Mulhouse",
  "Munich",

  "nster",
  "Murcia",
  "Murter",
  "Mykonos",
  "Mytilene",
  "Nafplio",
  "Nagoya",
  "Namur",
  "Nancy",
  "Nantes",
  "Napa",
  "Naples",
  "Italy",
  "Naples",
  "Narbonne",
  "Narva",
  "Nashville",
  "Nassau",
  "Naxos",
  "Nazareth",
  "Negril",
  "Nelson",
  "Nerja",
  "Netanya",
  "Nevers",
  "New Haven",
  "New Orleans",
  "New Smyrna",
  "Beach",
  "New York",
  "Newark",
  "Newcastle",
  "Australia",
  "Newcastle",
  
  "Newport",
  "Newport",
  "Beach",
  "Newport",
  "News",
  "Newry",
  "Nha",
  "Trang",
  "Niagara",
  "Falls",
  "Nice",
  "Nicosia",
  "Nijmegen",
  "Nimes",
  "Niort",
  "Noosa",
  "Heads",
  "Norfolk",
  "North",
  "Las",
  "Vegas",
  "North",
  "Port",
  "Norwich",
  "Nottingham",
  "Novara",
  "Novigrad",
  "Nuoro",

  "rnberg",
  "Nyon",
  "Oakland",
  "Oaxaca",
  "Obergurgl",
  "Oberhausen",
  "Ocala",
  "Oceanside",
  "Ocho",
  "Rios",
  "Odense",
  "Odessa",
  "Ogden",
  "Oia",
  "Oklahoma",

  "Olbia",
  "Oldenburg",
  "Olomouc",
  "Olympia",
  "Omaha",
  "Opatija",
  "Oristano",
  "Orlando",
  "Orl",
  "ans",
  "Ortisei",
  "Osaka",
  "Oslo",
  "Osnabr",
  "ck",
  "Ostrava",
  "Ottawa",
  "Oulu",
  "Overland",
  "Park",
  "Oviedo",
  "Oxford",
  "Oxnard",
  "Paderborn",
  "Padova",
  "Palanga",
  "Palavas",
  "les",
  "Flots",
  "Palermo",
  "Palm",
  "Bay",
  "Palm",
  "Beach",
  "Palma",

  "Mallorca",
  "Palma",
  "Nova",
  "Palmetto",
  "Palo",
  "Alto",
  "Pamplona",
  "Panama",

  "Paphos",
  "Paradiski",
  "Paralia",
  "Parikia",
  "Paris",
  "Parma",
  "P",
  "rnu",
  "Pasadena",
  "Passo",
  "del",
  "Tonale",
  "Passo",
  "Rolle",
  "Patras",
  "Pattaya",
  "Pau",
  "Pavia",
  "Peguera",
  "Pembroke",
  "Pines",
  "Pensacola",
  "Perast",
  "Perpignan",
  "Perros",
  "Guirec",
  "Perth",
  "Australia",
  "Perth",
  
  "Perugia",
  "Pesaro",
  "Pescara",
  "Pescasseroli",
  "Petah",
  "Tikva",
  "Peterborough",
  "Petrovac",
  "Pforzheim",
  "Phang",
  "Nga",
  "Phetchabun",
  "Philadelphia",
  "Phoenix",
  "Phuket",

  "Piacenza",
  "Pierre",
  "Piraeus",
  "Piran",
  "Pisa",
  "Pistoia",
  "Pittsburgh",
  "Placencia",
  "Plano",
  "Playa",
  "Blanca",
  "Playa",

  "las",
  "Am",
  "ricas",
  "Playa",
  "del",
  "Carmen",
  "Plovdiv",
  "Plymouth",
  "Plze",
  "Podgorica",
  "Poitiers",
  "Pollen",
  "Pompano",
  "Beach",
  "Pontevedra",
  "Pordenone",
  "Pore",
  "Port",
  "Charlotte",
  "Port",
  "St",
  "Lucie",
  "Portim",

  "Portland",
  "Oregon",
  "Portland",
  "Maine",
  "Porto",
  "Porto",
  "Cervo",
  "Porto",
  "Cristo",
  "Porto",
  "Torres",
  "Portocolom",
  "Portofino",
  "Portoro",
  "Porto",
  "Vecchio",
  "Portsmouth",
  
  "Portsmouth",

  "Positano",
  "Potenza",
  "Potsdam",
  "Poznan",
  "Pozzuoli",
  "Prague",
  "Praia",

  "Rocha",
  "Prato",
  "Preston",
  "Pretoria",
  "Propriano",
  "Protaras",
  "Providence",
  "Provo",
  "Puerto",

  "Cruz",
  "Puerto",
  "Plata",
  "Puerto",
  "Rico",

  "Gran",
  "Canaria",
  "Puerto",
  "Vallarta",
  "Pula",
  "Punta",
  "Arenas",
  "Punta",
  "Cana",
  "Punta",
  "Gorda",
  "Pyeongchang",
  "Quarteira",
  "Quebec",
  "Quimper",
  "Rabat",
  "Ragusa",
  "Railay",
  "Beach",
  "Raleigh",
  "Rancho",
  "Cucamonga",
  "Randers",
  "Rapallo",
  "Rapid",

  "Ras",
  "al",
  "Khaimah",
  "Ravello",
  "Ravenna",
  "Rayong",
  "Redding",
  "Redondo",
  "Beach",
  "Regensburg",
  "Reggio",
  "Calabria",
  "Reggio",
  "Emilia",
  "Regina",
  "Rehovot",
  "Reims",
  "Rennes",
  "Reno",
  "Rethymno",
  "Reus",
  "Reutlingen",
  "Reykjavik",
  "Rhodes",
  "Richmond",
  "Rieti",
  "Riga",
  "Rijeka",
  "Rimini",
  "Rio",

  "Janeiro",
  "Riomaggiore",
  "Rishon",
  "LeZion",
  "Riverside",
  "Riviera",
  "Maya",
  "Roanoke",
  "Rochester",
  "Minnesota",
  "Rochester",
  "Rodez",
  "Rome",
  "Rosario",
  "Roskilde",
  "Rostock",
  "Rotterdam",
  "Roubaix",
  "Rouen",
  "Rovigo",
  "Rovinj",
  "Sa",
  "Coma",
  "Saalbach",
  "Saarbr",
  "cken",
  "Saas",
  "Fee",
  "Sacramento",
  "Saint",
  "Paul",
  "Saint",
  "Petersburg",
  "Saint",
  "Brieuc",
  "Saint",
  "tienne",
  "Saint",
  "Jean",
  "Cap",
  "Ferrat",
  "Saint",
  "Malo",
  "Saint",
  "Tropez",
  "Salamanca",
  "Salem",
  "Oregon",
  "Salem",
  "Massachusetts",
  "Salerno",
  "Salinas",
  "Salisbury",
  "Salou",
  "Salt",
  "Lake",

  "Salta",
  "Salvador",
  "Salzburg",
  "Saman",
  "San",
  "Antonio",
  "San",
  "Bernardino",
  "San",
  "Clemente",
  "San",
  "Diego",
  "San",
  "Francisco",
  "San",
  "Jose",
  "San",
  "Juan",
  "San",
  "Mateo",
  "San",
  "Pedro",
  "San",
  "Pedro",

  "Atacama",
  "San",
  "Sebasti",

  "Sanford",
  "Sanremo",
  "Sant",
  "Antoni",

  "Portmany",
  "Santa",
  "Ana",
  "Santa",
  "Barbara",
  "Santa",
  "Clara",
  "Santa",
  "Clarita",
  "Santa",
  "Cruz",
  "Santa",
  "Cruz",

  "Tenerife",
  "Santa",
  "Eul",
  "ria",
  "des",
  "Riu",
  "Santa",
  "Fe",
  "Santa",
  "Margherita",
  "Ligure",
  "Santa",
  "Monica",
  "Santa",
  "Pola",
  "Santa",
  "Ponsa",
  "Santa",
  "Rosa",
  "Santander",
  "Santiago",
  "Chile",
  "Santiago",
  "Dominican",
  "Rep",
  "Santiago",

  "Compostela",
  "Santo",
  "Domingo",
  "Sao",
  "Paulo",
  "Sapporo",
  "Sarasota",
  "Saskatoon",
  "Sassari",
  "Saumur",
  "Savannah",
  "Savona",
  "Schaffhausen",
  "Schladming",
  "Scottsdale",
  "Seal",
  "Beach",
  "Seattle",
  "Sedona",
  "Seefeld",
  "Segovia",
  "Seoul",
  "Serre",
  "Chevalier",

  "te",
  "Seville",
  "Shanghai",
  "Sharjah",
  "Sheffield",
  "Shenzhen",
  "Shreveport",
  "iauliai",
  "ibenik",
  "Side",
  "Siegen",
  "Siena",
  "Singapore",
  "Sion",
  "Sioux",
  "Falls",
  "Sitges",
  "Skiathos",
  "Sofia",

  "lden",

  "ll",
  "Soller",
  "Sondrio",
  "Sopot",
  "Sorocaba",
  "Sorrento",
  "Southampton",
  "Split",
  "Spokane",
  "Springfield",
  "Illinois",
  "Springfield",
  "Massachusetts",
  "Springfield",
  "Missouri",
  "Springfield",
  "Oregon",
  "St",
  "Albans",
  "St",
  "Anton",
  "St",
  "Augustine",
  "St",
  "Gallen",
  "St",
  "George",
  "St",
  "John",

  "St",
  "Louis",
  "St",
  "Moritz",
  "St",
  "Petersburg",

  "Stavanger",
  "Stirling",
  "Stockholm",
  "Stockton",
  "Stoke",

  "Trent",
  "Strasbourg",
  "Stuttgart",
  "Sukhothai",
  "Sunderland",
  "Sunnyvale",
  "Sunshine",
  "Coast",
  "Superior",
  "Surrey",
  "Sveti",
  "Stefan",
  "Swansea",
  "Sydney",
  "Syracuse",
  "Italy",
  "Syracuse",

  "Szczecin",
  "Tacoma",
  "Tallahassee",
  "Tallinn",
  "Tampa",
  "Tampere",
  "Tamworth",
  "Tangier",
  "Taormina",
  "Taranto",
  "Tarifa",
  "Tarragona",
  "Tartu",
  "Tauplitz",
  "Tauranga",
  "Tavira",
  "Tbilisi",
  "Tel",
  "Aviv",
  "Temecula",
  "Tempe",
  "Teramo",
  "Terni",
  "The",
  "Hague",
  "Thessaloniki",
  "Tignes",
  "Tijuana",
  "Tilburg",
  "Tinos",
  "Tivat",
  "Tivoli",
  "Tokyo",
  "Toledo",
  "Spain",
  "Toledo",

  "Toowoomba",
  "Topeka",
  "Toronto",
  "Torre",
  "del",
  "Greco",
  "Torre",
  "del",

  "Torremolinos",
  "Torrevieja",
  "Toru",
  "Tossa",

  "Toulon",
  "Toulouse",
  "Tours",
  "Townsville",
  "Trani",
  "Trapani",
  "Trento",
  "Trenton",
  "Treviso",
  "Trier",
  "Trieste",
  "Trogir",
  "Troms",
  "Trondheim",
  "Troy",
  "Troyes",
  "Tucson",
  "Tui",
  "Tulsa",
  "Tulum",
  "Turin",
  "Turku",
  "Twin",
  "Falls",
  "Udine",
  "Udon",
  "Thani",
  "Ulcinj",
  "Ulm",
  "Umag",
  "Uppsala",
  "Urbino",
  "Ushuaia",
  "Utrecht",
  "Fassa",
  "Gardena",
  "Thorens",
  "Valence",
  "Valencia",
  "Valladolid",
  "Valle",
  "Isarco",
  "Valletta",
  "Valpara",
  "Vancouver",
  "Canada",
  "Vancouver",
  "Varazze",
  "Varese",
  "Varna",
  "Vaughan",
  "Vejle",
  "Venice",
  "Italy",
  "Venice",

  "Ventimiglia",
  "Ventspils",
  "Ventura",
  "Verbania",
  "Verbier",
  "Vercelli",
  "Vero",
  "Beach",
  "Verona",
  "Versailles",
  "Vevey",
  "Viareggio",
  "Vibo",
  "Valentia",
  "Viborg",
  "Vicenza",
  "Vichy",
  "Victoria",
  "Vienna",
  "Vigo",
  "Vilamoura",
  "Villach",
  "Villefranche",

  "Vilnius",

  "Virginia",
  "Beach",
  "Viterbo",
  "Vitoria",
  "Gasteiz",
  "Volos",
  "Vrsar",
  "Wakefield",
  "Warsaw",
  "Warth",
  "Washington",
  "Waterford",
  "Wellington",
  "New Zealand",
  "Wellington",
  "Wengen",

  "Palm",
  "Beach",
  "Westendorf",
  "Westminster",
  "Weston",
  "Wichita",
  "Wiesbaden",
  "Wilmington",
  "Winchester",
  "Windsor",
  "Winnipeg",
  "Winston",
  "Salem",
  "Winterthur",
  "Wolfsburg",
  "Wollongong",
  "Wolverhampton",
  "Worcester",
  "Worcester",
  "Worthing",
  "Wroclaw",
  "Wuppertal",
  "rzburg",
  "Yakima",
  "Yokohama",
  "Yonkers",
  "York",
  "Yuma",
  "Zadar",
  "Zagreb",
  "Zakopane",
  "Zaragoza",
  "Ziller",
  "Zermatt",
  "Zug",
  "Zurich",
];

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.classList.add("searchResults");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          let cityVal = e.target.querySelector("input");
          let selectCity = String(cityVal.value);
          weatherAsk(selectCity);
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      closeAllLists();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
}

autocomplete(document.getElementById("myInput"), countries);
/****************PREDICTIVE SEARCH****************/

/**/
var mobileView = window.matchMedia( "(min-width: 767px)" );
if (mq.matches) {

    var msg = document.createElement("div"); 
    var copy = document.createTextNode("Avaliable on mobile Only"); 
    msg.className = "non-mob-msg";
    copy.className = "non-mob-msg__copy";
    msg.appendChild(newContent);  
    document.querySelector('body').appendChild(msg); 
}
else {
    console.log("mobile only message failed!");
}
/**/
