// script.js
// Design by Kofi Fosu | cosmoscoderr@gmail.com

const books = [
  { title: "Whispers of the Heart", author: "Kofi Fosu", description: "A classic romance full of passion.", filePath: "Whispers-of-the-Heart.pdf" },
  { title: "Ancestors Hammer", author: "Kofi Fosu", description: "Fantasy Adventure.", filePath: "ancestor-hammer.pdf" },
  { title: "Deeper than Ocean", author: "Kofi Fosu", description: "Romance.", filePath: "Deeper-than-Ocean.pdf" },
  { title: "The Algorithm Of Souls", author: "Kofi Fosu", description: "A Sci-Fi, Adventure, Metaphysical.", filePath: "The-Algorithm-Of-Souls.pdf" },
  { title: "Heaven Bound (Book 1)", author: "Kofi Fosu", description: "A Sci-Fi, Adventure Thrilling Series.", filePath: "heaven-bound.pdf" },
  { title: "River Of Time", author: "Kofi Fosu", description: "Proverbs.", filePath: "River Of Time.pdf" },
  { title: "Heaven Bound (Book 2)", author: "Kofi Fosu", description: "A Sci-Fi Adventure Thrilling Series.", filePath: "heaven-bound2.pdf" },
  { title: "The Last Echo (Book 1)", author: "Kofi Fosu", description: "A Sci-Fi Adventure Thrilling Series.", filePath: "The-Last-echo.pdf" },
  { title: "The Void Wanderer", author: "Cosmos Coderr", description: "Science Fiction/Fantasy.", filePath: "The-Void-Wanderer.pdf" },
  { title: "The Silent Architect", author: "Cosmos Coderr", description: "Science Fiction/Mystery.", filePath: "The-silent-Achitect.pdf" },
];

const bookShrineInfo = {
  about: "Book Shrine is a celestial digital library created by Kofi Fosu that houses unique works of fiction across multiple genres including romance, science fiction, fantasy, and adventure.",
  mission: "To connect readers with extraordinary stories that transport them to new worlds and dimensions, offering an immersive reading experience unlike any other.",
  creator: "Kofi Fosu, also known as Cosmos Coderr, is a visionary author and developer who crafts both stories and digital experiences.",
  features: ["3D interactive book display", "Cosmic animated background", "AI-powered assistant", "Immersive portal transitions", "Curated collection of original works"],
  genres: ["Romance", "Science Fiction", "Fantasy", "Adventure", "Mystery"],
  contact: "cosmoscoderr@gmail.com",
  founded: "The Book Shrine was established as a cosmic haven for literary exploration in 2023."
};

const introPage = document.getElementById("intro-page");
const mainPage = document.getElementById("main-page");
const startButton = document.getElementById("start-button");
const bookGrid = document.querySelector(".book-grid");
const searchInput = document.getElementById("search");
const chatbotCore = document.getElementById("chatbot-core");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotInput = document.getElementById("chatbot-input");
const sendButton = document.getElementById("send-button");
const chatbotMessages = document.getElementById("chatbot-messages");
const closeChatbot = document.getElementById("close-chatbot");
const canvas = document.getElementById("cosmic-canvas");
const ctx = canvas.getContext("2d");
const clickSound = document.getElementById("click-sound");
const universeSound = document.getElementById("universe-sound");

// Cosmic Background
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
    s.x += s.speedX;
    s.y += s.speedY;
    if (s.x < 0 || s.x > canvas.width) s.speedX *= -1;
    if (s.y < 0 || s.y > canvas.height) s.speedY *= -1;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Portal Transition with Sound
startButton.addEventListener("click", () => {
  clickSound.play();
  universeSound.play();
  const portalOverlay = document.getElementById("portal-overlay");
  portalOverlay.classList.remove("hidden");
  setTimeout(() => {
    introPage.style.display = "none";
    mainPage.style.display = "block";
    mainPage.classList.remove("hidden"); // Ensure flexbox kicks in
  }, 2000);
});

// Display Books
function displayBooks(booksToShow) {
  bookGrid.innerHTML = booksToShow.map(book => `
    <div class="book-item">
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p>${book.description}</p>
      <button class="read-online" data-file="${book.filePath}">Read Online</button>
    </div>
  `).join("");

  // Add event listeners to "Read Online" buttons
  const readButtons = document.querySelectorAll(".read-online");
  readButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filePath = button.getAttribute("data-file");
      openBookPopup(filePath);
    });
  });

  const bookItems = document.querySelectorAll(".book-item");
  bookItems.forEach(item => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = Math.min(Math.max(x / 10, -20), 20);
      const rotateX = Math.min(Math.max(-y / 10, -20), 20);
      item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

// Open Book Popup
function openBookPopup(filePath) {
  const popup = document.createElement("div");
  popup.className = "book-popup";
  popup.innerHTML = `
    <div class="popup-content">
      <embed src="${filePath}" type="application/pdf" width="100%" height="100%" />
      <button class="close-popup">Exit</button>
    </div>
  `;
  document.body.appendChild(popup);

  // Close popup when "Exit" is clicked
  const closeButton = popup.querySelector(".close-popup");
  closeButton.addEventListener("click", () => {
    document.body.removeChild(popup);
  });
}

// Search Books
function searchBooks() {
  const query = searchInput.value.toLowerCase().trim();
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
  );
  displayBooks(filteredBooks);
}

// Updated Chatbot Response Logic
let lastBookRecommended = null; // Track the last book recommended
let lastQuery = null; // Track the last query for context

function chatbotResponse(message) {
  const msg = message.toLowerCase().trim();
  let response = "";

  // Greetings
  if (msg === "hi" || msg === "hello") {
    const greetings = [
      "Greetings, cosmic traveler! How may I assist you today?",
      "Hello, seeker of stories! What brings you to the Book Shrine?",
      "Welcome back, explorer! How can I guide you today?"
    ];
    response = greetings[Math.floor(Math.random() * greetings.length)];
  }

  // How are you / How was your day
  else if (msg.includes("how are you") || msg.includes("how was your day")) {
    const feelings = [
      "I'm doing well, thank you! How about you?",
      "My day has been peaceful, filled with the whispers of countless stories.",
      "I'm great! Ready to help you find your next adventure."
    ];
    response = feelings[Math.floor(Math.random() * feelings.length)];
    lastQuery = "how_are_you";
  }

  // Follow-up to "How are you?"
  else if (lastQuery === "how_are_you" && (msg.includes("good") || msg.includes("fine") || msg.includes("well"))) {
    response = "That's great to hear! What can I help you with today?";
    lastQuery = null; // Reset context
  }

  // About Book Shrine
  else if (msg.includes("what is book shrine") || msg.includes("tell me about book shrine")) {
    response = `${bookShrineInfo.about} ${bookShrineInfo.mission}`;
  }

  // Number of Books
  else if (msg.includes("how many books") || msg.includes("number of books")) {
    response = `We currently house ${books.length} unique books in our celestial library.`;
  }

  // Best Book to Read
  else if (msg.includes("best book") || msg.includes("recommend a book")) {
    const bestBook = books.find(book => book.title.toLowerCase().includes("heaven bound")) || books[0];
    lastBookRecommended = bestBook; // Remember the last book recommended
    response = `I recommend "${bestBook.title}" by ${bestBook.author}. It's a ${bestBook.description}.`;
  }

  // Follow-up on Last Recommended Book
  else if (msg.includes("tell me more") && lastBookRecommended) {
    response = `"${lastBookRecommended.title}" by ${lastBookRecommended.author} is about ${lastBookRecommended.description}. Would you like to read it?`;
  }

  // Search for Books by Genre or Title
  else if (msg.includes("book about") || msg.includes("find a book")) {
    const keyword = msg.split("about")[1]?.trim() || msg.split("find a book")[1]?.trim();
    if (keyword) {
      const matchingBooks = books.filter(book =>
        book.title.toLowerCase().includes(keyword) ||
        book.description.toLowerCase().includes(keyword)
      );
      if (matchingBooks.length > 0) {
        response = `Here are some books related to "${keyword}":\n` +
          matchingBooks.map(book => `- "${book.title}" by ${book.author}: ${book.description}`).join("\n");
      } else {
        response = `No books found related to "${keyword}". Try another genre or topic!`;
      }
    } else {
      response = "What kind of book are you looking for?";
    }
  }

  // List All Genres
  else if (msg.includes("genres") || msg.includes("types of books")) {
    response = `We have books in the following genres:\n${bookShrineInfo.genres.join(", ")}.`;
  }

  // Contact Info
  else if (msg.includes("contact") || msg.includes("email")) {
    response = `You can reach out to Kofi Fosu at ${bookShrineInfo.contact}.`;
  }

  // Creator Info
  else if (msg.includes("who created") || msg.includes("creator")) {
    response = `Book Shrine was created by ${bookShrineInfo.creator}. ${bookShrineInfo.founded}`;
  }

  // Default Response (20+ Variations)
  else {
    const defaultResponses = [
      "I sense your curiosity, but I need more details to assist. Try asking about books, genres, or Book Shrine!",
      "The cosmos whispers mysteries. What would you like to know?",
      "I'm here to guide you. What are you seeking today?",
      "The stars align with your presence. What brings you here?",
      "The Book Shrine holds countless stories. What are you searching for?",
      "The universe is vast, and so are the stories here. What do you seek?",
      "The cosmic winds carry your words. How may I assist?",
      "The Shrine's energy resonates with your presence. What do you need?",
      "The stories here are endless. What would you like to explore?",
      "The cosmos is full of wonders. What are you curious about?",
      "The Book Shrine is a gateway to infinite worlds. What do you desire?",
      "The stars are listening. What would you like to know?",
      "The Shrine's aura is strong today. How can I help you?",
      "The cosmic library awaits your query. What do you seek?",
      "The universe is full of stories. What are you looking for?",
      "The Shrine's energy is vibrant. What do you need assistance with?",
      "The stars are aligned in your favor. What do you wish to know?",
      "The Book Shrine is a treasure trove of tales. What are you searching for?",
      "The cosmos is alive with stories. What do you desire to know?",
      "The Shrine's whispers grow louder. What do you seek, traveler?"
    ];
    response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  return response;
}

// Chatbot Interaction
sendButton.addEventListener("click", () => {
  clickSound.play();
  const userMessage = chatbotInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, "user");
    chatbotInput.value = "";
    setTimeout(() => {
      const response = chatbotResponse(userMessage);
      addMessage(response, "bot");
    }, 1000);
  }
});

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
});

function addMessage(text, sender) {
  const messageElement = document.createElement("div");
  messageElement.textContent = text;
  messageElement.style = sender === "user" 
    ? "text-align: right; color: #00ffff; margin: 5px 0; white-space: pre-wrap;" 
    : "text-align: left; color: #ddd; margin: 5px 0; white-space: pre-wrap;";
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Chatbot Toggle and Drag
chatbotCore.addEventListener("click", () => {
  clickSound.play();
  chatbotWindow.classList.toggle("hidden");
  if (!chatbotWindow.classList.contains("hidden") && chatbotMessages.children.length === 0) {
    addMessage("Welcome to BookShrine! How may I assist your cosmic journey?", "bot");
  }
});

closeChatbot.addEventListener("click", () => {
  clickSound.play();
  chatbotWindow.classList.add("hidden");
});

// Draggable Chatbot (with touch support for iPhones)
const draggableChat = document.getElementById("chatbot-draggable");
let isDragging = false, currentX, currentY, initialX, initialY;

// Mouse Events
draggableChat.addEventListener("mousedown", startDragging);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDragging);

// Touch Events for iPhone
draggableChat.addEventListener("touchstart", startDraggingTouch, { passive: false });
document.addEventListener("touchmove", dragTouch, { passive: false });
document.addEventListener("touchend", stopDragging);

function startDragging(e) {
  if (e.target === chatbotCore) {
    isDragging = true;
    initialX = e.clientX - currentX;
    initialY = e.clientY - currentY;
  }
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    setChatbotPosition(currentX, currentY);
  }
}

function startDraggingTouch(e) {
  if (e.target === chatbotCore) {
    isDragging = true;
    const touch = e.touches[0];
    initialX = touch.clientX - currentX;
    initialY = touch.clientY - currentY;
  }
}

function dragTouch(e) {
  if (isDragging) {
    e.preventDefault();
    const touch = e.touches[0];
    currentX = touch.clientX - initialX;
    currentY = touch.clientY - initialY;
    setChatbotPosition(currentX, currentY);
  }
}

function stopDragging() {
  isDragging = false;
}

function setChatbotPosition(x, y) {
  draggableChat.style.left = `${x}px`;
  draggableChat.style.top = `${y}px`;
  draggableChat.style.bottom = "auto";
  draggableChat.style.right = "auto";
}

// Initial Position
currentX = window.innerWidth - 70; // Right: 20px
currentY = window.innerHeight - 70; // Bottom: 20px
setChatbotPosition(currentX, currentY);

// Initial Display
displayBooks(books);

// Resize Handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  currentX = window.innerWidth - 70;
  currentY = window.innerHeight - 70;
  if (!isDragging) {
    setChatbotPosition(currentX, currentY);
  }
});

// Fetch IP Address (Serverless Function)
async function fetchIP() {
  try {
    const response = await fetch("/.netlify/functions/get-ip"); // Adjust endpoint for Vercel
    const data = await response.json();
    localStorage.setItem("userIP", data.ip); // Store IP in local storage
    console.log("User IP:", data.ip);
  } catch (error) {
    console.error("Error fetching IP:", error);
  }
}

// Call fetchIP on page load
fetchIP();
