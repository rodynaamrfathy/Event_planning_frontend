## 🧭 Development Plan (Step-by-Step)

Here’s a **plan to start building** your Event Planning frontend:

### 🏗️ **Step 1: Setup Base App**

* [ ] Clean up the default welcome page.
* [ ] Ensure `root.tsx` renders `RouterProvider`.
* [ ] Create your main routes (Landing, Login, Register, Dashboard).

### 🌐 **Step 2: Routing**

* [ ] Configure `app/router/index.tsx` with routes like:

  * `/` → Landing / Welcome
  * `/login`
  * `/signup`
  * `/dashboard`
* [ ] Add navigation (Navbar with `<Link>`).

### 🎨 **Step 3: Layout & Styling**

* [ ] Define global styles in `app.css`.
* [ ] Create shared components:

  * `Navbar`
  * `Footer`
  * `Layout` (wrap pages)
* [ ] Optionally add TailwindCSS or your own CSS modules.

### 🔐 **Step 4: Authentication Pages**

* [ ] Create `Login.tsx` and `Signup.tsx` pages.
* [ ] Connect to backend.

### 📅 **Step 5: Dashboard Pages**

* [ ] `/dashboard` → Show user’s events.
* [ ] `/events/:id` → Event details page.
* [ ] `/create-event` → Form to create new events.

### ⚙️ **Step 6: API Integration**

* [ ] Add API calls (backend).
* [ ] Create a folder `app/services/` for HTTP requests.

### 🧱 **Step 7: Testing & Docker**

* [ ] Test routes and UI behavior.
* [ ] Build Docker image and run with `docker build` and `docker run`.
