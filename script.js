//Atualiza o segundo seletor de acordo com a escolha do primeiro...
document.addEventListener('DOMContentLoaded', () => {

    const turnoSeletor = document.getElementById('turnos');
    const turmaSeletor = document.getElementById('turmas');

    const opcoesManha = ['      ', '5º E.F', '6º E.F', '7º E.F', '8º E.F'];
    const opcoesTarde = ['      ', '1º E.M', '2º E.M', '3º E.M'];

    function attTurma(){
        turmaSeletor.innerHTML = '';

        const opcoes = turnoSeletor.value === 'manha' ? opcoesManha : opcoesTarde;

        opcoes.forEach(opcao => {
            const opcaoElemento = document.createElement('option');
            opcaoElemento.value = opcao.toLowerCase();
            opcaoElemento.textContent = opcao;
            turmaSeletor.appendChild(opcaoElemento);
        });
    }

    attTurma();

    turnoSeletor.addEventListener('change', attTurma);
});

document.addEventListener("DOMContentLoaded", function() {

    const students = [
        "Ana Silva", "Bruno Lima", "Carlos Oliveira", "Daniela Costa", "Eduardo Souza",
        "Fernanda Almeida", "Gabriel Ferreira", "Helena Martins", "Igor Rodrigues", "Juliana Santos",
        "Kleber Mendes", "Laura Gonçalves", "Marcelo Ribeiro", "Nina Carvalho", "Otávio Melo",
        "Patrícia Duarte", "Quirino Farias", "Rafaela Moura", "Sérgio Barbosa", "Tatiane Araújo",
        "Ulisses Santana", "Vanessa Nogueira", "Wagner Teixeira", "Xênia Silva", "Yuri Rocha",
        "Zélia Franco", "Caio Pereira", "Diana Lima"
    ];

    const studentList = document.getElementById("student-list");

    students.forEach(student => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span>${student}</span><button onclick="registerTime(this)">Registrar</button>`;
        studentList.appendChild(listItem);
    });

    document.getElementById("fullscreen-btn").addEventListener("click", toggleFullscreen);
    document.getElementById("export-btn").addEventListener("click", exportToPDF);
});

function registerTime(button) {
    const now = new Date();
    button.textContent = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    button.disabled = true;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

const hoje = new Date();
const dia = String(hoje.getDate()).padStart(2, '0');
const mes = String(hoje.getMonth()+ 1).padStart(2, '0');
const ano = hoje.getFullYear();

const formatoData = `${dia}_${mes}_${ano}`;

const nomeArquivo = `Registro_de_pontualidade ${formatoData}.pdf`;

function exportToPDF() {
    const element = document.querySelector('.exportar');
    html2pdf().from(element).save(nomeArquivo);
}
