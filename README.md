# 📘 Mini Documentação Técnica — Sistema de Pedidos

## 🧩 Visão Geral

Sistema de gestão de pedidos com processamento assíncrono utilizando **Outbox Pattern** para garantir consistência transacional e confiabilidade na mensageria.

# 🎯 Objetivo do Desafio

Desenvolver um sistema onde é possível:

- Criar pedidos
- Listar pedidos
- Visualizar detalhes

Sempre que um pedido for criado:

1. Ele é persistido no PostgreSQL.
2. Um evento é salvo na tabela Outbox.
3. Um processor publica o evento no Azure Service Bus.
4. Um worker consome a mensagem.
5. O status do pedido é atualizado seguindo a sequência:
---


## ⚙️ Pre-requisitos do Projeto

- .NET 8 
- Docker
- Postgres 16+

Na pasta raiz do projeto execute:

Verifique 
```js
  ### `docker  compose up`
```

## 🚀 Tecnologias Utilizadas

## Backend
- .NET 8
- Entity Framework Core
- PostgreSQL
- Azure Service Bus
- BackgroundService
- Health Checks

## Frontend
- React
- Vite
- TailwindCSS
- React Router

## Infraestrutura
- Docker
- Docker Compose
- PostgreSQL
- PgAdmin

---


## ⚠️ Considerações

- Para simplificar o desenvolvimento optei por criar o Worker consumer (OrderProcessor em background) na mesma aplicação do publisher (ServidePublisher).

---

## 📈 Potenciais Melhorias Futuras

- Desacoplar totalmente order do publisher do Service Bus.
- Inclusão de testes.
---