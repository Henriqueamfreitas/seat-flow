FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our configuration
COPY nginx.conf /etc/nginx/conf.d/app.conf

# docker build -t henriqueannicchino/nginx:latest .
# docker run --rm -p 80:80 --network nodenet henriqueannicchino/nginx:latest