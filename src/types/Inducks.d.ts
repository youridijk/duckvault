// Generated types for Inducks database
export interface Site {
  sitecode: string;
  urlbase: string;
  images: boolean;
  sitename: string;
  sitelogo: string;
  properties: string;
}

export interface Language {
  languagecode: string;
  defaultlanguagecode: string;
  languagename: string;
  defaultlanguage: Language;
}

export interface Languagename {
  desclanguagecode: string;
  languagecode: string;
  languagename: string;
  language: Language;
  desclanguage: Language;
}

export interface Country {
  countrycode: string;
  countryname: string;
  defaultlanguage: string | Language;
  defaultmaintenanceteam: string;
}

export interface Countryname {
  countrycode: string;
  languagecode: string;
  countryname: string;
  language: Language;
  country: Country;
}

export interface Currency {
  currencycode: string;
  currencyname: string;
}

export interface Currencyname {
  currencycode: string;
  languagecode: string;
  shortcurrencyname: string;
  longcurrencyname: string;
  language: Language;
  currency: Currency;
}

export interface Referencereason {
  referencereasonid: number;
  referencereasontext: string;
}

export interface Referencereasonname {
  referencereasonid: number;
  languagecode: string;
  referencereasontranslation: string;
  language: Language;
  referencereason: Referencereason;
}

export interface Movie {
  moviecode: string;
  title: string;
  moviecomment: string;
  appsummary: string;
  moviejobsummary: string;
  locked: boolean;
  inputfilecode: number;
  maintenanceteamcode: string;
  appisxapp: boolean;
  aka: string;
  creationdate: string;
  moviedescription: string;
  distributor: string;
  genre: string;
  orderer: string;
  publicationdate: string;
  source: string;
  tim: string;
}

export interface Moviejob {
  moviecode: string;
  personcode: string;
  role: string;
  moviejobcomment: string;
  indirect: boolean;
  doubt: boolean;
  person: Person;
  movie: Movie;
}

export interface Moviecharacter {
  moviecode: string;
  charactercode: string;
  istitlecharacter: boolean;
  character: Character;
  movie: Movie;
}

export interface Moviereference {
  storycode: string;
  moviecode: string;
  referencereasonid: number;
  frommovietostory: boolean;
  movie: Movie;
  story: Story;
}

export interface Subseries {
  subseriescode: string;
  subseriesname: string;
  official: boolean;
  subseriescomment: string;
  subseriescategory: string;
}

export interface Subseriesname {
  subseriescode: string;
  languagecode: string;
  subseriesname: string;
  preferred: boolean;
  subseriesnamecomment: string;
  language: Language;
  subseries: Subseries;
}

export interface Universe {
  universecode: string;
  universecomment: string;
}

export interface Team {
  teamcode: string;
  teamdescriptionname: string;
  teamshortname: string;
}

export interface Teammember {
  teamcode: string;
  personcode: string;
  team: Team;
  person: Person;
}

export interface Publisher {
  publisherid: string;
  publishername: string;
}

export interface Person {
  personcode: string;
  nationalitycountrycode: string;
  fullname: string;
  official: boolean;
  personcomment: string;
  unknownstudiomember: boolean;
  isfake: boolean;
  numberofindexedissues: number;
  birthname: string;
  borndate: string;
  bornplace: string;
  deceaseddate: string;
  deceasedplace: string;
  education: string;
  moviestext: string;
  comicstext: string;
  othertext: string;
  photofilename: string;
  photocomment: string;
  photosource: string;
  personrefs: string;
  nationalitycountry: Country;
}

export interface Personalias {
  personcode: string;
  surname: string;
  givenname: string;
  official: boolean;
  person: Person;
}

export interface Studio {
  studiocode: string;
  countrycode: string;
  studioname: string;
  city: string;
  description: string;
  othertext: string;
  photofilename: string;
  photocomment: string;
  photosource: string;
  studiorefs: string;
  country: Country;
}

export interface Studiowork {
  studiocode: string;
  personcode: string;
  person: Person;
  studio: Studio;
}

export interface Character {
  charactercode: string;
  charactername: string;
  official: boolean;
  onetime: boolean;
  heroonly: boolean;
  charactercomment: string;
}

export interface Charactername {
  charactercode: string;
  languagecode: string;
  charactername: string;
  preferred: boolean;
  characternamecomment: string;
  language: Language;
  character: Character;
}

export interface Characteralias {
  charactercode: string;
  charactername: string;
  character: Character;
}

export interface Characterreference {
  fromcharactercode: string;
  tocharactercode: string;
  isgroupofcharacters: boolean;
  tocharacter: Character;
  fromcharacter: Character;
}

export interface Characterdetail {
  charactername: string;
  charactercode: string;
  number: number;
  character: Character;
}

export interface Ucrelation {
  universecode: string;
  charactercode: string;
  character: Character;
  universe: Universe;
}

export interface Universename {
  universecode: string;
  languagecode: string;
  universename: string;
  language: Language;
  universe: Universe;
}

export interface Publication {
  publicationcode: string;
  countrycode: string;
  languagecode: string;
  title: string;
  size: string;
  publicationcomment: string;
  circulation: string;
  numbersarefake: boolean;
  error: boolean;
  locked: boolean;
  inxforbidden: boolean;
  inputfilecode: number;
  maintenanceteamcode: string;
  country: Country;
  language: Language;
}

export interface Publicationcategory {
  publicationcode: string;
  category: string;
  publication: Publication;
}

export interface Publicationname {
  publicationcode: string;
  publicationname: string;
  publication: Publication;
}

export interface Issuerange {
  issuerangecode: string;
  publicationcode: string;
  title: string;
  circulation: string;
  issuerangecomment: string;
  numbersarefake: boolean;
  error: boolean;
  publication: Publication;
}

export interface Issue {
  issuecode: string;
  issuerangecode: string;
  publicationcode: string;
  issuenumber: string;
  title: string;
  size: string;
  pages: string;
  price: string;
  printrun: string;
  attached: string;
  oldestdate: string;
  fullyindexed: boolean;
  issuecomment: string;
  error: boolean;
  filledoldestdate: string;
  locked: boolean;
  inxforbidden: boolean;
  inputfilecode: number;
  maintenanceteamcode: string;
  issuerange: Issuerange;
  publication: Publication;
}

export interface Issuejob {
  issuecode: string;
  personcode: string;
  inxtransletcol: string;
  issuejobcomment: string;
  doubt: boolean;
  person: Person;
  issue: Issue;
}

export interface Issuedate {
  issuecode: string;
  date: string;
  kindofdate: string;
  doubt: boolean;
  issue: Issue;
}

export interface Issuecollecting {
  collectingissuecode: string;
  collectedissuecode: string;
  collectingissue: Issue;
  collectedissue: Issue;
}

export interface Issueprice {
  issuecode: string;
  amount: string;
  currency: string | Currency;
  comment: string;
  sequencenumber: number;
  issue: Issue;
}

export interface Equiv {
  issuecode: string;
  equivid: number;
  equivcomment: string;
  issue: Issue;
}

export interface Publishingjob {
  publisherid: string;
  issuecode: string;
  publishingjobcomment: string;
  issue: Issue;
  publisher: Publisher;
}

export interface Storyheader {
  storyheadercode: string;
  level: string;
  title: string;
  storyheadercomment: string;
  countrycode: string;
  country: Country;
}

export interface Storyversion {
  storyversioncode: string;
  storycode: string;
  entirepages: number;
  brokenpagenumerator: number;
  brokenpagedenominator: number;
  brokenpageunspecified: boolean;
  kind: string;
  rowsperpage: number;
  columnsperpage: number;
  appisxapp: boolean;
  what: string;
  appsummary: string;
  plotsummary: string;
  writsummary: string;
  artsummary: string;
  inksummary: string;
  creatorrefsummary: string;
  keywordsummary: string;
  estimatedpanels: number;
  story: Story;
}

export interface Story {
  storycode: string;
  originalstoryversioncode: string;
  creationdate: string;
  firstpublicationdate: string;
  endpublicationdate: string;
  title: string;
  usedifferentcode: string;
  storycomment: string;
  error: boolean;
  repcountrysummary: string;
  storyparts: number;
  locked: boolean;
  inputfilecode: number;
  issuecodeofstoryitem: string;
  maintenanceteamcode: string;
  storyheadercode: string;
  originalstoryversion: Storyversion;
  storyheader: Storyheader;
}

export interface Storyjob {
  storyversioncode: string;
  personcode: string;
  plotwritartink: string;
  storyjobcomment: string;
  indirect: boolean;
  doubt: boolean;
  person: Person;
  storyversion: Storyversion;
}

export interface Storydescription {
  storyversioncode: string;
  languagecode: string;
  desctext: string;
  language: Language;
  storyversion: Storyversion;
}

export interface Storyreference {
  fromstorycode: string;
  tostorycode: string;
  referencereasonid: number;
  tostory: Story;
  fromstory: Story;
}

export interface Storycodes {
  storycode: string;
  alternativecode: string;
  unpackedcode: string;
  codecomment: string;
  alternative: Story;
  story: Story;
}

export interface Herocharacter {
  storycode: string;
  charactercode: string;
  number: number;
  doubt: boolean;
  character: Character;
  story: Story;
}

export interface Appearance {
  storyversioncode: string;
  charactercode: string;
  number: number;
  appearancecomment: string;
  doubt: boolean;
  character: Character;
  storyversion: Storyversion;
}

export interface Entry {
  entrycode: string;
  issuecode: string;
  storyversioncode: string;
  languagecode: string;
  includedinentrycode: string;
  position: string;
  printedcode: string;
  guessedcode: string;
  title: string;
  reallytitle: boolean;
  printedhero: string;
  changes: string;
  cut: string;
  minorchanges: string;
  missingpanels: string;
  mirrored: boolean;
  sideways: boolean;
  startdate: string;
  enddate: string;
  identificationuncertain: boolean;
  alsoreprint: string;
  part: string;
  entrycomment: string;
  error: boolean;
  issue: Issue;
  storyversion: Storyversion;
  language: Language;
}

export interface Entryurl {
  entrycode: string;
  sitecode: string;
  pagenumber: number;
  url: string;
  storycode: string;
  public: boolean;
  entry: Entry;
  site: Site;
  story: Story;
}

export interface Entrycharactername {
  entrycode: string;
  charactercode: string;
  charactername: string;
  character: Character;
  entry: Entry;
}

export interface Entryjob {
  entrycode: string;
  personcode: string;
  transletcol: string;
  entryjobcomment: string;
  doubt: boolean;
  person: Person;
  entry: Entry;
}

export interface Logocharacter {
  entrycode: string;
  charactercode: string;
  reallyintitle: boolean;
  number: number;
  logocharactercomment: string;
  character: Character;
  entry: Entry;
}

export interface Substory {
  storycode: string;
  originalstoryversioncode: string;
  superstorycode: string;
  part: string;
  firstpublicationdate: string;
  title: string;
  substorycomment: string;
  error: boolean;
  locked: boolean;
  inputfilecode: number;
  maintenanceteamcode: string;
  story: Story;
  superstory: Story;
  originalstoryversion: Storyversion;
}

export interface Storysubseries {
  storycode: string;
  subseriescode: string;
  storysubseriescomment: string;
  story: Story;
}

export interface Issueurl {
  issuecode: string;
  sitecode: string;
  url: string;
  site: Site;
  issue: Issue;
}

export interface Personurl {
  personcode: string;
  sitecode: string;
  url: string;
  site: Site;
  person: Person;
}

export interface Characterurl {
  charactercode: string;
  sitecode: string;
  url: string;
  site: Site;
  character: Character;
}

export interface Storyurl {
  storycode: string;
  sitecode: string;
  url: string;
  site: Site;
  story: Story;
}

export interface Publicationurl {
  publicationcode: string;
  sitecode: string;
  url: string;
  site: Site;
  publication: Publication;
}

export interface Statpersonstory {
  personcode: string;
  storyheadercode: string;
  total: number;
  yearrange: string;
  person: Person;
  storyheader: Storyheader;
}

export interface Statpersoncountry {
  personcode: string;
  countrycode: string;
  total: number;
  person: Person;
  country: Country;
}

export interface Statpersonperson {
  personcode: string;
  copersoncode: string;
  total: number;
  yearrange: string;
  person: Person;
}

export interface Statpersoncharacter {
  personcode: string;
  charactercode: string;
  total: number;
  yearrange: string;
  person: Person;
  character: Character;
}

export interface Statcharacterstory {
  charactercode: string;
  storyheadercode: string;
  total: number;
  yearrange: string;
  character: Character;
  storyheader: Storyheader;
}

export interface Statcharactercountry {
  charactercode: string;
  countrycode: string;
  total: number;
  character: Character;
  country: Country;
}

export interface Statcharactercharacter {
  charactercode: string;
  cocharactercode: string;
  total: number;
  yearrange: string;
  character: Character;
}

