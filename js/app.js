
/****************Global Variables****************/
let cityName;
let API_KEY = "bc058670a30398242386d2bae3b83c7a";
var Unsplash_API_kEY = "HG9buRgEMEJyhqFnMbvRy1RngUIKVVpAPDTOeuAeOhQ";
const search = document.querySelector(".main__search");
const searchForm = document.querySelector(".weather-app__main__search__form");
const searchInput = document.querySelector(".weather-app--navigation__input .auto input");
var randNumber = Math.floor(Math.random() * 100) + 1;
let active = false;
/****************Global Variables****************/

/****************SEARCH INPUT********************/
  searchInput.addEventListener("keyup", function(event) {
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
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then(data => {
      let image = data.results[0].urls.regular;
      document.querySelector(".weather-app__main").style.background =
        "linear-gradient(180deg, rgba(49,49,49,1) 0%, rgba(49,49,49,0) 100%), url(" +
        image +
        ")";
    })
    .catch(error => {
      console.log(error);
    });
}
/**************GET BACKGROUND IMAGES*************/

/****************CONTAINERS***********************/
let cityCon = document.querySelector(".weather-app__main__city");
let weatherCon = document.querySelector(".weather-app__main__temp-type__weather-con");
let tempCon = document.querySelector(".weather-app__main__temp-type__weather-temp");
let windSpeedCon = document.querySelector(".weather-app__footer__grid__content__wind-speed");
let humCon = document.querySelector(".weather-app__footer__grid__content__humidity");
let pressCon = document.querySelector(".weather-app__footer__grid__content__pressure");
let latlonCon = document.querySelector(".weather-app__footer__grid__content__long-lat");
let minMaxCon = document.querySelector(".weather-app__main__min-max-temp__max");
let sunCon = document.querySelector(".weather-app__footer__grid__content__sun");
/****************CONTAINERS***********************/

/****************FETCH API***********************/
function weatherAsk(cityName) {
  console.log(cityName);
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric`;
  fetch(api)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then(data => {
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
      tempCon.innerHTML = `${temp} <span>&#8451;</span>`;
      windSpeedCon.innerHTML = `Windspeed: ${windSpeed}`;
      humCon.innerHTML = `Humidity: ${humidity}`;
      pressCon.innerHTML = `Pressure: ${pressure}`;
      latlonCon.innerHTML = `Latitude: ${latitude} <br> Longitude: ${longitude}`;
      minMaxCon.innerHTML = `Min: ${tempMin} <br> Max: ${tempMax}`;
      sunCon.innerHTML = `Sunrise: ${sunrise} <br> Sunset: ${sunset}`;

      imageAsk(weatherType);
    })
    .catch(error => {
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
    .then(response => {
      return response.json();
    })
    .then(location => {
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


var countries  = ["A","Coru","a","Aachen","Aarhus","Abbeville","Aberdeen","Abu","Dhabi","Acapulco","Adelaide","Adelboden","Agadir","Agde","Agen","Agios","Nikolaos","Agrigento","Agropoli","Aigues","Mortes","Aix","en","Provence","Aix","les","Bains","Ajaccio","Ajman","Akron","Al","Ain","Alanya","Albacete","Albany","Albenga","Albi","Albufeira","Albuquerque","Alcudia","Alessandria","lesund","Alexandria","Algeciras","Alghero","Alicante","Alkmaar","Alpe","d","Huez","Alta","Badia","Altea","Amalfi","Amarillo","Amersfoort","Amiens","Amsterdam","Anaheim","Anchorage","Ancona","Andalo","Andermatt","Andria","Angers","Ankara","Ann","Arbor","Annapolis","Annecy","Antalya","Antibes","Antwerp","Anzio","Ao","Nang","Aosta","Appleton","Aracaju","Arcachon","Arenzano","Arezzo","Argostoli","Arica","Arles","Arlington","Virginia","Arlington","Texas","Armagh","Arnhem","Arosa","Arras","Arrecife","Art","Ascoli","Piceno","Ashdod","Ashkelon","Aspen","Asti","Athens","Athlone","Atlanta","Atlantic","City","Auckland","Augsburg","Augusta","Georgia","Augusta","Maine","Aurora","Colorado","Aurora","Illinois","Austin","Auxerre","Aveiro","Avellino","Avignon","Avoriaz","Axamer","Lizum","Ayia","Napa","Bad","Gastein","Bad","Hofgastein","Baden","Baiona","Bakersfield","Baltimore","Bandar","Seri","Begawan","Bandol","Bangkok","Bangor","Bar","Barcelona","Bari","Barletta","Barstow","Basel","Bastia","Bath","Baton","Rouge","Batumi","Bayonne","Beaulieu","sur","Mer","Beersheba","Beijing","Belfast","Belfort","Belgrade","Belize","City","Belluno","Belmopan","Belo","Horizonte","Bemidji","Benalmadena","Bendigo","Benevento","Benic","ssim","Benidorm","Bergamo","Bergen","Bergerac","Berkeley","Berlin","Bern","Besan","on","Beverly","Hills","B","ziers","Biarritz","Biel","Bienne","Bielefeld","Biella","Bilbao","Billings","Birmingham","UK","Birmingham","U","S","Bismarck","Blanes","Bled","Blois","Blumenau","Boca","Chica","Boca","Raton","Bochum","Bodrum","Boise","Bologna","Bolzano","Bonifacio","Bonn","Bordeaux","Bordighera","Bormio","Boston","Boulder","Boulogne","sur","Mer","Bourges","Boynton","Beach","Bradenton","Bradford","Braga","Brampton","Brasilia","Bratislava","Braunschweig","Breda","Bregenz","Brela","Bremen","Bremerhaven","Brescia","Brest","Brighton","Brindisi","Brisbane","Bristol","Brixen","Brixental","Brno","Brownsville","Bruges","Brussels","Bucharest","Budapest","Budva","Buenos","Aires","Buffalo","Burgas","Cabo","San","Lucas","C","diz","Caen","Cagliari","Cagnes","sur","Mer","Cairns","Cala","Bona","Cala","d","Or","Cala","Millor","Cala","Ratjada","Calais","Calella","Calgary","Caloundra","Calp","Caltanissetta","Calvi","Cambridge","Cambrils","Campinas","Campobasso","Can","Picafort","Canazei","Canberra","Cancun","Cannes","Canterbury","Canyamel","Capdepera","Cape","Canaveral","Cape","Coral","Cape","May","Cape","Town","Carbonia","Carcassonne","Cardiff","Carlisle","Carlsbad","Carpi","Carpinteria","Carrara","Carson","City","Cartagena","Casablanca","Caserta","Casper","Cassis","Castelrotto","Catania","Catanzaro","Caxias","do","Sul","Cervinia","Cesena","esk","Krumlov","e","me","Chamonix","Chandler","Chania","Charleroi","Charleston","West","Virginia","Charleston","South","Carolina","Charlotte","Charlottetown","Chartres","Chattanooga","Chelmsford","Chemnitz","Cherbourg","Chesapeake","Chester","Cheyenne","Chiang","Mai","Chiang","Rai","Chiavari","Chicago","Chichester","Chieti","Chioggia","Chios","Chonburi","Christchurch","Chula","Vista","Chur","Cincinnati","Ciutadella","de","Menorca","Civitavecchia","Clearwater","Clermont","Ferrand","Cleveland","Cocoa","Beach","Coconut","Creek","Coimbra","Collioure","Colmar","Cologne","Colorado","Springs","Columbia","Columbus","Como","Concepci","n","Concord","Conil","de","la","Frontera","Copenhagen","Coral","Springs","C","rdoba","Argentina","C","rdoba","Spain","Corfu","Corinth","Cork","Corpus","Christi","Corralejo","Cortina","d","Ampezzo","Cosenza","Costa","Adeje","Courchevel","Courmayeur","Coventry","Coyhaique","Cozumel","Crans","Montana","Cremona","Crotone","Cuneo","Da","Nang","Dallas","Dana","Point","Darmstadt","Darwin","Daugavpils","Davos","Daytona","Beach","Deerfield","Beach","Del","Mar","Delft","Delray","Beach","Denia","Denver","Derby","Derry","Des","Moines","Detroit","Didim","Dieppe","Dijon","Doha","Dolomiti","Superski","Dorfgastein","Dortmund","Dover","Dresden","Dubai","Dublin","Dubrovnik","Duisburg","Duluth","Dundalk","Dundee","Dunedin","Dunkirk","Durham","Durham","D","sseldorf","Eastbourne","Eau","Claire","Edinburgh","Edmonton","Eilat","Eindhoven","El","Paso","Elche","Ellmau","Elm","Empuriabrava","Encinitas","Engelberg","Enna","Enschede","Erfurt","Erie","Erlangen","Esbjerg","Espace","Killy","Essaouira","Essen","Estepona","Eugene","Exeter","Faenza","Falmouth","Famagusta","Fano","Fargo","Faro","Fayetteville","Fermo","Fernandina","Beach","Ferrara","Fethiye","Fez","Fieberbrunn","Filzmoos","Finale","Ligure","Fiumicino","Flagstaff","Flaine","Florence","Foggia","Folgarida","Fontana","Forl","Fort","Collins","Fort","Lauderdale","Fort","Myers","Fort","Wayne","Fort","Worth","Forte","dei","Marmi","Foz","do","Igua","u","Frankfort","Frankfurt","am","Main","Fredericton","Freeport","Freiburg","Fremont","Fresno","Fribourg","Frosinone","Fuengirola","Fujairah","Fukuoka","Funchal","Gainesville","Galt","r","Galway","Garden","Grove","Garland","Gatineau","Gdansk","Gdynia","Geelong","Gelsenkirchen","Geneva","Genoa","George","Town","Ghent","Gij","n","Gilbert","Girona","Glasgow","Glendale","Arizona","Glendale","California","Gloucester","Gold","Coast","Gorizia","Dachstein","West","Gothenburg","G","ttingen","Granada","Grand","Prairie","Grand","Rapids","Granville","Grasse","Graz","Great","Falls","Green","Bay","Greensboro","Grenoble","Grindelwald","Groningen","Grossarl","Grosseto","Gstaad","Guadalajara","Guangzhou","Guimar","es","Haarlem","Haifa","Halifax","Halle","Hamburg","Hamilton","Canada","Hamilton","New","Zealand","Hampton","Hangzhou","Hannover","Hanoi","Harrisburg","Hartford","Hasselt","Hastings","Hat","Yai","Havana","Heidelberg","Heilbronn","Heiligenblut","Helena","Helsinki","Henderson","Heraklion","Herceg","Novi","Hereford","Hermosa","Beach","Hervey","Bay","Hialeah","Hinterglemm","Hinterstoder","Hiroshima","Hoi","An","Hobart","Ho","Chi","Minh","City","Hollywood","Florida","Hong","Kong","Honolulu","Horsens","Houston","Hua","Hin","Hue","Huntington","Beach","Huntsville","Hvar","Hy","res","Ibiza","Town","Imola","Imperia","Inca","Indianapolis","Ingolstadt","Innsbruck","Interlaken","Inverness","Ioannina","Irvine","Irving","Ischgl","Isernia","Islamorada","Istanbul","zmir","Izola","Jackson","Jacksonville","Jefferson","City","Jena","Jerez","de","la","Frontera","Jersey","City","Jerusalem","Johannesburg","Joinville","Juan","les","Pins","Juiz","de","Fora","Juneau","Jungfrau","Jupiter","J","rmala","Kalamata","Kanchanaburi","Kansas","City","Kansas","City","Kansas","Kappl","Kaprun","Karlovy","Vary","Karlsruhe","Kassel","Kastoria","Kaunas","Kavala","Kemer","Key","Largo","Key","West","Khao","Lak","Kiel","Kilkenny","Kingston","Kingston","upon","Hull","Kissimmee","Kitzb","hel","Klagenfurt","Klaip","da","Knoxville","Kobe","Koblenz","Kolding","Komotini","Koper","Kos","Ko","ice","Kotor","Krabi","Krakow","Krefeld","Kuah","Kuala","Lumpur","Ku","adas","Kutn","Hora","Kyoto","Kyrenia","La","Ciotat","La","Clusaz","La","Laguna","La","Maddalena","La","Manga","La","Plagne","La","Plata","La","Rochelle","La","Romana","La","Serena","La","Spezia","La","Thuile","Laax","Lagos","Laguna","Beach","Lakeland","Lamezia","Terme","Lancaster","Lancaster","U","S","Lansing","L","Aquila","Laredo","Largo","Larnaca","Las","Palmas","Las","Vegas","Latina","Lausanne","Laval","Le","Havre","Le","Lavandou","Le","Mans","Lecce","Lecco","Lech","Leeds","Legnano","Leicester","Leiden","Leipzig","Leogang","Les","Arcs","Les","Deux","Alpes","Les","Gets","Les","Houches","Les","Menuires","Leuven","Lexington","Liberec","Lichfield","Li","ge","Lienz","Liep","ja","Lille","Limassol","Limerick","Limoges","Lincoln","Lincoln","Lindos","Linz","Lisbon","Lisburn","Little","Rock","Liverpool","Livigno","Livorno","Ljubljana","Lloret","de","Mar","Loano","Locarno","Lodi","Lodz","Logro","o","London","Canada","London","UK","Londrina","Long","Beach","Los","Angeles","Los","Cabos","Los","Cristianos","Louisville","Lourdes","Loutraki","Louvain","la","Neuve","Lubbock","L","beck","Lublin","Lucca","Lucerne","Lugano","Lund","Lyon","Maastricht","Macerata","Madison","Madonna","di","Campiglio","Madrid","Magaluf","Magdeburg","Mah","n","Mainz","Makarska","Malaga","Malia","Malibu","Malm","Manacor","Manchester","Manhattan","Beach","Mannheim","Manosque","Mantua","Mar","del","Plata","Marathon","Marbella","Maria","Alm","Maribor","Markham","Marmaris","Maroochydore","Marrakesh","Marsala","Marseille","Maspalomas","Massa","Matera","Mayrhofen","Mazara","del","Vallo","Mechelen","Meg","ve","Melbourne","Australia","Melbourne","U","S","Memphis","Menton","Merano","Meribel","M","rida","Mesa","Messina","Mestre","Metz","Mexico","City","Miami","Middelburg","Midland","Mijas","Milan","Millau","Milwaukee","Minneapolis","Miramar","Mississauga","Moab","Mobile","Modena","Modesto","Modica","Moena","Mogi","das","Cruzes","Mons","Monte","Rosa","Montego","Bay","Montepulciano","Monterey","Montgomery","Montpelier","Montpellier","Montreal","Montreux","Monza","Moraira","Moreno","Valley","Morzine","Moscow","Mountain","View","Mulhouse","Munich","M","nster","Murcia","Murter","Mykonos","Mytilene","Nafplio","Nagoya","Namur","Nancy","Nantes","Napa","Naples","Italy","Naples","U","S","Narbonne","Narva","Nashville","Nassau","Naxos","Nazareth","Negril","Nelson","Nerja","Netanya","Nevers","New","Haven","New","Orleans","New","Smyrna","Beach","New","York","City","Newark","Newcastle","Australia","Newcastle","UK","Newport","Newport","Beach","Newport","News","Newry","Nha","Trang","Niagara","Falls","Nice","Nicosia","Nijmegen","Nimes","Niort","Noosa","Heads","Norfolk","North","Las","Vegas","North","Port","Norwich","Nottingham","Novara","Novigrad","Nuoro","N","rnberg","Nyon","Oakland","Oaxaca","Obergurgl","Oberhausen","Ocala","Oceanside","Ocho","Rios","Odense","Odessa","Ogden","Oia","Oklahoma","City","Olbia","Oldenburg","Olomouc","Olympia","Omaha","Opatija","Oristano","Orlando","Orl","ans","Ortisei","Osaka","Oslo","Osnabr","ck","Ostrava","Ottawa","Oulu","Overland","Park","Oviedo","Oxford","Oxnard","Paderborn","Padova","Palanga","Palavas","les","Flots","Palermo","Palm","Bay","Palm","Beach","Palma","de","Mallorca","Palma","Nova","Palmetto","Palo","Alto","Pamplona","Panama","City","U","S","Paphos","Paradiski","Paralia","Parikia","Paris","Parma","P","rnu","Pasadena","Passo","del","Tonale","Passo","Rolle","Patras","Pattaya","Pau","Pavia","Peguera","Pembroke","Pines","Pensacola","Perast","Perpignan","Perros","Guirec","Perth","Australia","Perth","UK","Perugia","Pesaro","Pescara","Pescasseroli","Petah","Tikva","Peterborough","Petrovac","Pforzheim","Phang","Nga","Phetchabun","Philadelphia","Phoenix","Phuket","City","Piacenza","Pierre","Piraeus","Piran","Pisa","Pistoia","Pittsburgh","Placencia","Plano","Playa","Blanca","Playa","de","las","Am","ricas","Playa","del","Carmen","Plovdiv","Plymouth","Plze","Podgorica","Poitiers","Pollen","a","Pompano","Beach","Pontevedra","Pordenone","Pore","Port","Charlotte","Port","St","Lucie","Portim","o","Portland","Oregon","Portland","Maine","Porto","Porto","Cervo","Porto","Cristo","Porto","Torres","Portocolom","Portofino","Portoro","Porto","Vecchio","Portsmouth","UK","Portsmouth","U","S","Positano","Potenza","Potsdam","Poznan","Pozzuoli","Prague","Praia","da","Rocha","Prato","Preston","Pretoria","Propriano","Protaras","Providence","Provo","Puerto","de","la","Cruz","Puerto","Plata","Puerto","Rico","de","Gran","Canaria","Puerto","Vallarta","Pula","Punta","Arenas","Punta","Cana","Punta","Gorda","Pyeongchang","Quarteira","Quebec","Quimper","Rabat","Ragusa","Railay","Beach","Raleigh","Rancho","Cucamonga","Randers","Rapallo","Rapid","City","Ras","al","Khaimah","Ravello","Ravenna","Rayong","Redding","Redondo","Beach","Regensburg","Reggio","Calabria","Reggio","Emilia","Regina","Rehovot","Reims","Rennes","Reno","Rethymno","Reus","Reutlingen","Reykjavik","Rhodes","Richmond","Rieti","Riga","Rijeka","Rimini","Rio","de","Janeiro","Riomaggiore","Rishon","LeZion","Riverside","Riviera","Maya","Roanoke","Rochester","Minnesota","Rochester","New","York","Rodez","Rome","Rosario","Roskilde","Rostock","Rotterdam","Roubaix","Rouen","Rovigo","Rovinj","Sa","Coma","Saalbach","Saarbr","cken","Saas","Fee","Sacramento","Saint","Paul","Saint","Petersburg","Saint","Brieuc","Saint","tienne","Saint","Jean","Cap","Ferrat","Saint","Malo","Saint","Tropez","Salamanca","Salem","Oregon","Salem","Massachusetts","Salerno","Salinas","Salisbury","Salou","Salt","Lake","City","Salta","Salvador","Salzburg","Saman","San","Antonio","San","Bernardino","San","Clemente","San","Diego","San","Francisco","San","Jose","San","Juan","San","Mateo","San","Pedro","San","Pedro","de","Atacama","San","Sebasti","n","Sanford","Sanremo","Sant","Antoni","de","Portmany","Santa","Ana","Santa","Barbara","Santa","Clara","Santa","Clarita","Santa","Cruz","Santa","Cruz","de","Tenerife","Santa","Eul","ria","des","Riu","Santa","Fe","Santa","Margherita","Ligure","Santa","Monica","Santa","Pola","Santa","Ponsa","Santa","Rosa","Santander","Santiago","Chile","Santiago","Dominican","Rep","Santiago","de","Compostela","Santo","Domingo","Sao","Paulo","Sapporo","Sarasota","Saskatoon","Sassari","Saumur","Savannah","Savona","Schaffhausen","Schladming","Scottsdale","Seal","Beach","Seattle","Sedona","Seefeld","Segovia","Seoul","Serre","Chevalier","S","te","Seville","Shanghai","Sharjah","Sheffield","Shenzhen","Shreveport","iauliai","ibenik","Side","Siegen","Siena","Singapore","Sion","Sioux","Falls","Sitges","Skiathos","Sofia","S","lden","S","ll","Soller","Sondrio","Sopot","Sorocaba","Sorrento","Southampton","Split","Spokane","Springfield","Illinois","Springfield","Massachusetts","Springfield","Missouri","Springfield","Oregon","St","Albans","St","Anton","St","Augustine","St","Gallen","St","George","St","John","s","St","Louis","St","Moritz","St","Petersburg","U","S","Stavanger","Stirling","Stockholm","Stockton","Stoke","on","Trent","Strasbourg","Stuttgart","Sukhothai","Sunderland","Sunnyvale","Sunshine","Coast","Superior","Surrey","Sveti","Stefan","Swansea","Sydney","Syracuse","Italy","Syracuse","U","S","Szczecin","Tacoma","Tallahassee","Tallinn","Tampa","Tampere","Tamworth","Tangier","Taormina","Taranto","Tarifa","Tarragona","Tartu","Tauplitz","Tauranga","Tavira","Tbilisi","Tel","Aviv","Temecula","Tempe","Teramo","Terni","The","Hague","Thessaloniki","Tignes","Tijuana","Tilburg","Tinos","Tivat","Tivoli","Tokyo","Toledo","Spain","Toledo","U","S","Toowoomba","Topeka","Toronto","Torre","del","Greco","Torre","del","Mar","Torremolinos","Torrevieja","Toru","Tossa","de","Mar","Toulon","Toulouse","Tours","Townsville","Trani","Trapani","Trento","Trenton","Treviso","Trier","Trieste","Trogir","Troms","Trondheim","Troy","Troyes","Tucson","Tui","Tulsa","Tulum","Turin","Turku","Twin","Falls","Udine","Udon","Thani","Ulcinj","Ulm","Umag","Uppsala","Urbino","Ushuaia","Utrecht","Val","d","Is","re","Val","di","Fassa","Val","Gardena","Val","Thorens","Valence","Valencia","Valladolid","Valle","Isarco","Valletta","Valpara","so","Vancouver","Canada","Vancouver","U","S","Varazze","Varese","Varna","Vaughan","Vejle","Venice","Italy","Venice","U","S","Ventimiglia","Ventspils","Ventura","Verbania","Verbier","Vercelli","Vero","Beach","Verona","Versailles","Vevey","Viareggio","Vibo","Valentia","Viborg","Vicenza","Vichy","Victoria","Vienna","Vigo","Vilamoura","Villach","Villefranche","sur","Mer","Vilnius","Vi","a","del","Mar","Virginia","Beach","Viterbo","Vitoria","Gasteiz","Volos","Vrsar","Wakefield","Warsaw","Warth","Washington","D","C","Waterford","Wellington","New","Zealand","Wellington","U","S","Wengen","West","Palm","Beach","Westendorf","Westminster","Weston","Wichita","Wiesbaden","Wilmington","Winchester","Windsor","Winnipeg","Winston","Salem","Winterthur","Wolfsburg","Wollongong","Wolverhampton","Worcester","UK","Worcester","U","S","Worthing","Wroclaw","Wuppertal","W","rzburg","Yakima","Yokohama","Yonkers","York","Yuma","Zadar","Zagreb","Zakopane","Zaragoza","Zell","am","See","Zell","am","Ziller","Zermatt","Zug","Zurich"];

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;

    inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          b.classList.add("searchResults");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });




    /*execute a function when someone writes in the text field:*/
    
    
    
  
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
    let cityVal = e.target.querySelector('input');
      if(cityVal === null){
        console.log("no search");
      }
      else{
        let selectCity = String(cityVal.value);
        weatherAsk(selectCity);
      }
});
  }

  autocomplete(document.getElementById("myInput"), countries);



document.querySelector(".weather-app--info").addEventListener("click",moreInfo);
function moreInfo(val){
    document.querySelector('.menu').classList.toggle('slide');
    document.querySelector('.menu-info').classList.toggle('show');
    document.querySelector('.weather-app--info svg').classList.toggle('rotate');
}




  








