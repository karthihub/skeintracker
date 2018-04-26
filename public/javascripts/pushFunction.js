var FCM = require('fcm-push');

var sendPushnotification = function(dToken, title, body){
    console.log("sample==>>>sendPushnotification");
    var serverKey = 'AAAAN8NWbBw:APA91bHHGMK5_rBNBkyvCsuEYS_sZLpqOKr0PpPI_CCiKAJydtAnt2P53F61EvNtJp3BHsguk3bZA-iapDuYygQ6hNyoOEWfQYRksy6vHant0eZbAEJ16Tic0lsnsYtC-baWHzNStr9K';
    var fcm = new FCM(serverKey);
    console.log("Tocken==>>"+dToken);
    var message = {
        to: dToken, // required fill with device token or topics
        collapse_key: 'Demo', 
        // data: {
        //     your_custom_data_key: 'your_custom_data_value'
        // },
        notification: {
            title: title,
            body: body
        }
    };
    
    //callback style
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!"+err);
        } else {
            console.log("Successfully sent with response: ", response);
            return response;
        }
    });
    
    //promise style
    // fcm.send(message)
    //     .then(function(response){
    //         console.log("Successfully sent with response: ", response);
    //     })
    //     .catch(function(err){
    //         console.log("Something has gone wrong!");
    //         console.error(err);
    //     })
}

module.exports = sendPushnotification;
