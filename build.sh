#!/bin/bash

# Remove docs directory if it exists
if [ -d "./docs" ]; then
  rm -rf ./docs
fi

# Create directory structure
mkdir -p ./docs/{2018,2019,2020,2021,2022,2023,2024}

# Copy files
cp ./src/* ./docs/
cp ./2018/results-sanitized.json ./docs/2018/
cp ./2019/results-sanitized.json ./docs/2019/
cp ./2020/results-sanitized.json ./docs/2020/
cp ./2021/results-sanitized.json ./docs/2021/
cp ./2022/results-sanitized.json ./docs/2022/
cp ./2023/results-sanitized.json ./docs/2023/
cp ./2024/results-sanitized.json ./docs/2024/

# Modify files
sed -i 's/const baseUrl = "";/const baseUrl = ".";/g' ./docs/app.js
sed -i "s/?v1/?v$(uuidgen)/g" ./docs/index.html
