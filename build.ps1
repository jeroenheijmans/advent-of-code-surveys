if (Test-Path ./docs) {
  Remove-Item ./docs -Recurse
}

New-Item -ItemType Directory ./docs
New-Item -ItemType Directory ./docs/2018
New-Item -ItemType Directory ./docs/2019
New-Item -ItemType Directory ./docs/2020
New-Item -ItemType Directory ./docs/2021
New-Item -ItemType Directory ./docs/2022

Copy-Item ./src/*.* ./docs
Copy-Item ./2018/results-sanitzed.json ./docs/2018/
Copy-Item ./2019/results-sanitzed.json ./docs/2019/
Copy-Item ./2020/results-sanitzed.json ./docs/2020/
Copy-Item ./2021/results-sanitzed.json ./docs/2021/
Copy-Item ./2022/results-sanitzed.json ./docs/2022/

# Hack needed because GitHub pages serves the site as a 
# subfolder on my gh-pages domain:
(Get-Content ./docs/app.js).replace('const baseUrl = "";', 'const baseUrl = ".";') | Set-Content ./docs/app.js
(Get-Content ./docs/index.html).replace('?v1', '?v' + (New-Guid)) | Set-Content ./docs/index.html
