FROM node:18.8.0-slim
RUN apt update && apt install -y chromium wget msmtp mutt && rm -rf /var/lib/apt/lists/* && wget https://github.com/mikefarah/yq/releases/download/v4.27.2/yq_linux_amd64 -O /usr/bin/yq && chmod +x /usr/bin/yq
ADD app /app
WORKDIR /app
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN npm install
ENTRYPOINT ["/app/uscis-notify"]
