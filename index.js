let participantes = [
  {
    nome: "João Silva",
    email: "joaosilva@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 10, 15),
    dataCheckIn: new Date(2024, 3, 01, 10, 16)
  },
  {
    nome: "Rafael Fontoura",
    email: "rafaelfontoura@gmail.com",
    dataInscricao: new Date(2024, 2, 31, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Maria Santos",
    email: "mariasantos@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 12, 30),
    dataCheckIn: new Date(2024, 2, 30, 20, 45)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlosoliveira@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 14, 45),
    dataCheckIn: new Date(2024, 2, 30, 15, 15)
  },
  {
    nome: "Ana Pereira",
    email: "anapereira@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 9, 10),
    dataCheckIn: null
  },
  {
    nome: "Pedro Souza",
    email: "pedrosouza@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 11, 25),
    dataCheckIn: new Date(2024, 2, 29, 21, 45)
  },
  {
    nome: "Juliana Lima",
    email: "julianalima@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 13, 40),
    dataCheckIn: new Date(2024, 2, 28, 22, 10)
  },
  {
    nome: "Fernando Costa",
    email: "fernandocosta@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 15, 55),
    dataCheckIn: new Date(2024, 2, 27, 16, 10)
  },
  {
    nome: "Luiza Oliveira",
    email: "luizaoliveira@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 8, 20),
    dataCheckIn: null
  },
  {
    nome: "Marcos Ferreira",
    email: "marcosferreira@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 10, 35),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  // condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  //estrutura de repetição - loop
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  //substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }
  
  // encontrar o participante denro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}