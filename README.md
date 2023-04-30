# Kanban
This project is a simple Kanban board implementation. Kanban is a popular agile methodology used for visualizing work, optimizing workflow, and improving team collaboration. The board is divided into columns that represent the stages of the workflow, such as "To Do," "In Progress," and "Completed." Tasks are represented as cards that can be moved between columns by dragging and dropping, allowing people to track their progress more effectively.

## Features
- Create, edit, and delete tasks
- Automatic persistence of task data to local storage
- Move tasks between columns by dragging and dropping
- Responsive design for use on desktop and mobile devices
- Lock down the movement of the application to prevent accidental movement 

## Installation
You can download the latest release of the Kanban board by visiting the Releases section of this repository. Here, you will find the latest version of the application, as well as previous versions if needed.

To install the application, follow these steps:
- 1 - Download the version of the application that is compatible with your operating system.
- 2 - Unzip the downloaded file to a location of your choice.
- 3A - For Windows run "Kanban Setup.exe"
- 3B - For Linux run "Kanban.AppImage"

## Demonstration 
![preview](https://user-images.githubusercontent.com/105900114/235374619-5bcbf69f-96c6-436b-8104-680ff675cea6.png)
![preview2](https://user-images.githubusercontent.com/105900114/235374622-bcf4be71-ff04-4f4f-9d70-de389c686b05.png)

https://user-images.githubusercontent.com/105900114/235374643-a5709bf6-fb81-4090-b0d5-2ae859d2f431.mp4

## Technologies used
- CSS
- HTML
- Tailwind
- Electron
- JavaScript

## Insights and Takeaways
During the development of this Kanban board, several insights and takeaways were gained that can be useful for future projects.
- 1 - Electron: Developing a desktop application using Electron was a new experience that provided several advantages. Electron allowed for cross-platform development, providing support for Windows, Mac, and Linux operating systems. However, I also learned that developing for all three platforms can be challenging. For instance, I encountered issues with transparency on Linux due to the way Chromium browser worked. Additionally, I discovered that building the application icons might not work as well for Linux, and I had to rebuild the application as an AppImage to get it to work properly.

- 2 - Local Storage: Storing task data in the user's browser using local storage is an awesome feature. It makes the application more responsive and faster, and even allows users to continue using the app offline. I loved how easy it was to implement this feature and how much it improved the user experience.

- 3 - Building and Deploying Applications: Building and deploying an app can be a bit overwhelming, but I learned that having a clear plan is essential. Testing the app thoroughly before releasing it to users is also super important, as it helps catch bugs and ensure the app runs smoothly. It's also helpful to use version control tools like Git to keep track of changes and collaborate with others.

## Conclusion

In conclusion, building this Kanban board project was a great learning experience that helped me develop my skills as a developer. Through the development process, I gained valuable insights and takeaways regarding web and desktop application development, such as the importance of using local storage, the benefits of using a CSS framework like Tailwind, and the challenges and advantages of developing with Electron.

Overall, I am proud of what I was able to accomplish with this project and believe that it can be a useful tool for anyone looking to improve their workflow and productivity. I hope that this README file provides a clear and comprehensive overview of the project, and that it inspires others to create their own Kanban board or similar applications.

If you have any questions or feedback, please don't hesitate to reach out. Thank you for taking the time to read this README file and for considering my Kanban board project!

