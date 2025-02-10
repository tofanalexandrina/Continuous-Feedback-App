# Continuous Feedback App  

## Description  
This application enables real-time feedback for activities such as courses or tutorials. It features role-based functionality with two primary roles: **Professor** and **Student**(anonymous).  

## Professor User Guide  

### 1. Accessing the App  
- On the main page, click **"Log In"** to access your activities or create a new account.  
- If you don’t have an account, click **"Sign Up"** to register.  

<img src="https://github.com/user-attachments/assets/093b8b82-8469-49b4-9a9e-f8a2dd5d6a84" width="300" />

### 2. Logging In  
- After clicking **"Log In"**, you will be redirected to the login page.  
- Enter your credentials to access your account.  

<img src="https://github.com/user-attachments/assets/e1ff638b-e971-4153-bad7-7ede0d40ba4d" width="300" />

### 3. Creating a New Account  
- If you don’t have an account, click **"Sign Up"** to proceed to the registration page.
- Once you have signed up, your information is saved in the database (MongoDB), allowing you to log in with your credentials.

![image](https://github.com/user-attachments/assets/483ce185-7a88-4aa6-870d-2f71d3e70e9f)

### 4. Accessing your Activities  
- Once logged in, you can access all the activities you've previously created.
- You can view the details for each activity, including the description, start and end times, activity code, and feedback left by others.

![image](https://github.com/user-attachments/assets/055b80a8-36db-4939-a6f6-3a745c5eb844)
![image](https://github.com/user-attachments/assets/42d79414-c3b2-4b20-9399-c246c29447b3)

### 5. Creating an Activity  
- Click the **"Add Activity"** button to open a modal where you can enter the details of the activity.  
- Click **"Generate Code"** to receive a randomly generated code, which you can share with others.  
- You can then view the feedback left by others, including emoji reactions and the timestamp of when the feedback was submitted.  

![image](https://github.com/user-attachments/assets/932bf40d-7e1a-4c1d-a38f-9cb50416a701)  
![image](https://github.com/user-attachments/assets/9c4b796a-046c-48b3-b539-ca756d379821)

## Student User Guide  

### 1. Accessing the App  
- On the main page, enter the code provided by the Professor.  
- Click **"Go!"** to access the activity.  

![image](https://github.com/user-attachments/assets/789100b7-439a-40bb-98e3-6ee1f603ad31)

### 2. Leaving Feedback  
- Throughout the activity, you can leave feedback by selecting as many emojis as you see fit. Your feedback is anonymous, and you can react multiple times at any point during the activity.

![image](https://github.com/user-attachments/assets/11644c44-2b8d-43fa-b17f-2c7376efc357)
