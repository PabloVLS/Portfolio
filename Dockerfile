FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
# Ajustado para a pasta que o seu build gerou: portfolio-app
COPY /dist/portfolio-app/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]