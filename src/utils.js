// Loads the Google API script into the app

export function loadScript() {
    const script = document.createElement("script");

    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCzwr1K00UKJjM93xsYA6A9xkosywtWKtI&callback=initMap";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
}



declare var infoWindow;
export default window.infoWindow;