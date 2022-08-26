FROM node:18.8.0-slim
RUN apt update && apt install -y chromium && rm -rf /var/lib/apt/lists/ && mkdir /output*
ADD app /app
WORKDIR /app
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN npm install
ENTRYPOINT ["/usr/local/bin/node", "/app/index"]
