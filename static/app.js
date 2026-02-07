function App() {
    const [password, setPassword] = React.useState("");
    const [result, setResult] = React.useState(null);
    const [show, setShow] = React.useState(false);

    const checkStrength = async () => {
        const response = await fetch("/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password })
        });

        const data = await response.json();
        setResult(data);
    };

    const calculateMeter = () => {
        let score = 0;
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
        return score;
    };

    const meterScore = calculateMeter();
    const meterWidth = `${(meterScore / 5) * 100}%`;

    const meterColor =
        meterScore <= 2 ? "#ef4444" :
        meterScore === 3 ? "#facc15" :
        "#22c55e";

    return (
        <div style={{
            width: "420px",
            margin: "80px auto",
            background: "#1e293b",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            color: "#fff",
            fontFamily: "Arial"
        }}>
            <h2 style={{ textAlign: "center" }}>Password Strength Tester</h2>
            <p style={{ textAlign: "center", color: "#94a3b8" }}>
                Enhancing Security Through Robust Authentication
            </p>

            <input
                type={show ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "15px",
                    borderRadius: "6px",
                    border: "none"
                }}
            />

            <div style={{
                marginTop: "10px",
                background: "#334155",
                borderRadius: "5px",
                height: "8px"
            }}>
                <div style={{
                    width: meterWidth,
                    height: "8px",
                    borderRadius: "5px",
                    background: meterColor,
                    transition: "width 0.3s"
                }}></div>
            </div>

            <div style={{ marginTop: "10px" }}>
                <input
                    type="checkbox"
                    checked={show}
                    onChange={() => setShow(!show)}
                />
                <label style={{ marginLeft: "6px" }}>Show Password</label>
            </div>

            <button
                onClick={checkStrength}
                style={{
                    width: "100%",
                    marginTop: "15px",
                    padding: "10px",
                    backgroundColor: "#22c55e",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
            >
                Check Strength
            </button>

            {result && (
                <div style={{ marginTop: "20px" }}>
                    <h3 style={{ color: meterColor }}>
                        Strength: {result.strength}
                    </h3>

                    <h4 style={{ color: "#38bdf8" }}>Security Insights</h4>
                    <ul>
                        {result.insights.map((i, idx) => (
                            <li key={idx}>{i}</li>
                        ))}
                    </ul>

                    <h4 style={{ color: "#38bdf8" }}>Recommendations</h4>
                    <ul>
                        {result.recommendations.length > 0 ? (
                            result.recommendations.map((r, idx) => (
                                <li key={idx}>{r}</li>
                            ))
                        ) : (
                            <li>Continue following strong password practices and avoid reuse across platforms.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
