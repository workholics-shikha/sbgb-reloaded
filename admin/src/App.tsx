import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Dashboard from '@/pages/Dashboard';
import SlidersPage from '@/pages/SlidersPage';
import CategoriesPage from '@/pages/CategoriesPage';
import ActivitiesPage from '@/pages/ActivitiesPage';
import ActivityEditorPage from '@/pages/ActivityEditorPage';
import InnerActivitiesPage from '@/pages/InnerActivitiesPage';
import ArticlesPage from '@/pages/ArticlesPage';
import ArticleViewPage from '@/pages/ArticleViewPage';
import EventsPage from '@/pages/EventsPage';
import EventViewPage from '@/pages/EventViewPage';
import MediaPage from '@/pages/MediaPage';
import GalleriesPage from '@/pages/GalleriesPage';
import ImportantLinksPage from '@/pages/ImportantLinksPage';
import VideosPage from '@/pages/VideosPage';
import PatrikaPage from '@/pages/PatrikaPage';
import StoriesPage from '@/pages/StoriesPage';
import StateListPage from '@/pages/StateListPage';
import CityListPage from '@/pages/CityListPage';
import TestimonialListPage from '@/pages/TestimonialListPage';
import CoachingOrganizationsPage from '@/pages/CoachingOrganizationsPage';
import ContactsPage from '@/pages/ContactsPage';
import CsrPartnershipPage from '@/pages/CsrPartnershipPage';
import VolunteersPage from '@/pages/VolunteersPage';
import FeedbacksPage from '@/pages/FeedbacksPage';
import GuestBooksPage from '@/pages/GuestBooksPage';
import BrilliantStudentsPage from '@/pages/BrilliantStudentsPage';
import AppointedEmployeesPage from '@/pages/AppointedEmployeesPage';
import RetiredEmployeesPage from '@/pages/RetiredEmployeesPage';
import SpecialAchievementsPage from '@/pages/SpecialAchievementsPage';
import RegistrationsPage from '@/pages/RegistrationsPage';
import PlaceholderPage from '@/pages/PlaceholderPage';
import RegisteredStudentsPage from '@/pages/RegisteredStudentsPage';
import RegisteredSpgbpPage from '@/pages/RegisteredSpgbpPage';
import {
  clearAdminAuthSession,
  clearPublicAuthSession,
  consumeAuthSessionFromUrl,
  getPublicLoginUrl,
  readAdminAuthSession,
  type AdminAuthSession,
} from '@/lib/auth';
import { useEffect, useState } from 'react';

function getRouterBasename() {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl === '/' ? undefined : baseUrl.replace(/\/+$/, '');
}

function App() {
  const [authSession, setAuthSession] = useState<AdminAuthSession | null>(null);

  useEffect(() => {
    const sessionFromUrl = consumeAuthSessionFromUrl();
    const currentSession = sessionFromUrl || readAdminAuthSession();
    setAuthSession(currentSession);

    if (!currentSession) {
      window.location.href = getPublicLoginUrl();
    }
  }, []);

  if (!authSession) {
    return null;
  }

  return (
    <BrowserRouter basename={getRouterBasename()}>
      <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#f5fbf7' }}>
        <Sidebar />
        <div className="flex-1 flex min-w-0 flex-col min-h-0">
          <Header
            userName={authSession.user.name}
            onLogout={() => {
              const loginType = authSession.user.loginType;
              clearAdminAuthSession();
              clearPublicAuthSession();
              window.location.href = getPublicLoginUrl(loginType);
            }}
          />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sliders" element={<SlidersPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/activities/new" element={<ActivityEditorPage />} />
              <Route path="/activities/:id/edit" element={<ActivityEditorPage />} />
              <Route path="/inner-activities" element={<InnerActivitiesPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/articles/:id" element={<ArticleViewPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventViewPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/galleries" element={<GalleriesPage />} />
              <Route path="/important-links" element={<ImportantLinksPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/patrika" element={<PatrikaPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/sbgbt-members" element={<VolunteersPage />} />
              <Route path="/donations" element={<PlaceholderPage title="Donations" />} />
              <Route path="/csr-partnership" element={<CsrPartnershipPage />} />
              <Route path="/registered-spgbp" element={<RegisteredSpgbpPage />} />
              <Route path="/transaction-management" element={<PlaceholderPage title="Transaction Management" />} />
              <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
              <Route path="/upload-results" element={<PlaceholderPage title="Upload Results" />} />
              <Route path="/registered-students" element={<RegisteredStudentsPage />} />
              <Route path="/register-new-student" element={<PlaceholderPage title="Register New Student" description="Use the public Utthan Coaching Registration form to add a new student. Submitted entries will appear in Registered Students." />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/users-feedback" element={<FeedbacksPage />} />
              <Route path="/state-list" element={<StateListPage />} />
              <Route path="/city-list" element={<CityListPage />} />
              <Route path="/testimonial-list" element={<TestimonialListPage />} />
              <Route path="/coaching-organizations" element={<CoachingOrganizationsPage />} />
              <Route path="/volunteers" element={<VolunteersPage />} />
              <Route path="/feedbacks" element={<FeedbacksPage />} />
              <Route path="/guest-books" element={<GuestBooksPage />} />
              <Route path="/brilliant-students" element={<BrilliantStudentsPage />} />
              <Route path="/appointed-employees" element={<AppointedEmployeesPage />} />
              <Route path="/retired-employees" element={<RetiredEmployeesPage />} />
              <Route path="/special-achievements" element={<SpecialAchievementsPage />} />
              <Route path="/registrations" element={<RegistrationsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
