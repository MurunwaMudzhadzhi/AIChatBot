from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv("GROQ_API_KEY")
print("API KEY LOADED:", api_key)
client = Groq(api_key=api_key)


# Keywords allowed per stream — if the message has none of these, block it
STREAM_KEYWORDS = {
    "Network Management": [
        "ip", "subnet", "subnetting", "osi", "router", "routing", "switch", "vlan",
        "dns", "dhcp", "ospf", "rip", "bgp", "network", "packet", "firewall",
        "tcp", "udp", "mac", "arp", "cisco", "ping", "traceroute", "bandwidth",
        "topology", "gateway", "nat", "vpn", "wireless", "wifi", "ssid",
        "troubleshoot", "port", "ethernet", "hub", "protocol", "lan", "wan"
    ],
    "Software Development": [
        "code", "coding", "program", "programming", "function", "class", "object",
        "oop", "algorithm", "data structure", "array", "loop", "variable", "python",
        "javascript", "java", "sql", "database", "api", "rest", "git", "debug",
        "compile", "syntax", "recursion", "stack", "queue", "linked list", "sorting",
        "big o", "sdlc", "agile", "framework", "library", "method", "inheritance",
        "polymorphism", "encapsulation", "abstraction", "html", "css", "web"
    ],
    "Cybersecurity": [
        "security", "cyber", "hack", "hacking", "attack", "threat", "vulnerability",
        "phishing", "malware", "virus", "ransomware", "firewall", "encryption",
        "decrypt", "cia triad", "confidentiality", "integrity", "availability",
        "sql injection", "xss", "owasp", "penetration", "pentest", "exploit",
        "zero day", "mitm", "ddos", "brute force", "password", "authentication",
        "authorisation", "tls", "ssl", "certificate", "ids", "ips", "dmz",
        "forensics", "incident", "popia", "compliance", "ethical hacking"
    ],
    "Cloud Computing": [
        "cloud", "aws", "azure", "google cloud", "ec2", "s3", "lambda", "vpc",
        "docker", "container", "kubernetes", "devops", "ci/cd", "pipeline",
        "serverless", "iaas", "paas", "saas", "virtualisation", "virtual machine",
        "load balancer", "auto scaling", "iam", "cdn", "rds", "storage",
        "deployment", "terraform", "ansible", "microservices", "region", "bucket"
    ]
}


def is_on_topic(message, stream_name):
    """Return True if the message contains at least one keyword for the stream."""
    message_lower = message.lower()
    keywords = STREAM_KEYWORDS.get(stream_name, [])
    for keyword in keywords:
        if keyword in message_lower:
            return True
    return False


def get_stream_name(system_prompt):
    """Extract the stream name from the system prompt."""
    for stream in STREAM_KEYWORDS.keys():
        if stream.lower() in system_prompt.lower():
            return stream
    return "your subject area"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")
        system_prompt = data.get("system_prompt", "")

        # Detect which stream this is
        stream_name = get_stream_name(system_prompt)

        # Allow greetings through
        greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howzit"]
        is_greeting = any(g in user_message.lower() for g in greetings)

        # Block off-topic messages before even calling the AI
        if not is_greeting and not is_on_topic(user_message, stream_name):
            return jsonify({
                "reply": f"❌ I can only help with **{stream_name}** topics. Your question appears to be off-topic. Please ask me something related to {stream_name}."
            })

        # Add strict rules to the prompt
        strict_rules = f"""
You are strictly a {stream_name} tutor. You must ONLY discuss {stream_name} topics.
If the user asks ANYTHING outside of {stream_name}, you must respond with exactly:
"❌ I can only help with {stream_name} topics. Please ask me something related to {stream_name}."
Do NOT answer general knowledge questions. Do NOT discuss other IT streams.
Do NOT be friendly about off-topic questions. Just refuse immediately with the message above.
"""

        final_prompt = system_prompt + strict_rules

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": final_prompt},
                {"role": "user",   "content": user_message}
            ]
        )

        return jsonify({"reply": response.choices[0].message.content})

    except Exception as e:
        print("FULL ERROR:", str(e))
        return jsonify({"reply": f"Server error: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
