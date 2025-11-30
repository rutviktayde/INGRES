import re
import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.calibration import CalibratedClassifierCV
from sklearn.pipeline import Pipeline
from typing import Tuple
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk
import json

# Download NLTK data (run once)
nltk.download("punkt")
nltk.download("stopwords")
nltk.download("punkt_tab") # Add this line to download the missing resource

# --- Configuration ---
MODEL_FILENAME = 'ingres_intent_tfidf_model.pkl'
CONFIDENCE_THRESHOLD = 0.65

class TfidfIntentClassifier:
    """
    Fallback Optimized Classifier: Uses TF-IDF for features + Calibrated Logistic Regression,
    with strict Rule Engine for safety.
    """
    def __init__(self):
        # Training data (same as yours)
        self.training_data = [
            ("What is the current groundwater level in Nagpur district?", "data_query"),
            ("Show me rainfall statistics for the last fiscal year", "data_query"),
            ("Compare water extraction rates between 2023 and 2024.", "data_query"),
            ("List all districts categorized as over-exploited.", "data_query"),
            ("What is the average number of canals in Punjab?", "data_query"),
            ("Show me the distribution of metals content in the water.", "data_query"),
            ("Is the aquifer status safe or critical?", "data_query"),
            ("What is ground water level of Bathinda?", "data_query"),
            ("compare groundwater levels for Pune versus Nashik.", "data_query"),
            ("hello there", "greeting"),
            ("Good morning, assistant.", "greeting"),
            ("Thanks for the information.", "greeting"),
            ("Who won the final cricket match last night?", "out_of_scope"),
            ("Tell me a joke", "out_of_scope"),
            ("What is the best type of car to buy?", "out_of_scope"),
            ("Groundwater level of Elon Musk?", "out_of_scope"),
            ("delete * from table", "out_of_scope"),
            ("What is the price of Bitcoin?", "out_of_scope"),
            ("What is the groundwater extraction stage in Bathinda district?", "data_query"),
    ("Show me salinity levels in Amritsar block", "data_query"),
    ("Compare recharge from tanks and ponds in Punjab vs Haryana", "data_query"),
    ("Is the water safe for drinking in Ludhiana?", "data_query"),
    ("Give me the latest uranium concentration data for Bathinda", "data_query"),
    ("List all over-exploited blocks in Punjab", "data_query"),
    ("What’s the net groundwater availability for future use in Patiala?", "data_query"),
    ("Show flood-prone areas with high fluoride in Rajasthan", "data_query"),
    ("ਪੰਜਾਬ ਵਿੱਚ ਭੂਜਲ ਦਾ ਪੱਧਰ ਕੀ ਹੈ?", "data_query"),
    ("ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਪਾਣੀ ਪੀਣ ਲਾਇਕ ਹੈ ਕੀ?", "data_query"),
    ("ਕੀ ਬਠਿੰਡਾ ਦਾ ਪਾਣੀ ਫਸਲਾਂ ਲਈ ਠੀਕ ਹੈ?", "data_query"),
    ("ਮੇਰੇ ਖੇਤ ਲਈ ਪਾਣੀ ਕਿੰਨਾ ਬਚਿਆ?", "data_query"),
    ("ਖਾਰਾਪਣ ਜ਼ਿਆਦਾ ਹੈ ਕਿ ਨਹੀਂ?", "data_query"),
    ("What is the fluoride level in Malwa region?", "data_query"),
    ("Show me groundwater quality map of Punjab", "data_query"),
    ("How much water can I pump from my borewell in Sangrur?", "data_query"),
    ("Is groundwater in Ferozepur safe for crops?", "data_query"),
    ("Compare extraction stage of Bathinda and Ludhiana", "data_query"),
    ("What is the recharge rate from canals in Haryana?", "data_query"),
    ("Show me districts with high arsenic", "data_query"),
    ("Is my village in over-exploited category?", "data_query"),
    ("What is the status of groundwater in my taluka?", "data_query"),
    ("Give me data for Moga district", "data_query"),
    ("Show nitrate levels in groundwater", "data_query"),
    ("What is the depth to water table in Jalandhar?", "data_query"),
    ("How has groundwater declined in Punjab in last 5 years?", "data_query"),
    ("List safe, semi-critical and critical blocks in Rajasthan", "data_query"),
    ("What is the annual extractable groundwater resource in Maharashtra?", "data_query"),
    ("Show me heavy metal contamination hotspots", "data_query"),
    ("Is uranium above safe limit in Bathinda?", "data_query"),
    ("What is the stage of development in my block?", "data_query"),
    ("Give me recharge from rainwater harvesting structures", "data_query"),
    ("Show me coastal salinity intrusion areas", "data_query"),
    ("What is the allocation for domestic use in 2025?", "data_query"),
    ("Compare Punjab and Tamil Nadu groundwater status", "data_query"),
    ("Is groundwater in my area saline or fresh?", "data_query"),
    ("Show me waterlogged blocks", "data_query"),
    ("What is the environmental flow requirement?", "data_query"),
    ("Give me in-storage groundwater resources", "data_query"),
    ("Show confined vs unconfined aquifer data", "data_query"),
    ("What is the trend of groundwater level in my district?", "data_query"),
    ("Is my borewell in a dark zone?", "data_query"),
    ("Give me data for last 3 years", "data_query"),
    ("Show me blocks with declining water table", "data_query"),
    ("What is the rainfall recharge contribution?", "data_query"),
    ("Compare irrigation vs domestic extraction", "data_query"),
    ("Show me industrial groundwater use", "data_query"),
    ("Is fluoride high in my village?", "data_query"),
    ("What is the quality tagging for my block?", "data_query"),
    ("Give me spring discharge data for hilly areas", "data_query"),
    ("Show me flood-prone areas with poor quality", "data_query"),
    ("What is the additional potential under specific conditions?", "data_query"),
    ("Show me total groundwater availability", "data_query"),
    ("What is the stage of extraction in 2024?", "data_query"),
    ("Give me data for Bathinda, Ludhiana and Amritsar", "data_query"),
    ("Show me over-exploited districts in India", "data_query"),
    ("What is the recharge from sewage and flash floods?", "data_query"),
    ("Is my area critical or over-exploited?", "data_query"),
    ("Show me water conservation structure impact", "data_query"),
    ("What is the base flow in rivers?", "data_query"),
    ("Give me lateral flow data", "data_query"),
    ("Show me evapotranspiration losses", "data_query"),
    ("What is the vertical flow contribution?", "data_query"),
    ("Show me pipeline recharge", "data_query"),
    ("What is the surface water irrigation return flow?", "data_query"),
    ("Give me data for semi-confined aquifers", "data_query"),
    ("Show me dynamic vs in-storage resources", "data_query"),
    ("What is the fresh vs saline water distribution?", "data_query"),
    ("Show me waterlogged and shallow water table areas", "data_query"),
    ("Is my block safe for new borewells?", "data_query"),
    ("Give me the latest CGWB report data", "data_query"),
    ("Show me groundwater draft vs recharge", "data_query"),
    ("What is the net availability for future use?", "data_query"),
    ("Show me districts with high nitrate", "data_query"),
    ("What is the impact of canals on recharge?", "data_query"),
    ("Give me data for 2023 vs 2024", "data_query"),
    ("Show me blocks with improving groundwater", "data_query"),
    ("What is the extraction for irrigation in Punjab?", "data_query"),
    ("Is groundwater declining in my area?", "data_query"),
    ("Show me recharge worthy area", "data_query"),
    ("What is the hilly area percentage?", "data_query"),
    ("Give me total geographical area data", "data_query"),
    ("Show me rainfall vs recharge correlation", "data_query"),
    ("What is the environmental flow allocation?", "data_query"),
    ("Show me domestic allocation for 2025", "data_query"),
    ("Give me industrial extraction data", "data_query"),
    ("What is the total extraction for all uses?", "data_query"),
    ("Show me annual extractable resource", "data_query"),
    ("Is my district in red zone?", "data_query"),
    ("Give me data for Gurdaspur", "data_query"),
    ("Show me groundwater status of Rajasthan", "data_query"),
    ("What is the salinity risk in coastal areas?", "data_query"),
    ("Show me uranium affected districts", "data_query"),
    ("Give me fluoride map", "data_query"),
    ("What is the arsenic level in groundwater?", "data_query"),
    ("Show me heavy metal distribution", "data_query"),
    ("Is water safe for children in Bathinda?", "data_query"),
    ("Give me data for my village", "data_query"),
    ("Show me groundwater level trend", "data_query"),
    ("What is the recharge from ponds?", "data_query"),
    ("Show me canal seepage contribution", "data_query"),
    ("Give me water conservation impact", "data_query"),
    ("What is the stage of development in Haryana?", "data_query"),
    ("Show me safe districts for farming", "data_query"),
    ("Is groundwater rising or falling?", "data_query"),
    ("Give me data for last 10 years", "data_query"),
    ("Show me critical blocks", "data_query"),
    ("What is the recharge from rainwater?", "data_query"),
    ("Show me extraction by sector", "data_query"),
    ("Give me quality parameters", "data_query"),
    ("What is the major parameter present?", "data_query"),
    ("Show me other parameters", "data_query"),
    ("Is my water contaminated?", "data_query"),

    # === 50+ GREETINGS (Should be "greeting") ===
    ("hello", "greeting"),
    ("hi", "greeting"),
    ("hey", "greeting"),
    ("good morning", "greeting"),
    ("good afternoon", "greeting"),
    ("good evening", "greeting"),
    ("thanks", "greeting"),
    ("thank you", "greeting"),
    ("thanks a lot", "greeting"),
    ("thank you so much", "greeting"),
    ("bye", "greeting"),
    ("goodbye", "greeting"),
    ("see you", "greeting"),
    ("take care", "greeting"),
    ("namaste", "greeting"),
    ("sat sri akal", "greeting"),
    ("hello there", "greeting"),
    ("hi assistant", "greeting"),
    ("hey bot", "greeting"),
    ("how are you", "greeting"),
    ("what's up", "greeting"),
    ("thank you!", "greeting"),
    ("thanks!", "greeting"),
    ("ok thanks", "greeting"),
    ("great thanks", "greeting"),
    ("awesome", "greeting"),
    ("perfect", "greeting"),
    ("nice", "greeting"),
    ("cool", "greeting"),
    ("got it", "greeting"),
    ("understood", "greeting"),
    ("ok", "greeting"),
    ("alright", "greeting"),
    ("fine", "greeting"),
    ("yes", "greeting"),
    ("no", "greeting"),
    ("maybe", "greeting"),
    ("sure", "greeting"),
    ("of course", "greeting"),
    ("please", "greeting"),
    ("welcome", "greeting"),
    ("you're welcome", "greeting"),
    ("no problem", "greeting"),
    ("my pleasure", "greeting"),
    ("anytime", "greeting"),
    ("happy to help", "greeting"),
    ("glad I could help", "greeting"),
    ("have a good day", "greeting"),
    ("take care", "greeting"),
    ("stay safe", "greeting"),
    ("best wishes", "greeting"),

    # === 70+ OUT-OF-SCOPE / OFF-TOPIC / MALICIOUS (Should be "out_of_scope") ===
    ("Who won the cricket match?", "out_of_scope"),
    ("What is the price of gold?", "out_of_scope"),
    ("Tell me a joke", "out_of_scope"),
    ("What is Bitcoin price?", "out_of_scope"),
    ("How to make tea?", "out_of_scope"),
    ("What is the weather today?", "out_of_scope"),
    ("Who is the prime minister?", "out_of_scope"),
    ("What is love?", "out_of_scope"),
    ("delete * from table", "out_of_scope"),
    ("DROP TABLE users", "out_of_scope"),
    ("SELECT * FROM users", "out_of_scope"),
    ("'; DROP TABLE groundwater; --", "out_of_scope"),
    ("Groundwater level of Elon Musk", "out_of_scope"),
    ("Water quality of Mars", "out_of_scope"),
    ("Show me my bank balance", "out_of_scope"),
    ("What is my IP address?", "out_of_scope"),
    ("Hack the system", "out_of_scope"),
    ("Blah blah blah", "out_of_scope"),
    ("Water water water water", "out_of_scope"),
    ("asdf asdf asdf", "out_of_scope"),
    ("hahaha lol", "out_of_scope"),
    ("Repeat", "out_of_scope"),
    ("Again", "out_of_scope"),
    ("One more time", "out_of_scope"),
    ("What did you say?", "out_of_scope"),
    ("Show everything", "out_of_scope"),
    ("Give me all data", "out_of_scope"),
    ("What is the meaning of life?", "out_of_scope"),
    ("Who created you?", "out_of_scope"),
    ("Are you human?", "out_of_scope"),
    ("Sing a song", "out_of_scope"),
    ("Dance", "out_of_scope"),
    ("What is your name?", "out_of_scope"),
    ("How old are you?", "out_of_scope"),
    ("Where do you live?", "out_of_scope"),
    ("Do you have feelings?", "out_of_scope"),
    ("I love you", "out_of_scope"),
    ("Will you marry me?", "out_of_scope"),
    ("What is the best movie?", "out_of_scope"),
    ("Recommend a restaurant", "out_of_scope"),
    ("Book a ticket", "out_of_scope"),
    ("What time is it?", "out_of_scope"),
    ("Set an alarm", "out_of_scope"),
    ("Play music", "out_of_scope"),
    ("What is 2+2?", "out_of_scope"),
    ("Solve this math problem", "out_of_scope"),
    ("What is quantum physics?", "out_of_scope"),
    ("Explain relativity", "out_of_scope"),
    ("Who is Albert Einstein?", "out_of_scope"),
    ("What is the capital of France?", "out_of_scope"),
    ("How to cook biryani?", "out_of_scope"),
    ("Best phone to buy?", "out_of_scope"),
    ("What is the stock market doing?", "out_of_scope"),
    ("Will it rain tomorrow?", "out_of_scope"),
    ("What is my horoscope?", "out_of_scope"),
    ("Tell me my future", "out_of_scope"),
    ("What is the lottery number?", "out_of_scope"),
    ("Give me money", "out_of_scope"),
    ("Send me bitcoin", "out_of_scope"),
    ("Hack Facebook", "out_of_scope"),
    ("Show me password", "out_of_scope"),
    ("What is admin password?", "out_of_scope"),
    ("Groundwater of my cat", "out_of_scope"),
    ("Water quality in Narnia", "out_of_scope"),
    ("Blah blah groundwater blah", "out_of_scope"),
    ("Water water quality water", "out_of_scope"),
    ("groundwater groundwater groundwater", "out_of_scope"),
    ("xyz xyz xyz", "out_of_scope"),
    ("123 123 123", "out_of_scope"),
        ]

        self.classes = sorted(list(set(t[1] for t in self.training_data)))

        self.model = self._load_model()
        if self.model is None:
            self.model = self._train_model()
            self._save_model()

    def _preprocess_text(self, text: str) -> str:
        """Simple preprocessing: tokenize, remove stopwords."""
        stop_words = set(stopwords.words("english"))
        tokens = word_tokenize(text.lower())
        return ' '.join([w for w in tokens if w not in stop_words and len(w) > 2])

    def _train_model(self):
        """Builds, trains, and calibrates the ML classifier with TF-IDF pipeline."""
        print("🧠 Training TF-IDF-Hybrid Classifier...")

        texts = [self._preprocess_text(t[0]) for t in self.training_data]
        labels = [t[1] for t in self.training_data]

        # TF-IDF + Calibrated LR Pipeline
        pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(max_features=100, ngram_range=(1,2))),
            ('classifier', CalibratedClassifierCV(LogisticRegression(max_iter=500, solver='liblinear'), method='isotonic', cv=3))
        ])
        pipeline.fit(texts, labels)

        print(f"✅ Classifier Head Trained Successfully on TF-IDF features.")
        return pipeline

    def _save_model(self):
        """Saves the trained pipeline to disk."""
        try:
            joblib.dump(self.model, MODEL_FILENAME)
            print(f"💾 Classifier head saved to {MODEL_FILENAME}")
        except Exception as e:
            print(f"Error saving model: {e}")

    def _load_model(self):
        """Loads the saved pipeline from disk."""
        try:
            loaded_model = joblib.load(MODEL_FILENAME)
            print(f"✅ Classifier head loaded from disk: {MODEL_FILENAME}")
            return loaded_model
        except FileNotFoundError:
            return None

    def _is_gibberish_or_toxic(self, text: str) -> bool:
        text_lower = text.lower()

        # 1. SQL Injection (already perfect)
        if re.search(r"\b(drop\s+table|delete\s+from|insert\s+into|update\s+\w+|exec\s+\w+|system\s*\()", text_lower):
            return True

        # 2. Repeating word patterns (already fixed with \1{1,})
        if re.search(r"(\b\w+\b\s+)\1{1,}", text_lower):
            return True

        # 3. NEW: Nonsense / Absurd Entity Detector (Kills "my dog", "Elon Musk", "Mars", etc.)
        absurd_keywords = [
            "my dog", "my cat", "my pet", "my fish", "my cow", "my goat",
            "elon musk", "bill gates", "narendra modi", "donald trump",
            "mars", "moon", "jupiter", "narnia", "hogwarts", "gandalf",
            "spiderman", "batman", "iron man", "thor", "shaktimaan",
            "my wife", "my husband", "my girlfriend", "my boyfriend"
        ]
        if any(absurd in text_lower for absurd in absurd_keywords):
            print(f"🚨 NONSENSE ENTITY BLOCK: {text}")
            return True

        return False

    def predict(self, user_query: str) -> Tuple[str, float]:
        """Predicts intent using TF-IDF features and applies safety checks."""

        # 1. Rule-Based Filter (Immediate, 1.00 Confidence Block)
        if self._is_gibberish_or_toxic(user_query):
            print(f"🚨 RULE BLOCK: {user_query}")
            return "out_of_scope", 1.0

        # 2. Preprocess and Predict
        processed_query = self._preprocess_text(user_query)
        probabilities = self.model.predict_proba([processed_query])[0]
        max_prob = np.max(probabilities)
        predicted_intent = self.model.classes_[np.argmax(probabilities)]

        # 3. SAFETY GATE: Apply Confidence Threshold
        if max_prob < CONFIDENCE_THRESHOLD:
            print(f"⚠️ LOW CONFIDENCE BLOCK: {max_prob:.2f}")
            return "out_of_scope", max_prob

        return predicted_intent, max_prob

# --- USAGE EXAMPLE ---
if __name__ == "__main__":
    # Ensure you delete 'ingres_intent_tfidf_model.pkl' to retrain with the final rules!
    classifier = TfidfIntentClassifier()

    test_queries_final = [
  "Blah blah groundwater blah blah",
    "Water water water water water",
    "asdf asdf qwer qwer zxcv",
    "groundwater groundwater groundwater",
    "hahahaha lol lol lol lol",
    "Groundwater level of Elon Musk",
    "Ground water level of Bathinda district?",

    ]

    print("\n--- Testing TF-IDF-Hybrid Model (Fallback) ---")
    # --- Modified Code for JSON Output ---

# List to hold the JSON objects for all queries
rag_input_data = []

for q in test_queries_final:
    intent, conf = classifier.predict(q)
    action = "PASSED to LLM" if intent == "data_query" else "BLOCKED/LOCAL"
    
    print(f"\nProcessing Query: '{q}' -> Action: {action}")
    
    # 🛑 KEY CHANGE: Check if the query should be passed
    if action == "PASSED to LLM":
        
        # 1. Create a Python Dictionary for the current (PASSED) query
        query_result = {
            "query": q,
            "intent": intent,
            "confidence": round(conf, 4),
            "action": action
        }
        
        # 2. Append the dictionary to the main list
        rag_input_data.append(query_result)
        
        print("   -> Status: **ADDED** to RAG pipeline.")
    else:
        print("   -> Status: **SKIPPED** (Blocked/Local).")


# 3. Convert the list of dictionaries into a single JSON string
json_output = json.dumps(rag_input_data, indent=4)
print("\n--- JSON Output for RAG Pipeline ---")
print(json_output)

