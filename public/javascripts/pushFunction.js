var FCM = require('fcm-push');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConnection = require('./../../routes/cmndbConnection');
var responceFile = require('./responceFile');
var date = new Date();

var sendPushnotification = function(dToken, notify_title, notify_content, notify_content_srt, fromSkeinID, toSkeinID, category){
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
            title: notify_title,
            body: notify_content
        }
    };
    
    //callback style
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!"+err);
        } else if(response){
            response = JSON.parse(response);
            dbConnection.query("INSERT INTO `notifications`(`message_id`, `multicast_id`, `notify_title`, `notify_content`, `notify_content_srt`, `readData`, `date`, `from_skein_id`, `to_skein_id`) VALUES ('"+response.results[0].message_id+"', '"+response.multicast_id+"', '"+notify_title+"', '"+notify_content+"', '"+notify_content_srt+"', "+0+", '"+date+"', '"+fromSkeinID+"', '"+toSkeinID+"')", function (err, result, fields) {
                    if (err){
                        console.log(err);
                    }else if(result){
                        console.log(result);
                    }
                });
            console.log("Successfully sent with response: ", response);
            
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
