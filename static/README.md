# Password Strength Tester

## Enhancing Security Through Robust Authentication

This project is a **Password Strength Tester** developed as part of a cybersecurity internship project. It evaluates password robustness and provides **real-time feedback, security insights, and actionable recommendations** to help users create strong and secure passwords.

---

## 🔐 Features
- Real-time password strength meter while typing
- Backend validation based on OWASP and NIST guidelines
- Security insights explaining potential vulnerabilities
- Actionable recommendations to improve password strength
- Show / hide password functionality
- Clean and professional UI

---

## 🛠️ Technologies Used
- **Python**
- **Flask** (Backend)
- **JavaScript**
- **React** (Frontend via CDN)
- **OWASP Password Guidelines**
- **NIST SP 800-63**
- **Git & GitHub**

---

## ⚙️ How It Works
1. User enters a password.
2. A real-time strength meter updates as the user types.
3. On submission, the backend evaluates:
   - Length
   - Complexity
   - Common password patterns
4. The system returns:
   - Strength classification (Weak / Moderate / Strong)
   - Security insights
   - Recommendations for improvement

---

## ▶️ How to Run Locally

```bash
pip install -r requirements.txt
python app.py
