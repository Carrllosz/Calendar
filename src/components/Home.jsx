import React, { useState } from 'react';
import Calendar from "react-calendar";
import { FaBars } from 'react-icons/fa';
import { IoMdAddCircle } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventData, setEventData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  const [events, setEvents] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleEventCreation = () => {
    setIsCreatingEvent(!isCreatingEvent);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const createEvent = () => {
    const newEvent = { ...eventData, date: selectedDate };
    setEvents([...events, newEvent]);
    console.log("Novo evento criado:", newEvent);
    toggleEventCreation();
  };

  const deleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  const updateEvent = (index) => {
    const eventToUpdate = events[index];
    setEventData(eventToUpdate);
    toggleEventCreation();
  };

  const formattedDate = selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedWeekday = selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' });

  return (
    <div className={`w-full min-h-screen ${events.length > 0 && 'bg-pink-100'} flex justify-center items-center relative`}>
      <div className="fixed flex flex-col lg:flex-row bg-[#fff] rounded-3xl border w-full lg:max-w-7xl h-full lg:h-5/6">
        <div className='lg:w-1/4 h-full lg:rounded-tl-3xl lg:rounded-tr-3xl lg:rounded-bl-3xl bg-[#B0ACEB] flex flex-col justify-center gap-10'>
          <div className="cursor-pointer absolute top-6 left-6">
            <FaBars size={30} color="fff" />
          </div>
          <div className='text-white text-center justify-center items-center'>
            <h1 className='text-4xl lg:text-8xl font-bold'>{formattedDate.split(' ')[0]}</h1>
            <p className='text-base lg:text-xl'>{formattedWeekday}</p>
          </div>
          <div className='text-white text-start justify-start items-start p-3 lg:p-5'>
            <h1 className='font-bold'>Eventos do dia:</h1>
            <ul className='flex-col flex gap-2'>
            {events.map((event, index) => {
            const eventStartDate = new Date(event.startDate);
            const eventEndDate = new Date(event.endDate);
            if (
              // Verifica se o evento começa na data selecionada ou está dentro do intervalo da data selecionada
              (eventStartDate <= selectedDate && selectedDate <= eventEndDate) ||
              eventStartDate.toDateString() === selectedDate.toDateString()
            ) {
              return (
                <li key={index} className='gap-2 lg:gap-5 flex '>
                  {event.title}
                  <button className='bg-[#F2325F] rounded-2xl text-xs lg:text-[8.7px] p-1' onClick={() => deleteEvent(index)}>Excluir evento</button>
                  <button className='bg-[#F2325F] rounded-2xl text-xs lg:text-[8.7px] p-1' onClick={() => updateEvent(index)}>Atualizar evento</button>
                </li>
              );
            } else {
              return null;
            }
          })}
            </ul>
          </div>
        </div>
        <div className="lg:w-3/4 flex flex-col relative justify-center items-center">
          <div className='flex w-full justify-end items-center gap-2 absolute top-0 mt-4 lg:mt-0 mr-4 lg:mr-10'>
            <button onClick={toggleEventCreation} className='bg-[#B0ACEB] rounded-3xl text-[#fff] p-2 lg:p-3 font-bold text-[12px] lg:text-[14px] flex gap-2 lg:gap-3 mt-3'>Criar um novo evento<IoMdAddCircle className='text-[#F2325F] bg-[#fff] rounded-2xl text-[17px]'/></button>
          </div>
          <Calendar
            className="rounded-2xl p-5 lg:p-10 bg-[#ffffffe6] w-full"
            style={{ border: '1px solid #ccc', lineHeight: "1.125em", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
      </div>
      {isCreatingEvent && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-[#F2325F] p-8 rounded-lg">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Criar Novo Evento</h2>
            <input
              type="text"
              placeholder="Título"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 lg:p-3 rounded-md border-gray-300 focus:border-purple-500"
            />
            <input
              type="datetime-local"
              placeholder="Data de Início"
              name="startDate"
              value={eventData.startDate}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 lg:p-3 rounded-md border-gray-300 focus:border-purple-500"
            />
            <input
              type="datetime-local"
              placeholder="Data de Conclusão"
              name="endDate"
              value={eventData.endDate}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 lg:p-3 rounded-md border-gray-300 focus:border-purple-500"
            />
            <textarea
              placeholder="Descrição"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              className="w-full h-24 lg:h-32 mb-4 p-2 lg:p-3 rounded-md border-gray-300 focus:border-purple-500"
            ></textarea>
            <div className="flex justify-end">
              <button onClick={toggleEventCreation} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 lg:py-3 lg:px-6 rounded mr-2">Cancelar</button>
              <button onClick={createEvent} className="bg-[#fff] hover:bg-purple-200 text-[#F2325F] font-bold py-2 px-4 lg:py-3 lg:px-6 rounded">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
