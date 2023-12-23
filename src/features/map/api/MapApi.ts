import AbstractApiRepository from "src/app/api/ApiRepository";


const checkAuthorization = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTY5OTcxMjkxMDEiLCJ1c2VyX2lkIjoiNjU2ZGNiZjE2ODM0Y2EyZjcwZTc4YmI5IiwiaWF0IjoxNzAxNzAwMzU1fQ.Ui5Fb6Ixnbz0nQQzmfqJO_Ar2HEthAdMR4HyHV-ep9k';
  };

class MapApi extends AbstractApiRepository {
    async getGeocode(address: string) {
        const token = await checkAuthorization();
        const apiKey = "035b796f-9668-4e4d-9fa3-dd2a1ca31999";
        console.log(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(address)}&format=json`);
        return this.apiClient.get({
            url: `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(address)}&format=json`
        });
    };
}

export const mapApi = new MapApi();