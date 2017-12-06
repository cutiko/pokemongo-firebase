const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.nearPokestop = functions.https.onRequest((request, response) => {
    if (request.method === "GET") {
        const uid = request.query.uid;
        const latitude = request.query.latitude;
        const longitude = request.query.longitude;
        if (!uid || !latitude || !longitude) {
            response.status(418).end();
        } else {
            const radius = 0.005;
            const parseLatitude = parseFloat(latitude);
            const minLat = parseLatitude - radius;
            const maxLat = parseLatitude + radius;
            admin.firestore().collection('pokestops').where("latitude", ">=", minLat).where("latitude", "<=", maxLat).get().then(function (querySnapshot) {
                var result = [];
                const parseLongitude = parseFloat(longitude);
                const minLongitude = parseLongitude - radius;
                const maxLongitude = parseLongitude + radius;
                querySnapshot.forEach(function (doc) {
                    const pokestop = doc.data();
                    if (pokestop.longitude >= minLongitude && pokestop.longitude <= maxLongitude) {
                        result.push(pokestop);
                    }
                });
                response.status(200).send(result);
            });
        }
    } else {
        response.status(401).end();
    }
});

