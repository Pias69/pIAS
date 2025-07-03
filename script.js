const form = document.getElementById("form");
const lista = document.getElementById("lista-alimentos");

let alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];

function renderAlimentos() {
  lista.innerHTML = "";
  alimentos.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.marginBottom = "20px";
    li.innerHTML = `
      <strong>${item.nome}</strong><br>
      CPF: ${item.cpf}<br>
      Senha: ${item.senha}<br>
      <button onclick="editar(${index})">Editar</button>
      <button onclick="remover(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const novoAlimento = {
    nome: form.nome.value,
    cpf: form.cpf.value,
    senha: form.senha.value
  };

  alimentos.push(novoAlimento);
  localStorage.setItem("alimentos", JSON.stringify(alimentos));
  form.reset();
  renderAlimentos();
});

function remover(index) {
  alimentos.splice(index, 1);
  localStorage.setItem("alimentos", JSON.stringify(alimentos));
  renderAlimentos();
}

function editar(index) {
  const alimento = alimentos[index];
  form.nome.value = alimento.nome;
  form.cpf.value = alimento.cpf;
  form.senha.value = alimento.senha;

  alimentos.splice(index, 1); // Remove o item antigo
  localStorage.setItem("alimentos", JSON.stringify(alimentos));
  renderAlimentos();
}

document.getElementById('cpf').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, '');
  value = value.slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  e.target.value = value;
});

renderAlimentos();

