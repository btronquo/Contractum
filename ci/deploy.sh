#!/usr/bin/env bash

echo "{
  \"apiKey\": \""$FIREBASE_APIKEY" \",
  \"authDomain\": \""$FIREBASE_AUTHDOMAIN"\",
  \"databaseURL\": \""$FIREBASE_DATABASEURL"\",
  \"projectId\": \""$FIREBASE_PROJECTID"\",
  \"storageBucket\": \""$FIREBASE_STORAGEBUCKET"\",
  \"messagingSenderId\": \""$FIREBASE_MESSAGINGSENDERID"\"
}" > "src/fbconfig.json"