import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [informationList, setInformationList] = useState([]);
  const addInformation = (info) => setInformationList((prev) => [...prev, info]);

  const [educationList, setEducationList] = useState([]);
  const addEducation = (edu) => setEducationList((prev) => [...prev, edu]);

  const [workList, setWorkList] = useState([]);
  const addWork = (work) => setWorkList((prev) => [...prev, work]);

  const [learningList, setLearningList] = useState([]);
  const addLearning = (learning) => setLearningList((prev) => [...prev, learning]);

  const [abilities, setAbilities] = useState([]);
  const addAbilities = (skills) => setAbilities(skills);

  const [recognitions, setRecognitions] = useState([]);
  const addRecognition = (recognition) => setRecognitions((prev) => [...prev, recognition]);

  const [intellectualList, setIntellectualList] = useState([]);
  const addIntellectual = (item) => setIntellectualList((prev) => [...prev, item]);

  const [portfolioList, setPortfolioList] = useState([]);
  const addPortfolioItem = (item) => setPortfolioList((prev) => [...prev, item]);

  const [Offerings, setOfferings] = useState([]);
  const updateOfferings = (newOfferings) => setOfferings(newOfferings);

  const [Preferences, setPreferences] = useState({});
  const updatePreferences = (prefs) => setPreferences(prefs);

  const [InterestActivities, setInterestActivities] = useState([]);
  const updateInterestActivities = (activities) => setInterestActivities(activities);

  return (
    <ProfileContext.Provider
      value={{
        informationList,
        addInformation,
        educationList,
        addEducation,
        workList,
        addWork,
        learningList,
        addLearning,
        abilities,
        addAbilities,
        recognitions,
        addRecognition,
        intellectualList,
        addIntellectual,
        portfolioList,
        addPortfolioItem,
        Offerings,
        updateOfferings,
        Preferences,
        updatePreferences,
        InterestActivities,
        updateInterestActivities,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
