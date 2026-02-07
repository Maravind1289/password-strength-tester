from flask import Flask, render_template, request, jsonify
import re
from passlib.hash import bcrypt

app = Flask(__name__)

COMMON_PASSWORDS = {
    "123456", "password", "12345678", "qwerty",
    "abc123", "password123", "admin", "letmein"
}

def analyze_password(password):
    score = 0
    insights = []
    recommendations = []

    if len(password) >= 14:
        score += 3
    elif len(password) >= 10:
        score += 2
        recommendations.append("Increase password length to at least 14 characters.")
    elif len(password) >= 8:
        score += 1
        recommendations.append("Consider using a longer password (12–14 characters).")
    else:
        recommendations.append("Password must be at least 8 characters long.")

    if re.search(r"[A-Z]", password) and re.search(r"[a-z]", password):
        score += 1
    else:
        recommendations.append("Use both uppercase and lowercase letters.")

    if re.search(r"\d", password):
        score += 1
    else:
        recommendations.append("Add numeric characters.")

    if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        score += 1
    else:
        recommendations.append("Include special characters like @, #, or !.")

    if password.lower() in COMMON_PASSWORDS:
        insights.append("This password is commonly used and vulnerable to dictionary attacks.")
        score = 0

    if score >= 6:
        strength = "Strong"
        insights.append("Password shows strong resistance to common attack techniques.")
    elif score >= 3:
        strength = "Moderate"
        insights.append("Password provides moderate security but can be improved.")
    else:
        strength = "Weak"
        insights.append("Password is highly vulnerable to brute-force and guessing attacks.")

    return strength, insights, recommendations


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/check", methods=["POST"])
def check():
    data = request.get_json()
    password = data.get("password", "")

    safe_password = password.encode("utf-8")[:72]
    bcrypt.hash(safe_password)

    strength, insights, recommendations = analyze_password(password)

    return jsonify({
        "strength": strength,
        "insights": insights,
        "recommendations": recommendations
    })


if __name__ == "__main__":
    app.run(debug=True)
