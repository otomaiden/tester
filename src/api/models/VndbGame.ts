interface VndbImage {
  url: string;
}

interface VndbGame {
  id: string;
  title: string;
  altTitle: string;
  image: VndbImage;
  released: string;
}

interface ExtLinks {
  url: string;
}
interface Languages {
  title: string;
  lang: string;
}
interface Producers {
  id: string;
  publisher: boolean;
  developer: true;
}

interface VndbApiReleaseResponse {
  id: string;
  extLinks: ExtLinks[];
  released: string;
  platforms: string[];
  languages: Languages[];
  producers: Producers[];
  official: boolean;
}

interface LocalizedTitleInfoInterface {
  id: string;
  orgTitle: string;
  locTitle: string;
  orgRelease: string;
  locRelease: string;
  platform: string;
  orgCompany: string;
  locCompany: string;
  extLink: string;
  image: VndbImage;
}
export class LocalizedTitleInfo implements LocalizedTitleInfoInterface {
  id: string = "";
  platform: string = "";
  extLink: string = "";
  image: VndbImage = {url: ""};
  orgTitle: string = "";
  locTitle: string = "";
  orgRelease: string = "";
  locRelease: string = "";
  orgCompany: string = "";
  locCompany: string = "";
}

export type { VndbGame, LocalizedTitleInfoInterface, VndbApiReleaseResponse };