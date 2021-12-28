FROM node
FROM trion/ng-cli
RUN ls
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/
RUN cd /app/
RUN pwd
RUN npm install
COPY . /app
CMD ng serve --host 0.0.0.0 --port 4200
