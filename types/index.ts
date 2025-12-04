export interface Question {
    id : string;
    question: string;
    answer: string;
}

export interface FAQCategory {
    id : string;
    title: string;
    sideImage: string; // Path to the changing image
    questions: Question[];
}