# Project Scaffold Plan

## Goal
Create the complete folder structure and boilerplate React components/routes/contexts/hooks/utilities as specified.

## Steps
- [ ] Create routing layer: `src/routes/AppRoutes.jsx`, `src/routes/PrivateRoute.jsx`, `src/routes/AdminRoute.jsx`
- [ ] Implement layouts: `src/components/layout/MainLayout.jsx`, `src/components/layout/AdminLayout.jsx`, `src/components/layout/AuthLayout.jsx`
- [ ] Implement contexts: `src/context/AuthContext.jsx`, `src/context/NotificationContext.jsx`
- [ ] Implement hooks: `src/hooks/useAuth.js`, `src/hooks/useAxios.js`, `src/hooks/useLocalStorage.js`, `src/hooks/useScrollAnimation.js`
- [ ] Implement utils: `src/utils/validators.js`, `src/utils/helpers.js`, `src/utils/constants.js`, `src/utils/errorHandler.js`
- [ ] Create pages: public/auth/user/admin route pages under `src/pages/**`
- [ ] Populate/implement common components: `src/components/common/Navbar.jsx`, `Footer.jsx`, `Hero.jsx`, `Stats.jsx`, `FeatureCard.jsx`, `AppCard.jsx`, `GalleryGrid.jsx`, `FAQAccordion.jsx`, `WhatsAppFloat.jsx`
- [ ] Update `src/App.jsx` to mount `AppRoutes`
- [ ] Run `npm run dev` and `npm run build` to ensure compile succeeds

