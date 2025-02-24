FROM node:20.18.0

# Copia os arquivos do projeto
COPY package*.json ./
COPY . . 

# Instala as dependências
RUN yarn

# Expõe a porta 3000
EXPOSE 3000

# Executa o comando de build
RUN yarn build

# Comando para iniciar a aplicação em produção
CMD ["yarn", "start"]