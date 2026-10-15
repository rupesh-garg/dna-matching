
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY algorithm.js /usr/share/nginx/html/algorithm.js

EXPOSE 80
