FROM nginx:latest

COPY chessboard-LICENSE.md /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css/
COPY img /usr/share/nginx/html/img/
COPY index.html /usr/share/nginx/html/
COPY js /usr/share/nginx/html/js/

RUN chown -R nginx:nginx /usr/share/nginx/html
