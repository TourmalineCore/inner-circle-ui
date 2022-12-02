#!/bin/bash

# Based on idea from https://github.com/kunokdev/cra-runtime-environment-variables

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window.__ENV__ = {" >> ./env-config.js

# Read each line in config.keys file
# Each line represents just key
while read -r line || [[ -n "$line" ]];
do
  varname=$line
  value=$(printf '%s\n' "${!line}")
  
  # Append configuration property to JS file
  echo "  $varname: $value," >> ./env-config.js
done < .config-keys

echo "}" >> ./env-config.js