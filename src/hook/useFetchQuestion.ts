import { useState, useEffect } from 'react';

const useFetchQuestions = (topic: string) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setError(null);

            try {
                let url = '';

                if (topic === 'Technology') {
                    url = 'https://opentdb.com/api.php?amount=5&category=18&type=multiple';
                } else if (topic === 'Health') {
                    url = 'https://opentdb.com/api.php?amount=5&category=21&type=multiple';
                } else if (topic === 'Education') {
                    url = 'https://opentdb.com/api.php?amount=5&category=9&type=multiple';
                }

                const response = await fetch(url);
                const data = await response.json();

                if (data.results) {
                    const formattedQuestions = data.results.map((item: any) => {
                        return {
                            question: item.question,
                            type: 'dropdown',
                            options: [...item.incorrect_answers, item.correct_answer],
                        };
                    });
                    setQuestions(formattedQuestions);
                } else {
                    setError('No questions found.');
                }
            } catch (error) {
                setError('Error fetching questions.');
            } finally {
                setLoading(false);
            }
        };

        if (topic) {
            fetchQuestions();
        }
    }, [topic]);

    return { questions, loading, error };
};

export default useFetchQuestions;
