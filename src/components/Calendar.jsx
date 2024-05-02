import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import "./App.css";

const App = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventName, setEventName] = useState("");
    const [events, setEvents] = useState([]);

    const Date_Click_Fun = (date) => {
        setSelectedDate(date);
    };

    const Event_Data_Update = (event) => {
        setEventName(event.target.value);
    };

    const Create_Event_Fun = () => {
        if (selectedDate && eventName) {
            const newEvent = {
                id: new Date().getTime(),
                startDate: selectedDate,
                endDate: selectedDate, // Por padrão, a atividade ocorre apenas no dia selecionado
                title: eventName,
            };
            setEvents([...events, newEvent]);
            setSelectedDate(null);
            setEventName("");
        }
    };

    const Update_Event_Fun = (eventId, newName) => {
        const updated_Events = events.map((event) => {
            if (event.id === eventId) {
                return {
                    ...event,
                    title: newName,
                };
            }
            return event;
        });
        setEvents(updated_Events);
    };

    const Delete_Event_Fun = (eventId) => {
        const updated_Events = events.filter((event) => event.id !== eventId);
        setEvents(updated_Events);
    };

    return (
        <div className="app">
            <div className="container">
                <div className="event-container">
                    {selectedDate && (
                        <div className="event-form">
                            <div>
                                <h2>{selectedDate.getDate()}</h2>{" "}
                                <p>
                                    {selectedDate.toLocaleDateString("pt-BR", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>{" "}
                            </div>
                            <div className="Contaner-input">
                                <input
                                    type="text"
                                    placeholder="Nome do Evento"
                                    value={eventName}
                                    onChange={Event_Data_Update}
                                />{" "}
                                <button
                                    className="create-btn"
                                    onClick={Create_Event_Fun}
                                >
                                    Adicionar um evento{" "}
                                </button>{" "}
                            </div>
                        </div>
                    )}

                    {events.length > 0 && selectedDate && (
                        <div className="event-list">
                            <h2> Lista de Eventos Criados </h2>{" "}
                            <div className="event-cards">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="event-card"
                                    >
                                        <div className="event-card-body">
                                            <p className="event-title">
                                                {" "}
                                                {event.title}{" "}
                                            </p>{" "}
                                            <p className="event-duration">
                                                Duração:{" "}
                                                {`${event.startDate.toLocaleDateString("pt-BR")} - ${event.endDate.toLocaleDateString("pt-BR")}`}
                                            </p>{" "}
                                        </div>{" "}
                                        <div className="event-card-header">
                                            <span className="event-date">
                                                {" "}
                                                {event.startDate.toLocaleDateString("pt-BR")}{" "}
                                            </span>{" "}
                                            <span className="event-date">
                                                {" "}
                                                -{" "}
                                            </span>{" "}
                                            <span className="event-date">
                                                {" "}
                                                {event.endDate.toLocaleDateString("pt-BR")}{" "}
                                            </span>{" "}
                                            <div className="event-actions">
                                                <button
                                                    className="update-btn"
                                                    onClick={() =>
                                                        Update_Event_Fun(
                                                            event.id,
                                                            prompt(
                                                                "INSIRA O NOVO TÍTULO"
                                                            )
                                                        )
                                                    }
                                                >
                                                    Atualizar Evento{" "}
                                                </button>{" "}
                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        Delete_Event_Fun(
                                                            event.id
                                                        )
                                                    }
                                                >
                                                    Excluir Evento{" "}
                                                </button>{" "}
                                            </div>{" "}
                                        </div>{" "}
                                    </div>
                                ))}
                            </div>{" "}
                        </div>
                    )}{" "}
                </div>{" "}
                <div className="calendar-container">
                    <Calendar
                        locale="pt-BR"
                        value={selectedDate}
                        onClickDay={Date_Click_Fun}
                        tileClassName={({ date }) =>
                            selectedDate &&
                            events.some(
                                (event) =>
                                    date >= event.startDate &&
                                    date <= event.endDate
                            )
                                ? "event-marked"
                                : ""
                        }
                    />{" "}
                </div>
            </div>{" "}
        </div>
    );
};

export default App;
