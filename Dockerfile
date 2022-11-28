FROM nginx
COPY dist/ /usr/share/nginx/html/sso-login
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf