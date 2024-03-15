export type themeType =
  | 'Modern'
  | 'Victorian'
  | 'Minimalist'
  | 'Contemporary'
  | 'Transitional'
  | 'Mid Century Modern'
  | 'Bohemian'
  | 'Pakistani Traditional'
  | 'Mediterranean';

export type roomType =
  | 'Living Room'
  | 'Family Room'
  | 'Dining Room'
  | 'Bedroom'
  | 'Bathroom'
  | 'Home Office'
  | 'Gaming Room';

export const themes: themeType[] = [
  'Modern',
  'Victorian',
  'Minimalist',
  'Contemporary',
  'Transitional',
  'Mid Century Modern',
  'Bohemian',
  'Pakistani Traditional',
  'Mediterranean',
];

export const rooms: roomType[] = [
  'Living Room',
  'Family Room',
  'Dining Room',
  'Home Office',
  'Bedroom',
  'Bathroom',
  'Gaming Room',
];

export type WoodVariant =
  | 'Red Oak'
  | 'White Oak'
  | 'European Oak'
  | 'Hard Maple'
  | 'Soft Maple'
  | 'Hickory'
  | 'Pecan'
  | 'American Walnut'
  | 'Brazilian Walnut'
  | 'Black Cherry'
  | 'Brazilian Cherry'
  | 'White Ash'
  | 'Black Ash'
  | 'American Mahogany'
  | 'Santos Mahogany'
  | 'African Mahogany'
  | 'Sapele'
  | 'Teak'
  | 'Southern Yellow Pine'
  | 'Heart Pine'
  | 'Douglas Fir'
  | 'Red Pine'
  | 'Australian Cypress'
  | 'Bamboo'
  | 'Acacia'
  | 'Beech'
  | 'Birch'
  | 'Tasmanian Oak'
  | 'Wenge';

export type StoneVariant =
  | 'Slate'
  | 'Black Slate'
  | 'Gray Slate'
  | 'Basalt'
  | 'Black Basalt'
  | 'Gray Basalt'
  | 'Honed Basalt'
  | 'Flamed Basalt'
  | 'Carrara Marble'
  | 'Italian Gray Marble'
  | 'Italian Silver Gray Marble'
  | 'Tundra Gray Marble'
  | 'White Carrara Marble';

export type FlooringType = WoodFlooring | StoneFlooring;

interface WoodFlooring {
  type: 'Wooden';
  variant: WoodVariant;
}

interface StoneFlooring {
  type: 'Stone';
  variant: StoneVariant;
}

export type PanelingType = WoodPaneling | StonePaneling;

interface WoodPaneling {
  type: 'Wooden';
  variant: WoodVariant;
}

interface StonePaneling {
  type: 'Stone';
  variant: StoneVariant;
}

export type PlantType =
  | 'Snake Plant'
  | 'ZZ Plant'
  | 'Pothos'
  | 'Philodendron'
  | 'Monstera'
  | 'Rubber Plant'
  | 'Dracaena'
  | 'Yucca'
  | 'Aglaonema'
  | 'Dieffenbachia'
  | 'Calathea'
  | 'Fern'
  | "Bird's Nest Fern"
  | 'Boston Fern'
  | 'Maidenhair Fern'
  | 'Staghorn Fern'
  | 'Palm'
  | 'Areca Palm'
  | 'Kentia Palm'
  | 'Majesty Palm'
  | 'Parlor Palm'
  | 'Ponytail Palm'
  | 'Bamboo Palm'
  | 'Spider Plant'
  | 'Chinese Evergreen'
  | 'Peace Lily';
