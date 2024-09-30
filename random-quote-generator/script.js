// Array that store a list of quotes and their autho
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" }
];

// Get HTML elements by their id
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const newQuoteButton = document.getElementById('new-quote')

// function to generate a random quote
function generateQuote(){
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const randomQuote = quotes[randomIndex]

    // Update the quote text and author in the Element HTML
    quoteText.textContent = `"${randomQuote.text}"`
    quoteAuthor.textContent = `- ${randomQuote.author}`

}

// Add Event Listener for the button, 
newQuoteButton.addEventListener('click', generateQuote)

// Call generate quote when page first loaded
generateQuote()