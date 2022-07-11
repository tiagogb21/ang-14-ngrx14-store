# https://br.vuejs.org/v2/cookbook/dockerize-vuejs-app.html

# Vamos servir a aplicação iremos usar o NGINX

# 1 - Estágio de compilação:

FROM node:lts-alpine as build-stage

# instala um servidor http simples para servir conteúdo estático
RUN npm install -g http-server

# faz da pasta 'app' o diretório atual de trabalho
WORKDIR /app

# copia os arquivos 'package.json' e 'package-lock.json' (se disponível)
COPY package*.json ./

# instala dependências do projeto
RUN npm install

# copia arquivos e pastas para o diretório atual de trabalho (pasta 'app')
COPY . .

# compila a aplicação de produção com minificação
RUN npm run build

# 2 - Estágio de produção: (irá servir usando NGINX)

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
