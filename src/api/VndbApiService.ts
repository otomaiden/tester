import axios from 'axios';
import type { VndbResponse } from './models/VndbResponse';
import { LocalizedTitleInfo, type VndbApiReleaseResponse, type VndbGame } from './models/VndbGame';

const defaultHeader = {
  'Content-Type': 'application/json'
};

const axiosClient = axios.create({
  baseURL: 'https://api.vndb.org/kana/',
  timeout: 3000,
  headers: defaultHeader,
  withCredentials: false
});

async function defaultVndbVnHandler(uri: string, requestBody: object) : Promise<VndbGame[]> {
  try {
    const response = await axiosClient.post<VndbResponse>(uri, requestBody,
    );
    console.log('response', response);
    return response.data.results as VndbGame[];
  } catch (error) {
    if (error instanceof Error) {
      console.log('error', error)
    }
    return [];
  }
}

async function defaultVndbReleaseHandler(uri: string, requestBody: object) : Promise<VndbApiReleaseResponse[]> {
  try {
    const response = await axiosClient.post<VndbResponse>(uri, requestBody,
    );
    console.log('response', response);
    return response.data.results as VndbApiReleaseResponse[];
  } catch (error) {
    if (error instanceof Error) {
      console.log('error', error)
    }
    return [];
  }
}


const VndbApiService = {
  async GetOtomeGames() : Promise<VndbGame[]> {
    return await defaultVndbVnHandler('vn', {
      "filters": ["and", ["tag", "=", "g542"], ["olang", "=", "ja"]],
      "fields": "title, altTitle, image.url"
    });
  },
  async GetLocalizedGames() : Promise<VndbGame[]> {
    // Only locced games available on either DS, PSP, PSV, Switch and Windows
    // No mobile games! So fx WoF not included... #RIP
    return await defaultVndbVnHandler('vn', {
      "filters": "043gja80UJN18042genNg01154onds4opsp4opsv4oswi4owin741Nh00",
      "fields": "title, altTitle, image.url",
    })
  },
  async GetUpcomingLocalizations() : Promise<LocalizedTitleInfo[]> {
    const titles : LocalizedTitleInfo[] = [];
    const vns = await defaultVndbVnHandler('vn', {
      "filters": "043gja80UJN18042genNg01154onds4opsp4opsv4oswi4owin731Nh00",
      "fields": "title, image.url, released"
    })
    for (const vn of vns) {
      const release : VndbApiReleaseResponse[] = await defaultVndbReleaseHandler('release', {
          "filters": ["vn", "=", ["id", "=", vn.id]],
          "fields": "languages.lang, languages.title, platforms, released, extlinks.url, producers.developer, producers.publisher, official"
      })      
      const title = new LocalizedTitleInfo();
      let enTitleIdx: number = 0;
      const idx = release.findIndex((x: VndbApiReleaseResponse) => {
        const official = x.official === true;
        const platform = !x.platforms?.includes("and") && !x.platforms?.includes("ios");
        enTitleIdx = x.languages.findIndex(y => y.lang === 'en');
        if (official && platform && (enTitleIdx !== -1)) {
          if (x.languages[enTitleIdx].title === null) {
            enTitleIdx = -1;
          }
          return true;
        }
      }
      );
      if (idx !== -1) {
        console.log('found indexxxx', idx, enTitleIdx);
        const r = release[idx];
        console.log('huh', release[idx]);
        // title.extLink = r.extLinks[0].url;
        title.id = r.id;
        title.locTitle = enTitleIdx >= 0 ? r.languages[enTitleIdx].title : vn.title;
        title.locRelease = r.released;
        title.platform = r.platforms[0];
        title.image.url = vn.image.url;
        title.orgTitle = vn.title;
        title.orgRelease = vn.released;
        title.orgCompany = "";
        title.locCompany = "";
      } else {
        console.log('didnt find index');
      }
      titles.push(title);
    }
    console.log('titles', titles);
    return titles;
  }
}

export default VndbApiService;