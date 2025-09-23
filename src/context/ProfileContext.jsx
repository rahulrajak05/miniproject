import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  //education state
  const [educationList, setEducationList] = useState([]);
  const addEducation = (edu) => setEducationList((prev) => [...prev, edu]);

  //work experience state
  const [workList, setWorkList] = useState([]);
  const addWork = (work) => setWorkList((prev) => [...prev, work]);

  //learning
  const [learningList, setLearningList] = useState([]);
  const addLearning = (learning) => setLearningList((prev) => [...prev, learning]);

  //abilities
  const [abilities, setAbilities] = useState([]);
  const addAbilities = (skills) => setAbilities(skills);

 //Recognition
const [recognitions, setRecognitions] = useState([]);
const addRecognition = (recognition) => setRecognitions((prev) => [...prev, recognition]);

//Intellectual Property
const [intellectualList, setIntellectualList] = useState([]);
  const addIntellectual = (item) => setIntellectualList((prev) => [...prev, item]);


//Portfolio
  const [portfolioList, setPortfolioList] = useState([]);
  const addPortfolioItem = (item) => setPortfolioList((prev) => [...prev, item]);


  //offerings 
  const [Offerings, setOfferings] = useState([]);
  const updateOfferings = (newOfferings) => setOfferings(newOfferings);


  //Preferences
  const [Preferences, setPreferences] = useState({});
  const updatePreferences = (prefs) => setPreferences(prefs);


//Hobbies
const [InterestActivities, setInterestActivities] = useState([]);

const updateInterestActivities = (activities) => setInterestActivities(activities);

  return (
    <ProfileContext.Provider value={{ educationList, addEducation ,workList, addWork , learningList, addLearning, abilities, addAbilities , recognitions, addRecognition , intellectualList, addIntellectual, portfolioList, addPortfolioItem ,Offerings,
      updateOfferings,  Preferences,
      updatePreferences, InterestActivities,
      updateInterestActivities, }}>
      {children}
    </ProfileContext.Provider>
  );
};