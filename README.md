LIVE Puzzle Game

A web-based interactive puzzle game that utilizes live video feed from the user's webcam to create dynamic puzzle pieces. Players can rearrange the pieces to complete the puzzle and experience real-time feedback. This project is designed to combine entertainment with a fun challenge, showcasing skills in JavaScript, HTML5 Canvas, and real-time media streaming.

Features

Live Video Integration: The game uses the user's webcam feed to generate the puzzle pieces.

Customizable Difficulty Levels: Choose from different levels like Easy, Medium, Hard, Insane, and God mode, with increasing grid sizes (3x3, 5x5, 10x10, 40x40, and 100x100).

Real-time Feedback: Displays elapsed time dynamically during gameplay.

Responsive Design: Adapts to different screen sizes and resolutions.

Victory Notification: Displays a "You Win" dialog box when the puzzle is completed, along with the total time taken.

Mouse and Touch Controls: Supports both mouse and touch inputs for broader accessibility.

How to Play

Allow access to your webcam when prompted.

Select a difficulty level from the dropdown menu.

Rearrange the puzzle pieces to match the original video feed.

Complete the puzzle as quickly as possible to beat your best time!

Installation

Clone the repository:

git clone https://github.com/fateisintersting/puzzle.git

Open the project folder.

Open index.html in your preferred web browser.

Project Structure

project-directory/
├── index.html           # Main HTML file
├── styles.css           # Styling for the game
├── script.js            # Main JavaScript logic
├── README.md            # Documentation
└── assets/              # Optional folder for additional assets

Key Functions in the Code

Main Functions

main(): Initializes the game by setting up the webcam feed and canvas.

changeDifficulty(): Adjusts the puzzle grid size based on the selected difficulty.

restart(): Restarts the game by reshuffling the puzzle pieces.

updateCanvas(): Continuously redraws the canvas with the live video feed and puzzle pieces.

isComplete(): Checks if the puzzle is completed correctly.

youwin(): Displays the "You Win" dialog and stops the timer.

Helper Classes & Functions

Piece: Represents each puzzle piece, with properties like position, size, and correctness.

distance(): Calculates the distance between two points, used for snapping pieces into place.

handleresize(): Adjusts canvas dimensions dynamically based on window size and video feed.

Challenges Addressed

Ensuring smooth live video feed integration with puzzles.

Handling different input methods (mouse and touch) seamlessly.

Creating responsive layouts that adapt to various screen sizes.

Implementing efficient piece snapping logic for a better user experience.

Future Improvements

Add a leaderboard to track players' best times.

Include background music or sound effects.

Enhance the UI/UX for a more immersive experience.

Provide options to upload custom images instead of using live video feed.

Technologies Used

JavaScript: Core logic for game functionality.

HTML5 Canvas: Rendering the video feed and puzzle pieces.

CSS: Styling the interface.

Web APIs: navigator.mediaDevices for accessing the webcam.

Contributions

Feel free to fork this repository and contribute improvements! Submit a pull request or open an issue to report bugs or suggest new features.
