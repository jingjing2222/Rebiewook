import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ children }: { children: string }) => {
    return (
        <ReactMarkdown
            components={{
                h1: (props) => (
                    <h1
                        className="text-3xl font-bold text-gray-900 my-4"
                        {...props}
                    />
                ),
                h2: (props) => (
                    <h2
                        className="text-2xl font-semibold text-gray-800 my-3"
                        {...props}
                    />
                ),
                p: (props) => (
                    <p className="text-base text-gray-700 my-2" {...props} />
                ),
                a: (props) => (
                    <a
                        className="text-blue-500 hover:text-blue-700 underline"
                        target="_blank"
                        {...props}
                    />
                ),
                ul: (props) => (
                    <ul className="list-disc pl-5 space-y-2" {...props} />
                ),
                ol: (props) => (
                    <ol className="list-decimal pl-5 space-y-2" {...props} />
                ),
                li: (props) => <li className="text-gray-700" {...props} />,
                blockquote: (props) => (
                    <blockquote
                        className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
                        {...props}
                    />
                ),
                code: (props) => (
                    <code
                        className="bg-gray-100 text-sm px-1 py-0.5 rounded-md"
                        {...props}
                    />
                ),
                pre: (props) => (
                    <pre
                        className="bg-gray-900 text-white p-4 rounded-md overflow-auto"
                        {...props}
                    />
                ),
            }}
        >
            {children}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
