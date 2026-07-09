CREATE DATABASE IF NOT EXISTS cyber_awareness CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cyber_awareness;

DROP TABLE IF EXISTS quiz_results;
DROP TABLE IF EXISTS security_tips;
DROP TABLE IF EXISTS threats;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    city VARCHAR(50) NOT NULL,
    occupation VARCHAR(100) NOT NULL,
    favorite_topic VARCHAR(100) NOT NULL,
    experience_level VARCHAR(30) NOT NULL
);

CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    difficulty_level VARCHAR(30) NOT NULL,
    reading_time INT NOT NULL,
    source_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE threats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    threat_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL,
    target_audience VARCHAR(100) NOT NULL,
    attack_method VARCHAR(100) NOT NULL,
    warning_signs TEXT NOT NULL,
    prevention TEXT NOT NULL,
    damage_level VARCHAR(30) NOT NULL
);

CREATE TABLE security_tips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    importance_level VARCHAR(30) NOT NULL,
    recommended_action TEXT NOT NULL,
    target_user VARCHAR(100) NOT NULL,
    example TEXT NOT NULL
);

CREATE TABLE quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO articles 
(title, category, author, summary, content, difficulty_level, reading_time, source_name) 
VALUES
('איך לזהות הודעת פישינג', 'Phishing', 'צוות האתר', 'מאמר שמסביר איך לזהות הודעות התחזות וקישורים חשודים.', 'יש לבדוק את כתובת השולח, להיזהר מקישורים חשודים ולא למסור פרטים אישיים.', 'Beginner', 5, 'Cyber Awareness'),
('חשיבות סיסמאות חזקות', 'Passwords', 'צוות האתר', 'מאמר על יצירת סיסמאות חזקות ושמירה על חשבונות אישיים.', 'סיסמה חזקה צריכה להיות ארוכה ולשלב אותיות, מספרים וסימנים מיוחדים.', 'Beginner', 4, 'Cyber Awareness');

INSERT INTO threats 
(threat_name, description, severity, target_audience, attack_method, warning_signs, prevention, damage_level) 
VALUES
('Phishing', 'התחזות לגורם אמין כדי לגנוב פרטים אישיים.', 'High', 'משתמשים פרטיים ועסקים', 'שליחת הודעות מזויפות עם קישורים לאתרים מתחזים.', 'כתובת שולח מוזרה, שגיאות כתיב, בקשה דחופה למסירת פרטים.', 'לא ללחוץ על קישורים חשודים ולבדוק את כתובת האתר.', 'High'),
('Ransomware', 'תוכנה זדונית שמצפינה קבצים ודורשת כופר.', 'High', 'עסקים ומשתמשים פרטיים', 'קובץ זדוני שנפתח במחשב או קישור נגוע.', 'קבצים שלא נפתחים, הודעת דרישת תשלום, האטה חריגה במחשב.', 'לבצע גיבויים ולעדכן תוכנות באופן קבוע.', 'High'),
('SQL Injection', 'הזרקת קוד SQL דרך טפסים באתר.', 'Medium', 'אתרים ומערכות עם בסיס נתונים', 'הכנסת קוד SQL בשדות קלט של המשתמש.', 'שגיאות בסיס נתונים, התנהגות לא רגילה בטפסים.', 'שימוש בפרמטרים מסוג ? בשאילתות SQL.', 'Medium'),
('XSS', 'הזרקת קוד JavaScript לדף אינטרנט.', 'Medium', 'משתמשי אתרים ומנהלי אתרים', 'הכנסת קוד JavaScript לתוך שדות קלט.', 'חלונות קופצים, הפניות מוזרות, תוכן לא צפוי בדף.', 'בדיקת קלט משתמש והצגת נתונים בצורה בטוחה.', 'Medium');

INSERT INTO security_tips
(title, category, description, importance_level, recommended_action, target_user, example)
VALUES
('שימוש בסיסמה חזקה', 'Passwords', 'סיסמה חזקה מקשה על תוקפים לפרוץ לחשבון.', 'High', 'להשתמש בסיסמה ארוכה עם אותיות, מספרים וסימנים.', 'כל המשתמשים', 'Topaz!2026Secure'),
('אימות דו שלבי', 'Authentication', 'אימות דו שלבי מוסיף שכבת הגנה נוספת לחשבון.', 'High', 'להפעיל 2FA בחשבונות חשובים.', 'משתמשים עם חשבונות אישיים או עסקיים', 'קוד חד פעמי שנשלח לטלפון'),
('עדכון תוכנות', 'Updates', 'עדכוני תוכנה מתקנים חולשות אבטחה.', 'Medium', 'לעדכן מערכת הפעלה, דפדפן ואנטי וירוס.', 'כל המשתמשים', 'עדכון Windows או Chrome');