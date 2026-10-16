# MySQL Database Setup & Management

This directory contains the database initialization schema and administrative tooling for the Vibe Coder Portfolio.

---

## 1. Schema Definition (`database/schema.sql`)

The database schema manages:
- `admins`: Hashed administrator accounts (`username`, `password_hash`, timestamps).
- `projects`: Dynamic project records and featured URLs.
- `skills`: Categorized technical skill levels.
- `certificates`: Official certifications and document paths.
- `contact_messages`: Visitor messages submitted via the portfolio contact form (`name`, `email`, `message`, `ip_hash`, `is_read`, `created_at`).

All tables use `CREATE TABLE IF NOT EXISTS` to ensure non-destructive execution across fresh environments and existing installations.

---

## 2. Environment Configuration

The application queries environment variables through `backend/config/database.php`:

| Variable | Description | Local Default (XAMPP) | Cloud / Render Production |
|---|---|---|---|
| `DB_HOST` | Database host or IP | `127.0.0.1` | Remote host (e.g. cloud provider endpoint) |
| `DB_PORT` | Database port | `3306` | Remote port (e.g. `3306`) |
| `DB_NAME` | Database schema name | `vibe_coder_portfolio` | `vibe_coder_portfolio` |
| `DB_USER` | Database username | `root` | Production database user |
| `DB_PASS` | Database password | *(empty)* | Secure production password |
| `DB_SSL_CA`| CA certificate path | *(disabled)* | `/etc/ssl/certs/ca-certificates.crt` *(optional)* |

---

## 3. Creating the First Administrator (`database/create_admin.php`)

To keep admin initialization completely secure:
- **CLI Only:** The script refuses execution from web browsers (`HTTP 403: CLI only`).
- **Password Enforcement:** Requires passwords of at least 12 characters.
- **Secure Hashing:** Uses PHP's `password_hash()` with `PASSWORD_DEFAULT` (bcrypt).

### Usage:
```bash
php database/create_admin.php admin 'YOUR_VERY_STRONG_PASSWORD'
```

On Render, open the container **Shell** in your dashboard and run the command above.

---

## 4. Security Notes
- Never commit real passwords, `.env` files, or production database backups to Git.
- Ensure the online database is isolated under its own schema (`vibe_coder_portfolio`). Never share or modify schemas intended for other projects (such as FixFlow).
- Keep database connection error messages non-sensitive; detailed errors are directed to server error logs.
