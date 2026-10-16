# Eric Gabriel P. Diola — Vibe Coder Portfolio

A modern, cyberpunk-inspired developer portfolio and IT showcase built with HTML5, CSS3, JavaScript, PHP 8.3 backend APIs, a session-protected admin dashboard, and a MySQL-compatible database. It features responsive layouts, animated particle connections, neon glow accents, scroll reveals, an interactive knowledge-based portfolio AI assistant, project links, certificates, video demonstration, and a database-backed contact system.

---

## Architecture Overview

- **Frontend:** Responsive single-page application (`index.html`, `css/style.css`, `js/script.js`, `js/cyber-effects.js`).
- **Backend APIs:** PHP 8.3 RESTful JSON endpoints (`backend/api/contact.php`, `backend/api/projects.php`, `backend/api/skills.php`, `backend/api/certificates.php`).
- **Database:** MySQL-compatible relational schema (`database/schema.sql`) for projects, skills, certificates, admins, and visitor contact messages.
- **Admin Dashboard:** Session-protected administration panel (`admin/dashboard.php`, `admin/login.php`) for managing portfolio data and reviewing incoming contact messages.
- **Containerization:** Production-ready `Dockerfile` based on `php:8.3-apache` preconfigured for Render deployment.

---

## Local Development (XAMPP)

1. **Start Services:** Start Apache and MySQL from the XAMPP Control Panel.
2. **Setup Database:**
   - Open phpMyAdmin (`http://localhost/phpmyadmin`) or MySQL CLI.
   - Import `database/schema.sql`. This safely creates the `vibe_coder_portfolio` database, tables, and starter data.
3. **Environment Settings:**
   - Default local settings (`127.0.0.1:3306`, user `root`, empty password) are used automatically when environment variables are omitted.
   - Refer to `.env.example` if your local MySQL configuration uses custom credentials.
4. **Create Administrator Account:**
   - Open a terminal in the project directory and run the CLI-only script:
     ```bash
     php database/create_admin.php admin 'YOUR_SECURE_PASSWORD'
     ```
   - *Note:* This command only executes in CLI mode and never exposes a public setup endpoint.
5. **Browse:**
   - Portfolio: `http://localhost/vibe-coder-upgrade/`
   - Admin Login: `http://localhost/vibe-coder-upgrade/admin/login.php`

---

## Render Deployment with Docker

This project is prepared for deployment as a **Web Service** on [Render](https://render.com/) using Docker, connected to your private repository:
`https://github.com/ericgabrieldiola/eric-vibe-coder-portfolio`

### Step 1: Create an Online MySQL-Compatible Database
1. Provision a managed MySQL database using your preferred cloud provider (such as Aiven for MySQL, TiDB Cloud Serverless, PlanetScale, Railway, or an external cloud MySQL instance).
2. Ensure the database name is `vibe_coder_portfolio` (do **not** use or alter the FixFlow database).
3. Connect using a database client (e.g. MySQL CLI, DBeaver, TablePlus, or provider web console) and import `database/schema.sql`:
   ```bash
   mysql -h YOUR_DB_HOST -P YOUR_DB_PORT -u YOUR_DB_USER -p vibe_coder_portfolio < database/schema.sql
   ```
   *All statements in `schema.sql` utilize `CREATE TABLE IF NOT EXISTS`, ensuring safe, non-destructive execution.*

### Step 2: Configure Render Web Service
1. In your Render Dashboard, click **New +** and select **Web Service**.
2. Connect your private repository: `https://github.com/ericgabrieldiola/eric-vibe-coder-portfolio`.
3. Choose the **Docker** environment.
   - Render automatically detects the root `Dockerfile` and listens on default port `10000`.
4. Under **Environment Variables**, add the following configuration:
   - `DB_HOST`: Your remote database hostname (e.g., `mysql-instance.aivencloud.com`)
   - `DB_PORT`: Database port (e.g., `3306` or provider port)
   - `DB_NAME`: `vibe_coder_portfolio`
   - `DB_USER`: Your remote database username
   - `DB_PASS`: Your remote database password
   - `DB_SSL_CA`: (Optional) `/etc/ssl/certs/ca-certificates.crt` (system CA bundle installed in the container) for providers requiring SSL/TLS.
5. Click **Create Web Service**. Render will build the container and deploy the application.

### Step 3: Create the First Administrator Online
1. Once the service is running, open the service page in the Render Dashboard and click **Shell** (or SSH into the container).
2. Execute the CLI-only admin creation script with a strong password (minimum 12 characters):
   ```bash
   php database/create_admin.php admin 'YOUR_VERY_STRONG_PASSWORD_HERE'
   ```
3. Close the shell. The administrator account is hashed with `PASSWORD_DEFAULT` (`bcrypt`) and securely saved in the database.

### Step 4: Verification Online
1. **Visit Portfolio:** Open your Render live URL (e.g., `https://eric-vibe-coder-portfolio.onrender.com`).
2. **Test Contact Form:** Submit a message through the Contact section form. Verify the confirmation message appears and the form resets.
3. **Test Direct Links:**
   - Click **Email me ↗** (opens `mailto:ericgabrieldiola9@gmail.com?subject=Portfolio%20Inquiry`).
   - Click **Gmail compose ↗** (opens Gmail in a new tab safely).
   - Click **GitHub profile ↗** (navigates to your verified GitHub profile).
4. **Test Admin Dashboard:**
   - Browse to `/admin/login.php`.
   - Sign in using your administrator credentials.
   - Confirm that the submitted contact messages and project metrics appear on the dashboard.

---

## Security Practices

- **Strict Secret Isolation:** `.gitignore` excludes `.env`, private keys (`*.key`, `*.pem`), logs, and database dumps. Never commit production secrets to Git.
- **Fail-Safe Database Masking:** Database connection failures in `backend/config/database.php` mask connection strings, credentials, and hostnames to prevent exposure in client responses or public error messages.
- **Safe Admin CLI:** `database/create_admin.php` is strictly restricted to CLI execution (`PHP_SAPI === 'cli'`), preventing unauthorized HTTP invocation.
- **Same-Origin Protection:** `backend/api/contact.php` verifies HTTP origin and rejects cross-site spoofing.
- **Content Security:** `admin/_bootstrap.php` applies `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: same-origin`.

---

## Preserved Assets & Features

- **Approved Resume PDF:** [`assets/eric-gabriel-diola-resume.pdf`](assets/eric-gabriel-diola-resume.pdf) is retained in its exact approved state.
- **FixFlow Application:** Preserved independently at [`projects/fixflow/`](projects/fixflow/).
- **Project Assets:** School logos (`assets/education/`), training certificates (`assets/certificates/`), project images (`assets/projects/`), and the firefighting robot demonstration video (`assets/projects/acoustic-wave-firefighting-robot.mp4`).
- **Interactive Features:** Sticky navigation bar, cyberpunk particle effects canvas, dark/light theme switch, and portfolio AI assistant knowledge engine.
