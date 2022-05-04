window.addEventListener("DOMContentLoaded", ()=>{
    subjectQuestions.algebra2 = [
        {
            question: "What is the equivalent of " + katex.renderToString("cot \\space \\theta"),
            answerIndex: 2, // cannot compare apis BRUH RIP
    
            choices: [
                katex.renderToString("tan \\space \\theta"),
                katex.renderToString("\\frac{cos \\space \\theta}{tan \\space \\theta}"),
                katex.renderToString("\\frac{cos \\space \\theta}{sin \\space \\theta}"),
                katex.renderToString("\\frac{sin \\space \\theta}{tan \\space \\theta}")
            ]
        },
    
        {
            question: "Which is one of the factor of equation " + katex.renderToString("x^{2} + 8x - 9"),
            answerIndex: 3, // cannot compare apis BRUH RIP
    
            choices: [
                katex.renderToString("x + 3i"),
                katex.renderToString("x - i"),
                katex.renderToString("x - 3"),
                katex.renderToString("x + 9")
            ]
        },
    
        {
            question: "Simplify " + katex.renderToString("7a^{2} + 3b + 6a - 2a^{2}"),
            answerIndex: 3, // cannot compare apis BRUH RIP
    
            choices: [
                katex.renderToString("a^{2} + 3b - 2"),
                katex.renderToString("9a^{2} + 3b + 6a"),
                katex.renderToString("11a^{2} + 3b + 6"),
                katex.renderToString("5a^{2} + 3b + 6a"),
            ]
        },
    
        {
            question: "If " + katex.renderToString("x(x-3) = -1") + ", then " + katex.renderToString("x^{3}(x^{3}-18)") + " equals:",
            answer: "-1",
    
            choices: [
                "2",
                "-1",
                "1",
                "0"
            ]
        },
    
        {
            question: "If " + katex.renderToString("\\tan \\big( \\frac{\\pi}{8} \\big) = \\sqrt{2} - 1") + ", then " + katex.renderToString("\\cot \\big( \\frac{3 \\pi}{8} \\big)") + " equals:",
            answerIndex: 0,
    
            choices: [
                katex.renderToString("\\sqrt{2} + 1"),
                katex.renderToString("\\sqrt{2}"),
                katex.renderToString("1"),
                "None of above"
            ]
        },

        {
            question: "Do you personally like Algebra 2?",
            answer: "ALL",
    
            choices: [
                "What?",
                "Definitely no",
                "Never say never",
                "If there's no Mr. Tri"
            ]
        },
    ]
})