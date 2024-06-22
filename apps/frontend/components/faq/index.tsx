import {useTranslation} from "next-i18next";
import {Accordion, AccordionItem} from "@nextui-org/react";

// Define a type for the FAQ entries
type FaqEntry = {
    question: string;
    answer: string;
};

// Define a type for the component props
type FAQProps = {
    faqTitle: string
    faqs: FaqEntry[]
};

const FAQ = (props: FAQProps) => {

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="shadow-md rounded-lg">
                <h2 className="text-3xl lg:text-4xl mt-4 lg:mt-4 font-bold mb-8 mt-4 text-white">{props.faqTitle}</h2>
                 <Accordion variant="bordered">
                    {props.faqs.map((faq, index) => (
                        <AccordionItem key={index} title={<h3 className="text-xl font-bold text-white">{faq.question}</h3>}>
                            <p>{faq.answer}</p>
                        </AccordionItem>
                    ))}
                 </Accordion>
            </div>
        </div>
    );
};

export default FAQ;
