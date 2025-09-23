import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import TopNavbar from "./components/TopNavbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AccountProfilePage from "./pages/AccountProfilePage";
import MyProfile from "./pages/MyProfile";
import EducationSetup from "./pages/EducationSetup";
import EducationSetup1 from "./pages/EducationSetup1";
import WorkExperienceStep1 from "./pages/WorkExperienceStep1";
import WorkExperienceStep2 from "./pages/WorkExperienceStep2";
import WorkExperienceStep3 from "./pages/WorkExperienceStep3";
import LearningSetupStep1 from "./pages/LearningSetupStep1";
import LearningSetupStep2 from "./pages/LearningSetupStep2";
import EditLearningCourse from "./pages/EditLearningCourse";
import SetupAbilitiesStep1 from "./pages/SetupAbilitiesStep1";
import SetupAbilitiesStep2 from "./pages/SetupAbilitiesStep2";
import EditAbilities from "./pages/EditAbilities";
import RiseOnCoverLetter from "./pages/RiseOnCoverLetter";
import RiseOnScribe from "./pages/RiseOnScribe";
import RiseOnInterview from "./pages/RiseOnInterview";
import RiseOnJobBoards from "./pages/RiseOnJobBoards";
import RiseOnQuiz from './pages/RiseOnQuiz';
import RiseOnQuiz1 from './pages/RiseOnQuiz1';
import AwardForm from "./pages/AwardForm";
import Intellectual from "./pages/Intellectual";
import Portfolio from "./pages/Portfolio";
import EditOfferings from "./pages/EditOfferings";
import EditPreferences from "./pages/EditPreferences";
import EditHobbies from "./pages/EditHobbies";
import ResumePreview from "./pages/ResumePreview";
import Pricing from "./pages/Pricing";
import CompanyPage from "./pages/CompanyPage";
import CodingPage from "./pages/CodingPage";
import TheoryPage from "./pages/TheoryPage";



// Context
import { ProfileProvider } from "./context/ProfileContext";

// Quiz
import JAVAIN from "./pages/JAVAIN";
import JAVAAD from "./pages/JAVAAD";
import DSBeginnerQuiz from './pages/DSBeginnerQuiz'; 
import DSIntermediateQuiz from './pages/DSIntermediateQuiz';
import DSAdvancedQuiz from './pages/DSAdvancedQuiz';

import OSBeginnerQuiz from './pages/OSBeginnerQuiz';
import OSIntermediateQuiz from './pages/OSIntermediateQuiz';
import OSAdvancedQuiz from './pages/OSAdvancedQuiz';

import NBeginnerQuiz from './pages/NBeginnerQuiz';
import NIntermediateQuiz from './pages/NIntermediateQuiz';
import NAdvancedQuiz from './pages/NAdvancedQuiz';

import DBMSB from './pages/DBMSB';
import DBMSI from './pages/DBMSI';
import DBMSA from './pages/DBMSA';

import AIB from './pages/AIB';
import AII from './pages/AII';
import AIA from './pages/AIA';

import WDB from './pages/WDB';
import WDI from './pages/WDI';
import WDA from './pages/WDA';

import NDB from './pages/NDB';
import NDI from './pages/NDI';
import NDA from './pages/NDA';

import MLB from './pages/MLB';
import MLI from './pages/MLI';
import MLA from './pages/MLA';
import LeaderboardPage from "./pages/LeaderboardPage";
import ContestsPage from "./pages/ContestsPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  const location = useLocation();

  // Don't show TopNavbar on Home page
  const hideNavbarOnRoutes = ["/", "/home","/login","/signup"];
  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);

  return (
    <ProfileProvider>
      {!shouldHideNavbar && <TopNavbar />}
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myaccount" element={<AccountProfilePage />} />
            <Route path="/myprofile" element={<MyProfile />} />




            {/* Education */}
            <Route path="/educationsetup" element={<EducationSetup />} />
            <Route path="/educationsetup1" element={<EducationSetup1 />} />





            {/* Work Experience */}
            <Route path="/workexperiencestep1" element={<WorkExperienceStep1 />} />
            <Route path="/workexperiencestep2" element={<WorkExperienceStep2 />} />
            <Route path="/workexperiencestep3" element={<WorkExperienceStep3 />} />





            {/* Learning */}
            <Route path="/learning-step1" element={<LearningSetupStep1 />} />
            <Route path="/learning-step2" element={<LearningSetupStep2 />} />
            <Route path="/learning-edit" element={<EditLearningCourse />} />




            {/* Abilities */}
            <Route path="/abilities-step1" element={<SetupAbilitiesStep1 />} />
            <Route path="/abilities-step2" element={<SetupAbilitiesStep2 />} />
            <Route path="/abilities-edit" element={<EditAbilities />} />




            {/* Cover Letter */}
            <Route path="/riseon-coverletter" element={<RiseOnCoverLetter />} />




            {/* OnScribe */}
            <Route path="/riseon-scribe" element={<RiseOnScribe />} />




            {/* Interview */}
            <Route path="/riseon-interview" element={<RiseOnInterview />} />
            <Route path="/companypage" element={<CompanyPage />} />
            <Route path="/codingpage" element={<CodingPage />} />
            <Route path="/theorypage" element={<TheoryPage />} />

            
            





            {/* Job Boards */}
            <Route path="/riseon-job-boards" element={<RiseOnJobBoards />} />





             {/* Quiz */}
              <Route path="/leaderboards" element={<LeaderboardPage />} />
              <Route path="/contests" element={<ContestsPage />} />
              <Route path="/dashboard" element={<DashboardPage/>} />









            {/* Quiz */}
            <Route path="/riseon-quiz" element={<RiseOnQuiz />} />
            <Route path="/riseon-quiz1" element={<RiseOnQuiz1 />} />
            <Route path="/quiz/java/intermediate" element={<JAVAIN />} />
            <Route path="/quiz/java/advanced" element={<JAVAAD />} />
            <Route path="/riseon-quiz" element={<RiseOnQuiz />} />
            <Route path="/quiz/java/beginner" element={<RiseOnQuiz1 />} /> {/* 
            
            
            java-beginner */}
            <Route path="/quiz/java/intermediate" element={<JAVAIN />} />
            <Route path="/quiz/java/advanced" element={<JAVAAD />} />

            <Route path="/quiz/data-structures/beginner" element={<DSBeginnerQuiz />} />
            <Route path="/quiz/data-structures/intermediate" element={<DSIntermediateQuiz />} />
            <Route path ="/quiz/data-structures/advanced" element={<DSAdvancedQuiz />} /> 

            <Route path="/quiz/operating-system/beginner" element={<OSBeginnerQuiz />} />
            <Route path="/quiz/operating-system/intermediate" element={<OSIntermediateQuiz />} />
            <Route path="/quiz/operating-system/advanced" element={<OSAdvancedQuiz />} />

            <Route path="/quiz/networking/beginner" element={<NBeginnerQuiz />} />
            <Route path="/quiz/networking/intermediate" element={<NIntermediateQuiz />} />
            <Route path="/quiz/networking/advanced" element={<NAdvancedQuiz />} />

            <Route path="/quiz/dbms/beginner" element={<DBMSB />} />
            <Route path="/quiz/dbms/intermediate" element={<DBMSI />} />
            <Route path="/quiz/dbms/advanced" element={<DBMSA />} />

            <Route path="/quiz/ai/beginner" element={<AIB />} />
            <Route path="/quiz/ai/intermediate" element={<AII />} />
            <Route path="/quiz/ai/advanced" element={<AIA />} />

            <Route path="/quiz/web-development/beginner" element={<WDB />} />
            <Route path="/quiz/web-development/intermediate" element={<WDI />} />
            <Route path="/quiz/web-development/advanced" element={<WDA />} />

            <Route path="/quiz/node.js-api-design/beginner" element={<NDB />} />
            <Route path="/quiz/node.js-api-design/intermediate" element={<NDI />} />
            <Route path="/quiz/node.js-api-design/advanced" element={<NDA />} />

            <Route path="/quiz/machine-learning-basics/beginner" element={<MLB />} />
            <Route path="/quiz/machine-learning-basics/intermediate" element={<MLI />} />
            <Route path="/quiz/machine-learning-basics/advanced" element={<MLA />} />
        

            
            {/* Award */}
            <Route path="/award-form" element={<AwardForm />} />

            {/* Intellectual */}
            <Route path="/intellectual-form" element={<Intellectual />} />

             {/* portfolio */}
          <Route path="/portfolio-form" element={<Portfolio />} />

           {/* editoddering */}
          <Route path="/editoffering-form" element={<EditOfferings />} />

          {/* editpreferences */}
          <Route path="/editpreferences-form" element={<EditPreferences />} />

           {/* Edithobbies */}
          <Route path="/edithobbies-form" element={<EditHobbies />} />



           {/* resume preview */}
          <Route path="/resume-preview" element={<ResumePreview />} />


          <Route path="/pricing" element={<Pricing />} />








            {/* Fallback */}
            <Route path="*" element={<div className="text-center mt-10">404 - Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ProfileProvider>
  );
};

export default App;
