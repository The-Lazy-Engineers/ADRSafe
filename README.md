Summary: This code checks scans the list of ports in "ports.txt" and returns the ports which are open. 
An input of user's IP address by running the following command in your terminal: ./main <IP Address>

Code was written and tested on: 
- Operating System: Ubuntu 24.04.1 LTS                              
- Kernel: Linux 6.8.0-49-generic
- Architecture: x86-64

AI Tools Used: 






Future Add-ons:
1. Write a menu driven code which gives the user a choice to get a list of the open port with a certain vulnerable rating(out of 5). 
2. Only print out open ports when executed for the first time.
3. Write another menu driven code to fetch data for each port number entered(from port.txt). Give description about the port; why is it vulnerable and how to close it!







💊 ADRSafe | Adverse Drug Reactions Safe

Summary: This project is a web application that recommends suitable drugs based on a user's symptoms. The system leverages a machine learning model trained on medical data to provide accurate and reliable suggestions.

Features:
- User-friendly Interface: A dropbox is used in order to input data.
- Accurate Drug Prediction: Machine learning model predicts appropriate drugs.
- Displays detailed drug information and possible side effects.
- Allows feedback for improving model accuracy.
- NMC Verification: We use Indian Medical Registry Search so that only certified Doctors could use our tools.

Dataset Source: 
- https://www.kaggle.com/datasets/dhivyeshrk/diseases-and-symptoms-dataset
- https://www.kaggle.com/datasets/shudhanshusingh/250k-medicines-usage-side-effects-and-substitutes

Tools Used:
AI Chatbots: ChatGPT, Perplexity, Copilot
Frontend: HTML, React.js, Tailwind CSS
Backend: Node.js
Model: Scikit-learn/TensorFlow/PyTorch
Database: MongoDB/MySQL/PostgreSQL
Deployment: AWS/Heroku/Render

How To Use:
User Input: User enters symptoms in the via the use of a dropbox.
Model Prediction: The backend processes the input and sends it to the ML model.
Result Display: The predicted drug(s), dosage, side effects as well as the possible disease suggestions are displayed.
Feedback Collection: User can provide feedback for future improvements.
Note: The User here refers to a verified Doctor


How to use Usage:
- Open the website and enter via the dropbox.
- Click "Predict" to get the recommended drug.
- Review the suggested drugs and read additional information.


Code was written and tested on: 
- Operating System: Ubuntu 24.04.1 LTS                              
- Kernel: Linux 6.8.0-49-generic
- Architecture: x86-64


Future Add Ons:
 Provide feedback to improve the model.

Contributors: 
- Harshvardhan Gaggar  | its-harsh-here
- Avigyan Roy          | Krekensis
- Mayank Kumar         | CODINGKATT
- Aaron Fernande       | iamaaron07


Issues: If you encounter any bugs or have feature requests, please create an issue here.

License: This project is licensed under the MIT License - see the LICENSE.md file for details.
