// Pest Detection Form Handler
document.getElementById('farmerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const farmerName = document.getElementById('farmerName').value;
    const acres = document.getElementById('acres').value;
    const crops = Array.from(document.getElementById('crops').selectedOptions).map(opt => opt.value);
    const pestIssue = document.getElementById('pestIssue').value.toLowerCase();
    
    // AI-like pest detection logic
    let recommendation = '';
    let pestType = '';
    
    if (pestIssue.includes('yellow') || pestIssue.includes('leaf')) {
        pestType = 'Leaf Blight';
        recommendation = `
            <strong>Problem:</strong> ${pestType}<br><br>
            <strong>Solution:</strong><br>
            1. Spray neem oil<br>
            2. Remove affected leaves<br>
            3. Use: Mancozeb or Copper Oxychloride<br>
            4. Prevent waterlogging<br><br>
            <strong>Cost:</strong> ₹200-400 per liter
        `;
    } else if (pestIssue.includes('holes') || pestIssue.includes('insect') || pestIssue.includes('bore')) {
        pestType = 'Stem Borer';
        recommendation = `
            <strong>Problem:</strong> ${pestType}<br><br>
            <strong>Solution:</strong><br>
            1. Apply Chlorpyrifos<br>
            2. Use pheromone traps<br>
            3. Keep field clean<br>
            4. Apply neem cake<br><br>
            <strong>Cost:</strong> ₹150-300 per liter
        `;
    } else if (pestIssue.includes('white') || pestIssue.includes('powder')) {
        pestType = 'Powdery Mildew';
        recommendation = `
            <strong>Problem:</strong> ${pestType}<br><br>
            <strong>Solution:</strong><br>
            1. Spray sulphur powder<br>
            2. Use Karathane<br>
            3. Maintain plant spacing<br>
            4. Water in morning, not evening<br><br>
            <strong>Cost:</strong> ₹100-250 per kg
        `;
    } else {
        pestType = 'General Pest Issue';
        recommendation = `
            <strong>Advice:</strong><br>
            1. Contact nearest agricultural center<br>
            2. Spray neem oil as preventive measure<br>
            3. Monitor crop regularly<br>
            4. Ask our AI chatbot below for more help<br><br>
            <strong>Helpline:</strong> 1800-180-1551 (Kisan Call Centre)
        `;
    }
    
    // Display results
    document.getElementById('aiResult').innerHTML = `
        <div class="ai-result-card">
            <h3>✅ Recommendations for ${farmerName}</h3>
            <p><strong>Farm:</strong> ${acres} acres | <strong>Crops:</strong> ${crops.join(', ')}</p>
            <hr>
            ${recommendation}
            <button onclick="speakText('${recommendation.replace(/<[^>]*>/g, ' ')}')" class="voice-btn">
                🔊 Listen to Solution
            </button>
        </div>
    `;
    document.getElementById('aiResult').scrollIntoView({ behavior: 'smooth' });
});

// Text-to-Speech
function speakText(text) {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-US';
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
    } else {
        alert('Text-to-speech not supported in your browser');
    }
}

// Livestock Tab Switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    document.getElementById(tabName + 'TabBtn').classList.add('active');
}

// Contact Seller
function contactSeller(animal, phone) {
    alert(`To buy ${animal}, contact:\n📞 ${phone}\n\nOr send WhatsApp message!`);
}

// Book Vet Appointment
function bookVet(doctorName, phone) {
    alert(`Booking appointment with ${doctorName}\n📞 Call: ${phone}\n\nThey will confirm your appointment shortly.`);
}

// Sell Form Handler
document.getElementById('sellForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const animal = document.getElementById('animalType').value;
    const price = document.getElementById('price').value;
    const mobile = document.getElementById('mobile').value;
    
    const resultDiv = document.getElementById('sellResult');
    resultDiv.innerHTML = `
        <strong>✅ Success!</strong><br>
        Your ${animal} has been posted for sale at ₹${price}<br>
        Contact number: ${mobile}<br>
        Buyers will contact you soon!
    `;
    resultDiv.classList.add('show');
    this.reset();
    
    setTimeout(() => {
        resultDiv.classList.remove('show');
    }, 5000);
});

// Multi-language responses
const responses = {
    en: {
        greeting: "Hello! I'm here to help with farming and livestock questions.",
        pest: "For pest issues, fill the form above or spray neem oil. Helpline: 1800-180-1551",
        milk: "For good milch cows, check livestock marketplace. Tips: 1) Feed green fodder 2) Give plenty of water 3) Provide rest",
        price: "Check 'Prices' tab in livestock section. Cow: ₹40-80k, Buffalo: ₹60-1.2L",
        vet: "Contact vets - Dr. Rajesh: 9898989898 or Dr. Priya: 9797979797 (24x7)",
        default: "I can help with: pest, milk, price, vet. Or call helpline: 1800-180-1551"
    },
    hi: {
        greeting: "नमस्ते! मैं खेती और पशुपालन में आपकी मदद करूंगा।",
        pest: "कीट समस्या के लिए ऊपर फॉर्म भरें या नीम का तेल छिड़कें। हेल्पलाइन: 1800-180-1551",
        milk: "अच्छी दुधारू गाय के लिए पशु बाजार देखें। सुझाव: 1) हरा चारा दें 2) खूब पानी पिलाएं 3) आराम दें",
        price: "पशु बाजार में 'कीमत' टैब देखें। गाय: ₹40-80 हजार, भैंस: ₹60-1.20 लाख",
        vet: "पशु चिकित्सक - Dr. राजेश: 9898989898 या Dr. प्रिया: 9797979797 (24x7)",
        default: "मैं मदद कर सकता हूं: कीट, दूध, कीमत, डॉक्टर। या हेल्पलाइन: 1800-180-1551"
    },
    ta: {
        greeting: "வணக்கம்! நான் விவசாயம் மற்றும் கால்நடை வளர்ப்பில் உதவுவேன்.",
        pest: "பூச்சி பிரச்சனைகளுக்கு மேலே உள்ள படிவத்தை பூர்த்தி செய்யவும். ஹெல்ப்லைன்: 1800-180-1551",
        milk: "நல்ல பால் தரும் பசுவுக்கு கால்நடை சந்தையைப் பாருங்கள்.",
        price: "விலைகளுக்கு கால்நடை பகுதியில் 'விலைகள்' தாவலைப் பாருங்கள்.",
        vet: "மருத்துவர் ராஜேஷ்: 9898989898 அல்லது Dr. பிரியா: 9797979797",
        default: "நான் உதவ முடியும்: பூச்சி, பால், விலை, மருத்துவர். ஹெல்ப்லைன்: 1800-180-1551"
    },
    te: {
        greeting: "నమస్కారం! నేను వ్యవసాయం మరియు పశుసంవర్ధనలో సహాయం చేస్తాను.",
        pest: "పురుగుల సమస్యల కోసం పై ఫారమ్ నింపండి. హెల్ప్‌లైన్: 1800-180-1551",
        milk: "మంచి పాలిచ్చే ఆవులకు పశు మార్కెట్ చూడండి.",
        price: "ధరల కోసం పశువుల విభాగంలో 'ధరలు' ట్యాబ్ చూడండి.",
        vet: "డాక్టర్ రాజేష్: 9898989898 లేదా డాక్టర్ ప్రియ: 9797979797",
        default: "నేను సహాయం చేయగలను: పురుగులు, పాలు, ధర, డాక్టర్. హెల్ప్‌లైన్: 1800-180-1551"
    },
    bn: {
        greeting: "নমস্কার! আমি কৃষি এবং পশুপালনে সাহায্য করব।",
        pest: "কীটপতঙ্গ সমস্যার জন্য উপরের ফর্মটি পূরণ করুন। হেল্পলাইন: 1800-180-1551",
        milk: "ভাল দুধ দেওয়া গরুর জন্য পশু বাজার দেখুন।",
        price: "দামের জন্য পশু বিভাগে 'দাম' ট্যাব দেখুন।",
        vet: "ডাক্তার রাজেশ: 9898989898 বা ডাক্তার প্রিয়া: 9797979797",
        default: "আমি সাহায্য করতে পারি: কীট, দুধ, দাম, ডাক্তার। হেল্পলাইন: 1800-180-1551"
    },
    mr: {
        greeting: "नमस्कार! मी शेती आणि पशुपालनात मदत करेन.",
        pest: "कीटक समस्येसाठी वरील फॉर्म भरा. हेल्पलाइन: 1800-180-1551",
        milk: "चांगल्या दूध देणार्‍या गायीसाठी पशु बाजार पहा.",
        price: "किमतींसाठी पशु विभागात 'किंमत' टॅब पहा.",
        vet: "डॉ. राजेश: 9898989898 किंवा डॉ. प्रिया: 9797979797",
        default: "मी मदत करू शकतो: कीटक, दूध, किंमत, डॉक्टर. हेल्पलाइन: 1800-180-1551"
    },
    gu: {
        greeting: "નમસ્તે! હું ખેતી અને પશુપાલનમાં મદદ કરીશ.",
        pest: "જંતુ સમસ્યા માટે ઉપરનું ફોર્મ ભરો. હેલ્પલાઇન: 1800-180-1551",
        milk: "સારી દૂધ આપતી ગાય માટે પશુ બજાર જુઓ.",
        price: "ભાવ માટે પશુ વિભાગમાં 'ભાવ' ટૅબ જુઓ.",
        vet: "ડૉ. રાજેશ: 9898989898 અથવા ડૉ. પ્રિયા: 9797979797",
        default: "હું મદદ કરી શકું છું: જંતુ, દૂધ, ભાવ, ડૉક્ટર. હેલ્પલાઇન: 1800-180-1551"
    }
};

// AI Chatbot
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    setTimeout(() => {
        const response = getAIResponse(message.toLowerCase());
        addMessage(response, 'bot');
        speakBot(response);
    }, 500);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(message) {
    const lang = document.getElementById('botLanguage').value;
    const langResponses = responses[lang];
    
    if (message.includes('pest') || message.includes('कीट') || message.includes('பூச்சி') || message.includes('పురుగు')) {
        return langResponses.pest;
    } else if (message.includes('milk') || message.includes('दूध') || message.includes('பால்') || message.includes('పాలు')) {
        return langResponses.milk;
    } else if (message.includes('price') || message.includes('कीमत') || message.includes('விலை') || message.includes('ధర')) {
        return langResponses.price;
    } else if (message.includes('vet') || message.includes('doctor') || message.includes('डॉक्टर') || message.includes('மருத்துவர்')) {
        return langResponses.vet;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('नमस्ते') || message.includes('வணக்கம்')) {
        return langResponses.greeting;
    } else {
        return langResponses.default;
    }
}

function speakBot(text) {
    const lang = document.getElementById('botLanguage').value;
    const langMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'bn': 'bn-IN',
        'mr': 'mr-IN',
        'gu': 'gu-IN'
    };
    
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = langMap[lang];
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
    }
}

// Voice Input
function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Voice input not supported in this browser');
        return;
    }
    
    const lang = document.getElementById('botLanguage').value;
    const langMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'bn': 'bn-IN',
        'mr': 'mr-IN',
        'gu': 'gu-IN'
    };
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = langMap[lang];
    recognition.onresult = function(event) {
        const text = event.results[0][0].transcript;
        document.getElementById('chatInput').value = text;
        sendMessage();
    };
    recognition.start();
    alert('🎤 Speak now...');
}

// Enter key to send
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

// Initialize chatbot greeting
document.getElementById('botLanguage').addEventListener('change', function() {
    const lang = this.value;
    document.getElementById('chatMessages').innerHTML = `
        <div class="bot-message">${responses[lang].greeting}</div>
    `;
});
