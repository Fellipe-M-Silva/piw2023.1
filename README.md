# 💬: Cita

Cita é um repositório de fichamentos de citação nos quais usuários podem criar seus próprios fichamentos ou importar fichamentos de outros usuários.

## :technologist: Membros da equipe

<ul>
  <li>
    Fellipe Mayan da Silva - 511948
  </li>
</ul> 

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

<ul>
  <li> Visitante </li>
  <li> Usuário </li>
  <li> Administrador </li>
</ul>

> Tenha em mente que obrigatoriamente a aplicação deve possuir funcionalidades acessíveis a todos os tipos de usuário e outra funcionalidades restritas a certos tipos de usuários.

## :spiral_calendar: Entidades ou tabelas do sistema

<ul>
  <li> Usuário </li>
  <li> Perfil </li>
  <li> Fichamento </li>
  <li> Obra </li>
  <li> Ficha </li>
  <li> Autor </li>
</ul>

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

<ul>
  <li>
    <h4>RF01 - Acesso</h4>
    <p>Visitante, Usuário e Administrador podem acessar a área pública do sistema.</p>
  </li>
  <li>
    <h4>RF02 - Cadastro</h4>
    <p>Visitante pode criar uma conta do tipo Usuário para ter acesso à área privada do sistema.</p>
  </li>
  <li>
    <h4>RF03 - Autenticação</h4>
    <p>Usuários e Administradores podem acessar a área privada do sistema por meio de um acesso na página inicial.</p>
  </li>
  <li>
    <h4>RF04 - Gestão de usuário</h4>
    <p>Administrador pode criar, editar e excluir usuários.</p>
  </li>
  <li>
    <h4>RF05 - Gestão de fichamentos</h4>
    <p>Usuário e Administrador podem visualizar, criar, editar e excluir fichamentos de sua autoria. Visitante, Usuário e Administrador podem visualizar fichamentos públicos.</p>
  </li>
  <li>
    <h4>RF06 - Gestão de fichas</h4>
    <p>Usuário e Administrador podem visualizar, criar, editar e excluir fichas em um fichamento de sua autoria. Visitante, Usuário e Administrador podem visualizar fichas em fichamentos públicos.</p>
  </li>
  <li>
    <h4>RF07 - Importação de fichamentos</h4>
    <p>Usuário e Administrador podem criar uma cópia de um fichário público para sua área privada.</p>
  </li>
  <li>
    <h4>RF08 - Exportação de fichamentos</h4>
    <p>Usuário e Administrador podem exportar as fichas de um fichário como um arquivo.</p>
  </li>
</ul>

Descreve ou liste brevemente as principais funcionalidades da aplicação que será desenvolvida. Destaque a funcionalidades que serão acessévies a todos os usuários e aquelas restriras a usuários logados.

----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

JavaScript (JS), Typescript (TS), HTML e CSS. Para gerenciar o projeto ultilizaremos o SCRUM. 
Lista as tecnologias, frameworks e bibliotecas utilizados.

**Backend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.


## :shipit: Operações implementadas para cada entidade da aplicação

 
| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuário | ⌀ | ⊙ ⌀ | × ⌀ | × ⌀ |
| Perfis |  |  |  |  |
| Fichamento | × | ⊙ × ⌀ | × | × |
| Obra | × | ⊙ × ⌀ | × | × |
| Ficha | × | ⊙ × ⌀ | × | × |
| Autor | × | ⌀ | × | × |

<h4>Onde os seguintes símbolos representam as permissões para cada perfil:</h4>
<ul>
  <li>⊙ - Visitante (apenas para fichamentos públicos);</li>
  <li>× - Usuário;</li>
  <li>⌀ - Administrdador.</li>
</ul>

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/entidade1/|
| POST | api/entidade2 |
