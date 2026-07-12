פרויקט: אתר להגברת מודעות לסייבר
================================

טכנולוגיות:
Node.js, Express, EJS, MySQL (mysql2), bcrypt, CSRF protection

מבנה MVC:
  routes/       — ניתוב
  controllers/  — לוגיקה
  models/       — שאילתות DB
  views/        — תבניות EJS
  middleware/   — auth, csrf
  util/         — database, validation, logger

טבלאות במסד הנתונים:
  users, articles, threats, security_tips, quiz_results


════════════════════════════════════════════
  התקנה על Mac (מחשב אישי)
════════════════════════════════════════════

1. פתח את התיקייה ב-VS Code
2. צור קובץ .env (העתק מ-.env.example ועדכן סיסמה):
     cp .env.example .env
3. התקן חבילות:
     npm install
4. הפעל MySQL והרץ את db.sql:
     mysql -u root -p < db.sql
5. הפעל את השרת:
     npm start
6. פתח בדפדפן:
     http://localhost:3000


════════════════════════════════════════════
  פריסה על Windows Server (העתקה)
════════════════════════════════════════════

── שלב 1: העתקת קבצים ──

  העתק את כל התיקייה לשרת, אבל:
  ✗ אל תעתיק node_modules (גדול ולא תואם Windows)
  ✓ ודא שהעתקת את .env (קובץ נסתר!)

  ב-Mac, להצגת קבצים נסתרים ב-Finder: Cmd+Shift+.
  ב-Windows, להצגת קבצים נסתרים: View → Hidden items

  אם .env לא הועתק — צור אותו ידנית (ראה שלב 2).

── שלב 2: קובץ .env ──

  צור קובץ .env בתיקיית הפרויקט (ליד app.js):

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=YOUR_MYSQL_PASSWORD
    DB_NAME=cyber_awareness
    SESSION_SECRET=some-long-random-secret
    PORT=3000

  החלף YOUR_MYSQL_PASSWORD בסיסמת root של MySQL בשרת.

  בדיקה: כשמריצים npm start, צריך לראות:
    Injected env (6) from .env
  אם רואים (0) — הקובץ לא נמצא או לא נקרא.

── שלב 3: MySQL ──

  וודא ש-MySQL רץ:
    Get-Service -Name "*mysql*"

  אם לא רץ:
    Start-Service MySQL80

── שלב 4: ייבוא מסד הנתונים (PowerShell) ──

  cd "C:\path\to\final project"

  Get-Content .\db.sql -Encoding UTF8 |
    & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p --default-character-set=utf8mb4

  (התאם נתיב ל-mysql.exe אם שונה)

  בדיקה:
    & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -e "USE cyber_awareness; SHOW TABLES;"

  צריך לראות 5 טבלאות.

── שלב 5: התקנה והפעלה ──

  npm install
  npm start

  פתח: http://localhost:3000


════════════════════════════════════════════
  פתרון בעיות נפוצות
════════════════════════════════════════════

  שגיאה: "Access denied (using password: NO)"
  → קובץ .env חסר או לא נקרא. צור .env עם DB_PASSWORD.

  שגיאה: "Table doesn't exist"
  → db.sql לא יובא. הרץ שלב 4.

  שגיאה: "ECONNREFUSED"
  → MySQL לא רץ. Start-Service MySQL80

  טקst מוצג כ-???? (סימני שאלה)
  → ייבא מחדש db.sql עם -Encoding UTF8
  → util/database.js כבר מוגדר עם charset: utf8mb4

  mysql לא מזוהה ב-PowerShell
  → השתמש בנתיב מלא:
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"


════════════════════════════════════════════
  דפים באתר
════════════════════════════════════════════

  /                  — דף בית
  /register          — הרשמה
  /login             — התחברות
  /profile           — אזור אישי (דורש התחברות)
  /articles          — מאמרים
  /threats           — איומי סייבר
  /security-tips     — טיפים לאבטחת מידע
  /quiz              — מבחן ידע (דורש התחברות)
