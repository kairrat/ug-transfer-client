module.exports = `<!DOCTYPE html>
<html lang="en">

<head>
    <script src="https://api-maps.yandex.ru/2.1/?apikey=035b796f-9668-4e4d-9fa3-dd2a1ca31999&lang=ru_RU" type="text/javascript"></script>
    <meta name="viewport" content="width=device-width, initil-scale=1.0"/>
    <style>
        body {
            margin: 0;
        }
        
        .map-holder {
            width: 100%;
            height: 100vh;
            border: 1px solid #000;
        }
    </style>
</head>

<body>
    <div id="map" class="map-holder"></div>
    <script>
        var myMap = null;
        var price_tarif = 18;
        var multiRoute = null,
            startMarker = null,
            endMarker = null,
            startMarkerLocation = null,
            endMarkerLocation = null
            myLocation = null
            myLocationMarker = null;
        ymaps.ready(init);

        function init() {
            myMap = new ymaps.Map("map", {
                center: [55.861479, 37.428102],
                zoom: 9,
                controls: []
            },{
                yandexMapDisablePoiInteractivity: true
            });
            window.ReactNativeWebView.postMessage(\`map:init\`);   
        }

        function removeStartMarker() {
            if (myMap !== null && startMarker !== null) {
                myMap.geoObjects.remove(startMarker);
                startMarkerLocation = null;
                removeRoutes();
            }
        }

        function removeEndMarker() {
            if (myMap !== null && endMarker !== null) {
                myMap.geoObjects.remove(endMarker);
                endMarkerLocation = null;
                removeRoutes();
            }
        }


        function addStartMarker(lat, lon) {
            removeStartMarker();
            startMarker = new ymaps.Placemark([lat, lon], {}, {
                preset: 'islands#greenCircleDotIcon'
            });
            startMarkerLocation = [lat, lon];
            if (myMap !== null) {
                myMap.geoObjects.add(startMarker);
                fitMarkers();
            }
        };

        function addEndMarker(lat, lon) {
            window.ReactNativeWebView.postMessage(\`Adding end marker\`);
            removeEndMarker();
            endMarker = new ymaps.Placemark([lat, lon], {}, {
                preset: 'islands#blueCircleDotIcon'
            });
            endMarkerLocation = [lat, lon];
            if (myMap !== null) {
                myMap.geoObjects.add(endMarker);
                fitMarkers();
            }
        };

        function addMyLocation(lat, lon) {
            if (myLocationMarker !== null) {
                myMap.geoObjects.remove(myLocationMarker);
                myLocation = null;
            }
            if (ymaps) {
                myLocationMarker = new ymaps.Placemark([lat, lon], {}, {
                    preset: 'islands#redCircleDotIcon'
                });
                myLocation = [lat, lon];
                myMap.geoObjects.add(myLocationMarker);
            }
        }

        function setMyPosition() {
            if (myLocation !== null) {
                myMap.setCenter(myLocation, 5, {
                    checkZoomRange: true
                });
            }
        }

        function fitMarkers() {
            if (startMarkerLocation !== null && endMarkerLocation !== null) {
                myMap.setBounds(myMap.geoObjects.getBounds()).then(() => {
                    let zoom = myMap.getZoom();
                    if (zoom > 2) {
                        myMap.setZoom(zoom - 1);
                    }
                    setRoutes();
                });
            } else if (startMarkerLocation !== null) {
                window.ReactNativeWebView.postMessage(\`Setting start: \${startMarkerLocation}\`);
                myMap.setCenter(startMarkerLocation, 15, {
                    checkZoomRange: false
                });

            } else if (endMarkerLocation !== null) {
                window.ReactNativeWebView.postMessage(\`Setting end: \${endMarkerLocation}\`);
                myMap.setCenter(endMarkerLocation, 15, {
                    checkZoomRange: false
                });
            };
        }

        async function setRoutes() {
            if (startMarkerLocation === null || endMarkerLocation === null) {
                return;
            }
            if (multiRoute !== null) {
                myMap.geoObjects.remove(multiRoute);
            }
            multiRoute = new ymaps.multiRouter.MultiRoute({
                referencePoints: [
                    startMarkerLocation,
                    endMarkerLocation
                ],
                params: {
                    routingMode: "auto",
                    avoidTrafficJams: true,
                    viewAutoApply: true,
                    results: 1
                }
            }, {
                balloonLayout: null,
                editorDrawOver: false,
                boundsAutoApply: true,
                routeActiveStrokeColor: "#EF7F1B",
                routeActiveStrokeWidth: 8,
                wayPointVisible: false
            });
            myMap.geoObjects.add(multiRoute);
            multiRoute.model.events.add("requestsuccess", function() {
                const activeRoute = multiRoute.getActiveRoute();
                window.ReactNativeWebView.postMessage(\`distance:\${activeRoute.properties.get("distance").text}\`);
                window.ReactNativeWebView.postMessage(\`time:\${activeRoute.properties.get("duration").text}\`);
            })
        };

        async function removeRoutes() {
            if (multiRoute !== null) {
                myMap.geoObjects.remove(multiRoute);
                multiRoute = null;
                window.ReactNativeWebView.postMessage(\`price:clear\`);
            }
        };

        function sayMessage(m) {
            window.ReactNativeWebView.postMessage(\`Another hello \${m}\`);
        }
    </script>
</body>

</html>`