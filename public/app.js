const form = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");

async function carregarClientes() {
    const response = await fetch("/api/clientes");
    const dados = await response.json();

    lista.innerHTML = "";

    dados.forEach(cliente => {
        lista.innerHTML += `
            <tr>
                <td>${cliente.nome}</td>
                <td>${cliente.endereco}</td>
                <td>${cliente.telefone}</td>

                <td>
                    <button class="btn-editar" onclick="editarCliente(
                        '${cliente.id}',
                        '${cliente.nome}',
                        '${cliente.endereco}',
                        '${cliente.telefone}'
                    )">
                        Editar
                    </button>

                    <button class="btn-excluir" onclick="excluirCliente('${cliente.id}')">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;

    const cliente = {
        nome: document.getElementById("nome").value,
        endereco: document.getElementById("endereco").value,
        telefone: document.getElementById("telefone").value
    };

    if (id) {
        await fetch(`/api/clientes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });
    } else {
        await fetch("/api/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });
    }

    form.reset();

    carregarClientes();
});

function editarCliente(id, nome, endereco, telefone) {
    document.getElementById("id").value = id;
    document.getElementById("nome").value = nome;
    document.getElementById("endereco").value = endereco;
    document.getElementById("telefone").value = telefone;
}

async function excluirCliente(id) {
    await fetch(`/api/clientes/${id}`, {
        method: "DELETE"
    });

    carregarClientes();
}

carregarClientes();