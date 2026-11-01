# Hatch 🎓

Learn together. Teach each other. Grow together.

_Target Audience: Students_

Education is expensive, and learning new skills often comes with financial barriers. But what if we could learn from one another by contributing our knowledge, talents, and abilities?

Hatch is a student-focused platform designed to make skill acquisition more accessible by connecting people who want to learn with people who are willing to teach. Through collaboration and knowledge sharing, students can exchange skills without necessarily exchanging money.

_Core Values: Contribution · Learning · Collaboration_

## ✨ Features

- User Profiles: Users create accounts specifying the skills they can teach and the skills they want to learn.
- Work Showcase: Users can showcase their work, projects, and practical experience.
- Skill Matching: Users discover people who can teach them and people who want to learn the skills they already possess.
- Collaboration Requests: Users send requests to potential learning partners, including their proposed terms and conditions.
- Flexible Scheduling: Learning partners arrange their own classes and agree on a schedule, with at least one session per week.
- Class Tracking: Sessions are tracked to encourage consistency and accountability.
- Ratings and Feedback: Users rate their sessions and learning partners. Ratings contribute to a scoring system that encourages active participation and commitment.

## 🛠️ Tech Stack

- Frontend: React
- Backend: Node.js, Express.js
- Database: MongoDB Atlas

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- A MongoDB Atlas account and database connection URI

### Installation

1. Clone the repository:

   ````bash
   git clone https://github.com/Ade12Donald/Skill-Swap.git```

   ````

2. Navigate to the project directory:

   `cd Skill-Swap`

3. Install the dependencies:

```bash
    cd server
    npm install
```

```bash
    cd ..
    cd client
    npm install
```

1. Create a ".env" file in the appropriate backend directory, using ".env.example" as a reference.

2. Configure your environment variables:

   ```text
   PORT=2000
   MONGO_URI=your_mongodb_uri
   NODE_ENV=development
   ```

3. Start the application using the appropriate script defined in "package.json".

## 📁 Project Structure

```text
Hatch
├──server/
|   ├── controllers/ # Request handlers and application logic
|   ├── middleware/ # Request processing and validation
|   ├── models/ # Mongoose models
|   ├── routers/ # API route definitions
|   ├── schema/ # Data validation schemas
|   └── utils/ # Reusable helper functions
└── client/
```

## 👨‍💻 Author

<img src="https://images.weserv.nl/?url=github.com/Ade12Donald.png&w=100&h=100&fit=cover&mask=circle" width="30" align="absmiddle" alt="Donald">  <a href="https://github.com/Ade12Donald"><b>Donald Adebowale</b></a>
