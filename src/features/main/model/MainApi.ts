import AbstractApiRepository from "src/app/api/ApiRepository";
import { APP_URL } from "src/appConfig";
import { ICity } from "src/types/city";
import { Location } from "../types/address";


const checkAuthorization = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTY5OTcxMjkxMDEiLCJ1c2VyX2lkIjoiNjU2ZGNiZjE2ODM0Y2EyZjcwZTc4YmI5IiwiaWF0IjoxNzAxNzAwMzU1fQ.Ui5Fb6Ixnbz0nQQzmfqJO_Ar2HEthAdMR4HyHV-ep9k';
  };

class MainApi extends AbstractApiRepository {
    async getCities(city: string) {
        const token = await checkAuthorization();
        return this.apiClient.get<ICity[]>({
            url: APP_URL + '/city/',
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                },
                params: {
                    city
                }
            }
        });
    };

    async findRoutes(points: Location[]) {
        // const apiKey = "035b796f-9668-4e4d-9fa3-dd2a1ca31999";
        const apiKey = "pk.912a14f9128bf2dfbda7f97dd200be9d";
        // const url = "https://api.routing.yandex.net/v2/route";
        let waypoints = "";
        points.forEach((item, index) => {
            waypoints += `${item.lat},${item.lon}`;
            if (index < points.length - 1) {
                waypoints += ';';
            }
        })
        // console.log('Waypoints: ', waypoints);
        const url = `https://us1.locationiq.com/v1/directions/driving/${waypoints}?key=${apiKey}&steps=true&alternatives=true&geometries=polyline&overview=full`;
        const compareUrl = "https://us1.locationiq.com/v1/directions/driving/42.875969,74.603701;42.859509,74.664014?key=pk.912a14f9128bf2dfbda7f97dd200be9d&steps=true&alternatives=true&geometries=polyline&overview=full&";
        // console.log(url == compareUrl);
        // console.log(waypoints);
        // console.log(url);
        // console.log(compareUrl);
        return this.apiClient.get({
            url
        });
    }
}

export const mainApi = new MainApi();