// list faq
const faqData = [
    {
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language. It is the standard language for creating web pages."
    },
    {
        question: "What is CSS?",
        answer: "CSS stands for Cascading Style Sheets. It is used to style and layout web pages."
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript is a programming language that is used to create dynamic and interactive effects on web pages."
    }
];

// get accordion Container 
const accordionContainer = document.getElementById('accordion')

// create function to generate faqData from array faqData

function generateAccordionItems(faqData){
    faqData.forEach(item => {
        const accordionItem = document.createElement('div')

        accordionItem.classList.add('accordion-item')

        //create element for header
        const header = document.createElement('button')
        header.classList.add('accordion-header')
        header.textContent = item.question

        //create element for content
        const content = document.createElement('div')
        content.classList.add('accordion-content')

        const contentText = document.createElement('p')
        contentText.textContent = item.answer

        // insert element to HTML
        content.appendChild(contentText)
        accordionItem.appendChild(header)
        accordionItem.appendChild(content)

        // add accordion item to accordion container
        accordionContainer.appendChild(accordionItem)
    })
}
// call function generate faq
generateAccordionItems(faqData)



// get element accordion header
const accordionHeaders = document.querySelectorAll('.accordion-header')

// add event listener for accordion
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active')
        const accordionContent = header.nextElementSibling

        if(header.classList.contains('active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'
        } else {
            accordionContent.style.maxHeight = 0
        }

        accordionHeaders.forEach(otherHeader => {
            if(otherHeader !== header && otherHeader.classList.contains('active')) {
                otherHeader.classList.remove('active')
                otherHeader.nextElementSibling.style.maxHeight = 0
            }
        })
    })
})
