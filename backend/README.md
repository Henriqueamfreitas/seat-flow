# inventory-manager
Para criar as imagens
  - docker-compose up -d --build

Para subir o backend
  - docker exec -it node_inventory_manager sh
  - está dentro do container e pode rodar no terminal normalmente
  - npm run dev
      
Para subir o frontend
  - docker exec -it react_inventory_manager sh
  - está dentro do container e pode rodar no terminal normalmente
  - npm run dev

http://localhost:8080/api/

SEM O DOCKER COMPOSE
- Não precisa dos comandos abaixo em razão do docker-compose, mas, por curiosidade
  - Subindo o backend:
    - criando imagem: docker build -t henriqueannicchino/node:latest .
    - docker run -it --name node_inventory_manager --network nodenet -v $(pwd -W):/app -p 5000:5000 henriqueannicchino/node:latest sh
    - npm run dev
      - OBS: desse jeito, vai estar lento, pois estamos mapeando o node modules no volume

  - Subindo o frontend:
    - criando imagem: docker build -t henriqueannicchino/react:latest .
    - docker run -it --name react_inventory_manager --network nodenet -v $(pwd -W):/app -p 5173:5173 henriqueannicchino/react:latest sh
    - npm run dev -- --host 0.0.0.0
      - OBS: desse jeito, vai estar lento, pois estamos mapeando o node modules no volume




$ psql -U postgres
Password for user postgres:

psql (17.2)
WARNING: Console code page (850) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.

postgres=# /dt
postgres-# ;
ERRO:  erro de sintaxe em ou próximo a "/"
LINE 1: /dt
        ^
postgres=# \dt
Did not find any relations.
postgres=# \l
                                                                      List of databases
         Name         |  Owner   | Encoding | Locale Provider |        Collate         |         Ctype          | Locale | ICU Rules |   Access privil
eges
----------------------+----------+----------+-----------------+------------------------+------------------------+--------+-----------+----------------
-------
 apparere             | postgres | UTF8     | libc            | Portuguese_Brazil.1252 | Portuguese_Brazil.1252 |        |           |
 chat_real_time       | postgres | UTF8     | libc            | Portuguese_Brazil.1252 | Portuguese_Brazil.1252 |        |           |
 inventory_manager_db | postgres | UTF8     | libc            | Portuguese_Brazil.1252 | Portuguese_Brazil.1252 |        |           |
 postgres             | postgres | UTF8     | libc            | Portuguese_Brazil.1252 | Portuguese_Brazil.1252 |        |           |
 template0            | postgres | UTF8     | libc            | Portuguese_Brazil.1252 | Portuguese_Brazil.1252 |        |           | =c/postgres    
      +
                      |          |          |                 |                        |                        |        |           | postgres=CTc/po
stgres
 template1            | postgres | UTF8     | libc            | Portuguese_Brazil.1252 | Portuguese_Brazil.1252 |        |           | =c/postgres    
      +
                      |          |          |                 |                        |                        |        |           | postgres=CTc/po
stgres
(6 rows)


postgres=#
postgres=#
postgres=#
postgres=# \c inventory_manager_db
You are now connected to database "inventory_manager_db" as user "postgres".
inventory_manager_db=# \dt
           List of relations
 Schema |    Name    | Type  |  Owner
--------+------------+-------+----------
 public | migrations | table | postgres
(1 row)


inventory_manager_db=# \dt
           List of relations
 Schema |    Name    | Type  |  Owner
--------+------------+-------+----------
 public | migrations | table | postgres
 public | users      | table | postgres
(2 rows)


inventory_manager_db=# \dt
           List of relations
 Schema |    Name    | Type  |  Owner
--------+------------+-------+----------
 public | migrations | table | postgres
 public | users      | table | postgres
(2 rows)


inventory_manager_db=# select * from users;




MIGRATIONS
generate migration: 
npm run typeorm -- migration:generate src/infra/db/typeorm/migrations/InitialSetup -d src/infra/db/typeorm/database.ts  

run migration: 
npm run typeorm -- migration:run -d src/infra/db/typeorm/database.ts