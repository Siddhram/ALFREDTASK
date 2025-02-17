import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apidataset, modesetcolour } from './redux/dataSlice';
import cheakfunc from './url';

const AddCards = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [count, setCount] = useState('');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email'));
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/40');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const val = useSelector((state) => state.dataReducer.firstlevel);
  const colourstate = useSelector((state) => state.dataReducer.modecolour);

  const func = async () => {
    const response = await axios.get('http://localhost:5000/flashcards', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return response;
  };

  useEffect(() => {
    if (!cheakfunc()) {
      navigate('/register');
    }
    func().then((response) => {
      const level1Cards = response.data.filter((card) => card.box === 1);
      const level2Cards = response.data.filter((card) => card.box === 2);
      const level3Cards = response.data.filter((card) => card.box === 3);

      dispatch(
        apidataset({
          firstlevel: level1Cards.length,
          secondlevel: level2Cards.length,
          thirdlevel: level3Cards.length,
        })
      );
    });
    // Get user info from localStorage
    setUserEmail(localStorage.getItem('email'));
  }, [navigate]);

  const handleAddFlashcard = async () => {
    if (question && answer) {
      try {
        await axios.post(
          'http://localhost:5000/flashcards',
          { question, answer },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        setQuestion('');
        setAnswer('');
        alert('Flashcard added successfully!');
        setCount(count + 1);
        dispatch(
          apidataset({
            firstlevel: count,
            secondlevel: 0,
            thirdlevel: 0,
          })
        );
      } catch (error) {
        console.error('Error adding flashcard:', error);
      }
    } else {
      alert('Please enter both question and answer.');
    }
  };

  const handleStart = () => {
    navigate('/value1');
  };

  return (
    <div
      className={`min-h-screen ${
        colourstate === 0 ? 'bg-white text-black' : 'bg-gray-900 text-white'
      }`}
    >
      {/* Navbar */}
      <nav
        className={`flex justify-between items-center p-4 ${
          colourstate === 0
            ? 'bg-gradient-to-r from-blue-500 to-purple-500'
            : 'bg-gradient-to-r from-blue-700 to-purple-700'
        } shadow-md`}
      >
        <h1 className="text-2xl font-bold">Flashcard Learning</h1>
        <div className="flex items-center gap-3">
          <img
            src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAACUCAMAAAC+99ssAAAAMFBMVEXk5ueutLeor7Lf4uPn6eqrsbXKztDGysyxt7rS1dfZ3N3c3+DP0tS0ur26v8LAxcfLEUImAAADoElEQVR4nO2bWXLsIAwAWYRZbe5/24c9S8azgjDC9Yr+SOUvXQiBLBTGBoPBYDAYDAaDwWAwGAwwADC5sv12KgDAhbgsc2JZYvAnEgRpF5XgN9Lv0clTCILXs/gzuwmKeTqDX+QvaldBPrGufsCmT26bnwkd9UAuX9w2v9hPzn5buFt4O+0+CL/UNoztoqd/LtwF0UEPJpEnl7DkcnlhvaAc7eqBzV+5FUlqx0yRHF9I5X6dc88ITRdbCIVySc/T6RXLEcYWck+6RxTVseIKU+LCTBNa1NKRXRmAkks7j8Ku5ArbQ3FjwIKUU7q9HDInVub2coiT+Ibw7fUi2k5N7TceOrAkWYvN2IRpbldY2O1pvfFgQm873v7EA3xSJFp/fEOskGuetDDX2LWukIfdf2uHrVBo7M6ds7iy/Urr4h1CzU3WvDp2NXbN2yny1DUKwyetiu3t8Gkh2nfgweIrd4IunkSX7hSNHvz3LMFHDwPsmWIIPhiTHjK0BBm7gvveFkSdbYmpohRJC4phmxWORg5VgjYv7R7sXPHiKSo3hvjmJutpX/TKnlNIGosPFN1nZPl6xxXIETQ9X/RyY6tm4hfGFchsICe5Lk/v/nVI5jxyLKeHTFGtf2RSX/2U6jNQcQXk8nkmRfF+szJXPbDL++23zpH1H9MC5tL6qWc1HjucI+8AYCHORgi1IYRZou07PrYHQHoXdExMwXl5otnFFdjTW+fOJuOdDWHSK1MI1jnZ3TH9dentFA2/ZoW6TX+mn8os2vpeE7QA3uo4r6nw8bzb8iM44gSBVALomb+cI++PZD5TZjBIq3lOAfCHUIt1FCEGqeecNXtewrQPbWO/tGxvZovzV3Bq2EoBNs01Hfd1xLfV3QvyR7mUKRgbrF+6Ss0Bbnyrq46edgNbGdO936FtC/Cx5pXijd+BQ8hgDwrqI/qYAzoV58cu3AV1SMsM3IE7bk99l7ti7OknqvqJQLeI6l2v7ku8sBGGoEavajQmC4M+mduv3Ap29UjkkKNbdRMA+aB6j3UDAGV6xbFFNP3xesVFAeq1Ca1XWJLSpOsdUSaHf15HUdYhJY3rRsFbUN1wJ4aivKWWK/n/BqpzeEf2mYyf6aggtztPv+s2u9xStGY8sUIvrxrwVBfsk13WfdYnsDxz/q1qKraKnNtW9pLLmYIH20suZ3ig27bLmoDrclFcyHmh73ParZjfdtKIbmT0fbzsBcn04GAwGAyK+QfvKzAZES0aUQAAAABJRU5ErkJggg=='}
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="font-medium">{userEmail || 'Guest'}</span>
          <button
            className={`px-4 py-2 rounded ${
              colourstate === 0 ? 'bg-red-500' : 'bg-green-500'
            }`}
            onClick={() => {
              dispatch(modesetcolour({ modecolour: colourstate === 0 ? 1 : 0 }));
            }}
          >
            {colourstate === 0 ? 'Dark Mode Off' : 'Dark Mode ON'}
          </button>
        </div>
      </nav>

      <div
        className={`p-6 flex flex-col items-center ${
          colourstate === 0 ? 'text-black' : 'text-white'
        }`}
      >
        <h1 className="text-6xl font-extrabold mb-6 text-center drop-shadow-xl">
          🎓 Flashcard Learning System
        </h1>
        <p className="text-xl mb-4 text-center max-w-xl">
          Welcome to the Flashcard Learning App! This interactive system helps you learn efficiently with spaced repetition. Add new flashcards and start your learning journey today! 🚀
        </p>

        <div
          className={`bg-white text-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md mb-6 ${
            colourstate === 0 ? 'bg-gray-200' : 'bg-gray-800 text-white'
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Add New Flashcard (At least two)</h2>
          <input
            type="text"
            placeholder="Enter Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Enter Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddFlashcard}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg mb-4 transition duration-300"
          >
            ➕ Add Flashcard
          </button>
          {val > 0 && (
            <button
              onClick={handleStart}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition duration-300"
            >
              🚀 Start Learning
            </button>
          )}
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Project Information</h3>
          <p className="max-w-lg text-lg mb-2">
            This app uses spaced repetition to enhance memory retention. Track your learning progress through different levels and enjoy a seamless experience with an intuitive interface.
          </p>
          <p className="max-w-lg text-lg">
            Developed with ❤️ using React, Node.js, Express, and MongoDB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddCards;
