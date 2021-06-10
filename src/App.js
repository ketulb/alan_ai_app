import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './styles.js';

import alanImage from './images/alan-3.png';
import NewsCards from './components/NewsCards/NewsCards';
import classNames from 'classnames';

const alanKey = 'aaf95272df9328d401fab1a7d09317db2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    const classes = useStyles();
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if ( command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber-1];

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                    }
                    else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    }
                    else {
                        alanBtn().playText('Please try that again...');
                    }
                }
            }
        })  
    }, [])
    return (
        <div>
            <div className={classes.logoContainer}>
                <img className={classes.alanLogo} src={alanImage} alt='logo' />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}
export default App;