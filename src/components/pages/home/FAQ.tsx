"use client";

import { Collapse } from "antd";
import "antd/dist/reset.css";

const { Panel } = Collapse;

const FAQ = () => {
    const faqs = [
        {
            id: "1",
            question: "How do I book an appointment with a doctor?",
            answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.",
        },
        {
            id: "2",
            question: "Can I request a specific doctor when booking my appointment?",
            answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.",
        },
        {
            id: "3",
            question: "What should I do if I need to cancel or reschedule my appointment?",
            answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.",
        },
        {
            id: "4",
            question: "What if I'm running late for my appointment?",
            answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.",
        },
        {
            id: "5",
            question: "Can I book appointments for family members or dependents?",
            answer: "Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.",
        },
    ];

    return (
        <div className="custom-container mt-[116px]">
            <h2 className="text-[44px] font-bold mb-4 text-center">
                Your Questions are Answered
            </h2>

            <Collapse accordion defaultActiveKey={["1"]} className="border-t border-gray-200">
                {faqs.map((faq) => (
                    <Panel
                        header={<span className="font-semibold">{faq.question}</span>}
                        key={faq.id}
                        className="border-b border-gray-200"
                    >
                        <p className="text-gray-700">{faq.answer}</p>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default FAQ;