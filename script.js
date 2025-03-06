// Enhanced Chatbot Response Logic for BookShrine
// Design by Kofi Fosu | Modified by Claude Assistant

// This function handles all user queries about the website and books
function chatbotResponse(message) {
  const msg = message.toLowerCase().trim();
  
  // Greeting responses
  if (msg.match(/^(hi|hello|hey|greetings|hi there)/)) {
    return "Greetings, cosmic traveler. I am BookShrine, your guide to this celestial library. How may I assist you today?";
  }
  
  // About BookShrine
  if (msg.includes("what is book shrine") || msg.includes("about book shrine") || msg.includes("tell me about this site")) {
    return bookShrineInfo.about + " " + bookShrineInfo.mission;
  }
  
  if (msg.includes("mission") || msg.includes("purpose")) {
    return bookShrineInfo.mission;
  }
  
  if (msg.includes("who made") || msg.includes("creator") || msg.includes("who is the author") || 
      msg.includes("who built") || msg.includes("who created") || msg.includes("developer")) {
    return `${bookShrineInfo.creator} You can contact the creator at ${bookShrineInfo.contact}`;
  }
  
  if (msg.includes("when") && (msg.includes("made") || msg.includes("created") || msg.includes("founded"))) {
    return bookShrineInfo.founded;
  }
  
  if (msg.includes("contact") || msg.includes("email") || msg.includes("reach out")) {
    return `You can contact Kofi Fosu (Cosmos Coderr) at ${bookShrineInfo.contact}`;
  }
  
  if (msg.includes("features") || msg.includes("what can you do")) {
    return `Book Shrine offers: ${bookShrineInfo.features.join(", ")}`;
  }
  
  // Book Collection Queries
  if (msg.includes("how many books")) {
    return `The Book Shrine currently houses ${books.length} cosmic literary works, with more being added regularly.`;
  }
  
  if (msg.includes("list all books") || msg.includes("show all books") || msg.includes("what books")) {
    const bookTitles = books.map(book => book.title).join(", ");
    return `Here are all the books in our collection: ${bookTitles}`;
  }
  
  if (msg.includes("genres") || msg.includes("categories") || msg.includes("types of books")) {
    return `Book Shrine features books across various genres including: ${bookShrineInfo.genres.join(", ")}`;
  }
  
  // Author Specific Queries
  if ((msg.includes("kofi") || msg.includes("fosu")) && msg.includes("books")) {
    const kofiBooks = books.filter(book => book.author === "Kofi Fosu");
    return `Kofi Fosu has written ${kofiBooks.length} books: ${kofiBooks.map(book => book.title).join(", ")}`;
  }
  
  if ((msg.includes("cosmos") || msg.includes("coderr")) && msg.includes("books")) {
    const cosmosBooks = books.filter(book => book.author === "Cosmos Coderr");
    return `Cosmos Coderr has written ${cosmosBooks.length} books: ${cosmosBooks.map(book => book.title).join(", ")}`;
  }
  
  // Book Series Queries
  if (msg.includes("heaven bound") || msg.includes("series")) {
    const heavenBoundSeries = books.filter(book => book.title.includes("Heaven Bound"));
    if (heavenBoundSeries.length > 0) {
      return `The Heaven Bound series currently has ${heavenBoundSeries.length} books: ${heavenBoundSeries.map(book => book.title).join(", ")}. It's a Sci-Fi Adventure Thrilling Series by Kofi Fosu.`;
    }
  }
  
  // Specific Book Information
  for (const book of books) {
    if (msg.includes(book.title.toLowerCase())) {
      return `"${book.title}" is written by ${book.author}. ${book.description} You can read it online through our website.`;
    }
  }
  
  // Help commands
  if (msg.includes("help") || msg.includes("what can i ask") || msg.includes("how to use")) {
    return "You can ask me about Book Shrine, our books, authors, genres, or specific titles. Try questions like 'How many books do you have?', 'Who created Book Shrine?', or 'Tell me about Heaven Bound'.";
  }
  
  // Reading experience
  if (msg.includes("how to read") || msg.includes("where to read") || msg.includes("access books")) {
    return "You can read any of our books by clicking the 'Read Online' link below each book in the collection. This will open the PDF in a new tab.";
  }
  
  // Fallback response with suggestion
  return "The cosmic energies are vibrating with your question, but I'm not sure I understand. Try asking about our books, the creator, or specific titles like 'Whispers of the Heart' or 'The Algorithm Of Souls'.";
}

// Search function improvement to include description search
function searchBooks() {
  const query = searchInput.value.toLowerCase().trim();
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query) || 
    book.author.toLowerCase().includes(query) ||
    book.description.toLowerCase().includes(query)
  );
  displayBooks(filteredBooks);
  
  // Provide feedback if no results
  if (filteredBooks.length === 0 && query !== '') {
    const noResultsElement = document.createElement("div");
    noResultsElement.className = "no-results";
    noResultsElement.textContent = "No books match your search. Try a different term or ask the chatbot for assistance.";
    bookGrid.appendChild(noResultsElement);
  }
}

// Enhanced chatbot message handling with typing effect
function addMessage(text, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
  
  if (sender === "user") {
    messageElement.textContent = text;
    messageElement.style = "text-align: right; color: #00ffff; margin: 5px 0; white-space: pre-wrap;";
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  } else {
    // Add typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.textContent = "...";
    typingIndicator.style = "text-align: left; color: #ddd; margin: 5px 0;";
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Simulate typing effect
    let i = 0;
    messageElement.style = "text-align: left; color: #ddd; margin: 5px 0; white-space: pre-wrap;";
    
    setTimeout(() => {
      // Remove typing indicator
      chatbotMessages.removeChild(typingIndicator);
      
      // Add the real message with typing effect
      chatbotMessages.appendChild(messageElement);
      
      const typingEffect = setInterval(() => {
        messageElement.textContent = text.substring(0, i);
        i++;
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        if (i > text.length) {
          clearInterval(typingEffect);
        }
      }, 20);
    }, 800);
  }
}
