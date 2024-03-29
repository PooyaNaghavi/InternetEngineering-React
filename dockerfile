FROM node:12.2.0-alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g
ENV REACT_APP_BASE_URL 'http://localhost:8080/ca3'

ADD . .

# start app
CMD ["npm", "start"]
