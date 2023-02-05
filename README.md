# Emotion.ly

**Empower Your Words, Express Your Emotions**

## Inspiration

At the heart of our project lies a passion for helping individuals communicate their emotions effectively. One of our team members, a non-native English speaker, faced the challenge of grasping the subtle emotional nuances behind words. A simple thesaurus search would offer synonyms, but often, these words didn't quite capture the intended feeling. This led to a gap in emotional understanding and connection. That's where Emotion.ly comes in - our application bridges this gap, providing a deeper understanding and connection to emotionally-charged words, helping users express themselves with precision and clarity.

## What it does

Our project is a coding tool that helps users express their emotions more effectively in writing. Given a sentence, it suggests alternative emotional words for the adjectives used in the sentence. This allows users to convey their feelings with more precision and nuance, making their writing more impactful. Whether you're crafting a heartfelt message or writing a creative piece, our tool empowers you to express your emotions in a way that truly resonates with your audience.

## How we built it

Emotion.ly was crafted with precision and care to provide users with the most effective way of expressing their emotions. Our team parsed through various databases to gather information on the intensity of adjectives and how they align with the six basic emotions - joy, sadness, fear, disgust, surprise, and anger. With this information, we developed a website that takes in sentence input from the user and provides alternative adjectives that are emotionally charged. By utilizing an emotional slider, users can easily swap their adjectives with synonymous alternatives, making their writing more impactful and expressive.

## Challenges we ran into

The journey of creating Emotion.ly was not without its challenges. Our first obstacle was the need for a comprehensive database and quantifiable values for the adjectives in our system. Additionally, we required information linking these adjectives to the six basic emotions. Another challenge we faced was in the development of the front-end and its integration with the back-end. This involved crafting React components that were both editable and had the capability to switch between an active and inactive state with ease.

## Accomplishments that we're proud of

We have many reasons to be proud of the creation of Emotion.ly. One of our proudest moments was the successful combination of data from multiple databases to create a new and meaningful representation of the emotional significance of words. Furthermore, our limited experience with front-end to back-end integration made the seamless exchange of requests between the two a significant accomplishment. Above all, our greatest satisfaction comes from being able to aid writers, non-native English speakers, and anyone in need of the perfect word for their context.

## What we learned

The development of Emotion.ly was a valuable learning experience. We faced a steep learning curve when it came to tunneling and integrating front-end and back-end work, but we successfully navigated these challenges with the help of tools such as Python Flask and ngrok. We also gained a deeper understanding of the intricacies of various technologies and how they can be harmoniously combined. Perhaps most importantly, we developed essential teamwork skills by divvying up tasks, holding each other accountable, and seamlessly integrating our individual contributions into a cohesive whole. Prior to this project, we had primarily worked on solo coding endeavors, making the team-based approach of Emotion.ly a valuable and enlightening lesson in collaboration.

## What's next for Emotion.ly

Our next steps include expanding support for additional languages and empowering our users to contribute to the growth of our database. By allowing them to add new words or provide feedback on the accuracy of existing entries, we aim to continually enhance the emotional precision of our tool. In the future, we envision Emotion.ly as an intuitive extension that can be effortlessly integrated into any text document. Through continuous improvement and user engagement, we hope to advance the capabilities of our platform, potentially even incorporating machine learning to further refine the emotional connections within our database.

## Built with

Python, Flask, React, Rgrok, JSON, Javascript, Chakra-ui, Prettier.io, NPM

## Uses
- data from The NRC Valence, Arousal, and Dominance (NRC-VAD) Lexicon at http://www.saifmohammad.com/WebPages/nrc-vad.html
- free dictionary api at https://dictionaryapi.dev/
