document.addEventListener('DOMContentLoaded', () => {
    const turnoSeletor = document.getElementById('turnos');
    const turmaSeletor = document.getElementById('turmas');
    const studentList = document.getElementById('student-list');

    const opcoesManha = [' ', '6º ANO', '7º ANO', '8º ANO', '9º ANO'];
    const opcoesTarde = [' ', '1º ANO', '2º ANO', '3º ANO'];

    const alunosPorTurma = {
        'manha_6º ano': ["Ana Silva", "Bruno Lima", "Carlos Oliveira"],
        'manha_7º ano': ["Daniela Costa", "Eduardo Souza", "Fernanda Almeida"],
        'manha_8º ano': ["Gabriel Ferreira", "Helena Martins", "Igor Rodrigues"],
        'manha_9º ano': ["Juliana Santos", "Kleber Mendes", "Laura Gonçalves"],
        'tarde_1º ano': ["Marcelo Ribeiro", "Nina Carvalho", "Otávio Melo"],
        'tarde_2º ano': ["Patrícia Duarte", "Quirino Farias", "Rafaela Moura"],
        'tarde_3º ano': ["Sérgio Barbosa", "Tatiane Araújo", "Ulisses Santana"]
    };

    function attTurma() {
        turmaSeletor.innerHTML = '';

        const opcoes = turnoSeletor.value === 'manha' ? opcoesManha : opcoesTarde;

        opcoes.forEach(opcao => {
            const opcaoElemento = document.createElement('option');
            opcaoElemento.value = opcao.toLowerCase();
            opcaoElemento.textContent = opcao;
            turmaSeletor.appendChild(opcaoElemento);
        });
    }

    function exibirAlunos() {
        studentList.innerHTML = '';

        const turno = turnoSeletor.value;
        const turma = turmaSeletor.value.trim();

        if (turno && turma) {
            const chave = `${turno}_${turma}`;
            const alunos = alunosPorTurma[chave];

            if (alunos) {
                alunos.forEach(aluno => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<span>${aluno}</span><button onclick="registerTime(this)">Registrar</button>`;
                    studentList.appendChild(listItem);
                });
            }
        }
    }

    attTurma();
    turnoSeletor.addEventListener('change', attTurma);
    turmaSeletor.addEventListener('change', exibirAlunos);

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
const mes = String(hoje.getMonth() + 1).padStart(2, '0');
const ano = hoje.getFullYear();

const formatoData = `${dia}_${mes}_${ano}`;

const nomeArquivo = `Registro_de_pontualidade ${formatoData}.pdf`;

function exportToPDF() {
    const element = document.querySelector('#student-list');
    html2pdf().from(element).save(nomeArquivo);
}
