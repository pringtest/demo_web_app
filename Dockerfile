# download stable version of nginx
FROM nginx:stable-alpine

# copy static web to nginx html folder
COPY ./out /usr/share/nginx/html

# copy custom nginx config to the default nginx config
COPY nginx/static/nginx.conf /etc/nginx/conf.d/default.conf

# The EXPOSE instruction does not actually publish the port. 
# It functions as a type of documentation
# 80 is default nginx port.
EXPOSE 80

# run the app
CMD ["nginx", "-g", "daemon off;"]