// Seleciona os elementos do calendário e outros elementos importantes da interface
const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventBtn = document.querySelector(".add-event"),
    addEventWrapper = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to"),
    addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date(); // Define a data atual
let activeDay; // Armazena o dia ativo selecionado
let month = today.getMonth(); // Obtém o mês atual
let year = today.getFullYear(); // Obtém o ano atual

// Array de meses traduzido para o português
const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const eventsArr = []; // Array para armazenar eventos
getEvents(); // Obtém os eventos do armazenamento local
console.log(eventsArr); // Exibe os eventos no console

// Função para popular as drop lists com horários no formato 24 horas
function populateTimeOptions() {
    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour < 10 ? `0${hour}` : hour;
            const formattedMinute = minute < 10 ? `0${minute}` : minute;
            timeOptions.push(`${formattedHour}:${formattedMinute}`);
        }
    }

    const timeFrom = document.querySelector(".event-time-from");
    const timeTo = document.querySelector(".event-time-to");

    // Preenche as opções de horário
    timeOptions.forEach(time => {
        const optionFrom = document.createElement("option");
        const optionTo = document.createElement("option");
        optionFrom.value = time;
        optionTo.value = time;
        optionFrom.textContent = time;
        optionTo.textContent = time;
        timeFrom.appendChild(optionFrom);
        timeTo.appendChild(optionTo);
    });
}

// Chama a função para preencher as listas suspensas ao carregar a página
populateTimeOptions();

// Função para inicializar o calendário, adicionando os dias e destacando o dia ativo
function initCalendar() {
    const firstDay = new Date(year, month, 1); // Primeiro dia do mês
    const lastDay = new Date(year, month + 1, 0); // Último dia do mês
    const prevLastDay = new Date(year, month, 0); // Último dia do mês anterior
    const prevDays = prevLastDay.getDate(); // Número de dias do mês anterior
    const lastDate = lastDay.getDate(); // Último dia do mês atual
    const day = firstDay.getDay(); // Primeiro dia da semana
    const nextDays = 7 - lastDay.getDay() - 1; // Dias do próximo mês para preencher a semana

    date.innerHTML = months[month] + " " + year; // Atualiza o título com mês e ano

    let days = "";

    // Adiciona os dias do mês anterior
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    // Adiciona os dias do mês atual
    for (let i = 1; i <= lastDate; i++) {
        let event = false; // Verifica se há eventos para o dia
        eventsArr.forEach((eventObj) => {
            if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
                event = true; // Marca o dia com evento
            }
        });
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            activeDay = i; // Define o dia ativo como o dia atual
            getActiveDay(i); // Atualiza as informações do dia ativo
            updateEvents(i); // Atualiza os eventos do dia ativo
            days += event ? `<div class="day today active event">${i}</div>` : `<div class="day today active">${i}</div>`;
        } else {
            days += event ? `<div class="day event">${i}</div>` : `<div class="day">${i}</div>`;
        }
    }

    // Adiciona os dias do próximo mês
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days; // Atualiza o contêiner de dias
    addListner(); // Adiciona os eventos de clique nos dias
}

// Função para navegar para o mês anterior
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar(); // Recarrega o calendário
}

// Função para navegar para o próximo mês
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar(); // Recarrega o calendário
}

// Eventos de clique para os botões de navegação
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar(); // Inicializa o calendário

// Função para adicionar a classe 'active' no dia clicado
function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            getActiveDay(e.target.innerHTML); // Obtém o dia ativo
            updateEvents(Number(e.target.innerHTML)); // Atualiza os eventos do dia clicado
            activeDay = Number(e.target.innerHTML); // Define o dia ativo
            days.forEach((day) => day.classList.remove("active")); // Remove a classe 'active' de todos os dias
            if (e.target.classList.contains("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains("next-date")) {
                nextMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add("active"); // Adiciona a classe 'active' ao dia clicado
            }
        });
    });
}

// Botão "Hoje" para voltar ao mês e dia atuais
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

// Formatação da entrada da data ao navegar diretamente
dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward" && dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
    }
});

// Botão para navegar para uma data específica
gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Data inválida");
}

// Função que obtém o nome do dia e a data do dia ativo e atualiza a interface ao clicar no dia ativo
function getActiveDay(date) {
    const day = new Date(year, month, date);
    // Array com os nomes dos dias da semana em português
    const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const dayName = daysOfWeek[day.getDay()]; // Obtém o nome do dia da semana em pt-br
    eventDay.innerHTML = dayName; // Exibe o nome do dia em português
    eventDate.innerHTML = date + " " + months[month] + " " + year; // Exibe a data no formato dia/mês/ano
}


// Função que atualiza os eventos quando um dia é selecionado
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        if (date === event.day && month + 1 === event.month && year === event.year) {
            event.events.forEach((event) => {
                events += `<div class="event">
                                <div class="title">
                                    <i class="fas fa-circle"></i>
                                    <h3 class="event-title">${event.title}</h3>
                                </div>
                                <div class="event-time">
                                    <span class="event-time">${event.time}</span>
                                </div>
                            </div>`;
            });
        }
    });
    if (events === "") {
        events = `<div class="no-event">
                        <h3>Sem eventos</h3>
                    </div>`;
    }
    eventsContainer.innerHTML = events; // Atualiza o contêiner de eventos
    saveEvents(); // Salva os eventos no armazenamento local
}

// Adiciona um evento ao clicar no botão "Adicionar evento"
addEventBtn.addEventListener("click", () => {
    addEventWrapper.classList.toggle("active");
});

// Fecha o formulário de adição de evento
addEventCloseBtn.addEventListener("click", () => {
    addEventWrapper.classList.remove("active");
});

// Limita o título do evento a 60 caracteres
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
});

// Função que adiciona um evento ao array de eventos
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = document.querySelector(".event-time-from").value;
    const eventTimeTo = document.querySelector(".event-time-to").value;

    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
        alert("Preencha todos os campos");
        return;
    }

    const newEvent = {
        title: eventTitle,
        time: `${eventTimeFrom} - ${eventTimeTo}`
    };

    let eventAdded = false;
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (item.day === activeDay && item.month === month + 1 && item.year === year) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent]
        });
    }

    addEventWrapper.classList.remove("active"); // Fecha o formulário de evento
    addEventTitle.value = "";
    document.querySelector(".event-time-from").value = "";
    document.querySelector(".event-time-to").value = "";
    updateEvents(activeDay); // Atualiza os eventos do dia ativo
});

// Função para deletar um evento ao clicar nele
eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        if (confirm("Tem certeza de que deseja deletar este evento?")) {
            const eventTitle = e.target.children[0].children[1].innerHTML;
            eventsArr.forEach((event) => {
                if (event.day === activeDay && event.month === month + 1 && event.year === year) {
                    event.events.forEach((item, index) => {
                        if (item.title === eventTitle) {
                            event.events.splice(index, 1);
                        }
                    });
                    if (event.events.length === 0) {
                        eventsArr.splice(eventsArr.indexOf(event), 1); // Remove o evento se não houver mais eventos no dia
                        const activeDayEl = document.querySelector(".day.active");
                        if (activeDayEl.classList.contains("event")) {
                            activeDayEl.classList.remove("event"); // Remove a classe 'event' se não houver mais eventos
                        }
                    }
                }
            });
            updateEvents(activeDay); // Atualiza a lista de eventos
        }
    }
});

// Função para salvar os eventos no armazenamento local
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

// Função para carregar os eventos do armazenamento local
function getEvents() {
    if (localStorage.getItem("events") === null) {
        return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}
