# Ajaia Collaborative Doc Editor (Mini Google Docs)

Candidate: Chelsie Lin (chels.inmadison@gmail.com)

Role: Technical Program and Project Manager, AI Delivery

## A lightweight, high-performance collaborative document editor built to demonstrate full-stack product judgment, technical execution, and AI-native development workflows.

🚀 Live Demo: https://collab-doc-editor.vercel.app/

![Main Interface](https://github.com/user-attachments/assets/54308121-c882-4b29-a53a-e154466138a2)

## ✨ Key Features

### 1. Advanced Document Editing

• Rich Text Support:
Full support for Bold, Italic, Underline, and Heading hierarchies (H1, H2).

![Main Interface](https://github.com/user-attachments/assets/bfefa923-03f9-4c20-a8eb-02bf9ad5d28f)

• List Management:
Integrated bulleted and numbered lists for structured content.

![Main Interface](https://github.com/user-attachments/assets/fb3e9176-310c-4dac-9afb-619a6b519683)

• Real-time Feedback:
A status indicator showing "Saved," "Saving," or "Unsaved" states to ensure user confidence.

![Main Interface](https://github.com/user-attachments/assets/e34e8dfb-fb0b-401e-8495-9c6b94c743f1)

### 2. File Import & Handling

• External Workflow:
Users can import .txt or .md files directly into the editor.

• Contextual Integration:
Importing a file automatically updates the document title to match the filename, streamlining the transition from local storage to the cloud.

### 3. Simulation of Collaborative Sharing

• Permission Logic:
Built-in "Owner" and "Guest" view toggles to demonstrate access control logic.

• Read-only Mode:
Non-owners (Guests) are restricted from editing content, renaming files, or importing new data.

![Main Interface](https://github.com/user-attachments/assets/e34e8dfb-fb0b-401e-8495-9c6b94c743f1)

• Invite Simulation:
A functional sharing modal where users can manage an access list.

![Main Interface](https://github.com/user-attachments/assets/837b4d7a-1f67-4e07-8798-c393a9edff9a)

### 4. Robust Persistence

LocalStorage Engine: All document content, titles, and sharing settings persist across browser refreshes.

• Last Saved Timestamp:
Displays the exact time of the last successful data commit.

![Main Interface](https://github.com/user-attachments/assets/ec525a5c-2407-4be0-b3a8-b0475aa8e9a2)

### 🛠 Tech Stack

- Frontend: React (Vite)
- Editor Core: TipTap (Headless Framework)
- Styling: Custom CSS (Optimized for Readability)
- Persistence: Browser LocalStorage API

### 📦 Installation and Setup

To run this project locally, ensure you have Node.js v18 or higher installed.

### Clone the repository:

- Bash
- git clone https://github.com/chillinxue/collab-doc-editor
- cd collab-doc-editor
- Install dependencies:

- Bash
- npm install
- Start the development server:

- Bash
- npm run dev
- Access the app:
- Open http://localhost:5173 in your browser.

### 🧠 Product Decisions & Trade-offs

• LocalStorage over External DB:
To ensure a stable, zero-latency delivery within the 6-hour window, I prioritized LocalStorage. This allowed me to focus 100% on the UX of the sharing logic and editor stability rather than debugging database connection strings.

• Simulated Multi-user View:
Since LocalStorage is client-side, I implemented an "Owner/Guest" toggle. This demonstrates my understanding of role-based access control (RBAC) in a way that is immediately testable by the reviewer without requiring them to create multiple accounts.

• Deliberate Feature Cuts:
I deprioritized "Real-time Cursor Tracking" to ensure that the core "File Import" and "Persistence" features were bug-free and polished.
