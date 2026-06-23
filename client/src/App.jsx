import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditorDashboard from "./pages/EditorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NewsDetails from "./pages/NewsDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EVNews from "./pages/EVNews";
import BMS from "./pages/BMS";
import State from "./pages/State";
import International from "./pages/International";
import ProtectedRoute from "./routes/ProtectedRoute";
import SearchResults from "./pages/SearchResults";
import SavedNews
from "./pages/SavedNews";
import TrendingNews from "./pages/TrendingNews";
import FeaturedNews from "./pages/FeaturedNews";

import EditorPicks from "./pages/EditorPicks";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

                <Route path="/about" element={<About />} />

<Route path="/contact" element={<Contact />} />

<Route path="/ev-news" element={<EVNews />} />

<Route path="/bms" element={<BMS />} />

<Route
  path="/search"
  element={<SearchResults />}
/>

<Route
  path="/state/:stateName"
  element={<State />}
/>
<Route path="/international" element={<International />} /> 


        <Route
  path="/editor-dashboard"
  element={
    <ProtectedRoute allowedRole="editor">

      <EditorDashboard />

    </ProtectedRoute>
  }
/>

        <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute allowedRole="admin">

      <AdminDashboard />

    </ProtectedRoute>
  }
/>

        <Route
  path="/news-details"
  element={<NewsDetails />}
/>

<Route
  path="/saved-news"
  element={<SavedNews />}
/>
<Route
  path="/trending-news"
  element={<TrendingNews />}
/>

<Route
  path="/featured"
  element={<FeaturedNews />}
/>

<Route
  path="/editor-picks"
  element={<EditorPicks />}
/>

      </Routes>

   

    </BrowserRouter>

  );

}

export default App;

