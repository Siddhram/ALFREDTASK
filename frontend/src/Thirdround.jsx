import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { apidataset } from './redux/dataSlice';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import cheakfunc from './url';
import backUrl from './backurl';

const Thirdround = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [showAnswer, setShowAnswer] = useState({});
  const value1 = useSelector((state) => state.dataReducer.firstlevel);
  const value2 = useSelector((state) => state.dataReducer.secondlevel);
  const value3 = useSelector((state) => state.dataReducer.thirdlevel);
  const dispatch = useDispatch();
    const colourstate = useSelector((state) => state.dataReducer.modecolour);
  

const nav=useNavigate()
  useEffect(() => {
    if(!cheakfunc()){
       nav('/register')
  }
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get(`${backUrl()}/flashcards`,{
         headers: {
    Authorization:localStorage.getItem('token')
  }
      });
      const level3Cards = response.data.filter((card) => card.box === 3);
      const level1Cards = response.data.filter((card) => card.box === 1);
      const level2Cards = response.data.filter((card) => card.box === 2);
      dispatch(
        apidataset({
          firstlevel: level1Cards.length,
          secondlevel: level2Cards.length,
          thirdlevel: level3Cards.length,
        })
      );
      setFlashcards(level3Cards);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleShowAnswer = (id) => {
    setShowAnswer((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAnswer = async (id, correct) => {
    try {
      await axios.put(`${backUrl()}/flashcards/${id}`, { correct },{
         headers: {
    Authorization:localStorage.getItem('token')
  }
      });
      fetchFlashcards();
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  const totalCards = value1 + value2 + value3;

  return (
    <div className={`min-h-screen bg-gradient-to-r  ${
        colourstate === 0 ? ' from-yellow-500 via-orange-500 to-red-500' : 'bg-gray-900 text-white'
      } p-6 flex flex-col items-center`}>
      <h1 className="text-5xl font-extrabold mb-10 text-white shadow-md tracking-wide drop-shadow-lg">🧠 Flashcard Learning - Level 3</h1>
<h1 className="text-xl font-extrabold mb-10 text-white shadow-md tracking-wide drop-shadow-lg">
       On clicking on Correct or Incorrect Wait for 2 to 3 seconds To update Levels because I am using free deployment which take time for request 

      </h1>
<h1 className="text-xl font-extrabold mb-10 text-white shadow-md tracking-wide drop-shadow-lg">
       Also done the Progress Tracking below In Circle Animations
      </h1> 
     <div className="flex gap-6 mb-10">
  <motion.div
    className="w-28 h-28 bg-white rounded-full shadow-2xl p-3 hover:scale-110 transition-transform duration-500"
    whileHover={{ scale: 1.2 }}
  >
    <Link to="/value1">
      <CircularProgressbar
        value={(value1 / totalCards) * 100}
        text={`L1: ${value1}`}
        styles={buildStyles({
          textColor: '#1f2937',
          pathColor: '#f97316',
          trailColor: '#e5e7eb',
        })}
      />
    </Link>
  </motion.div>

  <motion.div
    className="w-28 h-28 bg-white rounded-full shadow-2xl p-3 hover:scale-110 transition-transform duration-500"
    whileHover={{ scale: 1.2 }}
  >
    <Link to="/value2">
      <CircularProgressbar
        value={(value2 / totalCards) * 100}
        text={`L2: ${value2}`}
        styles={buildStyles({
          textColor: '#1f2937',
          pathColor: '#facc15',
          trailColor: '#e5e7eb',
        })}
      />
    </Link>
  </motion.div>

  <motion.div
    className="w-28 h-28 bg-white rounded-full shadow-2xl p-3 hover:scale-110 transition-transform duration-500"
    whileHover={{ scale: 1.2 }}
  >
    <Link to="/value3">
      <CircularProgressbar
        value={(value3 / totalCards) * 100}
        text={`L3: ${value3}`}
        styles={buildStyles({
          textColor: '#1f2937',
          pathColor: '#e11d48',
          trailColor: '#e5e7eb',
        })}
      />
    </Link>
  </motion.div>
</div>
      <div className="w-full max-w-xl">
        {flashcards.length > 0 ? (
          flashcards.map((card) => (
            <motion.div
              key={card._id}
              className="card mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className={`flip-card ${showAnswer[card._id] ? 'flipped' : ''}`} onClick={() => handleShowAnswer(card._id)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-gradient-to-br from-orange-300 to-yellow-500 text-white flex items-center justify-center p-6 rounded-xl shadow-xl border border-white cursor-pointer">
                    <h3 className="text-2xl font-bold text-center drop-shadow-lg">{card.question}</h3>
                  </div>
                  <div className="flip-card-back bg-gradient-to-br from-red-400 to-pink-600 text-white flex flex-col items-center justify-center p-6 rounded-xl shadow-xl border border-white">
                    <p className="text-xl font-semibold text-center drop-shadow-lg mb-4">{card.answer}</p>
                    <div className="flex justify-center gap-4">
                      <button
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                        onClick={() => handleAnswer(card._id, true)}
                      >
                        ✅ Correct
                      </button>
                      <button
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
                        onClick={() => handleAnswer(card._id, false)}
                      >
                        ❌ Incorrect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-xl font-semibold">🚨 No flashcards available for Level 3.</p>
        )}
      </div>
    </div>
  );
};

export default Thirdround;
