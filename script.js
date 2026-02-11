script.js
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
    
    if (pestIssue.includes('yellow') || pestIssue.includes('पीला') || pestIssue.includes('leaf')) {
        pestType = 'Leaf Blight / पत्ती झुलसा रोग';
        recommendation = `
            <strong>समस्या:</strong> ${pestType}<br><br>
            <strong>उपाय (Solution):</strong><br>
            1. नीम का तेल स्प्रे करें (Spray neem oil)<br>
            2. प्रभावित पत्तियां हटाएं (Remove affected leaves)<br>
            3. दवा: Mancozeb या Copper Oxychloride<br>
            4. खेत में पानी का जमाव न होने दें<br><br>
            <strong>कीमत:</strong> ₹200-400 प्रति लीटर
        `;
    } else if (pestIssue.includes('holes') || pestIssue.includes('छेद') || pestIssue.includes('insect')) {
        pestType = 'Stem Borer / तना छेदक';
        recommendation = `
            <strong>समस्या:</strong> ${pestType}<br><br>
            <strong>उपाय (Solution):</strong><br>
            1. Chlorpyrifos दवा छिड़कें<br>
            2. फेरोमोन ट्रैप लगाएं (Use pheromone traps)<br>
            3. खेत को साफ रखें<br>
            4. नीम की खली डालें<br><br>
            <strong>कीमत:</strong> ₹150-300 प्रति लीटर
        `;
    } else if (pestIssue.includes('white') || pestIssue.includes('सफेद') || pestIssue.includes('powder')) {
        pestType = 'Powdery Mildew / चूर्णिल आसिता';
        recommendation = `
            <strong>समस्या:</strong> ${pestType}<br><br>
            <strong>उपाय (Solution):</strong><br>
            1. Sulphur powder छिड़कें<br>
            2. Karathane दवा का प्रयोग करें<br>
            3. पौधों के बीच दूरी बनाएं<br>
            4. सुबह पानी दें, शाम को नहीं<br><br>
            <strong>कीमत:</strong> ₹100-250 प्रति kg
        `;
    } else {
        pestType = 'सामान्य कीट समस्या / General Pest';
        recommendation = `
            <strong>सलाह (Advice):</strong><br>
            1. नजदीकी कृषि केंद्र से संपर्क करें<br>
            2. नीम का तेल (Neem oil) स्प्रे करें<br>
            3. फसल की जांच करते रहें<br>
            4. हमारे AI सहायक से बात करें (नीचे)<br><br>
            <strong>हेल्पलाइन:</strong> 1800-180-1551 (Kisan Call Centre)
        `;
    }
    
    // Display results
    const resultDiv = document.getElementById('aiResult') || createResultDiv();
    resultDiv.innerHTML = `
        <div class="ai-result-card">
            <h3>✅ ${farmerName} जी के लिए सलाह</h3>
            <p><strong>खेत:</strong> ${acres} एकड़ | <strong>फसल:</strong> ${crops.join(', ')}</p>
            <hr>
            ${recommendation}
            <button onclick="speakText('${recommendation.replace(/<[^>]*>/g, '')}')" class="voice-btn">
                🔊 आवाज़ में सुनें (Listen)
            </button>
        </div>
    `;
    resultDiv.scrollIntoView({ behavior: 'smooth' });
});

function createResultDiv() {
    const div = document.createElement('div');
    div.id = 'aiResult';
    document.getElementById('farmer-details').appendChild(div);
    return div;
}

// Text-to-Speech for farmers
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'hi-IN'; // Hindi voice
    speech.rate = 0.8; // Slower for clarity
    window.speechSynthesis.speak(speech);
}
// Livestock Tab Switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

// Contact Seller
function contactSeller(animal, phone) {
    alert(`${animal} खरीदने के लिए संपर्क करें:\n📞 ${phone}\n\nया WhatsApp करें!`);
}

// Sell Form Handler
document.getElementById('sellForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const animal = document.getElementById('animalType').options[document.getElementById('animalType').selectedIndex].text;
    const price = document.getElementById('price').value;
    const mobile = document.getElementById('mobile').value;
    
    alert(`✅ आपका ${animal} ₹${price} में बिक्री के लिए पोस्ट हो गया!\n\nआपका नंबर: ${mobile}\n\nजल्द ही खरीदार संपर्क करेंगे।`);
    this.reset();
});

// AI Chatbot
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    // Display user message
    addMessage(message, 'user');
    input.value = '';
    
    // Generate AI response
    setTimeout(() => {
        const response = getAIResponse(message.toLowerCase());
        addMessage(response, 'bot');
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
    if (message.includes('कीट') || message.includes('pest') || message.includes('रोग')) {
        return 'कीट समस्या के लिए ऊपर फॉर्म भरें या नीम का तेल छिड़कें। किसान हेल्पलाइन: 1800-180-1551';
    } else if (message.includes('दूध') || message.includes('milk') || message.includes('गाय')) {
        return 'अच्छी दुधारू गाय के लिए पशु बाजार देखें। दूध बढ़ाने के लिए: 1) हरा चारा दें 2) पानी खूब पिलाएं 3) आराम दें';
    } else if (message.includes('कीमत') || message.includes('price') || message.includes('भाव')) {
        return 'आज के भाव देखने के लिए पशु बाजार में "कीमत" टैब खोलें। गाय: ₹40-80 हज़ार, भैंस: ₹60-1.20 लाख';
    } else if (message.includes('डॉक्टर') || message.includes('vet') || message.includes('बीमार')) {
        return 'पशु चिकित्सक से संपर्क करें - Dr. राजेश: 9898989898 या Dr. प्रिया: 9797979797 (24x7)';
    } else {
        return 'मैं आपकी मदद करने की कोशिश करूंगा। कृपया पूछें: कीट, दूध, कीमत, डॉक्टर के बारे में।\n\nया हेल्पलाइन: 1800-180-1551';
    }
}

// Voice Input for Chatbot
function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Voice input not supported. Please type instead.');
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.onresult = function(event) {
        const text = event.results[0][0].transcript;
        document.getElementById('chatInput').value = text;
        sendMessage();
    };
    recognition.start();
    alert('🎤 बोलें...');
}

// Enter key to send message
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

