<div align="center">

# ⚽ Sistema de Gestão para Escola de Futebol

### Projeto de Extensão — Gestão de Alunos, Turmas e Jogos

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

<p>
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square" alt="status" />
  <img src="https://img.shields.io/badge/localização-Joinville%2FSC-blue?style=flat-square" alt="localização" />
</p>

</div>

---

<div align="center">

### 🧭 Sumário

[Introdução](#1-introdução) • [Público Beneficiado](#2-descrição-do-público-beneficiado-pelas-ações-de-extensão) • [Objetivos](#3-objetivos) • [Atividades Realizadas](#4-descrição-das-principais-atividades-realizadas) • [Avaliação](#5-avaliação-do-projeto-pelo-público-beneficiado-julho-2025) • [Considerações Finais](#6-considerações-finais--autoavaliação-do-pac-extensionista-julho-2025)

</div>

---

## 1. Introdução

Muito se discute a importância da organização e gestão eficiente em ambientes esportivos, especialmente em escolas de futebol que atendem predominantemente crianças e adolescentes.

A ausência de um sistema informatizado pode resultar em dificuldades na comunicação, perda de dados e falhas no controle de jogadores disponíveis para partidas e treinamentos. Além disso, em emergências, a falta de acesso rápido a informações médicas pode comprometer a segurança dos alunos.

Diante desse cenário, este projeto surge com o objetivo de desenvolver um **sistema web** voltado para a gestão de alunos em uma escola de futebol.

> **Problemática central:**
> Como um sistema informatizado pode contribuir para a organização, segurança e eficiência no gerenciamento de alunos em uma escola de futebol?

O sistema proposto:

- Centraliza informações de alunos.
- Melhora a comunicação entre gestores, treinadores e responsáveis.
- Garante acesso imediato a registros médicos em emergências.
- Representa uma aplicação prática de conceitos de Engenharia de Software.

O projeto também está alinhado aos princípios da extensão universitária, impactando a comunidade esportiva com uma solução tecnológica útil.

## 2. Descrição do Público Beneficiado pelas Ações de Extensão

<div align="center">

| Público | Benefício |
|:---:|---|
| **Gestores e treinadores** | Maior controle administrativo e acesso rápido a informações. |
| **Alunos (crianças e adolescentes)** | Ambiente esportivo mais seguro e organizado. |

</div>

O sistema será implementado em uma escola de futebol em **Joinville**, atendendo demandas reais da comunidade esportiva.

## 3. Objetivos

### 3.1 Objetivo Geral

Desenvolver e implementar um **sistema web** para gestão de alunos em escolas de futebol, promovendo:

- Eficiência administrativa
- Segurança na tomada de decisões
- Acesso rápido a informações médicas e cadastrais
- Melhor comunicação entre treinadores, gestores e responsáveis

### 3.2 Objetivos Específicos

- Estruturar um sistema eficiente para gestão de informações
- Desenvolver módulo de gerenciamento de jogos (escalação, resultados, estatísticas)
- Implementar calendário para organização de eventos, treinos e campeonatos
- Registrar presença de alunos nos treinos
- Criar estatísticas por atleta
- Desenvolver gerenciamento de turmas (faixa etária/nível técnico)
- Garantir interface web intuitiva e eficiente

## 4. Descrição das Principais Atividades Realizadas

### 4.1 Definição da Proposta

Criação de um sistema digital que substitui métodos manuais de gestão de:

- Dados de alunos
- Jogos
- Turmas
- Informações médicas

### 4.2 Estabelecimento dos Objetivos e Funcionalidades

**Principais funcionalidades:**

- Login e recuperação de senha por e-mail
- Gerenciamento de alunos (cadastro, edição, visualização)
- Cadastro de dados médicos e upload de documentos
- Cadastro de jogos, escalação, resultados e estatísticas
- Cadastro de turmas e controle de presença
- Calendário de eventos (treinos, campeonatos, jogos)
- Alertas e lembretes no painel inicial
- Filtros de busca de alunos (categoria, nome, posição)
- Exportação de dados médicos em PDF

### 4.3 Tecnologias Utilizadas


| Camada | Tecnologia |
|:---:|:---:|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | PHP |
| **Autenticação** | JWT (JSON Web Token) |
| **Versionamento** | GitHub |
| **Gestão de Tarefas** | Trello |
| **Prototipagem** | Figma |


### 4.4 Organização de Responsabilidades

- Desenvolvimento Frontend
- Desenvolvimento Backend
- Documentação e organização
- Suporte ao desenvolvimento

### 4.5 Requisitos Funcionais (RF)

| Código | Descrição |
|:---:|---|
| **RF01** | O sistema deve permitir login apenas para administradores e colaboradores. |
| **RF02** | Deve haver recuperação de senha via e-mail. |
| **RF03** | O sistema deve oferecer diferentes níveis de acesso (administrador e colaborador). |
| **RF04** | O sistema deve permitir o cadastro, edição, exclusão e visualização de alunos. |
| **RF05** | O sistema deve permitir o cadastro de dados médicos, físicos e upload de documentos no perfil do aluno. |
| **RF06** | O sistema deve permitir o cadastro e edição de jogos, com data, horário, local e adversário. |
| **RF07** | O sistema deve permitir a seleção de jogadores titulares e reservas para cada jogo. |
| **RF08** | O sistema não deve permitir acesso direto por alunos, apenas por colaboradores e administradores. |
| **RF09** | O sistema deve bloquear automaticamente o acesso de colaboradores desligados do time. |
| **RF10** | O sistema deve permitir que colaboradores editem apenas seus próprios dados de perfil. |
| **RF11** | O sistema deve permitir filtrar alunos por categoria, nome ou posição em campo. |
| **RF12** | O sistema deve permitir exportar dados dos alunos (como informações médicas) em PDF. |
| **RF13** | O sistema deve exibir lembretes no menu inicial para usuários logados. |
| **RF14** | O sistema deve permitir o cadastro e visualização de eventos no calendário (treinos, jogos, campeonatos e outros). |
| **RF15** | O sistema deve permitir registrar presença de alunos nas turmas atribuídas. |

### 4.5.1 Requisitos Não Funcionais (RNF)

| Código | Descrição |
|:---:|---|
| **RNF01** | A interface do sistema deve ser intuitiva. |
| **RNF02** | O sistema deve suportar até 10 usuários logados simultaneamente. |
| **RNF03** | O sistema deve bloquear o acesso após 5 tentativas de login incorretas. |
| **RNF04** | O sistema deve ser compatível com os navegadores populares. |
| **RNF05** | O sistema deve realizar backup diário dos dados armazenados. |
| **RNF06** | O sistema deve ter alta disponibilidade. |

### 4.6 Estruturação dos Módulos e Arquitetura

Modelagem em **diagrama de containers**, representando interação entre:

- Cliente (usuário)
- Backend (servidor)
- Banco de Dados
- Autenticação

### 4.7 Modelagem de Casos de Uso

- **Atores:** Administrador e Colaborador
- Casos de uso modelados em diagramas, garantindo clareza das interações

### 4.8 Mudanças no Escopo

<table>
<tr>
<td width="50%" valign="top">

**Retirado**
- Módulo de controle financeiro

</td>
<td width="50%" valign="top">

**Incluído**
- Calendário interativo
- Controle de frequência de alunos

</td>
</tr>
</table>

### 4.9 Escopo no Figma

Protótipo criado com foco em:

- Navegação simples
- Clareza das informações
- Telas principais: login, gerenciamento de alunos, perfil individual, turmas, calendário, jogos e treinos

## 5. Avaliação do Projeto pelo Público Beneficiado (Julho-2025)

O sistema ainda está em desenvolvimento, logo:

- Não foi realizada avaliação completa.
- Gestores e técnicos participaram ativamente do levantamento de requisitos.
- As necessidades identificadas ajudaram a moldar um escopo realista e relevante.

## 6. Considerações Finais – Autoavaliação do PAC Extensionista (Julho-2025)

- Etapas iniciais concluídas com sucesso (planejamento e prototipagem).
- Projeto anual permitiu maior aprofundamento e organização.
- Aprendizados: levantamento de requisitos, organização de tarefas, escuta ativa do público-alvo.
- Expectativa positiva de impacto significativo na rotina da escola de futebol.

<div align="center">

---

Projeto de Extensão — Gestão para Escola de Futebol

</div>
