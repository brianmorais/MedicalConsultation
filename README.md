# Sistema de Gerenciamento de Consultas Médicas

### Funcionalidades propóstas:

#### 1. **Objetivo**
   Criar um sistema onde clínicas médicas podem gerenciar consultas, pacientes, médicos e horários de forma eficiente. O sistema permitirá agendar consultas, acompanhar o histórico dos pacientes e gerenciar a agenda dos médicos.

#### 2. **Funcionalidades**
   **Requisitos Funcionais:**
   - Cadastro de médicos, pacientes e atendentes (com diferentes permissões de acesso).
   - Agendamento de consultas com base na disponibilidade dos médicos.
   - Sistema de lembretes por e-mail ou SMS para consultas agendadas.
   - Histórico de consultas para cada paciente.
   - Cancelamento e reagendamento de consultas.
   - Dashboard para os médicos verem as consultas do dia.
   - Relatórios mensais de consultas realizadas por médico ou especialidade.

   **Requisitos Não Funcionais:**
   - Segurança: dados sensíveis dos pacientes devem ser criptografados.
   - Performance: o sistema deve ser rápido, mesmo com muitos usuários.
   - Disponibilidade: deve suportar múltiplos usuários simultâneos.

#### 3. **Tecnologias**
   **Frontend:**
   - React com Next.js para uma interface de usuário interativa.
   - Utilização de styled components para estilização de páginas.

   **Backend:**
   - Node.js ou .NET ou Golang para criar APIs RESTful.
   - ApiGateway com Ocelot/.NET
   - Sistema de autenticação com permissões de usuário (JWT ou OAuth).
   - Integração com um serviço de envio de e-mails ou SMS (ex: Twilio) para lembretes automáticos.

   **Banco de Dados:**
   - Não Relacional (mongodb) para armazenar médicos, pacientes, consultas, etc.

   **Ferramentas:**
   - Docker para conteinerização do sistema.
   - CI/CD com GitHub Actions para deploy automático.
   - Monitoramento com ferramentas como Prometheus e Grafana.
   - Deploy no kubernetes (ex: kind ou minikube)

#### 4. **Desenvolvimento**
   **Backend:**
   - Endpoints para CRUD de médicos, pacientes, e consultas.
   - Configuração de permissões de acesso: médicos veem suas próprias consultas, atendentes podem gerenciar as consultas de todos.
   - Implementação de lógica de agendamento, verificando a disponibilidade de médicos antes de permitir uma consulta ser marcada.
   - Integração com API de e-mail/SMS para enviar lembretes automáticos.

   **Frontend:**
   - Tela de login e dashboard personalizado para médicos e atendentes.
   - Tela de agendamento, onde o atendente pode ver os horários disponíveis e marcar consultas.
   - Tela para médicos consultarem seu cronograma diário e acessar o histórico dos pacientes.

   **Banco de Dados:**
   - Estruturação dos bancos com tabelas/collections para usuários (médicos, pacientes, atendentes), consultas e histórico médico.

#### 5. **Testes**
   - Testes unitários para validar a lógica de agendamento e permissões de usuários.

---

### Desenhos de arquitetura com base nas regras acima:

#### C4:

![Sistema de gestão de consultas médicas - C4 - Container](<resources/Sistema de gestão de consultas médicas - C4 - Container.jpg>)

#### Fluxos:

![Sistema de gestão de consultas médicas - Fluxo](<resources/Sistema de gestão de consultas médicas - Fluxo.jpg>)