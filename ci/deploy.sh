#!/usr/bin/env bash

FILE="../src/fbconfig.json"

echo "{
  \"apiKey\": \""$VUE_APP_FIREBASE_APIKEY" \",
  \"authDomain\": \""$VUE_APP_FIREBASE_AUTHDOMAIN"\",
  \"databaseURL\": \""$VUE_APP_FIREBASE_DATABASEURL"\",
  \"projectId\": \""$VUE_APP_FIREBASE_PROJECTID"\",
  \"storageBucket\": \""$VUE_APP_FIREBASE_STORAGEBUCKET"\",
  \"messagingSenderId\": \""$VUE_APP_FIREBASE_MESSAGINGSENDERID"\"
}" > $FILE