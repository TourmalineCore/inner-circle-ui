#!/bin/bash

# Based on idea from https://github.com/kunokdev/cra-runtime-environment-variables

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Create ./env-config.js file with a global variable which will contain env vars 
echo "window.__ENV__ = {" >> ./env-config.js

# Read each line in .env-vars file
# Each line represents an env var name
while read -r line || [[ -n "$line" ]];
do
  varname=$line
  # read an env variable value with the same name but from the ENV where we execute this script
  value=$(printf '%s\n' "${!line}")
  
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env-config.js
done < .env-vars

echo "}" >> ./env-config.js
