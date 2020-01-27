<?php
$registrationBuyerIds = 'eI0oA42qXzLGpw5BQPgWGb:APA91bEgeubH-PpWDMc9Og5Atn3zuo3GvPHZEcmkuxn9YOX_FHYsUfD3xxChAlnW4qUAu3r6T0owVagjxmufikFVs9tOIuylFBk-02DsC53pZs6mM4aW_gZlsntTSYhkwyl_XgmcOj6U';

//$registrationBuyerIds = 'dzDlyZ8onSPi0DpkXtGa4f:APA91bEwCjnHvXQi3rZZ_4L_PQjUPgWTzkEdrk1ZNCb2RW8Q1aKl-5-7jR65dLErz_KlhUi78EwFgtguK-U4L1VX76tw1CF3iePUQ19833D8OOEBx_DQ-bRXJgJYMIOVTbf8ur6bLhWt';
$actions[] = array(
  'action'=>'coffee-action',
  'title'=>'Coffee',
  'icon'=>'https://mednear.com/uploads/offers/days/day-01.jpg',
);
$msg = array(
  'body' => 'https://mednear.com/uploads/offers/days/day-01.jpg Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',
  'title' => 'HealthTips dsa sd',
  'tag' => 'payment',
   
);
$img_data = "https://mednear.com/uploads/offers/days/day-01.jpg";
$res = sendPushNotification(($registrationBuyerIds), $msg, $img_data);
 var_dump($res );exit;

  function sendPushNotification($registrationIds, $msg, $img_data = false) {
      $GCM_API_KEY = 'AIzaSyBca42dUxzijHtHPstfbs3B9Z8jWd6WGNg';
      // Set POST variables
      $url = 'https://fcm.googleapis.com/fcm/send';
      //$url = 'https://gcm-http.googleapis.com/gcm/send';
      if ($img_data) {
          $msg['image'] = $img_data;
      }

      $fields = array
          (
          'to' => $registrationIds,
          'collapse_key'=> 'type_a',
          'notification' => array(
            'body' => 'Body of Your Notification',
            'title' => 'Title of Your Notification'
          ),
          'data' => $msg
      );

      $fields = array("to" => $registrationIds, "notification" => array( "title" => "Shareurcodes.com", "body" => "A Code Sharing Blog!","icon" => "https://mednear.com/uploads/offers/days/day-01.jpg","image" => "https://mednear.com/uploads/offers/days/day-01.jpg", "click_action" => "http://shareurcodes.com")); 

      $headers = array
          (
          'Authorization: key=' . $GCM_API_KEY,
          'Content-Type: application/json'
      );
      // echo json_encode( $fields );exit;
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
      $result = curl_exec($ch);
      //echo curl_error($ch);exit;
      curl_close($ch);

      return $result;
  }

 
?>